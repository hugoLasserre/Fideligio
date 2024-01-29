import { PartialType } from '@nestjs/mapped-types';
import { CreateDeveloperDto } from './create-developer.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeveloperDto extends PartialType(CreateDeveloperDto) {

  @IsString()
  @ApiProperty({
    example: 'yrctuvyibuonip,opnibu',
    required: true
  })
  cleAPI: string;

  @IsString()
  @ApiProperty({
    example: 'Apple',
    required: true
  })
  entreprise: string;

  @IsString()
  @ApiProperty({
    example: 'Active',
    required: true
  })
  status?: string;

  @IsString()
  @ApiProperty({
    example: 'Informations',
    required: true
  })
  notes?: string;
}
