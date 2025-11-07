import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router"
import toast from "react-hot-toast";
import api from "../lib/axios";


const NoteCard = ({note, setNotes}) =>{
    const handleDelete = async (e, id) =>{
        e.preventDefault();

        if(!window.confirm('Are you sure you want to delete this note?')) return;

        try{
            await api.delete(`/notes/${id}`)
            setNotes((prev)  => prev.filter(note => note._id !== id))
            toast.success('Note deleted successfully')
        }catch(error){
            console.log('Error in handleDelete', error)
            toast.error('Failed to delete note.')
        }
    };

    return <Link to={`/note/${note._id}`}
      className="Card bg-neutral hover:shadow-lg transition-all duration-200 border-b-4 border-solid border-base-300 rounded-md">
        <div className="card-body text-base-content ">
            <h3 className="card-title">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">
                {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'N/A'}
                </span>
                <div className="flex item-center gap-1">
                    <PenSquareIcon className="size-4"/>
                    <button onClick={(e) => handleDelete(e, note._id)}>
                        <Trash2Icon className="size-4"/>
                    </button>
                </div>
               
            </div>
        </div>

    </Link>
}

export default NoteCard;