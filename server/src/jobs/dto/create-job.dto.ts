import { ApiProperty } from '@nestjs/swagger';
import{ IsNotEmpty, IsString, IsOptional, IsDateString, IsUrl } from 'class-validator';

export class CreateJobDto {
  @ApiProperty({ description: 'Şirket Adı', example: 'Trendyol' })
  @IsString()
  @IsNotEmpty()
  company:string;

  @ApiProperty({ description: 'Pozisyon', example: 'Backend Developer' })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({ description: 'Başvuru Platformu', example: 'LinkedIn', required: false })
  @IsString()
  @IsOptional()
  platform: string;

  @ApiProperty({ description: 'Başvuru Durumu', example: 'Başvuruldu', required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ description: 'Başvuru Tarihi', example: '2026-02-21', required: false })
  @IsDateString() // Tarih formatını doğrular
  @IsOptional()
  applicationDate?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Lütfen geçerli bir URL giriniz (https://...)' }) // Sadece veri varsa formatı kontrol et
  url?: string;
}
