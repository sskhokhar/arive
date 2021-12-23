import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
userSchema.virtual('hobbies', {
  ref: 'Hobby',
  localField: '_id',
  foreignField: 'user',
});
const UserModel = model<User & Document>('User', userSchema);

export default UserModel;
