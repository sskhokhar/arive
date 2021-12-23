import { NextFunction, Request, Response } from 'express';
import { CreateHobbyDto } from '@/dtos/create-hobby.dto';
import { Hobby } from '@interfaces/hobbies.interface';
import HobbyService from '@services/hobbies.service';

class HobbiesController {
  public hobbyService = new HobbyService();

  public getHobbies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllHobbysData: Hobby[] = await this.hobbyService.findAllHobbies();

      res.status(200).json(findAllHobbysData);
    } catch (error) {
      next(error);
    }
  };

  public getHobbyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hobbyId: string = req.params.id;
      const findOneHobbyData: Hobby = await this.hobbyService.findHobbyById(hobbyId);

      res.status(200).json(findOneHobbyData);
    } catch (error) {
      next(error);
    }
  };

  public createHobby = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hobbyData: CreateHobbyDto = req.body;
      const createHobbyData: Hobby = await this.hobbyService.createHobby(hobbyData);

      res.status(201).json(createHobbyData);
    } catch (error) {
      next(error);
    }
  };

  public updateHobby = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hobbyId: string = req.params.id;
      const hobbyData: CreateHobbyDto = req.body;
      const updateHobbyData: Hobby = await this.hobbyService.updateHobby(hobbyId, hobbyData);

      res.status(200).json(updateHobbyData);
    } catch (error) {
      next(error);
    }
  };

  public deleteHobby = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hobbyId: string = req.params.id;
      await this.hobbyService.deleteHobby(hobbyId);

      res.status(200).end();
    } catch (error) {
      next(error);
    }
  };
}

export default HobbiesController;
