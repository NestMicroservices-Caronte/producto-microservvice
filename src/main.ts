import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
   const logger = new Logger('Main');
  
 // const app = await NestFactory.create(AppModule);
 const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options:{
        port: envs.port
      }
    }
 )
 
  // Activar validaciones automáticas
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina campos no declarados en los DTO
      forbidNonWhitelisted: true, // lanza error si se envían campos extra
      transform: true // transforma tipos automáticamente con class-transformer
    }),
  );
  await app.listen();
  logger.log(`Products Microservice running on port ${ envs.port }`);
}
bootstrap();
