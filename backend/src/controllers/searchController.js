
import 'dotenv/config';
import { GoogleGenAI } from '@google/genai'

import Note from'../models/Notes.js';


// Check for API Key
if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set in the .env file.");
    process.exit(1);
}

async function getRelevantNotes(searchQuery){
    try{
        const notes = await Note.find(
            {$text: {$search: searchQuery}},
            {score: {$meta: 'textScore'}}
        ).sort({score: {$meta: "textScore"}})
        .limit(5)
        .select('title content')
        return notes
    }catch(error){
        console.error('Database Retrieval error', error)
        return []
    }
}


// Initialize the Gemini AI client
// This will use the key from the environment variables automatically
const ai = new GoogleGenAI({});

export async function Search(req, res){

    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }
    
    console.log(`Received query: ${query}`);
    try {
    const relevantNotes = await getRelevantNotes(query);
    if(relevantNotes.length === 0){
        return res.json({
            success: true,
            query: query,
            result: `I have't found any specific notes related to "${query}"in your collection. Please try different query.`
        }) 
    }
    const notesContext = relevantNotes.map((note, index) => 
        `\n--- Note ${index+1} ---\nTitle: ${note.title}\nContext: ${note.content}`).join('\n') 
    const systemInstruction = ` You are a helpful and precise note-search assistant. Your task is to analyze the users query and provide a summarized answers Only based on the provided notes below. Do not use external knowledge. If the notes do not contain the answer, state that clearly and politely. 
    <NOTES_CONTEXT>
    ${notesContext}
    </NOTES_CONTEXT>
    User Query: ${query}`
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: systemInstruction }] }],

        });
        const resultText = response.text;
        res.json({
            success: true,
            query: query,
            result: resultText,
        });
    } catch (error) {
        console.error('Gemini API Error:', error.message);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to communicate with the Gemini API.',
            details: error.message
        });
    }

};


export async function Summarize(req, res) {

    const { content } = req.body;
    if(!content){
        return res.status(400).json({
            error: 'Note content is required for summarization.'
        })
    }

    console.log(`Received content for summarization (first 50 chars): ${content.substring(0,50)}...`);
    try{
        const systemInstruction = `You are expert summarization assistant. Your task is to provide a concise and accurate summary of following text. The summary should be easy to read and capture all the main points.
        <TEXT_TO_SUMMARIZE>
        ${content}
        </TEXT_TO_SUMMARIZE>`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{
                role: "user",
                parts: [{
                    text: systemInstruction
                }]
            }],
        })

        const summaryText = response.text;

        res.json({
            success: true,
            summary: summaryText
        })

        
    }catch(error){
        console.error('Gemini API Error:', error.message);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to generate note summary.',
            details: error.message
        });
    }

}