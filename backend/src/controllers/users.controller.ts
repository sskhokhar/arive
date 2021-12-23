import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@/dtos/create-user.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';
import { Hobby } from '../interfaces/hobbies.interface';

class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const populateQuery = req.query.populate || '';
      const findAllUsersData: User[] = await this.userService.findAllUser(populateQuery as string);

      res.status(200).json(findAllUsersData);
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const populateQuery = req.query.populate || '';
      const findOneUserData: User = await this.userService.findUserById(userId, populateQuery as string);

      res.status(200).json(findOneUserData);
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(200).json(createUserData);
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.status(200).json(updateUserData);
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      await this.userService.deleteUser(userId);

      res.status(200).end();
    } catch (error) {
      next(error);
    }
  };

  public getUserHobbies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findAllUserHobbiesData: Hobby[] = await this.userService.findAllUserHobbies(userId);

      res.status(200).json(findAllUserHobbiesData);
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
