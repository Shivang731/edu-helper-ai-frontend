import { useState } from 'react';

export default function useFile() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setName(file.name);

    const text = await file.text();
    setContent(text);
  };

  return { name, content, handleChange };
}
