import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from './dtos/author.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('authors')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo autor' })
  @ApiResponse({ status: 201, description: 'Autor criado com sucesso' })
  create(@Body() dto: CreateAuthorDto) {
    return this.authorService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os autores' })
  @ApiResponse({ status: 200, description: 'Lista de autores' })
  findAll() {
    return this.authorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um autor por ID' })
  @ApiResponse({ status: 200, description: 'Autor encontrado' })
  @ApiNotFoundResponse({ description: 'Autor não encontrado' })
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um autor por ID' })
  @ApiResponse({ status: 200, description: 'Autor atualizado' })
  @ApiNotFoundResponse({ description: 'Autor não encontrado' })
  update(@Param('id') id: string, @Body() dto: UpdateAuthorDto) {
    return this.authorService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um autor por ID' })
  @ApiResponse({ status: 204, description: 'Autor removido' })
  @ApiNotFoundResponse({ description: 'Autor não encontrado' })
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.authorService.remove(id);
  }
}
