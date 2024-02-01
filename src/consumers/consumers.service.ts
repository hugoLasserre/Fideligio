import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsumerDto } from './dto/create-consumer.dto';
import { UpdateConsumerDto } from './dto/update-consumer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumer } from './entities/consumer.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ConsumersService {
  constructor(
    @InjectRepository(Consumer)
    private readonly consumerRepository: Repository<Consumer>,
  ) {}

  /**
   * Créé un client
   *
   * @param createConsumerDto
   * @returns createConsumerDto
   */
  async create(createConsumerDto: CreateConsumerDto): Promise<Consumer> {
    const { password, ...rest } = createConsumerDto;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newConsumer = this.consumerRepository.create({
      ...rest,
      password: hashedPassword,
      solde: 0,
    });

    return this.consumerRepository.save(newConsumer);
  }

  /**
   * Récupère tous les clients
   *
   * @returns Liste de clients
   */
  findAll() {
    const listConsumers = this.consumerRepository.find({
      select: ['id', 'email', 'solde'],
    });
    return listConsumers;
  }

  /**
   * Récupère un client grâce à son id
   *
   * @param id
   * @returns Consumer
   */
  async findOne(id: number) {
    const consumer = await this.consumerRepository.findOne({ where: { id } });

    if (!consumer) {
      throw new NotFoundException(`Consumer with ID ${id} not found`);
    }

    return consumer;
  }

  /**
   * Met à jour un client grâce à son id
   *
   * @param id
   * @param updateConsumerDto
   * @returns Consumer
   */
  async update(id: number, updateConsumerDto: UpdateConsumerDto) {
    const consumer = await this.consumerRepository.findOne({ where: { id } });

    if (!consumer) {
      throw new NotFoundException(`Consumer with ID ${id} not found`);
    }

    Object.assign(consumer, updateConsumerDto);

    return await this.consumerRepository.save(consumer);
  }

  /**
   * Supprime un client grâce à son id
   *
   * @param id
   */
  async remove(id: number) {
    const consumer = await this.consumerRepository.findOne({ where: { id } });

    if (!consumer) {
      throw new NotFoundException(`Consumer with ID ${id} not found`);
    }

    await this.consumerRepository.remove(consumer);
  }
}
