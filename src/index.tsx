import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as esbuild from 'esbuild-wasm';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    startService();
  }, []);

  const startService = async () => {
    const service = await esbuild.startService({
      worker: true,
      wasmURL: './esbuild.wasm',
    });
    console.log(service);
  };

  const submitHandler = () => {
    console.log(input);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={submitHandler}>Submit</button>
      </div>

      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
