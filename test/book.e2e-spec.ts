import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('BookController (e2e)', () => {
  let app: INestApplication;
  let authorId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    // Cria um autor para usar nos testes
    const author = await request(app.getHttpServer()).post('/authors').send({
      name: 'Autor dos Livros',
      dateOfBirth: '1990-01-01',
      nationality: 'Brasileiro',
    });
    authorId = author.body.id;
  });

  it('/books (POST) deve criar um livro', async () => {
    const res = await request(app.getHttpServer())
      .post('/books')
      .send({
        title: 'Livro de Teste',
        publicationYear: 2023,
        description: 'Descrição qualquer',
        authorId,
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Livro de Teste');
  });

  it('/books (GET) deve listar livros', async () => {
    const res = await request(app.getHttpServer()).get('/books').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/books/:id (GET) deve retornar um livro por id', async () => {
    const create = await request(app.getHttpServer()).post('/books').send({
      title: 'Livro Único',
      publicationYear: 2020,
      authorId,
    });

    const id = create.body.id;

    const res = await request(app.getHttpServer())
      .get(`/books/${id}`)
      .expect(200);

    expect(res.body.title).toBe('Livro Único');
  });

  it('/books/:id (PUT) deve atualizar um livro', async () => {
    const create = await request(app.getHttpServer()).post('/books').send({
      title: 'Livro Atualizar',
      publicationYear: 2010,
      authorId,
    });

    const id = create.body.id;

    const res = await request(app.getHttpServer())
      .put(`/books/${id}`)
      .send({ publicationYear: 2025 })
      .expect(200);

    expect(res.body.publicationYear).toBe(2025);
  });

  it('/books/:id (DELETE) deve remover um livro', async () => {
    const create = await request(app.getHttpServer()).post('/books').send({
      title: 'Livro Deletar',
      publicationYear: 2015,
      authorId,
    });

    const id = create.body.id;

    await request(app.getHttpServer()).delete(`/books/${id}`).expect(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
