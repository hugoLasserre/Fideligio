import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Developer } from 'src/developers/entities/developer.entity';
import { CreateDeveloperDto } from 'src/developers/dto/create-developer.dto';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   *
   * @param developer
   * @returns access_token
   */
  @Throttle({ limit: 1, ttl: 3000 })
  @Post('signup')
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiBody({
    type: CreateDeveloperDto,
    description: 'Json structure for developer object',
  })
  signIn(@Body() developer: Developer) {
    return this.authService.signUp(developer);
  }

  /**
   *
   * @param req
   * @returns access_token
   */
  @UseGuards(AuthGuard)
  @Patch('generateApiKey')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  generateApiKey(@Request() req) {
    return this.authService.generateApiKey(req.user.username);
  }
}
