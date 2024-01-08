import { PartialType } from '@nestjs/mapped-types';
import { CreateDeveloperDto } from './create-developer.dto';
import { IsString } from 'class-validator';

export class UpdateDeveloperDto extends PartialType(CreateDeveloperDto) {

  @IsString()
  cleAPI: string;

  @IsString()
  entreprise: string;

  @IsString()
  status?: string;

  @IsString()
  notes?: string;
}
