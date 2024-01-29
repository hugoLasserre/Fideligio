import { PartialType } from '@nestjs/mapped-types';
import { CreateConsumerDto } from './create-consumer.dto';
import { IsString, IsNumber, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateConsumerDto extends PartialType(CreateConsumerDto) {

  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'test.test@test.com',
    required: true
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: '123456',
    required: true
  })
  password: string;

  @IsNumber()
  @ApiProperty({
    example: 1,
    required: false
  })
  solde: number;
}
