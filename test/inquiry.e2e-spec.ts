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
    inquiryId = null;
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

  function createNewInquiry() {
    return request(app.getHttpServer())
      .post('/inquiries')
      .set('Cookie', cookie)
      .send(inquiryModel)
      .expect(res => { inquiryId = res.body.id });
  }

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

  it('fails to create inquiry without user id (Cookie)', async () => {
    return request(app.getHttpServer())
      .post('/inquiries')
      .send(inquiryModel)
      .expect(403);
  });

  it('should update an inquiry successfully', async () => {
    await createNewInquiry();

    return request(app.getHttpServer())
      .patch(`/inquiries/${inquiryId}`)
      .set('Cookie', cookie)
      .send({ product: 'stamps' })
      .expect(200);
  });

  it('should fail to update an inquiry without user id (Cookie)', async () => {
    await createNewInquiry();

    return request(app.getHttpServer())
      .patch(`/inquiries/${inquiryId}`)
      .send({ product: 'stamps' })
      .expect(403);
  });

  it('should delete an inquiry successfully', async () => {
    await createNewInquiry();

    return request(app.getHttpServer())
      .delete(`/inquiries/${inquiryId}`)
      .set('Cookie', cookie)
      .expect(200)
      .expect(() => {
        inquiryId = undefined;
      });
  });

  it('should fail to delete an inquiry', async () => {
    await createNewInquiry();

    return request(app.getHttpServer())
      .delete(`/inquiries/${inquiryId}`)
      .expect(403);
  });

  afterEach(async () => {
    if (inquiryId) {
      await request(app.getHttpServer())
        .delete(`/inquiries/${inquiryId}`)
        .set('Cookie', cookie)
        .expect(200);
    }

    await request(app.getHttpServer())
      .delete(`/users/${userModel.email}`)
      .expect(200);
  });
});