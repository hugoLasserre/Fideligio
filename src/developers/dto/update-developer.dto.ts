import { PartialType } from '@nestjs/mapped-types';
import { CreateDeveloperDto } from './create-developer.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeveloperDto extends PartialType(CreateDeveloperDto) {
  @IsString({ message: 'cle api has to be a string' })
  @ApiProperty({
    example: 'yrctuvyibuonip,opnibu',
    required: false,
  })
  cleAPI?: string;

  @IsString({ message: 'status has to be a string' })
  @ApiProperty({
    example: 'Active',
    required: false,
  })
  status?: string;

  @IsString({ message: 'notes has to be a string' })
  @ApiProperty({
    example: 'Informations',
    required: false,
  })
  notes?: string;
}
