import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateDeveloperDto } from './dto/create-developer.dto'
import { UpdateDeveloperDto } from './dto/update-developer.dto'
import { Developer } from './entities/developer.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Consumer } from 'src/consumers/entities/consumer.entity'

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Consumer)
    private readonly consumerRepository: Repository<Consumer>,
  ) {}

  async seed() {
    await this.seedConsumer(10)
  }

  async seedConsumer(count: number) {
    const consumers = Array(count).map(() => ({
      company: faker.company.name(),
      password: faker.internet.password({ length: 10 }),

      email: faker.internet.email(),
      cleAPI: faker.string.hexadecimal({ length: 10 }),
      status: faker.helpers.arrayElement(['active', 'inactive']),
      notes: faker.word.words({ count: { min: 3, max: 10 } }),
    }))
    return this.consumerRepository.create(consumers)
  }
}
