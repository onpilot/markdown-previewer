import React from 'react';

function App() {
  const [value, setValue] = React.useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
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
      <div id="preview">{value}</div>
    </>
  );
}

export default App;
