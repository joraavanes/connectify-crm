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

  it('should sign up a new user', () => {
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
});