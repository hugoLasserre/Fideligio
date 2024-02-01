import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DevelopersService } from 'src/developers/developers.service';
import { CreateDeveloperDto } from 'src/developers/dto/create-developer.dto';
import { UpdateDeveloperDto } from 'src/developers/dto/update-developer.dto';

@Injectable()
export class AuthService {
  constructor(
    private developerService: DevelopersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Vérifie que l'entreprise n'existe pas
   * Génère un token temporaire
   *
   * @param entreprise
   * @returns access_token
   */
  async signUp(
    entreprise: CreateDeveloperDto,
  ): Promise<{ access_token: string }> {
    // Vérifie si un développeur avec le même nom d'entreprise existe déjà
    const user = await this.developerService.notFindByEntreprise(
      entreprise.entreprise,
    );

    // Si le développeur existe déjà, lance une exception ConflictException
    // (code HTTP 409 - Conflict)
    if (user) {
      throw new Error('The company already exist');
    }

    const regiteredUser = await this.developerService.create(entreprise);

    // Crée le payload pour le token JWT avec l'ID et le nom d'entreprise du développeur
    const payload = {
      sub: regiteredUser.id,
      username: regiteredUser.entreprise,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  /**
   * Génère un token sur 10 ans
   *
   * @param username
   * @returns access_token
   */
  async generateApiKey(username: string): Promise<{ access_token: string }> {
    // Recherche d'un développeur dans la base de données par le nom d'entreprise
    const user = await this.developerService.findByEntreprise(username);

    // Si aucun développeur n'est trouvé, lance une exception NotFoundException
    if (!user) {
      throw new Error('The company not found');
    }

    // Crée le payload pour le token JWT avec l'ID et le nom d'entreprise du développeur
    const payload = { sub: user.id, username: user.entreprise };

    // Génère un token JWT avec une expiration de 10 ans (3650 jours)
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '3650d',
    });

    // Met à jour la clé API du développeur avec le nouveau token généré
    const updateDeveloperDto: UpdateDeveloperDto = new UpdateDeveloperDto();
    updateDeveloperDto.cleAPI = access_token;
    await this.developerService.update(user.id, updateDeveloperDto);

    return {
      access_token: access_token,
    };
  }
}
