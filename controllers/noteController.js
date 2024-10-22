const Note = require("../models/notesModel");

// Create note
exports.createNote = async (req, res) => {
    try {
        const note = await Note.create({
            title: req.body.title,
            content: req.body.content,
            user: req.user.id // Comes from auth middleware
        });
        res.status(200).json({message:"Note created successfully!"});
    } catch (error) {
      
        res.status(500).json({ message: error});
    }
};

// Get all notes for logged-in user
exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        const notesData = notes.map(note => ({
            title: note.title,
            content: note.content,
            userId:note.user,
            noteId:note.id,
            createdAt:note.createdAt,
            
        }));
        res.status(200).json({data:notesData});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update note
exports.updateNote = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { title: req.body.title, content: req.body.content },
            { new: true }
        );
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete note
exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
