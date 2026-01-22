import { ApiProperty } from '@nestjs/swagger';
import{ IsNotEmpty, IsString , IsOptional } from 'class-validator';

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
}
