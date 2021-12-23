import { IsDefined, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @IsDefined()
  name: string;
}
