import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeveloperDto {
  @IsNotEmpty({ message: "entreprise can't be empty" })
  @IsString({ message: 'entreprise has to be a string' })
  @ApiProperty({
    example: 'Apple',
    required: true,
  })
  entreprise: string;

  @IsNotEmpty({ message: "password can't be empty" })
  @IsString({ message: 'password has to be a string' })
  @ApiProperty({
    example: '123456',
    required: true,
  })
  password: string;

  @IsString({ message: 'notes has to be a string' })
  @ApiProperty({
    example: 'Informations',
    required: false,
  })
  notes?: string;
}
