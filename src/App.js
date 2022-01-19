import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// parsing markdown on raw HTML markup input using marked.js
const parseMarkdown = (rawMarkup) => {
  return marked(rawMarkup);
};
// sanitizes HTML (preventing XSS attacks) using DOMPurify
const sanitizer = (dirty) => {
  return DOMPurify.sanitize(dirty);
};

function App() {
  const [value, setValue] = React.useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const getRawMarkup = () => {
    const compiledMarkdown = parseMarkdown(value);
    const clean = sanitizer(compiledMarkdown);
    return { __html: clean };
  };
  return (
    <>
      <textarea
        name="editor"
        id="editor"
        cols="30"
        rows="10"
        value={value}
        onChange={handleChange}
      ></textarea>
      <div id="preview" dangerouslySetInnerHTML={getRawMarkup()}></div>
    </>
  );
}

export default App;
