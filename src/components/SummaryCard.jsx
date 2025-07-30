import React from 'react';

export default function SummaryCard({ summary }) {
  if (!summary) return null;
  return (
    <article className="mt-6 p-6 rounded-lg bg-purple-800/30 shadow-lg">
      <h3 className="text-xl font-bold mb-2">AI Summary</h3>
      <p className="leading-relaxed whitespace-pre-wrap">{summary}</p>
    </article>
  );
}
