import { useEffect, useState } from "react"
import Navbar from "../components/Navbar" // Assuming Navbar is correctly updated
import RateLimitedUI from "../components/RateLimitedUI"
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";


const HomePage = () =>{
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes ] = useState([]);
    const [loading, setLoading] = useState(true);

   
    const [aiSearchState, setAiSearchState] = useState({ 
        result: null, 
        error: null, 
        query: '' 
    });

    
    const handleNewAiResult = ({ result, error, query }) => {
        setAiSearchState({ result, error, query });
    };


    useEffect(() =>{
        const fetchNotes = async () =>{
            try{
                const res = await api.get("/notes")
                console.log(res.data);
                setNotes(res.data)
                setIsRateLimited(false)
            }catch(error){
                console.log('Error fetching notes');
                console.log(error.response)
                if(error.response?.status === 429){
                    setIsRateLimited(true)
                }else{
                    toast.error('Failed to load notes.')
                }
            }finally{
                setLoading(false)
            }
        };
        fetchNotes()
    }, []);


    return (
        <div className="min-h-screen">
           
            <Navbar onAiSearchResult={handleNewAiResult} />
            
            {isRateLimited && <RateLimitedUI/>}
            <div className="max-w-7xl mx-auto p-3 mt-4">
                {aiSearchState.error && (
                    <div className="p-4 mb-8 text-sm text-red-600 bg-red-50">
                        {aiSearchState.error}
                    </div>

                )}
                {aiSearchState.result && (
                    <div className="mx-auto max-w-5xl">
                        <div className="bg-base-content rounded-lg mb-3 animate-fadeIn shadow-lg">
                            <h3 className="p-4 text-xl font-bold text-gray-800 flex items-center">
                                AI Result for: {aiSearchState.query}
                            </h3>
                            <p className=" p-3 whitespace-pre-wrap text-black leading-relaxed text-base">
                                {aiSearchState.result}
                            </p>
                            
                        </div>
                        
                    </div>
                )}

                {loading && <div className="text-center py-10">Loading notes...</div>}
                {notes.length === 0 && !isRateLimited && aiSearchState.result === null && <NotesNotFound />} 
                {notes.length > 0 && !isRateLimited && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {notes.map((note) =>{
                        return <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                    })}
                </div>
                )}
            
            </div>
        </div>
    );
};

export default HomePage;