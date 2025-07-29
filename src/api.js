import axios from 'axios';

// Read the back-end URL from an env var so it changes per deploy.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 15000
});

// Example helper – add more endpoints as needed.
export const summarizeText = async (text) => {
  const { data } = await api.post('/summarize', { text });
  return data; // { summary: '...' }
};

export const generateFlashcards = async (text) => {
  const { data } = await api.post('/flashcards', { text });
  return data.cards; // [ {front, back} ]
};

export default api;
