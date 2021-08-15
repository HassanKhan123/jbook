import ReactDOM from 'react-dom';

import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {
  return (
    <div>
      {/* <CodeCell /> */}
      <TextEditor />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
