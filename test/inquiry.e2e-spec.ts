import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";

describe('Inquiry e2e test', () => {
  let app: INestApplication;
  let cookie: string[];
  let inquiryId: number;

  const userModel = {
    email: 'mark@mail.com',
    password: 'abcde',
    fullname: 'Mark Tj',
    role: 'admin'
  };

  const inquiryModel = {
    "client": "Feathers Co.",
    "product": "Testing app"
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    await request(app.getHttpServer())
      .post('/users/signup')
      .send(userModel)
      .expect((res) => {
        cookie = res.get('Set-Cookie');
      });
  });

  it('should create new inquiry', async () => {
    return request(app.getHttpServer())
      .post('/inquiries')
      .set('Cookie', cookie)
      .send(inquiryModel)
      .expect(201)
      .expect(res => {
        inquiryId = res.body.id;
      });
  });

  afterEach(async () => {
    await request(app.getHttpServer())
      .delete(`/inquiries/${inquiryId}`)
      .expect(200);

    await request(app.getHttpServer())
      .delete(`/users/${userModel.email}`)
      .expect(200);
  });
});