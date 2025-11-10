# YourThoughts Notes App
full-stack basic note taking application for helping you to take basic notes with easy to use UI.

# LIVE DEMO  
***render link***  
https://mern-yourthoughts-1.onrender.com

## Features  
**1.CRUD operations** Create, Read, Update, and delete notes.  
**2.Storage** notes are stored using **MongoDB** databse.  
**3.AI Search** implemented gemini model smart AI search for notes.  
**4.Rate Limiting** implemented rate limiting to manage and controll requests.  
**5.Clean UI** simple ui componets used for easy to handle ui.  
**6.Toast Notification** sets friendly ui notification components for frontend.  

## Tech Stack  
### Frontend  
1.**Framework** -React  
2.**Routing** -React Router DOM  
3.**Styling** -Tailwind css, DaisyUI  
4.**HTTP Client** -Axios 
5.**Notification** -react-hot-toast  

### Backend  
1.**Runtime** -Node.js
2.**Framework** -Express
3.**Database** -MongoDB  
4.**AI Integration** -Gemini API  
5.**Middleware** -Rate-limit implementation  
6.**Environment Variables** -dotenv

### Prerquisites  
#Node.js  
#React    
#MongoDB(Local or like MongoDB atlas)    
#Gemini Api key  

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
1.**Navigate to frontend directory**  
2.**Install dependancies**
```npm install ```  
3.**Configure Api Base Url**  
4.create lib/axios.js file in src directory  
5.Set the BASE_URL here so the frontend should be configured to the backend  
6.**Start React Server**   
```npm run dev```  


## Api Endpoints  

### Notes Controllers  
GET - ```/api/notes``` : All notes  
GET - ```/api/notes/:id``` : Note by Id  
POST - ```/api/notes``` : Create note  
PUT - ```/api/notes/:id``` : Update note  
DELETE- ```/api/notes/:id``` : Delete note  

## Search Controllers
POST - ```/api/ai/search``` : Serch Note 

## Backend File Structure  
**server.js**  __Main entry point, library imports, MongoDB connection, Application server connection link, Express Initialization.  

**ratelimiter.js** __Middleware for manage and limit rate of requests made by server or client using upstash rate limiter API  

**notesController.js** __Controllers and logic behind notes CRUD function.  

**searchController.js** __Search controller and logic behind gemini AI serch API.  

**notesRoutes.js** __All the Endpoints and routes for connecting controllers logic with routes.  

**searchRoutes.js** __Search route connecting with searchController.  

**Notes.js** __Note model schema structure for defining note structure.  

**.env** __Environment variables.  

**db.js**__ MongoDB database connection logic.  

**upstash.js**  __Upstash ratelimiter is defined here.  

# LIVE DEMO  
***render link***  
https://mern-yourthoughts-1.onrender.com






















