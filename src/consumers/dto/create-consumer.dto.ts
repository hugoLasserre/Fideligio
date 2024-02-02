import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateConsumerDto {
  @IsNotEmpty({ message: "email can't be empty" })
  @IsString({ message: 'email has to be a string' })
  @IsEmail()
  @ApiProperty({
    example: 'test.test@test.com',
    required: true,
  })
  email: string;

  @IsString({ message: 'password has to be a string' })
  @ApiProperty({
    example: '123456',
    required: true,
  })
  password: string;
}
