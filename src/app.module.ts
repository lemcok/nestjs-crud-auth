import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm"

import { CatsModule } from './cats/cats.module';
import { HealthModule } from "./core/health/health.module";
import { LoggerModule } from "./core/logger/logger.module";
import { TasksModule } from "./tasks/tasks.module"; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "nestjs_prisma_db",
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], //es para pasar las entidades manualmente
      autoLoadEntities: true, //es para pasar las entidades automaticamente
      synchronize: true //no deve usarse en production
    }),
    LoggerModule,
    HealthModule,
    TasksModule,
    CatsModule,
  ],
})
export class AppModule {}
