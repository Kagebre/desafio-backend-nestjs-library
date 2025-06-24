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
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from './dtos/book.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo livro' })
  @ApiResponse({ status: 201, description: 'Livro criado com sucesso' })
  @ApiNotFoundResponse({ description: 'Autor não encontrado' })
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os livros' })
  @ApiResponse({ status: 200, description: 'Lista de livros' })
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um livro por ID' })
  @ApiResponse({ status: 200, description: 'Livro encontrado' })
  @ApiNotFoundResponse({ description: 'Livro não encontrado' })
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um livro por ID' })
  @ApiResponse({ status: 200, description: 'Livro atualizado' })
  @ApiNotFoundResponse({ description: 'Livro ou autor não encontrado' })
  update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.bookService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um livro por ID' })
  @ApiResponse({ status: 204, description: 'Livro removido' })
  @ApiNotFoundResponse({ description: 'Livro não encontrado' })
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
