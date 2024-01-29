import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeveloperDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Apple',
    required: true
  })
  entreprise: string;

  @IsString()
  @ApiProperty({
    example: 'Informations',
    required: false
  })
  notes?: string;
}
