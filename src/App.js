import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

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
      'https://raw.githubusercontent.com/markedjs/marked/e5796ecc435a30f96939e6a7b2229c14264b4bf8/docs/demo/initial.md'
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
