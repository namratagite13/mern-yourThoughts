
import { Link } from 'react-router'; // ✅ CORRECT IMPORT
import { NotebookIcon } from 'lucide-react';

const NotesNotFound = () =>{

    return(
        <div className="flex flex-col items-center justify-center py-5 space-y-6
        max-w-md mx-auto text-center">
            
            <p className="text-base-content">
                Organize your thoughts, Don't keep them in your mind.
            </p>
            <Link to="/create" className="btn btn-neutral">
            Organize Your Thoughts.
            </Link>
        </div>
    );
}

export default NotesNotFound;