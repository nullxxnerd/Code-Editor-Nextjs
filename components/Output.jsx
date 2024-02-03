"use client";
import { LANGUAGE_VERSIONS } from "@/app/constants";
import { useState } from "react";

export default function Output({ editorRef, language }) {
  const [output, setOutput] = useState();
  const [loading, setLoading] = useState(false);
  const executeCode = async (language, sourceCode) => {
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: language,
        version: LANGUAGE_VERSIONS[language],
        files: [
          {
            content: sourceCode,
          },
        ],
      }),
    });

    const data = await response.json();
    console.log(data);
    setOutput(data?.run?.output.split("\n"));
    console.log(data?.run?.output);
    return data;
  };

  const runCode = async () => {
    setLoading(true);
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      const sendCode = await executeCode(language, sourceCode);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <span className="text-lg font-bold opacity-80 ">Output</span>
      <button
        onClick={runCode}
        className="mx-3 border-2 border-emerald-400 text-emerald-400 mb-2 rounded-md py-2 px-4 mb-4"
      >
        {loading ? "Running Code.." : "Run Code"}
      </button>
      <div
        className="rounded bg-slate-950 text-base border border-gray-700 px-6 p-4 opacity-80"
        style={{ height: "80vh" }}
      >
        {output
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
}
