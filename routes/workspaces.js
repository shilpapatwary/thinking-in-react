const express = require('express');

const router = express.Router();
const workspaceController = require('../controllers/workspaceController');
// const isLoggedin = require('../userAuthentication');
const passport = require('../authenticate');


router.route('/')
  .get(workspaceController.getAllWorkspaces)
  .post(passport.authenticate('jwt', { session: false }), workspaceController.createWorkspace);

router.route('/:id')
  .put(workspaceController.updateWorkspace)
  .delete(workspaceController.deleteWorkspace)
  .get(workspaceController.getWorkspace);

// Add users to workspace
router.route('/:id/users').put(workspaceController.createUsersInWorkspace);

// Create channel in workspace
router.route('/:id/channels').put(workspaceController.createChannelsInWorkspace);

// Add users to channels in workspace
router.route('/:wid/channels/:cid/users').put(workspaceController.createUserInChannel);

module.exports = router;
