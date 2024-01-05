import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumersModule } from './consumers/consumers.module';
import { DevelopersModule } from './developers/developers.module';
import { dataSourceOptions } from 'db/data-source';
import { RedisOptions } from 'ioredis';
import * as redisStore from 'cache-manager-ioredis';
import { CacheModule } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

export type CacheIORedis = Cache<ReturnType<typeof redisStore.create>>;

@Module({
  imports: [
    CacheModule.register<RedisOptions>({
      isGlobal: true,
      store: redisStore,

      // Store-specific configuration:
      host: 'localhost',
      port: 6379,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ConsumersModule,
    DevelopersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
