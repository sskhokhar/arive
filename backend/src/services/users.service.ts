import { CreateUserDto } from '@/dtos/create-user.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import UserModel from '@models/users.model';
import { isEmpty, isObjectId } from '@utils/util';
import { Hobby } from '../interfaces/hobbies.interface';

class UserService {
  public userModel = UserModel;

  public async findAllUser(populate = ''): Promise<User[]> {
    const q = this.userModel.find();

    populate.split(',').forEach(rel => q.populate(rel));
    const users: User[] = await q.exec();

    return users;
  }

  public async findUserById(userId: string, populate = ''): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'Invalid user id');
    if (!isObjectId(userId)) throw new HttpException(400, 'Invalid user id');

    const q = this.userModel.findOne({ _id: userId });
    populate.split(',').forEach(rel => q.populate(rel));
    const findUser: User = await q.exec();

    if (!findUser) throw new HttpException(400, 'Invalid user id');

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    const createUserData: User = await this.userModel.create(userData);

    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (!isObjectId(userId)) throw new HttpException(400, 'Invalid user id');
    const updateUserById: User = await this.userModel.findOneAndUpdate(
      {
        _id: userId,
      },
      userData,
      { new: true },
    );
    if (!updateUserById) throw new HttpException(400, 'Invalid user id');

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    if (!isObjectId(userId)) throw new HttpException(400, 'Invalid user id');
    const deleteUserById: User = await this.userModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(400, 'Invalid user id');

    return deleteUserById;
  }
  public async findAllUserHobbies(userId: string): Promise<Hobby[]> {
    if (!isObjectId(userId)) throw new HttpException(400, 'Invalid user id');

    const user: User = await this.userModel.findById(userId).populate('hobbies');
    if (!user) throw new HttpException(400, 'Invalid user id');

    return user.hobbies;
  }
}

export default UserService;
