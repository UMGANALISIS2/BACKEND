import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CakeModule } from './modules/cake/cake.module';
import { FamilyModule } from './modules/family/family.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from './modules/family/family.schema';
import { Cake } from './modules/cake/cake.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      expandVariables: true,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'DESKTOP-TQFKEQ3',
      port: 1433,
      username: 'analisis2',
      password: 'admin123',
      database: 'ANALISIS2',
      autoLoadEntities: true,
      logger: "advanced-console",
      entities: [
        Family,
        Cake
      ],
      options: {
          encrypt: false,
          trustServerCertificate: true,
          instanceName: 'DESARROLLOWEBUMG'
      }
  }),
    CakeModule,
    FamilyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
