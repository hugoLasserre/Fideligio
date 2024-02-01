import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Developer } from './entities/developer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DevelopersService {
  constructor(
    @InjectRepository(Developer)
    private readonly developerRepository: Repository<Developer>,
  ) {}

  /**
   * Récupère le nouveau développeur envoyé pour lui générer sa clé d'API
   *
   * @param createDeveloperDto
   * @returns clé d'api
   */
  async create(createDeveloperDto: CreateDeveloperDto): Promise<Developer> {
    const { password, ...rest } = createDeveloperDto;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newDeveloper = this.developerRepository.create({
      ...rest,
      password: hashedPassword,
      status: 'on',
    });

    await this.developerRepository.save(newDeveloper);
    return newDeveloper;
  }

  /**
   *
   * @returns tableau de développeurs.
   */
  async findAll(): Promise<Developer[]> {
    return this.developerRepository.find({
      select: ['id', 'entreprise', 'notes'],
    });
  }

  async findOne(id: number): Promise<Developer> {
    const developer = await this.developerRepository.findOne({ where: { id } });

    if (!developer) {
      throw new NotFoundException(`Developer with ID ${id} not found`);
    }

    return developer;
  }

  async notFindByEntreprise(entreprise: string): Promise<Developer> {
    const developer = await this.developerRepository.findOneBy({
      entreprise: entreprise,
    });

    if (developer) {
      throw new NotFoundException(
        `Account with name ${entreprise} already exist`,
      );
    }

    return developer;
  }

  async findByEntreprise(entreprise: string): Promise<Developer> {
    const developer = await this.developerRepository.findOneBy({
      entreprise: entreprise,
    });

    if (!developer) {
      throw new NotFoundException(`Account with name ${entreprise} not exist`);
    }

    return developer;
  }

  async update(
    id: number,
    updateDeveloperDto: UpdateDeveloperDto,
  ): Promise<Developer> {
    const developer = await this.developerRepository.findOne({ where: { id } });

    if (!developer) {
      throw new NotFoundException(`Developer with ID ${id} not found`);
    }

    Object.assign(developer, updateDeveloperDto);

    return await this.developerRepository.save(developer);
  }

  async remove(id: number): Promise<void> {
    const developer = await this.developerRepository.findOne({ where: { id } });

    if (!developer) {
      throw new NotFoundException(`Developer with ID ${id} not found`);
    }

    await this.developerRepository.remove(developer);
  }
}
