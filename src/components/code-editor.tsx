import { useRef } from 'react';
import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

import './code-editor.css';
import './syntax.css';
interface CodeEditorProps {
  initialValue: string;
  onChange(value: string | undefined): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const babelParse = (code: any) =>
    parse(code, {
      sourceType: 'module',
      plugins: ['jsx'],
    });

  const defaultOptions = {
    parser: 'babel', // for reference only, only babel is supported right now
    isHighlightGlyph: false, // if JSX elements should decorate the line number gutter
    iShowHover: false, // if JSX types should  tooltip with their type info
    isUseSeparateElementStyles: false, // if opening elements and closing elements have different styling
    isThrowJSXParseErrors: true, // Only JSX Syntax Errors are not thrown by default when parsing, true will throw like any other parsign error
  };
  const editorRef = useRef<any>();

  const handleEditorChange: OnChange = (value, event) => {
    onChange(value);
  };

  const handleEditorOnMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(
      // // @ts-ignore
      // window.monaco,
      // codeShift,
      // editor,
      monaco,
      babelParse,
      traverse,
      editor,
      defaultOptions,
    );

    highlighter.highLightOnDidChangeModelContent(100);
    // Activate JSX commenting
    highlighter.addJSXCommentCommand();
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue();
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    editorRef.current.setValue(formatted);
  };

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={onFormatClick}
      >
        Format
      </button>
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
    </div>
  );
};

export default CodeEditor;
