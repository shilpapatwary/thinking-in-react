/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const Workspaces = require('../model/workspaceModel');
const Channels = require('../model/channelModel');

const workspaceController = {
  getAllWorkspaces: (req, res, next) => {
    try {
      Workspaces.find((err, response) => {
        if (err) { return next(err); }
        res.set('Content-Type', 'application/json');
        res.status(200).send(response);
      });
    } catch (e) {
      next(e);
    }
  },
  getWorkspace: (req, res, next) => {
    try {
      Workspaces.findOne({ id: req.params.id }, (err, response) => {
        if (err) { return next(err); }
        res.set('Content-Type', 'application/json');
        res.status(200);
        res.send(response);
      });
    } catch (e) {
      next(e);
    }
  },
  updateWorkspace: (req, res, next) => {
    try {
      const options = { new: true };
      const update = { $set: req.body };
      Workspaces.findOneAndUpdate({ id: req.params.id }, update, options, (err, workspace) => {
        if (err) { return next(err); }
        res.set('Content-Type', 'application/json');
        res.status(202).send(workspace);
      });
    } catch (e) {
      next(e);
    }
  },
  deleteWorkspace: (req, res, next) => {
    try {
      Workspaces.findOneAndDelete({ id: req.params.id }, (err, workspace) => {
        if (err) { return next(err); }
        res.set('Content-Type', 'application/json');
        res.set(200).send(workspace);
      });
    } catch (e) {
      next(e);
    }
  },
  createWorkspace: (req, res, next) => {
    try {
      const Workspace = new Workspaces({
        id: req.body.id,
        name: req.body.name,
        users: req.body.users,
        channels: req.body.channels,
      });
      Workspace.save((err) => {
        if (err) {
          return next(err);
        }
        res.set('Content-Type', 'application/json');
        res.status(201).send(Workspace);
      });
    } catch (e) {
      next(e);
    }
  },
  createUsersInWorkspace: (req, res, next) => {
    try {
      const options = { new: true };
      const user = req.body;
      // user.id = `${Math.floor(Math.random() * 100000)}`;
      console.log(user);
      const update = { $push: { users: user } };
      Workspaces.findOneAndUpdate({ id: req.params.id }, update, options, (err, workspace) => {
        if (err) { return next(err); }
        res.set('Content-Type', 'application/json');
        res.status(200);
        res.send(workspace);
      });
    } catch (e) {
      next(e);
    }
  },
  createChannelsInWorkspace: (req, res, next) => {
    try {
      const options = { new: true };
      const channel = req.body;
      const wChannel = new Channels(channel);
      // channel.id = `${Math.floor(Math.random() * 100000)}`;
      const update = { $push: { channels: channel } };
      Workspaces.findOneAndUpdate({ id: req.params.id }, update, options, (err, workspace) => {
        if (err) { return next(err); }
        res.set('Content-Type', 'application/json');
        res.status(200);
        res.send(workspace);
      });
      wChannel.save((err) => {
        if (err) {
          return next(err);
        }
      });
    } catch (e) {
      next(e);
    }
  },
  createUserInChannel: (req, res, next) => {
    try {
      const user = req.body;
      const options = { new: true };
      user.id = `${Math.floor(Math.random() * 100000)}`;
      const WorkspaceId = req.params.wid;
      const channelid = req.params.cid;
      const update = { $push: { 'channels.$.users': user } };
      Workspaces.findOneAndUpdate({ id: WorkspaceId, 'channels[id]': channelid }, update, options, (err, workspace) => {
        if (err) { return next(err); }
        res.set('Content-Type', 'application/json');
        res.status(200);
        res.send('list', workspace);
      });
    } catch (e) {
      next(e);
    }
  },
};


module.exports = workspaceController;
