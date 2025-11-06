

import Note from'../models/Notes.js';

export async function getAllNotes(req, res) {
    try{
        const note = await Note.find().sort({createAt:-1})
        res.status(200).json(note)

    }catch(error){
        console.error('Error in getAllNotes controller');// -1 will sort in desc
        res.status(500).json({
            message: 'Internal server error.'
        })

    }
};

export async function getNoteById(req, res) {
    try{
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message: 'Note id not found!'})

        res.status(200).json({
            note
        })
        
    }catch(error){
        console.error('Error in getAllNotes controller');
        res.status(500).json({
            message: 'Internal server error.'
        })
    }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res){
    try{
        const {title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,
            {title, content},
        {
            new: true
        })

        if(!updatedNote) return res.status(404).json({
            message: 'Note not found!'
        });
        res.status(200).json({
            message: "Note updated successfully."
        });
    }catch(error){
        console.error('Error in updateNote controller.');
        res.status(500).json({
            message: 'Internal server error.'
        });

    }
};

export async function deleteNote(req , res){
    try{

        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deleteNote) return res.status(404).json({
            message: "Note not found!"
        });

        res.status(200).json({
            message: "Note deleted successfully!"
        })

    }catch(error){
        console.error('Error in deleteNote controller.');
        res.status(500).json({
            message: 'Internal server error.'
        });

    }
}