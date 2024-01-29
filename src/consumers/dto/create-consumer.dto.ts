import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateConsumerDto {
  
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @IsString()
    password?: string;
  
    @IsNumber()
    solde: number;
}
