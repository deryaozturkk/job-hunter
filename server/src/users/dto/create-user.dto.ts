import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'mail@example.com' })
  @IsEmail({}, { message: 'Lütfen geçerli bir email giriniz' })
  @IsNotEmpty({ message: 'Email alanı boş bırakılamaz' })
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty({ message: 'Şifre alanı boş bırakılamaz' })
  @MinLength(6, { message: 'Şifre en az 6 karakter olmalıdır' }) 
  password: string;

  @ApiProperty({ example: 'Ad Soyad', required: false })
  @IsString()
  @IsOptional() 
  fullName?: string;
}