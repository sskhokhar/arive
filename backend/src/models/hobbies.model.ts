import { model, Schema, Document } from 'mongoose';
import { Hobby } from '@interfaces/hobbies.interface';
import { PassionLevel } from '@enums/passion-level.enum';
const hobbySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  passionLevel: {
    type: String,
    enum: PassionLevel,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const hobbyModel = model<Hobby & Document>('Hobby', hobbySchema);

export default hobbyModel;
