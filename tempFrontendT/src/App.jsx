import { useState } from "react";
import "./index.css";

function App() {
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [activeTab, setActiveTab] = useState("problem");

  const [q1Input, setQ1Input] = useState({ n: "", m: "" });
  const [q2Input, setQ2Input] = useState({ n: "", m: "", pm: "" });
  const [q3Input, setQ3Input] = useState({ n: "", m: "" });
  const [q4Input, setQ4Input] = useState({ n: "", m: "" });
  const [q5Input, setQ5Input] = useState({ n: "", m: "", pm: "" });
  const [q6Input, setQ6Input] = useState({ n: "", m: "" });
  const [q7Input, setQ7Input] = useState({ n: "" });

  const [terminalOutput, setTerminalOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const fetchQuestion = async () => {
    let url = "";
    if (activeQuestion === 1) {
      const { n, m } = q1Input;
      if (!n || !m) return setTerminalOutput(["Please fill all inputs"]);
      url = `http://127.0.0.1:8000/question1_stream?n=${n}&m=${m}`;
    } else if (activeQuestion === 2) {
      const { n, m, pm } = q2Input;
      if (!n || !m || !pm) return setTerminalOutput(["Please fill all inputs"]);
      url = `http://127.0.0.1:8000/question2_stream?n=${n}&m=${m}&pm=${pm}`;
    } else if (activeQuestion === 3) {
      const { n, m } = q3Input;
      if (!n || !m) return setTerminalOutput(["Please fill all inputs"]);
      url = `http://127.0.0.1:8000/question3_stream?n=${n}&m=${m}`;
    } else if (activeQuestion === 4) {
      const { n, m } = q4Input;
      if (!n || !m) return setTerminalOutput(["Please fill all inputs"]);
      url = `http://127.0.0.1:8000/question4_stream?n=${n}&m=${m}`;
    } else if (activeQuestion === 5) {
      const { n, m, pm } = q5Input;
      if (!n || !m || !pm) return setTerminalOutput(["Please fill all inputs"]);
      url = `http://127.0.0.1:8000/question5_stream?n=${n}&m=${m}&pm=${pm}`;
    } else if (activeQuestion === 6) {
      const { n, m } = q6Input;
      if (!n || !m) return setTerminalOutput(["Please fill all inputs"]);
      url = `http://127.0.0.1:8000/question6_stream?n=${n}&m=${m}`;
    } else if (activeQuestion === 7) {
      const { n } = q7Input;
      if (!n) return setTerminalOutput(["Please fill input n for Q7a"]);
      url = `http://127.0.0.1:8000/question7a_stream?n=${n}`;
    } else if (activeQuestion === 8) {
      const { n } = q7Input;
      if (!n) return setTerminalOutput(["Please fill input n for Q7b"]);
      url = `http://127.0.0.1:8000/question7b_stream?n=${n}`;
    } else if (activeQuestion === 9) {
      const { n } = q7Input;
      if (!n) return setTerminalOutput(["Please fill input n for Q7c"]);
      url = `http://127.0.0.1:8000/question7c_stream?n=${n}`;
    } else if (activeQuestion === 10) {
      const { n } = q7Input;
      if (!n) return setTerminalOutput(["Please fill input n for Q7d"]);
      url = `http://127.0.0.1:8000/question7d_stream?n=${n}`;
    } else if (activeQuestion === 11) {
      const { n } = q7Input;
      if (!n) return setTerminalOutput(["Please fill input n for Q7e"]);
      url = `http://127.0.0.1:8000/question7e_stream?n=${n}`;
    } else if (activeQuestion === 12) {
      const { n } = q7Input;
      if (!n) return setTerminalOutput(["Please fill input n for Q7f"]);
      url = `http://127.0.0.1:8000/question7f_stream?n=${n}`;
    }

    setTerminalOutput([]);
    setActiveTab("terminal");
    setIsRunning(true);

    try {
      const res = await fetch(url);
      if (!res.body) throw new Error("Streaming not supported");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop(); // keep last incomplete line in buffer

        const nonEmpty = lines.filter((l) => l !== "");
        if (nonEmpty.length > 0) setTerminalOutput((prev) => [...prev, ...nonEmpty]);
      }

      if (buffer && buffer.trim() !== "") setTerminalOutput((prev) => [...prev, buffer]);
    } catch (err) {
      console.error(err);
      setTerminalOutput([`Error: ${err}`]);
    } finally {
      setIsRunning(false);
    }
  };

  const labelFor = (q) => {
    if (q <= 6) return `Q${q}`;
    if (q === 7) return "Q7a";
    if (q === 8) return "Q7b";
    if (q === 9) return "Q7c";
    if (q === 10) return "Q7d";
    if (q === 11) return "Q7e";
    if (q === 12) return "Q7f";
    return `Q${q}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-400">
          Prime Number Assignment
        </h1>
        <p className="text-gray-300 mt-2">Kripalu Sonar · Roll No: XXXXX</p>
        <p className="text-gray-300 mt-2">Taleem Hossain · Roll No: XXXXX</p>
        <p className="text-gray-300 mt-2">Malhar Kanhegaonkar · Roll No: XXXXX</p>
      </header>

      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-green-300 mb-4">
          Question {activeQuestion}
        </h2>

        <div className="flex space-x-4 border-b border-gray-700 mb-4">
          {["problem", "terminal", "code"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 ${activeTab === tab
                ? "text-green-400 border-b-2 border-green-400"
                : "text-gray-400 hover:text-green-300"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "problem" ? "Problem & Input" : tab === "terminal" ? "Terminal & Output" : "Code & Solution for Assignment Question"}
            </button>
          ))}
        </div>

        <div className="p-4 bg-gray-700 rounded-lg min-h-[200px]">
          {activeTab === "problem" && (
            <div className="flex flex-col gap-2">
              <div className="flex space-x-4 mb-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((q) => (
                  <button
                    key={q}
                    onClick={() => setActiveQuestion(q)}
                    className={`p-2 rounded ${activeQuestion === q ? "bg-green-400 text-black" : "bg-gray-600"}`}
                  >
                    {labelFor(q)}
                  </button>
                ))}
              </div>

              {activeQuestion === 1 && (
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min n"
                    className="p-2 rounded text-black"
                    value={q1Input.n}
                    onChange={(e) => setQ1Input({ ...q1Input, n: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Max n"
                    className="p-2 rounded text-black"
                    value={q1Input.m}
                    onChange={(e) => setQ1Input({ ...q1Input, m: e.target.value })}
                  />
                  <button
                    onClick={fetchQuestion}
                    className="p-2 bg-green-400 text-black rounded"
                    disabled={isRunning}
                  >
                    {isRunning ? "Running..." : "Run"}
                  </button>
                </div>
              )}

              {activeQuestion === 2 && (
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min n"
                    className="p-2 rounded text-black"
                    value={q2Input.n}
                    onChange={(e) => setQ2Input({ ...q2Input, n: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Max n"
                    className="p-2 rounded text-black"
                    value={q2Input.m}
                    onChange={(e) => setQ2Input({ ...q2Input, m: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Prime count (pm)"
                    className="p-2 rounded text-black"
                    value={q2Input.pm}
                    onChange={(e) => setQ2Input({ ...q2Input, pm: e.target.value })}
                  />
                  <button
                    onClick={fetchQuestion}
                    className="p-2 bg-green-400 text-black rounded"
                    disabled={isRunning}
                  >
                    {isRunning ? "Running..." : "Run"}
                  </button>
                </div>
              )}

              {activeQuestion === 3 && (
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min n"
                    className="p-2 rounded text-black"
                    value={q3Input.n}
                    onChange={(e) => setQ3Input({ ...q3Input, n: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Max n"
                    className="p-2 rounded text-black"
                    value={q3Input.m}
                    onChange={(e) => setQ3Input({ ...q3Input, m: e.target.value })}
                  />
                  <button
                    onClick={fetchQuestion}
                    className="p-2 bg-green-400 text-black rounded"
                    disabled={isRunning}
                  >
                    {isRunning ? "Running..." : "Run"}
                  </button>
                </div>
              )}
              {activeQuestion === 4 && (
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min n"
                    className="p-2 rounded text-black"
                    value={q4Input.n}
                    onChange={(e) => setQ4Input({ ...q4Input, n: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Max n"
                    className="p-2 rounded text-black"
                    value={q4Input.m}
                    onChange={(e) => setQ4Input({ ...q4Input, m: e.target.value })}
                  />
                  <button
                    onClick={fetchQuestion}
                    className="p-2 bg-green-400 text-black rounded"
                    disabled={isRunning}
                  >
                    {isRunning ? "Running..." : "Run"}
                  </button>
                </div>
              )}

              {activeQuestion === 5 && (
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min n"
                    className="p-2 rounded text-black"
                    value={q5Input.n}
                    onChange={(e) => setQ5Input({ ...q5Input, n: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Max n"
                    className="p-2 rounded text-black"
                    value={q5Input.m}
                    onChange={(e) => setQ5Input({ ...q5Input, m: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Prime count (pm)"
                    className="p-2 rounded text-black"
                    value={q5Input.pm}
                    onChange={(e) => setQ5Input({ ...q5Input, pm: e.target.value })}
                  />
                  <button
                    onClick={fetchQuestion}
                    className="p-2 bg-green-400 text-black rounded"
                    disabled={isRunning}
                  >
                    {isRunning ? "Running..." : "Run"}
                  </button>
                </div>
              )}

              {activeQuestion === 6 && (
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min n"
                    className="p-2 rounded text-black"
                    value={q6Input.n}
                    onChange={(e) => setQ6Input({ ...q6Input, n: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Max n"
                    className="p-2 rounded text-black"
                    value={q6Input.m}
                    onChange={(e) => setQ6Input({ ...q6Input, m: e.target.value })}
                  />
                  <button
                    onClick={fetchQuestion}
                    className="p-2 bg-green-400 text-black rounded"
                    disabled={isRunning}
                  >
                    {isRunning ? "Running..." : "Run"}
                  </button>
                </div>
              )}

              {(activeQuestion >= 7 && activeQuestion <= 12) && (
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="n"
                    className="p-2 rounded text-black"
                    value={q7Input.n}
                    onChange={(e) => setQ7Input({ ...q7Input, n: e.target.value })}
                  />
                  <button onClick={fetchQuestion} className="p-2 bg-green-400 text-black rounded" disabled={isRunning}>
                    {isRunning ? "Running..." : "Run"}
                  </button>
                </div>
              )}

            </div>
          )}

          {activeTab === "terminal" && (
            <div className="text-gray-200 max-h-96 overflow-auto">
              {terminalOutput.length === 0
                ? "...Computing..."
                : terminalOutput.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
            </div>
          )}

          {activeTab === "code" && (
            <pre className="text-green-300 overflow-auto max-h-96">
              {`# Your code preview can go here`}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;