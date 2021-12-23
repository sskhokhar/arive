import { CreateHobbyDto } from '@/dtos/create-hobby.dto';
import { HttpException } from '@exceptions/HttpException';
import { Hobby } from '@interfaces/hobbies.interface';
import HobbyModel from '@models/hobbies.model';
import { isEmpty, isObjectId } from '@utils/util';

class HobbyService {
  public hobbyModel = HobbyModel;

  public async findAllHobbies(): Promise<Hobby[]> {
    const hobbies: Hobby[] = await this.hobbyModel.find();
    return hobbies;
  }

  public async findHobbyById(hobbyId: string): Promise<Hobby> {
    if (isEmpty(hobbyId)) throw new HttpException(400, 'Invalid hobby id');
    if (!isObjectId(hobbyId)) throw new HttpException(400, 'Invalid hobby id');
    const findHobby: Hobby = await this.hobbyModel.findOne({ _id: hobbyId });
    if (!findHobby) throw new HttpException(400, 'Invalid hobby id');

    return findHobby;
  }

  public async createHobby(hobbyData: CreateHobbyDto): Promise<Hobby> {
    if (!isObjectId(hobbyData.user)) throw new HttpException(400, 'Invalid user id');
    const createHobbyData: Hobby = await this.hobbyModel.create(hobbyData);

    return createHobbyData;
  }

  public async updateHobby(hobbyId: string, { user, ...hobbyData }: CreateHobbyDto): Promise<Hobby> {
    if (!isObjectId(hobbyId)) throw new HttpException(400, 'Invalid hobby id');
    const updateHobbyById: Hobby = await this.hobbyModel.findOneAndUpdate(
      {
        _id: hobbyId,
      },
      hobbyData,
      { new: true },
    );
    if (!updateHobbyById) throw new HttpException(400, 'Invalid hobby id');

    return updateHobbyById;
  }

  public async deleteHobby(hobbyId: string): Promise<Hobby> {
    if (!isObjectId(hobbyId)) throw new HttpException(400, 'Invalid hobby id');
    const deleteHobbyById: Hobby = await this.hobbyModel.findByIdAndDelete(hobbyId);
    if (!deleteHobbyById) throw new HttpException(400, 'Invalid hobby id');

    return deleteHobbyById;
  }
}

export default HobbyService;
