
import mongoose from 'mongoose'


const noteSchema = new mongoose.Schema({

    title:{
        type: String,
        required: [true, 'A note title is required'],
        trim: true,
    },
    content:{
        type: String,
        required: [true, 'Note content cannot be empty.']
    },
}, {
    timestamps: true
});

noteSchema.index({ title: 'text', content: 'text' });
const Note = mongoose.model('Note', noteSchema);
export default Note