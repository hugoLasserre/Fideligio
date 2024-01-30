import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UpdateConsumerDto } from 'src/consumers/dto/update-consumer.dto';
import { DevelopersService } from 'src/developers/developers.service';
import { CreateDeveloperDto } from 'src/developers/dto/create-developer.dto';
import { UpdateDeveloperDto } from 'src/developers/dto/update-developer.dto';

@Injectable()
export class AuthService {
  constructor(
    private developerService: DevelopersService,
    private jwtService: JwtService
  ) {}

  async signUp(
    entreprise: CreateDeveloperDto
  ): Promise<{ access_token: string }> {
    const user = await this.developerService.notFindByEntreprise(entreprise.entreprise);

    if (user) {
        throw new Error("The company already exist");
    }

    const regiteredUser = await this.developerService.create(entreprise);

    const payload = { sub: regiteredUser.id, username: regiteredUser.entreprise };

    return {
        access_token: await this.jwtService.signAsync(payload),
    };
  }
  
  async generateApiKey(username: string): Promise<{ access_token: string }> {
    const user = await this.developerService.findByEntreprise(username);

    if (!user) {
        throw new Error("The company not found");
    }

    const payload = { sub: user.id, username: user.entreprise };

    const access_token = await this.jwtService.signAsync(payload, { expiresIn: '3650d' }); //Valable 10 ans

    const updateDeveloperDto: UpdateDeveloperDto = new UpdateDeveloperDto;
    updateDeveloperDto.cleAPI = access_token;
    await this.developerService.update(user.id, updateDeveloperDto);

    return {
        access_token: access_token
    }
  }
}