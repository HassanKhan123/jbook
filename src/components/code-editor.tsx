import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string | undefined): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const handleEditorChange: OnChange = (value, event) => {
    onChange(value);
  };

  const handleEditorOnMount: OnMount = (editor, monaco) => {
    editor.getModel()?.updateOptions({ tabSize: 2 });
  };
  return (
    <MonacoEditor
      onChange={handleEditorChange}
      onMount={handleEditorOnMount}
      value={initialValue}
      height='500px'
      language='javascript'
      theme='vs-dark'
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
