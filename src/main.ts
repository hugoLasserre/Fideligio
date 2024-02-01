import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { SeedService } from './developers/seed.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Fideligio')
    .setDescription('The Fideligio API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Fideligio')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document)

  if (process.env.SEED === 'true') {
    const seedService = app.get(SeedService)
    console.log('Seeding...')
    await seedService.seed()
    console.log('Seeding done.')
  }

  await app.listen(3000)
}
bootstrap()
