import { Hobby } from '@interfaces/hobbies.interface';

export interface User {
  _id: string;
  name: string;
  hobbies: Hobby[];
}
