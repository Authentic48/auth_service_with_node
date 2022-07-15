import { app } from '../../app';
import request from 'supertest';
import mongoose from 'mongoose';

describe('PUT /api/users/:id', () => {
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
      .put(`/api/users/${id}`)
      .set('Cookie', response.get('Set-Cookie'))
      .send({
        name: 'test edit',
        email: 'test1@test.com',
        password: 'passwordedit',
      })
      .expect(404);
  });

  it('returns a 401  if current user id is different from the one provided', async () => {
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
      .put(`/api/users/${response.body._id}`)
      .set('Cookie', response2.get('Set-Cookie'))
      .send({
        name: 'test edit',
        email: 'test1@test.com',
        password: 'passwordedit',
      })
      .expect(401);
  });

  it('returns a 400 with invalid inputs', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    await request(app)
      .put(`/api/users/${response.body._id}`)
      .set('Cookie', response.get('Set-Cookie'))
      .send({
        name: '',
        email: 'test1@test.com',
        password: '',
      })
      .expect(400);
  });

  it('updates a user with valid inputs', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    await request(app)
      .put(`/api/users/${response.body._id}`)
      .set('Cookie', response.get('Set-Cookie'))
      .send({
        name: 'test',
        email: 'test1@test.com',
        password: 'passwordedit',
      })
      .expect(200);
  });
});
