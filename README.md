# YourThoughts
full-stack basic note taking application for helping you to take basic notes with no heavy overwhelming UI.

## Features  
**1.CRUD operations** Create, Read, Update, and delete notes.  
**2.Storage** notes are stored using **MongoDB** databse.  
**3.AI Search** implemented gemini model smart AI search for notes.  
**4.Rate Limiting** implemented rate limiting to manage and controll requests.  
**5.Clean UI** simple ui componets used for easy to handle ui.  
**6.Toast Notification** sets friendly ui notification components for frontend.  

## Tech Stack  
### Frontend  
**Framework** React  
**Routing** React Router DOM  
**Styling** Tailwind css, DaisyUI  
**HTTP Client** Axios 
**Notification** react-hot-toast  

### Backend  
**Runtime** Node.js
**Framework** Express
**Database** MongoDB  
**AI Integration** Gemini API  
**Middleware** Rate-limit implementation  
**Environment Variables** dotenv

### Prerquisites  
Node.js  
React  
MongoDB(Local or like MongoDB atlas)  
Gemini Api key  

### Backend setup
**Clone the repository and navigate to backend directory**  
**Install dependancies**  
``` npm install```  
**Create a .env file in the root directory of backend directory**
```#.env
MONGO_URI=your-mongodb-connection-string
PORT=port-here
NODE_ENV=development
UPSTASH_REDIS_REST_URL=your-upstash-redis-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token
GEMINI_API_KEY=gemini-api-key-here
```
## Frontend setup  
**Navigate to frontend directory**  
**Install dependancies**
```npm install ```  
**Configure Api Base Url**  
create lib/axios.js file in src directory  
Set the BASE_URL here so the frontend should be configured to the backend  
**Start React Server**   
```npm run dev```  


## Api Endpoints  

### Notes controller
















