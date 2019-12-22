const express = require('express');
const router = express.Router();

const foldersController = require('../controllers/folders');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, foldersController.getFolders);

module.exports = router;