import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Import the ConfigModule from the correct module
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseModule } from './db/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { RedisCloudModule } from './shared/configs/cache.config';
import { GlobalException } from './shared/exceptions/global.exception';
import { LoggingMiddleware } from './shared/middlewares/logging.middleware';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
      cache: true,
      expandVariables: true,
    }),
    StripeModule,
    DatabaseModule,
    // RedisCloudModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalException,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
