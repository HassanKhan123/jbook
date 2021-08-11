import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import CodeEditor from './components/code-editor';
import Preview from './components/preview';
import bundler from './bundler';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState<string | undefined>('');

  const submitHandler = async () => {
    const output = await bundler(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue='const b = 1 ;'
        onChange={val => setInput(val)}
      />
      <div>
        <button onClick={submitHandler}>Submit</button>
      </div>

      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
