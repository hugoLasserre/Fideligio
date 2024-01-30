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

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '123456',
    required: true
  })
  password: string;
}
