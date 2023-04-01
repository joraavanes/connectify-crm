import { Test } from "@nestjs/testing";
import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "./../src/app.module";

describe('Auth e2e test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  const model1 = {
    email: 'mark@mail.com',
    password: 'abcde',
    fullname: 'Mark Tj',
    role: 'CTO'
  };

  it('should sign up a new user', async () => {
    return request(app.getHttpServer())
      .post('/users/signup')
      .send(model1)
      .expect(201)
      .then(res => {
        const { email, fullname, role } = res.body;

        expect(email).toEqual(model1.email);
        expect(fullname).toEqual(model1.fullname);
        expect(role).toEqual(model1.role);
      });
  });

  it('should sign up a new user and get registered user info from /users/current-user', async () => {
    let cookie: string[];

    await request(app.getHttpServer())
      .post('/users/signup')
      .send(model1)
      .expect(201)
      .expect(res => {
        cookie = res.get('Set-Cookie');
      });

    return request(app.getHttpServer())
      .get('/users/current-user')
      .set('Cookie', cookie)
      .expect(200)
      .expect(res => {
        const { email } = res.body;
        expect(email).toBe(model1.email);
      });
  });

  afterEach(() => {
    return request(app.getHttpServer())
      .delete(`/users/${model1.email}`);
    // .expect(200);
  })
});