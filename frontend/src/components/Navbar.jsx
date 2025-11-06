import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import NoteSearch from "./NoteSearch";

// Navbar.jsx
const Navbar = ({onAiSearchResult}) =>{
    return(
    <header className="border-b-4 border-base-content/10">
        <div className="mx-auto max-w-5xl p-3">
            <div className="flex items-center justify-between">
               
                <h1 className="text-2xl font-bold text-base-content
                 font-mono tracking-tight">YourThoughts
                </h1>
                <div className="flex-grow max-w-xl mx-8">
                    {/* Pass the handler function to NoteSearch */}
                    <NoteSearch onNewResult={onAiSearchResult} />
                </div>
                <div className="flex items-center gap-4">
                    <Link to={"/create"} className="btn btn-neutral">
                    <PlusIcon className="size-5"/>
                    <span>New Note</span>
                    </Link>
                </div>
            </div>
        </div> 
    </header>
    ); 
};

export default Navbar;