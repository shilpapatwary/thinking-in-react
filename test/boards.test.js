const request = require('supertest');
const chai = require('chai');
const mocha = require('mocha');
const app = require('../appServer');

let userCookie;

const should = chai.should();
function loginUser() {
  return request(app)
    .post('/auth/login')
    .type('form')
    .send({
      username: 'shilpa',
      password: 'shilpap',
    });
}

mocha.describe('Boards Application', () => {
  mocha.before((done) => {
    loginUser().then((response) => {
      userCookie = response.headers['set-cookie'];
      done();
    });
  });
  mocha.it('should retrieve all boards', () => {
    request(app)
      .get('/api/boards/')
      .set('Cookie', userCookie[0])
      .expect('content-type', /json/)
      .expect(200)
      .end((error, response) => {
        should.not.exist(error);
        should.exist(response);
      });
  });
  mocha.it('should retrieve a single board', () => {
    request(app)
      .get('/api/boards/5bdaeff0bee9dc6b70afed0d')
      .set('Cookie', userCookie[0])
      .expect('content-type', /json/)
      .expect(200)
      .end((error, response) => {
        should.not.exist(error);
        should.exist(response);
      });
  });
  mocha.it('should update a board', () => {
    request(app)
      .put('/api/boards/5bdaeff0bee9dc6b70afed34')
      .send({
        id: '5bdaeff0bee9dc6b70afed34',
        name: 'board10',
        desc: '',
        descData: null,
        closed: false,
        idOrganization: null,
        pinned: false,
        url: 'https://trello.com/b/elaSIRX4/name',
        shortUrl: 'https://trello.com/b/elaSIRX4',
        prefs: {},
        labelNames: {},
        limits: {},
        lists: [],
      })
      .set('Cookie', userCookie[0])
      .expect('content-type', /json/)
      .expect(200)
      .end((error, response) => {
        should.not.exist(error);
        should.exist(response);
      });
  });
  mocha.it('should delete a board', () => {
    request(app)
      .delete('/api/boards/5bdaeff0bee9dc6b70afe7u0')
      .set('Cookie', userCookie[0])
      .expect('content-type', /json/)
      .expect(200)
      .end((error, response) => {
        should.not.exist(error);
        should.exist(response);
      });
  });
  mocha.it('should create a board', () => {
    request(app)
      .post('/api/boards/')
      .send({
        id: '5bdaeff0bee9dc6b70afed34',
        name: 'board15',
        desc: '',
        descData: null,
        closed: false,
        idOrganization: null,
        pinned: false,
        url: 'https://trello.com/b/elaSIRX4/name',
        shortUrl: 'https://trello.com/b/elaSIRX4',
        prefs: {},
        labelNames: {},
        limits: {},
        lists: [],
      })
      .set('Cookie', userCookie[0])
      .expect('content-type', /json/)
      .expect(200)
      .end((error, response) => {
        should.not.exist(error);
        should.exist(response);
      });
  });
  mocha.it('should create a list in a board', () => {
    request(app)
      .post('/api/boards/5bdaeff0bee9dc6b70afed56/lists')
      .send({
        id: '12345',
        name: 'Alaska',
        closed: false,
        pos: 65535,
        cards: [],
      })
      .set('Cookie', userCookie[0])
      .expect('content-type', /json/)
      .expect(200)
      .end((error, response) => {
        should.not.exist(error);
        should.exist(response);
      });
  });
  mocha.it('should create a card in a list', () => {
    request(app)
      .post('/api/boards/5bdaeff0bee9dc6b70afed0d/lists/560bf446f17023a3710658fb/cards')
      .send({
        id: '560bf4dd7139286471dc009c',
        name: 'Grand Canyon National Park',
        badges: {},
        labels: [],
      })
      .set('Cookie', userCookie[0])
      .expect('content-type', /json/)
      .expect(200)
      .end((error, response) => {
        should.not.exist(error);
        should.exist(response);
      });
  });
});
