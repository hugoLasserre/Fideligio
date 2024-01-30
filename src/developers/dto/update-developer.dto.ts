import { PartialType } from '@nestjs/mapped-types';
import { CreateDeveloperDto } from './create-developer.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeveloperDto extends PartialType(CreateDeveloperDto) {

  @IsString()
  @ApiProperty({
    example: 'yrctuvyibuonip,opnibu',
    required: false
  })
  cleAPI?: string;

  @IsString()
  @ApiProperty({
    example: 'Apple',
    required: false
  })
  entreprise?: string;

  @IsString()
  @ApiProperty({
    example: '123456',
    required: false
  })
  password?: string;

  @IsString()
  @ApiProperty({
    example: 'Active',
    required: false
  })
  status?: string;

  @IsString()
  @ApiProperty({
    example: 'Informations',
    required: false
  })
  notes?: string;
}
