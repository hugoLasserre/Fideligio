import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Developer } from './entities/developer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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
  async create(createDeveloperDto: CreateDeveloperDto): Promise<string> {
    const newDeveloper = this.developerRepository.create(createDeveloperDto);
    newDeveloper.status = "on";
    newDeveloper.cleAPI = this.generateApiKey();
    this.developerRepository.save(newDeveloper)
    return newDeveloper.cleAPI;
  }

  /**
   * Génère la clé d'API unique.
   * 
   * @returns chaine de caractères unique.
   */
  private generateApiKey(): string {
    return uuidv4();
  }

  /**
   * 
   * @returns tableau de développeurs.
   */
  async findAll(): Promise<Developer[]> {
    return this.developerRepository.find();
  }

  async findOne(id: number): Promise<Developer> {
    const developer = await this.developerRepository.findOne({ where: { id } });

    if (!developer) {
      throw new NotFoundException(`Developer with ID ${id} not found`);
    }

    return developer;
  }

  async update(id: number, updateDeveloperDto: UpdateDeveloperDto): Promise<Developer> {
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