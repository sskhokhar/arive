import { Router } from 'express';
import HobbiesController from '@controllers/hobbies.controller';
import { CreateHobbyDto } from '@dtos/create-hobby.dto';
import { Route } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class HobbiesRoute implements Route {
  public path = '/hobbies';
  public router = Router();
  public hobbiesController = new HobbiesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * GET /hobbies
     * @tags Hobby
     * @summary Get all hobbies
     * @return {object} 200 - success response
     */
    this.router.get(`${this.path}`, this.hobbiesController.getHobbies);
    /**
     * GET /hobbies/{id}
     * @tags Hobby
     * @summary Get hobby by id
     * @param {string} id.path - hobby id
     * @return {object} 200 - success response
     */
    this.router.get(`${this.path}/:id`, this.hobbiesController.getHobbyById);
    /**
     * POST /hobbies
     * @tags Hobby
     * @summary Create new hobby
     * @param {object} request.body.required
     * @return {object} 200 - success response
     * @example request - payload
     * {"name": "string","passionLevel":"High","year":"2017","user":"string"}
     */
    this.router.post(`${this.path}`, validationMiddleware(CreateHobbyDto, 'body'), this.hobbiesController.createHobby);
    /**
     * PATCH /hobbies/{id}
     * @tags Hobby
     * @summary Update hobby
     * @param {string} id.path - hobby id
     * @param {object} request.body.required
     * @return {object} 200 - success response
     * @example request - payload
     * {"name": "string","passionLevel":"High","year":"2017"}
     */
    this.router.patch(`${this.path}/:id`, validationMiddleware(CreateHobbyDto, 'body', true), this.hobbiesController.updateHobby);
    /**
     * DELETE /hobbies/{id}
     * @tags Hobby
     * @summary Update hobby
     * @param {string} id.path - hobby id
     * @return 200 - success response
     */
    this.router.delete(`${this.path}/:id`, this.hobbiesController.deleteHobby);
  }
}

export default HobbiesRoute;
