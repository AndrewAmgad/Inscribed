const express = require('express');
const router = express.Router();

const notesController = require('../controllers/notes');

const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, notesController.get_all);
router.get('/:noteId', checkAuth, notesController.getNote);


router.post('/', checkAuth, notesController.post);
router.patch('/:noteId', checkAuth, notesController.patch)

router.delete('/:noteId', checkAuth, notesController.delete);


module.exports = router;