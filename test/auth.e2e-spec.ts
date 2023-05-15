import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';

describe('Auth e2e test', () => {
  let app: INestApplication;
  let inquiryId: number;
  let clientId: number;
  let cookie: string[];

  const clientModel = {
    name: 'Feathers Co.',
    industry: 'Insurance',
    phone: '343-333-9839'
  };

  const inquiryModel = {
    product: 'phone cases',
    client: 'phone retails',
  };

  const userModel = {
    email: 'mark@mail.com',
    password: 'abcde',
    fullname: 'Mark Tj',
    role: 'user',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  function createNewUser() {
    return request(app.getHttpServer())
      .post('/users/signup')
      .send(userModel)
      .expect(201)
      .expect((res) => {
        cookie = res.get('Set-Cookie');
      });
  }

  function createNewClient() {
    return request(app.getHttpServer())
      .post('/clients')
      .set('Cookie', cookie)
      .send(clientModel)
      .expect(res => {
        clientId = res.body.id;
      });
  }

  function createNewInquiry() {
    return request(app.getHttpServer())
      .post('/inquiries')
      .set('Cookie', cookie)
      .send({ ...inquiryModel, clientId })
      .expect(201)
      .expect((res) => {
        inquiryId = res.body.id;
      });
  }

  it('should sign up a new user', async () => {
    return request(app.getHttpServer())
      .post('/users/signup')
      .send(userModel)
      .expect(201)
      .then((res) => {
        const { email, fullname, role } = res.body;

        expect(email).toEqual(userModel.email);
        expect(fullname).toEqual(userModel.fullname);
        expect(role).toEqual(userModel.role);
      });
  });

  it('should sign up a new user and get registered user info from /users/current-user', async () => {
    await createNewUser();

    return request(app.getHttpServer())
      .get('/users/current-user')
      .set('Cookie', cookie)
      .expect(200)
      .expect((res) => {
        const { email } = res.body;
        expect(email).toBe(userModel.email);
      });
  });

  it('should keep inquiries associated to a user, if user deleted', async () => {
    await createNewUser();
    await createNewClient();
    await createNewInquiry();

    await request(app.getHttpServer())
      .delete(`/users/${userModel.email}`)
      .expect(200);

    return request(app.getHttpServer())
      .get(`/inquiries/${inquiryId}`)
      .expect(200);
  });

  afterEach(async () => {
    if (inquiryId) {
      await request(app.getHttpServer())
        .delete(`/inquiries/${inquiryId}`)
        .set('Cookie', cookie)
        .expect(200);
    }

    await request(app.getHttpServer()).delete(`/users/${userModel.email}`);

    if (clientId) {
      await request(app.getHttpServer())
        .delete(`/clients/${clientId}`)
        .set('Cookie', cookie)
        .expect(200);
    }
  });
});
