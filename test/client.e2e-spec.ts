import request from 'supertest';
import { Test } from "@nestjs/testing";
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';

describe("Client e2e test", () => {
  let app: INestApplication;
  let cookie: string[];
  let clientId: number;

  const userModel = {
    email: 'mark@mail.com',
    password: 'abcde',
    fullname: 'Mark Tj',
    roles: ['user'],
  };

  const clientModel = {
    name: "McDonalds",
    industry: "Junkfood",
    phone: "111-333-4582",
    country: "US",
    city: "Texas"
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    app.init();
  });

  function createNewUser() {
    return request(app.getHttpServer())
      .post('/users/signup')
      .send(userModel)
      .expect((res) => {
        cookie = res.get('Set-Cookie');
      });
  }

  it('should create a client successfully', async () => {
    await createNewUser();

    return request(app.getHttpServer())
      .post('/clients')
      .set('Cookie', cookie)
      .send(clientModel)
      .expect(201)
      .expect(res => {
        clientId = res.body.id;
      });
  });

  it('should fail creating a client', () => {
    return request(app.getHttpServer())
      .post('/clients')
      .send(clientModel)
      .expect(403);
  });

  // Todo: ...
  // it('should fail creating a client with the same name', async () => {
  // ....
  // });

  it('should keep client data if associated user is removed', async () => {
    await createNewUser();

    await request(app.getHttpServer())
      .post('/clients')
      .set('Cookie', cookie)
      .send(clientModel)
      .expect(res => {
        clientId = res.body.id;
      });

    await request(app.getHttpServer())
      .delete(`/users/${userModel.email}`);

    return request(app.getHttpServer())
      .get(`/clients/${clientId}`)
      .expect(200);
  });

  afterEach(async () => {
    await request(app.getHttpServer())
      .delete(`/users/${userModel.email}`)
      .set('Cookie', cookie);

    if (clientId) {
      await request(app.getHttpServer())
        .delete(`/clients/${clientId}`)
        .set('Cookie', cookie);
    }
  });

});