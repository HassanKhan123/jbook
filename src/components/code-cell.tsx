import { useState } from 'react';

import CodeEditor from './code-editor';
import Preview from './preview';
import bundler from '../bundler';
import Resizable from './resizable';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState<string | undefined>('');

  const submitHandler = async () => {
    const output = await bundler(input);
    setCode(output);
  };

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <CodeEditor
          initialValue='const b = 1 ;'
          onChange={val => setInput(val)}
        />

        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
