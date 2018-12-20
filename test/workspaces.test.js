/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
const request = require('supertest');
const chai = require('chai');
const mocha = require('mocha');
const app = require('../appServer');
const Workspaces = require('../model/workspaceModel');
const Channels = require('../model/channelModel');

const should = chai.should();

mocha.describe('Slack Application', () => {
  let token = null;
  before((done) => {
    request.agent(app)
      .post('/auth/register')
      .send({
        username: 'test',
        password: 'test123',
      })
      .end((_err, response) => {
        request.agent(app)
          .post('/auth/login')
          .send({
            username: 'test',
            password: 'test123',
          })
          .end((_err, res) => {
            token = res.body.token;
            done();
          });
      });
  });
  mocha.it('should retrieve all workspaces', () => {
    request(app)
      .get('/api/workspaces/')
      .set('Authorization', `Bearer ${token}`)
      .expect('content-type', /json/)
      .expect(200)
      .end((error, res) => {
        res.body.should.be.a('Array');
        should.not.exist(error);
        should.exist(res);
      });
  });
  mocha.it('should retrieve a single workspace', () => {
    const updatedWorkspace = {
      id: `${Math.floor(Math.random() * 100000)}`,
      name: 'workspace_old',
    };
    const workspace = new Workspaces(updatedWorkspace);
    workspace.save((_err, ws) => {
      request(app)
        .get(`/api/workspaces/${ws.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('content-type', /json/)
        .expect(200)
        .end((error, res) => {
          res.body.should.be.a('object');
          should.not.exist(error);
          should.exist(res);
        });
    });
  });
  mocha.it('should update a workspace', () => {
    const updatedWorkspace = {
      id: `${Math.floor(Math.random() * 100000)}`,
      name: 'workspace_old',
    };
    const workspace = new Workspaces(updatedWorkspace);
    workspace.save((_err, ws) => {
      request(app)
        .put(`/api/workspaces/${ws.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: '12345',
          name: 'workspace_new',
        })
        .expect('content-type', /json/)
        .expect(200)
        .end((error, res) => {
          should.not.exist(error);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql('workspace_new');
          should.exist(res);
        });
    });
  });
  mocha.it('should delete a board', () => {
    const newWorkspace = {
      id: `${Math.floor(Math.random() * 100000)}`,
      name: 'workspace_new',
    };
    const workspace = new Workspaces(newWorkspace);
    workspace.save((_err, ws) => {
      request(app)
        .delete(`/api/workspaces/${ws.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('content-type', /json/)
        .expect(200)
        .end((error, res) => {
          should.not.exist(error);
          res.body.should.be.a('object');
          should.exist(res);
        });
    });
  });
  mocha.it('should create a workspace', () => {
    request(app)
      .post('/api/workspaces/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: `${Math.floor(Math.random() * 100000)}`,
        name: 'corporate_social',
        users: [{
          id: 'user1',
          name: 'Shilpa',
        }],
        channels: [
          {
            id: 'ioferfj',
            name: 'random',
            users: [],
          },
        ],
      })
      .expect('content-type', /json/)
      .expect(201)
      .end((error, res) => {
        should.not.exist(error);
        res.body.should.have.property('name');
        res.body.should.have.property('users');
        res.body.should.have.property('channels');
        should.exist(res);
      });
  });
  mocha.it('should add users in a workspace', () => {
    const newWorkspace = {
      id: `${Math.floor(Math.random() * 100000)}`,
      name: 'workspace_old',
      users: [],
      channels: [],
    };
    const workspace = new Workspaces(newWorkspace);
    workspace.save((_err, ws) => {
      request(app)
        .put(`/api/workspaces/${ws.id}/users`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: '12345',
          name: 'Shilpa',
        })
        .expect('content-type', /json/)
        .expect(200)
        .end((error, res) => {
          should.not.exist(error);
          res.body.users.length.should.not.be.eql(0);
          should.exist(res);
        });
    });
  });
  mocha.it('should add channles in workspace', () => {
    const newWorkspace = {
      id: `${Math.floor(Math.random() * 100000)}`,
      name: 'workspace_old',
      users: [],
      channels: [],
    };
    const workspace = new Workspaces(newWorkspace);
    workspace.save((_err, ws) => {
      request(app)
        .put(`/api/workspaces/${ws.id}/channels`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: '12345',
          name: 'channel1',
        })
        .expect('content-type', /json/)
        .expect(200)
        .end((error, res) => {
          should.not.exist(error);
          res.body.channels.length.should.not.be.eql(0);
          should.exist(res);
        });
    });
  });
  mocha.it('should add users in channel', () => {
    const newChannel = {
      id: `${Math.floor(Math.random() * 100000)}`,
      name: 'channel1',
      users: [],
      messages: [],
    };
    const channel = new Channels(newChannel);
    channel.save((_err, ch) => {
      request(app)
        .put(`/api/channels/${ch.id}/users`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: '98888',
          name: 'user1',
        })
        .expect('content-type', /json/)
        .expect(200)
        .end((error, res) => {
          should.not.exist(error);
          res.body.users.length.should.not.be.eql(0);
          should.exist(res);
        });
    });
  });
  mocha.it('should add messages in channel', () => {
    const newChannel = {
      id: `${Math.floor(Math.random() * 100000)}`,
      name: 'channel1',
      users: [],
      messages: [],
    };
    const channel = new Channels(newChannel);
    channel.save((_err, ch) => {
      request(app)
        .put(`/api/channels/${ch.id}/messages`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: '12345',
          message: 'hi',
        })
        .expect('content-type', /json/)
        .expect(200)
        .end((error, res) => {
          should.not.exist(error);
          res.body.messages.length.should.not.be.eql(0);
          should.exist(res);
        });
    });
  });
});
