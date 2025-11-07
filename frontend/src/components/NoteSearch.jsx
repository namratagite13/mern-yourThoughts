
import {useState} from 'react';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { ArrowRight, LucideLoaderCircle } from 'lucide-react';


const NoteSearch = ({onNewResult}) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) =>{
        e.preventDefault();


        if(!query.trim()){
            toast.error('Please enter a search query.');
            onNewResult({ result: null, error: 'Please enter a search query'})
            return
        }

        setLoading(true);
        

        const endpoint = '/ai/search';

        try{
            const response = await api.post(endpoint, {query});
            const data = response.data;

            if(!data.success){
                throw new Error(data.error || 'Search failed due to a server error.')
            }

            onNewResult({result: data.result, query: query});
            toast.success('Ai search successfully.')
            setQuery('');
        }catch(error){
            const errorMessage = error.message || 'An unexpected network error occurred.'
            toast.error(errorMessage);

            onNewResult({result: null, error: errorMessage})
        }finally{
            setLoading(false);
        }
    };



    return(
        <div className='w-full'>
            <form onSubmit={handleSearch} className='flex gap-2'>
                <input 
                type = "text"
                className="flex-grow p-2 text-sm rounded-md bg-base-300 text-white placeholder-grey"
                value = {query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask AI: Find my notes ..."
                disabled={loading}
                />

                <button type='submit'
                className='btn btn-neutral'>
                    {loading ?  <LucideLoaderCircle/> : <ArrowRight/>}
                </button>
            </form>

        </div>
    )
}

export default NoteSearch