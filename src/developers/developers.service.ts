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
   * Hash le password
   *
   * @param createDeveloperDto
   * @returns Developer
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
   * Récupère tous les développeurs
   *
   * @returns Liste de Developer
   */
  async findAll(): Promise<Developer[]> {
    return this.developerRepository.find({
      select: ['id', 'entreprise', 'notes'],
    });
  }

  /**
   * Récupère un développeur grâce à son id
   *
   * @param id
   * @returns Developer
   */
  async findOne(id: number): Promise<Developer> {
    const developer = await this.developerRepository.findOne({ where: { id } });

    if (!developer) {
      throw new NotFoundException(`Developer with ID ${id} not found`);
    }

    return developer;
  }

  /**
   * Vérifie que l'entreprise n'a pas déjà un compte à son nom
   *
   * @param entreprise
   * @returns Developer
   */
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

  /**
   * Récupère le développeur grâce au nom de son entreprise
   *
   * @param entreprise
   * @returns Developer
   */
  async findByEntreprise(entreprise: string): Promise<Developer> {
    const developer = await this.developerRepository.findOneBy({
      entreprise: entreprise,
    });

    if (!developer) {
      throw new NotFoundException(`Account with name ${entreprise} not exist`);
    }

    return developer;
  }

  /**
   * Met à jour un développeur grâce à son id
   *
   * @param id
   * @param updateDeveloperDto
   * @returns Developer
   */
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

  /**
   * Supprime le développeur grâce à son id
   *
   * @param id
   */
  async remove(id: number): Promise<void> {
    const developer = await this.developerRepository.findOne({ where: { id } });

    if (!developer) {
      throw new NotFoundException(`Developer with ID ${id} not found`);
    }

    await this.developerRepository.remove(developer);
  }
}
