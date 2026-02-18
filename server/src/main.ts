import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import{ DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Swagger Ayarları
  const config = new DocumentBuilder()
    .setTitle('Job Hunter API')
    .setDescription('İş takibi için yazdığımız API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000); 
}
bootstrap();
