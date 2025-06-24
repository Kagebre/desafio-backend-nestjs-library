import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'Dom Casmurro' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Descrição do livro', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1899 })
  @IsInt()
  publicationYear: number;

  @ApiProperty({ example: 'uuid-do-autor' })
  @IsUUID()
  authorId: string;
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  publicationYear?: number;

  @IsOptional()
  @IsUUID()
  authorId?: string;
}
