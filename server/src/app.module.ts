import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // <-- Yeni ekledik
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 1. Config Modülünü Başlat (Bu, .env dosyasını okur)
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // 2. Veritabanı Bağlantısı (Artık şifreyi process.env'den alıyor)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD, // <-- Şifre artık gizli!
      database: process.env.DB_NAME,
      autoLoadEntities: true, // <-- "entities: []" yerine bunu yaz!
      synchronize: true,
    }),
    
    JobsModule,
    
    UsersModule,
    
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}