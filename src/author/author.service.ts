import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto, UpdateAuthorDto } from './dtos/author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepo: Repository<Author>,
  ) {}

  create(dto: CreateAuthorDto) {
    const author = this.authorRepo.create(dto);
    return this.authorRepo.save(author);
  }

  findAll() {
    return this.authorRepo.find({ relations: ['books'] });
  }

  async findOne(id: string) {
    const author = await this.authorRepo.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!author) throw new NotFoundException('Author not found');
    return author;
  }

  async update(id: string, dto: UpdateAuthorDto) {
    const author = await this.findOne(id);
    Object.assign(author, dto);
    return this.authorRepo.save(author);
  }

  async remove(id: string) {
    const author = await this.findOne(id);
    return this.authorRepo.remove(author);
  }
}
