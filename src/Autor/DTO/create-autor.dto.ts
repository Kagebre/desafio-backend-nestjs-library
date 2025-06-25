import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateAutorDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsDateString()
  @IsNotEmpty()
  dataNascimento: Date;

  @IsString()
  @IsOptional()
  nacionalidade?: string;
}
