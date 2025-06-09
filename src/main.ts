import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function createApp() {
  const app = await NestFactory.create(AppModule);

  // Validadores
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('API WeReader')
    .setDescription('Documentación de la API WeReader')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  return app;
}

// Solo lanza el servidor si se ejecuta directamente
if (require.main === module) {
  createApp()
    .then((app) => app.listen(process.env.PORT ?? 3000))
    .catch((err) => {
      console.error('❌ Error al iniciar la aplicación', err);
    });
}
