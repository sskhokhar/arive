import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@/dtos/create-user.dto';
import { Route } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements Route {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * GET /users
     * @tags User
     * @summary Get all users
     * @param {string} populate.query - comma separated relations
     * @return {object} 200 - success response
     */
    this.router.get(`${this.path}`, this.usersController.getUsers);
    /**
     * GET /users/{id}
     * @tags User
     * @summary Get user by id
     * @param {string} populate.query - comma separated relations
     * @param {string} id.path - user id
     * @return {object} 200 - success response
     */
    this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    /**
     * POST /users
     * @tags User
     * @summary Create new user
     * @param {object} request.body.required
     * @return {object} 200 - success response
     * @example request - payload
     * {"name": "string"}
     */
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    /**
     * PATCH /users/{id}
     * @tags User
     * @summary Update user
     * @param {string} id.path - user id
     * @param {object} request.body.required
     * @return {object} 200 - success response
     * @example request - payload
     * {"name": "string"}
     */
    this.router.patch(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    /**
     * DELETE /users/{id}
     * @tags User
     * @summary Update user
     * @param {string} id.path - user id
     * @return 200 - success response
     */
    this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);

    /**
     * GET /users/{id}/hobbies
     * @tags User
     * @summary Get user hobbies
     * @param {string} id.path - user id
     * @return {object} 200 - success response
     */
    this.router.get(`${this.path}/:id/hobbies`, this.usersController.getUserHobbies);
  }
}

export default UsersRoute;
