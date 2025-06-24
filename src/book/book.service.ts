import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto, UpdateBookDto } from './dtos/book.dto';
import { Author } from 'src/author/entities/author.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
    @InjectRepository(Author)
    private authorRepo: Repository<Author>,
  ) {}

  async create(dto: CreateBookDto) {
    const author = await this.authorRepo.findOne({
      where: { id: dto.authorId },
    });
    if (!author) throw new NotFoundException('Author not found');

    const book = this.bookRepo.create({
      ...dto,
      author,
    });

    return this.bookRepo.save(book);
  }

  findAll() {
    return this.bookRepo.find({ relations: ['author'] });
  }

  async findOne(id: string) {
    const book = await this.bookRepo.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: string, dto: UpdateBookDto) {
    const book = await this.findOne(id);

    if (dto.authorId) {
      const author = await this.authorRepo.findOne({
        where: { id: dto.authorId },
      });
      if (!author) throw new NotFoundException('Author not found');
      book.author = author;
    }

    Object.assign(book, dto);
    return this.bookRepo.save(book);
  }

  async remove(id: string) {
    const book = await this.findOne(id);
    return this.bookRepo.remove(book);
  }
}
