import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsumerDto } from './dto/create-consumer.dto';
import { UpdateConsumerDto } from './dto/update-consumer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumer } from './entities/consumer.entity';

@Injectable()
export class ConsumersService {
  constructor(
    @InjectRepository(Consumer)
    private readonly consumerRepository: Repository<Consumer>,
  ) {}

  create(createConsumerDto: CreateConsumerDto) {
    const newConsumer = this.consumerRepository.create(createConsumerDto);
    newConsumer.solde = 0;
    return this.consumerRepository.save(newConsumer);
  }

  findAll() {
    const listConsumers = this.consumerRepository.find({
      select: ['id', 'email', 'solde'],
    });
    return listConsumers;
  }

  async findOne(id: number) {
    const consumer = await this.consumerRepository.findOne({ where: { id } });

    if (!consumer) {
      throw new NotFoundException(`Consumer with ID ${id} not found`);
    }

    return consumer;
  }

  async update(id: number, updateConsumerDto: UpdateConsumerDto) {
    const consumer = await this.consumerRepository.findOne({ where: { id } });

    if (!consumer) {
      throw new NotFoundException(`Consumer with ID ${id} not found`);
    }

    Object.assign(consumer, updateConsumerDto);

    return await this.consumerRepository.save(consumer);
  }

  async remove(id: number) {
    const consumer = await this.consumerRepository.findOne({ where: { id } });

    if (!consumer) {
      throw new NotFoundException(`Consumer with ID ${id} not found`);
    }

    await this.consumerRepository.remove(consumer);
  }
}
