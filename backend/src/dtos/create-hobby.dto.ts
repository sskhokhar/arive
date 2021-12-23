import { IsDefined, IsEnum, IsString } from 'class-validator';
import { PassionLevel } from '@enums/passion-level.enum';

export class CreateHobbyDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsDefined()
  year: string;

  @IsString()
  @IsDefined()
  @IsEnum(PassionLevel)
  passionLevel: PassionLevel;

  @IsString()
  @IsDefined()
  user: string;
}
