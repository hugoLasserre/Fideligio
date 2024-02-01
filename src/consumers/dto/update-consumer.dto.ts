import { PartialType } from '@nestjs/mapped-types';
import { CreateConsumerDto } from './create-consumer.dto';
import { IsString, IsNumber, IsEmail, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateConsumerDto extends PartialType(CreateConsumerDto) {

  @IsString({ message: "email has to be a string" })
  @IsEmail()
  @ApiProperty({
    example: 'test.test@test.com',
    required: false
  })
  email?: string;

  @IsString({ message: "password has to be a string" })
  @ApiProperty({
    example: '123456',
    required: false
  })
  password?: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    example: 1,
    required: false
  })
  solde?: number;
}
