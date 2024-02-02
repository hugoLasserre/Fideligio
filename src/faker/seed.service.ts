import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumer } from 'src/consumers/entities/consumer.entity';
import { faker } from '@faker-js/faker';
import { Developer } from 'src/developers/entities/developer.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Consumer)
    private readonly consumerRepository: Repository<Consumer>,
    @InjectRepository(Developer)
    private readonly developerRepository: Repository<Developer>,
  ) {}

  async seed() {
    await this.seedConsumer(10);
    await this.seedDeveloper(10);
  }

  /**
   * Génère des fausses données pour les consumers
   *
   * @param count
   * @returns Tab of new consumers
   */
  async seedConsumer(count: number) {
    const consumers = Array(count).map(() => ({
      email: faker.internet.email(),
      password: faker.internet.password({ length: 10 }),
      solde: faker.number.int({ min: 0, max: 10000 }),
    }));
    const createdConsumers = [];

    for (const consumerData of consumers) {
      const newConsumer = this.consumerRepository.create(consumerData);
      createdConsumers.push(newConsumer);
    }

    return createdConsumers;
  }

  /**
   * Génère des fausses données pour les développeurs
   *
   * @param count
   * @returns Tab of new developers
   */
  async seedDeveloper(count: number) {
    const developers = Array(count).map(() => ({
      company: faker.company.name(),
      password: faker.internet.password({ length: 10 }),
      notes: faker.word.words({ count: { min: 3, max: 10 } }),
    }));
    const createdDevelopers = [];

    for (const developerData of developers) {
      const newDeveloper = this.developerRepository.create(developerData);
      createdDevelopers.push(newDeveloper);
    }

    return createdDevelopers;
  }
}
