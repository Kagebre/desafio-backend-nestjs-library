import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../src/author/entities/author.entity';

describe('AuthorController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it('/authors (POST) deve criar um autor', async () => {
    const res = await request(app.getHttpServer())
      .post('/authors')
      .send({
        name: 'Machado de Assis',
        dateOfBirth: '1839-06-21',
        nationality: 'Brasileiro',
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Machado de Assis');
  });

  it('/authors (GET) deve listar autores', async () => {
    const res = await request(app.getHttpServer()).get('/authors').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/authors/:id (GET) deve retornar um autor por id', async () => {
    const create = await request(app.getHttpServer()).post('/authors').send({
      name: 'Clarice Lispector',
      dateOfBirth: '1920-12-10',
      nationality: 'Brasileira',
    });

    const id = create.body.id;

    const res = await request(app.getHttpServer())
      .get(`/authors/${id}`)
      .expect(200);

    expect(res.body.name).toBe('Clarice Lispector');
  });

  it('/authors/:id (PUT) deve atualizar um autor', async () => {
    const create = await request(app.getHttpServer()).post('/authors').send({
      name: 'Paulo Coelho',
      dateOfBirth: '1947-08-24',
      nationality: 'Brasileiro',
    });

    const id = create.body.id;

    const res = await request(app.getHttpServer())
      .put(`/authors/${id}`)
      .send({ nationality: 'Português' })
      .expect(200);

    expect(res.body.nationality).toBe('Português');
  });

  it('/authors/:id (DELETE) deve remover um autor', async () => {
    const create = await request(app.getHttpServer()).post('/authors').send({
      name: 'Rubem Fonseca',
      dateOfBirth: '1925-05-11',
    });

    const id = create.body.id;

    await request(app.getHttpServer()).delete(`/authors/${id}`).expect(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
