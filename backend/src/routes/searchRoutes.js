
import express from 'express'
import { Search, Summarize} from '../controllers/searchController.js'
const router = express.Router();

router.post('/search', Search)


export default router;
