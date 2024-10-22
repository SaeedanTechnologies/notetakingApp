const express = require('express');
const { createNote, getNotes, updateNote, deleteNote } = require("../controllers/noteController");
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/createNote', authMiddleware, createNote);
router.get('/getAllNotes', authMiddleware, getNotes);
router.put('/:id', authMiddleware, updateNote);
router.delete('/:id', authMiddleware, deleteNote);

module.exports = router;
