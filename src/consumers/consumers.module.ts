import { Module } from '@nestjs/common';
import { ConsumersService } from './consumers.service';
import { ConsumersController } from './consumers.controller';
import { Consumer } from './entities/consumer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Consumer]),
  ],
  controllers: [ConsumersController],
  providers: [ConsumersService],
})
export class ConsumersModule {}
