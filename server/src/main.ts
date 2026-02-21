import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import{ DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

// Global Interceptor: Tüm endpoint'ler artık Response formatına göre dönecek
  app.useGlobalInterceptors(new TransformInterceptor());

  // Global Validation: DTO'lardaki @IsString vb. kuralların çalışmasını sağlar
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // DTO'da olmayan fazlalık verileri siler (Güvenlik için çok kritik!)
    forbidNonWhitelisted: true, // DTO dışı veri gelirse isteği reddeder
    transform: true, // Gelen veriyi otomatik olarak DTO tipine dönüştürür
  }));


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
