import { Module } from '@nestjs/common';
import { ConsumersService } from './consumers.service';
import { ConsumersController } from './consumers.controller';

@Module({
  controllers: [ConsumersController],
  providers: [ConsumersService],
})
export class ConsumersModule {}
