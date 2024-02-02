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
    // Extraction du mot de passe du reste des données du DTO
    const { password, ...rest } = createConsumerDto;

    // Génération du hachage du mot de passe avec bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Création d'une nouvelle instance de Consumer avec le mot de passe haché et solde initial
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
  async findAll() {
    const listConsumers = await this.consumerRepository.find({
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
    // Recherche d'un consommateur dans la base de données par son ID
    const consumer = await this.consumerRepository.findOne({
      select: ['id', 'email', 'solde'],
      where: { id },
    });

    // Si aucun consommateur n'est trouvé, lance une exception NotFoundException
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
    // Recherche d'un consommateur dans la base de données par son ID
    const consumer = await this.consumerRepository.findOne({ where: { id } });

    // Si aucun consommateur n'est trouvé, lance une exception NotFoundException
    if (!consumer) {
      throw new NotFoundException(`Consumer with ID ${id} not found`);
    }

    // Itère sur les propriétés du DTO de mise à jour
    for (const key in updateConsumerDto) {
      // Vérifie si la propriété est définie (non nulle)
      if (updateConsumerDto[key] !== undefined) {
        // Met à jour la propriété du consommateur avec la valeur du DTO
        consumer[key] = updateConsumerDto[key];
      }
    }

    Object.assign(consumer, updateConsumerDto);

    // Enregistre les modifications dans la base de données
    return await this.consumerRepository.save(consumer);
  }

  /**
   * Supprime un client grâce à son id
   *
   * @param id
   */
  async remove(id: number) {
    // Recherche d'un consommateur dans la base de données par son ID
    const consumer = await this.consumerRepository.findOne({ where: { id } });

    // Si aucun consommateur n'est trouvé, lance une exception NotFoundException
    if (!consumer) {
      throw new NotFoundException(`Consumer with ID ${id} not found`);
    }

    // Supprime le consommateur de la base de données
    try {
      await this.consumerRepository.delete(consumer.id);
    } catch (e) {
      throw new Error(`Impossible to delete consumer with id ${id}`);
    }
  }
}
