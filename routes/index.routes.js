const router = require('express').Router();
const FriendController = require('../controller/friend.controller');

const friendController = new FriendController();

router.post('/', friendController.getUserDetails);
router.get('/getUserList/:page', friendController.getUserList);
router.post('/getFriendLists', friendController.getFriendLists);

module.exports = router;