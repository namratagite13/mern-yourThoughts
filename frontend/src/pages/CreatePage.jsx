import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router'
import toast from 'react-hot-toast';
import api from '../lib/axios';

const CreatePage = () =>{
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!title || !content){
            toast.error("all fields are required")
            return 
        }

        setLoading(true);
        try{
            await api.post("/notes" ,{
                title,
                content
            });
            toast.success('Note created successfully.')
            navigate("/") //navigate to the home page

        }catch(error){
            console.log('Error creating note', error)
            if(error.response.status === 429){
                toast.error('Slow down! You are creating notes too fast', {
                    duration:4000,
                })
            }else{
                toast.error("failed to create note.")
            }

        }finally{
            setLoading(false)
        }

    }

    return(
        <div className='min-h-screen bg-base-200'>
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-2xl mx-auto'>
                    <Link to={"/"} className='btn btn-neutral mb-6'>
                    <ArrowLeftIcon className='size-5'/>
                    Back to Notes
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
                                    className='textarea textarea-bordered w-full h-52 flex-grow'
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    >
                                    </textarea>

                                </div>

                                <div className='card-actions justify-end'>
                                    <button type='submit' className='btn btn-neutral-content' disabled={loading}>
                                        {loading ? 'Creating...' : "Create Note"}
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

export default CreatePage