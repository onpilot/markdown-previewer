import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import sample from './initial.md';
import FooterProfile from './FooterProfile';
import Anchor from './Anchor';
import './App.css';
import 'github-markdown-css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
        <p className="branding">
          <FooterProfile profile={'github'}></FooterProfile>
          <FooterProfile profile={'twitter'}></FooterProfile>
          <FooterProfile profile={'linkedin'}></FooterProfile>
        </p>
        <p>Crafted with ❤️ in Indonesia by Idan</p>
        <p>
          Powered by
          <Anchor
            name={'create-react-app'}
            link={'https://github.com/facebook/create-react-app'}
          ></Anchor>
          &#x2022;
          <Anchor
            name={'react-gh-pages'}
            link={'https://github.com/gitname/react-gh-pages'}
          ></Anchor>
          &#x2022;
          <Anchor name={'marked'} link={'https://marked.js.org'}></Anchor>
          &#x2022;
          <Anchor
            name={'DOMPurify'}
            link={'https://github.com/cure53/DOMPurify'}
          ></Anchor>
          &#x2022;
          <Anchor
            name={'github-markdown-css'}
            link={'https://github.com/sindresorhus/github-markdown-css'}
          ></Anchor>
        </p>
      </div>
    </div>
  );
}

// interprets carriage returns and renders them as br
// see: https://marked.js.org/using_advanced
marked.setOptions({
  breaks: true,
});

export default App;
