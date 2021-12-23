import { Hobby } from './hobby.interface';

export interface User {
  _id: string;
  name: string;
  hobbies?: Hobby[];
}
