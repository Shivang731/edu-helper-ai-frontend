import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import SummaryCard from './components/SummaryCard';
import { summarizeText, generateFlashcards } from './api';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const process = async () => {
    if (!inputText) return;
    setLoading(true);
    try {
      const s = await summarizeText(inputText);
      setSummary(s.summary || s);           // handle raw string or object
      const c = await generateFlashcards(inputText);
      setCards(c);
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto max-w-3xl p-6 text-purple-50">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-black">Edu Helper AI</h1>
        <p className="opacity-70">Generate summaries & flashcards in seconds</p>
      </header>

      <FileUpload onLoaded={setInputText} />

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Or paste text here…"
        className="mt-4 w-full h-40 p-3 rounded-md bg-purple-900/30"
      />

      <button
        onClick={process}
        disabled={loading}
        className="mt-4 px-5 py-2 rounded-md bg-gradient-to-r from-pink-500 to-purple-600 font-semibold hover:scale-105 transition"
      >
        {loading ? 'Processing…' : 'Generate'}
      </button>

      <SummaryCard summary={summary} />

      {cards.length > 0 && (
        <section className="mt-8">
          <h3 className="text-xl font-bold mb-3">Flashcards ({cards.length})</h3>
          <ul className="grid gap-3">
            {cards.map((c, i) => (
              <li
                key={i}
                className="p-4 bg-purple-800/30 rounded-md border border-purple-700"
              >
                <strong>Q:</strong> {c.front}
                <br />
                <strong>A:</strong> {c.back}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
