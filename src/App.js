import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import sample from './initial.md';
import './App.css';

// parsing markdown on raw HTML markup input using marked.js
const parseMarkdown = (rawMarkup) => {
  return marked(rawMarkup);
};
// sanitizes HTML (preventing XSS attacks) using DOMPurify
const sanitizer = (dirty) => {
  return DOMPurify.sanitize(dirty);
};

function App() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const getRawMarkup = () => {
    const compiledMarkdown = parseMarkdown(value);
    const clean = sanitizer(compiledMarkdown);
    return { __html: clean };
  };

  useEffect(() => {
    fetch(
      sample
      // 'https://raw.githubusercontent.com/markedjs/marked/e5796ecc435a30f96939e6a7b2229c14264b4bf8/docs/demo/initial.md'
    )
      .then((response) => {
        // console.log(response);
        if (response.ok) {
          return response.text();
        }
        throw response;
      })
      .then((text) => {
        setValue(text);
      })
      .catch((error) => {
        console.error('Error fetching sample text: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return 'Loading...';
  }
  if (error) {
    return 'Error!';
  }

  return (
    <div className="row">
      <div className="column">
        <textarea
          name="editor"
          id="editor"
          className="boxsizingBorder"
          value={value}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="column">
        <div
          id="preview"
          className="boxsizingBorder"
          dangerouslySetInnerHTML={getRawMarkup()}
        ></div>
      </div>
    </div>
  );
}

export default App;
