

import {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';
import api from '../lib/axios'
import { ArrowLeftIcon } from 'lucide-react';

const EditPage = () =>{

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);


    useEffect(() =>{
        const fetchNote = async () =>{
            try{
                const response = await api.get(`/notes/${id}`);
                const noteData = response.data.note;

                setTitle(noteData.title)
                setContent(noteData.content)

            }catch(error){
                console.error('Error fetching note', error)
                toast.error('failed to load for editing.')
                navigate('/')
            }finally{
                setFetching(false)

            }
        };
        if(id){
            fetchNote();
        }

    }, [id, navigate])

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(!title || !content){
            toast.error('All fields are required')
            return
        }

        setLoading(true);
        try{
            await api.put(`/notes/${id}`,{
                title,
                content
            });
            toast.success('Note updated successfully.')
            navigate("/")
        }catch(error){
            console.error('Error updating note', error)
            if(error.response && error.response.status === 429){
                toast.error(`Slow down! You are updating notes too fast.`,{
                    duration: 4000 //4 seconds
                })
            }else{
                toast.error('failed to update note.')
            }
        }finally{
            setLoading(false)

        }
    }

    if(fetching){
       return(
        <div className='min-h-screen bg-base-200 flex justify-center items-center'> 
            <span className='loading loading-spinner loading-lg'></span>
        </div>
       ) 
    }


    return(
        <div className='min-h-screen bg-base-200'>
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-2xl mx-auto'>
                    <Link to="/" className='btn btn-neutral mb-6'>
                    <ArrowLeftIcon className='size-5'/>
                    Back to Note
                    </Link>

                    <div className='card bg-base-100'>
                        <div className='card-body'>
                            <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>Title</span>
                                    </label>
                                    <input type='text' 
                                    placeholder='Note Title'
                                    className='input input-bordered'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}/>
                                </div>

                                <div className='form mb-4'>
                                    <label className='label'>
                                        <span className='label-text'>Content</span>
                                    </label>
                                    <textarea 
                                    placeholder='Write your note here...'
                                    className='textarea textarea-bordered h-32 w-full'
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    >
                                    </textarea>

                                </div>

                                <div className='card-actions justify-end'>
                                    <button type='submit' className='btn btn-neutral' disabled={loading} >
                                        {loading ? 'Updating...' : "Save Changes"}
                                    </button>
                                    
                                </div>
                                
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )


}


export default EditPage