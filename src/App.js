import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import sample from './initial.md';
import './App.css';
import 'github-markdown-css';

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
    <div className="box">
      <div className="row header">
        <h1>📄 Markdown Previewer</h1>
        <p>Format your plain text into markdown</p>
      </div>
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
            className="boxsizingBorder markdown-body"
            dangerouslySetInnerHTML={getRawMarkup()}
          ></div>
        </div>
      </div>
      <div className="row footer">
        <p>Crafted with ❤️ in Indonesia by Idan</p>
        <p>
          Powered by
          <a href="https://github.com/facebook/create-react-app">
            create-react-app
          </a>
          +
          <a href="https://github.com/gitname/react-gh-pages">react-gh-pages</a>
          +<a href="https://marked.js.org">marked</a>+
          <a href="https://github.com/sindresorhus/github-markdown-css">
            github-markdown-css
          </a>
        </p>
      </div>
    </div>
  );
}

// interprets carriage returns and renders them as br
// see: https://marked.js.org/using_advanced
marked.setOptions({ breaks: true });

export default App;
