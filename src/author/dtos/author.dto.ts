import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({ example: 'Machado de Assis' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1839-06-21',
    description: 'Data de nascimento no formato YYYY-MM-DD',
  })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({ example: 'Brasileiro', required: false })
  @IsOptional()
  @IsString()
  nationality?: string;
}

export class UpdateAuthorDto {
  @ApiProperty({ example: 'Nome atualizado', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: '2000-01-01', required: false })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiProperty({ example: 'Português', required: false })
  @IsOptional()
  @IsString()
  nationality?: string;
}
