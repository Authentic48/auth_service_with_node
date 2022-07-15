import request from 'supertest';
import { app } from '../../app';

const createUser = (email: string) => {
    return request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        email: email,
        password: 'password',
      })
};

describe('GET /api/users', () => {
    it('can fetch all users ', async () => {
      await createUser('test1@test.com');
      await createUser('test2@test.com');
      await createUser('test@test.com');
  
      const response = await request(app).get('/api/users').send().expect(200);
  
      expect(response.body.length).toEqual(3);
    });
  });