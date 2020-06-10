
import 'dotenv/config';
import * as request from 'supertest';
import { app } from './constant';

describe('ROOT', () => {
  it('should ping', () => {
    return request(app)
      .get('/home')
      .expect(200)
      .expect('Hello World!');
  });
});