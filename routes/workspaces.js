const express = require('express');

const route = express.Router();

const workspaces = require('../workspace.json');

route.get('/', (req, res, next) => {
  try {
    res.set('content-type', 'application/json');
    res.set(200).send(workspaces);
  } catch (e) {
    next(e);
  }
});

route.get('/:id', (req, res, next) => {
  try {
    const workspace = workspaces.filter(b => b.id === req.params.id);
    if (workspace.length === 0) res.set(404).send('workspace ID not found!');
    else {
      res.set('content-type', 'application/json');
      res.set(200).send(workspace);
    }
  } catch (e) {
    next(e);
  }
});

route.put('/:id', (req, res, next) => {
  try {
    const workspace = req.body;
    const workspaceIndex = workspaces.findIndex(b => b.id === req.params.id);
    if (workspaceIndex === -1) {
      res.set(404).send('workspace ID not found');
    } else {
      workspaces[workspaceIndex] = workspace;
      res.set('content-type', 'application/json');
      res.set(202).send(workspace);
    }
  } catch (e) {
    next(e);
  }
});

route.post('/', (req, res, next) => {
  try {
    const workspace = req.body;
    workspace.id = `${Math.floor(Math.random() * 100000)}`;
    workspaces.push(workspace);
    res.set('content-type', 'application/json');
    res.set('201').send(workspace);
  } catch (e) {
    next(e);
  }
});

route.delete('/:id', (req, res, next) => {
  try {
    const workspaceIndex = workspaces.findIndex(w => w.id === req.params.id, 10);
    if (workspaceIndex === -1) res.status(404).send('Workspace not found');
    else {
      const workspace = workspaces[workspaceIndex];
      workspaces.splice(workspaceIndex, 1);
      res.set('content-type', 'application/json');
      res.set(200).send(workspace);
    }
  } catch (e) {
    next(e);
  }
});

// Add users to workspace
route.post('/:id/users', (req, res, next) => {
  try {
    const user = req.body;
    user.id = `${Math.floor(Math.random() * 100000)}`;
    const workspaceId = req.params.id;
    const workspaceIndex = workspaces.findIndex(w => w.id === workspaceId);
    if (workspaceIndex === -1) res.set(404).send('workspace ID not found!');
    else {
      workspaces[workspaceIndex].users.push(user);
      res.set('content-type', 'application/json');
      res.set(200).send(user);
    }
  } catch (e) {
    next(e);
  }
});

// Create channel in workspace
route.post('/:id/channels', (req, res, next) => {
  try {
    const channel = req.body;
    channel.id = `${Math.floor(Math.random() * 100000)}`;
    const workspaceId = req.params.id;
    const workspaceIndex = workspaces.findIndex(w => w.id === workspaceId);
    if (workspaceIndex === -1) res.set(404).send('workspace ID not found!');
    else {
      workspaces[workspaceIndex].channels.push(channel);
      res.set('content-type', 'application/json');
      res.set(200).send(channel);
    }
  } catch (e) {
    next(e);
  }
});

// Add users to channels in workspace
route.post('/:wid/channels/:cid/users', (req, res, next) => {
  try {
    const user = req.body;
    user.id = `${Math.floor(Math.random() * 100000)}`;
    const workspaceId = req.params.wid;
    const workspaceIndex = workspaces.findIndex(w => w.id === workspaceId);
    if (workspaceIndex === -1) res.set(404).send('workspace ID not found!');
    else {
      const cIndex = workspaces[workspaceIndex].channels.findIndex(c => c.id === req.params.cid);
      const channel = workspaces[workspaceIndex].channels[cIndex];
      channel.users.push(user);
      res.set('content-type', 'application/json');
      res.set(200).send(user);
    }
  } catch (e) {
    next(e);
  }
});

// List Users in a channel
route.get('/:wid/channels/:cid/users', (req, res, next) => {
  try {
    const workspaceId = req.params.wid;
    const workspaceIndex = workspaces.findIndex(w => w.id === workspaceId);
    if (workspaceIndex === -1) res.set(404).send('workspace ID not found!');
    else {
      const cIndex = workspaces[workspaceIndex].channels.findIndex(c => c.id === req.params.cid);
      const channel = workspaces[workspaceIndex].channels[cIndex];
      console.log(channel);
      res.set('content-type', 'application/json');
      res.set(200).send(channel.users);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = route;
