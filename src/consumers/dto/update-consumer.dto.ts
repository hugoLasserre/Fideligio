import { PartialType } from '@nestjs/mapped-types';
import { CreateConsumerDto } from './create-consumer.dto';
import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateConsumerDto extends PartialType(CreateConsumerDto) {
  @IsNumber()
  @Min(0)
  @ApiProperty({
    example: 1,
    required: false,
  })
  solde?: number;
}
