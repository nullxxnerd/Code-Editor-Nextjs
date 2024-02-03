"use client";
import { useState, useRef } from "react";
import LanguageSelector from "./languageSelector";
import Editor from "@monaco-editor/react";
import { CODE_SNIPPETS } from "@/app/constants";
import Output from "@/components/Output";
function CodeEditor() {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
    console.log("corrent language is ", language);
  };
  return (
    <div className="grid grid-cols-2 gap-2 ">
      <div>
        <LanguageSelector language={language} onSelect={onSelect} />
        <Editor
          height="80vh"
          theme="vs-dark"
          language={language}
          defaultValue={CODE_SNIPPETS[language]}
          onMount={onMount}
          value={value}
          onChange={(value) => setValue(value)}
        />
      </div>
      <div>
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );
}

export default CodeEditor;
