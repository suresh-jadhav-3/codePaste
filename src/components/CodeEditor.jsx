import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({
  value,
  onChange,
  language = "javascript",
  height = "400px",
  readOnly = false,
}) => {
  return (
    <Editor
      height={height}
      language={language}
      value={value}
      onChange={(val) => !readOnly && onChange(val || "")}
      theme="vs-dark"
      options={{
        readOnly,
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;

