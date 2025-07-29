import React from 'react';
import useFile from '../hooks/useFile';

export default function FileUpload({ onLoaded }) {
  const { name, content, handleChange } = useFile();

  // Tell parent once we have text
  React.useEffect(() => {
    if (content) onLoaded(content);
  }, [content]);

  return (
    <section className="p-4 border rounded-md bg-gradient-to-r from-purple-700/20 to-purple-900/20">
      <label className="font-semibold block mb-2">Upload PDF or TXT</label>
      <input
        type="file"
        accept=".pdf,.txt"
        className="file-input"
        onChange={handleChange}
      />
      {name && <p className="mt-2 text-sm text-purple-200">{name} selected</p>}
    </section>
  );
}
