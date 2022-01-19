import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

function App() {
  const [value, setValue] = React.useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const sanitizer = DOMPurify.sanitize;
  const getRawMarkup = () => {
    return { __html: sanitizer(marked(value)) };
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
