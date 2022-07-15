import { app } from '../../app';
import request from 'supertest';
import mongoose from 'mongoose';

describe('DELETE /api/users/:id', () => {
  it('returns a 404 if the user is not found with the provided id', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    const response = await request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    await request(app)
      .delete(`/api/users/${id}`)
      .set('Cookie', response.get('Set-Cookie'))
      .send()
      .expect(404);
  });

  it('returns a 401  if current user id is different from the one he tries to delete', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    const response2 = await request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        email: 'test2@test.com',
        password: 'password',
      })
      .expect(201);

    await request(app)
      .delete(`/api/users/${response.body._id}`)
      .set('Cookie', response2.get('Set-Cookie'))
      .send()
      .expect(401);
  });

  it('deletes a user', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    await request(app)
      .delete(`/api/users/${response.body._id}`)
      .set('Cookie', response.get('Set-Cookie'))
      .send()
      .expect(204);
  });
});
