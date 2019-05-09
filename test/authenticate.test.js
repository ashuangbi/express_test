import request from 'supertest';
import httpStatus from 'http-status';
import { expect } from 'chai';
import bcrypt from 'bcrypt';

import User from '../src/models/user.model';
import app from '../index';

describe('## User APIs', () => {
  const username = 'testUser';
  const password = '12345678';

  before(async () => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const fakeUser = new User({
      username,
      password: hash,
    });
    await fakeUser.save();
  });

  // remove test database after each test
  after(() => {
    User.remove(() => {});
  });

  describe('# Authentication', () => {

    it('should successfully login with a correct user name and correct password', (done) => {
      request(app)
        .post('/api/authenticate')
        .send({ username, password })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.token).to.exist;
          done();
        })
        .catch(done);
    });

    it('should return 401 Unauthorized if user not found', (done) => {
      request(app)
        .post('/api/authenticate')
        .send({ username: 'fake user', password: 'fake pasword' })
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.be.equal('Authentication failed.');
          done();
        })
        .catch(done);
    });

    it('should return 401 Unauthorized if password not correct', (done) => {
      request(app)
        .post('/api/authenticate')
        .send({ username, password: 'fake pasword' })
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.be.equal('Authentication failed.');
          done();
        })
        .catch(done);
    });
  });
});
