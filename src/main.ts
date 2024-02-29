import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    );

  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes( 
    new ValidationPipe({ //agregamos las validationes y la tranformacioin de datos
      whitelist: true, // es lo que ponemos  en los DTO
      forbidNonWhitelisted: true, // Manda los errores si mandan otra cosa o no mandar errores y solo eliminar las campos q no estan en el DTO
      transform: true
    })
  )
    
  const configService = app.get(ConfigService);
  const port = configService.get<string>("PORT", "3000");

  
  await app.listen(port, "0.0.0.0");
  const logger = app.get(Logger);
  logger.log(`App is ready and listening on port ${port} 🚀`);
}

bootstrap();
