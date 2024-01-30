import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateConsumerDto {
  
    @IsNotEmpty()
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
    solde?: number;
}
