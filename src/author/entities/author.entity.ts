import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from 'src/book/entities/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  dateOfBirth: Date;

  @Column({ nullable: true })
  nationality: string;

  @OneToMany(() => Book, (book) => book.author, { cascade: true })
  books: Book[];
}
