import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeveloperDto {

  @IsNotEmpty()
  @IsString()
  entreprise: string;

  @IsString()
  notes?: string;
}
