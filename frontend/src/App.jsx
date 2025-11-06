import { Route, Routes} from 'react-router';

import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'


const App = () =>{
  return(
    <div data-theme="luxury">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/create' element={<CreatePage/>}/>
        <Route path='/note/:id' element={<NoteDetailPage/>}/>
        {/* <Route path='/all-notes' element={<AllNotes/>}/> */}
      </Routes>
    </div>
  )
}

export default App