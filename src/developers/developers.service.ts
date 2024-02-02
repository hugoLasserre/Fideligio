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
    // Extraction du mot de passe et du reste des données du DTO
    const { password, ...rest } = createDeveloperDto;

    const saltRounds = 10;
    // Hachage du mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Création d'une nouvelle instance de développeur avec le mot de passe haché
    const newDeveloper = this.developerRepository.create({
      ...rest,
      password: hashedPassword, // Assignation du mot de passe haché à l'instance
      status: 'on', // Définition du statut par défaut
    });

    // Sauvegarde du nouvel utilisateur dans la base de données
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
    // Recherche d'un développeur dans la base de données par son ID
    const developer = await this.developerRepository.findOne({
      select: ['id', 'entreprise', 'notes'],
      where: { id },
    });

    // Si aucun développeur n'est trouvé, lance une exception NotFoundException
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
    // Recherche d'un développeur dans la base de données avec le même nom d'entreprise
    const developer = await this.developerRepository.findOne({
      where: { entreprise: entreprise },
    });

    // Si un développeur avec le même nom d'entreprise est trouvé, lance une exception NotFoundException
    if (developer) {
      throw new NotFoundException(
        `Account with name ${entreprise} already exists`,
      );
    }

    return developer;
  }

  /**
   * Vérifie que l'entreprise n'a pas déjà un compte à son nom
   *
   * @param entreprise
   * @returns Developer
   */
  async findByEntrepriseAndPassword(
    entreprise: string,
    password: string,
  ): Promise<string> {
    // Recherche d'un développeur dans la base de données avec le même nom d'entreprise et mot de passe
    const developer = await this.developerRepository.findOne({
      where: { entreprise: entreprise },
    });

    // Si le username ou la mot de passe n'existe pas
    if (!developer) {
      throw new NotFoundException(`Username or password incorrect`);
    }

    // Vérifiez si le mot de passe fourni correspond au mot de passe haché stocké
    const passwordMatch = await bcrypt.compare(password, developer.password);

    // Si passwordMatch est true, cela signifie que les mots de passe correspondent
    if (!passwordMatch) {
      // Le mot de passe fourni est incorrect
      throw new NotFoundException(`Incorrect password`);
    }

    return developer.cleAPI;
  }

  /**
   * Récupère le développeur grâce au nom de son entreprise
   *
   * @param entreprise
   * @returns Developer
   */
  async findByEntreprise(entreprise: string): Promise<Developer> {
    // Recherche d'un développeur dans la base de données avec le nom d'entreprise spécifié
    const developer = await this.developerRepository.findOne({
      where: { entreprise: entreprise },
    });

    // Si aucun développeur n'est trouvé, lance une exception NotFoundException
    if (!developer) {
      throw new NotFoundException(
        `Account with name ${entreprise} does not exist`,
      );
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
    // Recherche d'un développeur dans la base de données par son ID
    const developer = await this.developerRepository.findOne({ where: { id } });

    // Si aucun développeur n'est trouvé, lance une exception NotFoundException
    if (!developer) {
      throw new NotFoundException(`Developer with ID ${id} not found`);
    }

    // Itère sur les propriétés du DTO de mise à jour
    for (const key in updateDeveloperDto) {
      // Vérifie si la propriété est définie (non nulle)
      if (updateDeveloperDto[key] !== undefined) {
        // Met à jour la propriété du développeur avec la valeur du DTO
        developer[key] = updateDeveloperDto[key];
      }
    }

    Object.assign(developer, updateDeveloperDto);

    // Sauvegarde les modifications dans la base de données
    return await this.developerRepository.save(developer);
  }

  /**
   * Supprime le développeur grâce à son id
   *
   * @param id
   */
  async remove(id: number): Promise<void> {
    // Recherche d'un développeur dans la base de données par son ID
    const developer = await this.developerRepository.findOne({ where: { id } });

    // Si aucun développeur n'est trouvé, lance une exception NotFoundException
    if (!developer) {
      throw new NotFoundException(`Developer with ID ${id} not found`);
    }

    // Supprime le développeur de la base de données
    try {
      await this.developerRepository.delete(developer.id);
    } catch (e) {
      throw new Error(`Impossible to delete the developer with id ${id}`);
    }
  }
}
