import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumersModule } from './consumers/consumers.module';
import { DevelopersModule } from './developers/developers.module';
import { dataSourceOptions } from 'db/data-source';
import { RedisOptions } from 'ioredis';
import * as redisStore from 'cache-manager-ioredis';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

export type CacheIORedis = Cache<ReturnType<typeof redisStore.create>>;

@Module({
  imports: [
    CacheModule.register<RedisOptions>({
      isGlobal: true,
      store: redisStore,
      host: 'redis',
      port: 6379,
      ttl: 3600, // seconds
      max: 10, // maximum number of items in cache
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ConsumersModule,
    DevelopersModule,
    AuthModule,
    ThrottlerModule.forRoot([
      {
        ttl: 1000,
        limit: 50,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
