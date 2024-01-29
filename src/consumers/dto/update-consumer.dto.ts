import { PartialType } from '@nestjs/mapped-types';
import { CreateConsumerDto } from './create-consumer.dto';
import { IsString, IsNumber } from 'class-validator';

export class UpdateConsumerDto extends PartialType(CreateConsumerDto) {

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  solde: number;
}
