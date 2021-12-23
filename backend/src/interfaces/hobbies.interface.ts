import { PassionLevel } from '@enums/passion-level.enum';

export interface Hobby {
  _id: string;
  passionLevel: PassionLevel;
  name: string;
  year: string;
}
