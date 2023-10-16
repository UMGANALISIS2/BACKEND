import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CakeModule } from './modules/cake/cake.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      expandVariables: true,
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(cfg: ConfigService) => ({
        uri: cfg.get<string>("MONGODB_URI")
      }),
      inject: [ConfigService]
    }),
    CakeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
