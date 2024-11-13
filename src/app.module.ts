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
import { SharedModule } from './shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { GoalModule } from './modules/goal/goal.module';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { WorkoutModule } from './modules/workout/workout.module';
import { CategoryModule } from './modules/category/category.module';
import { LogWorkoutModule } from './modules/log-workout/log-workout.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
      cache: true,
      expandVariables: true,
    }),
    StripeModule,
    // MongooseModule.forRoot('mongodb+srv://fitnesscn4:Gjz82Uo5yl9xQ8Sm@cluster0.uo4lp.mongodb.net/fitnesscn4'),

    DatabaseModule,
    // RedisCloudModule,
    SharedModule,
    AuthModule,
    UserModule,
    GoalModule,
    ExerciseModule,
    WorkoutModule,
    CategoryModule,
    LogWorkoutModule,
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
