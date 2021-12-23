process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import cors from 'cors';
import config from 'config';
import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, set } from 'mongoose';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import { dbConnection } from '@databases';
import { Route } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { Server } from 'http';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  public appServer: Server;

  constructor(routes?: Route[]) {
    this.app = express();

    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'dev';

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.connectToDatabase();
  }

  public listen() {
    this.appServer = this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getAppServer() {
    return this.appServer;
  }
  public close() {
    this.appServer.close();
  }

  private async connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }
    if (this.env === 'test') {
      const memoryServer = MongoMemoryServer.create();
      return connect((await memoryServer).getUri());
    }
    connect(dbConnection.url, dbConnection.options);
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes?: Route[]) {
    routes?.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      info: {
        version: '1.0.0',
        title: 'Arive',
        description: 'Arive case study',
      },
      baseDir: __dirname,
      filesPattern: './**/*.ts',
      swaggerUIPath: '/api-docs',
      exposeSwaggerUI: true,
      exposeApiDocs: false,
      apiDocsPath: '/v3/api-docs',
      notRequiredAsNullable: false,
      swaggerUiOptions: {},
    };
    expressJSDocSwagger(this.app)(options);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
