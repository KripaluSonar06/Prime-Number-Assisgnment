// src/api.js
// Helper to stream from your Python backend streaming endpoints (questionX_stream)
export async function streamFromBackend(questionId, inputs = {}, callbacks = {}) {
  // callbacks: { onLine(line), onError(err), onDone(), signal }
  const { onLine = () => {}, onError = () => {}, onDone = () => {}, signal } = callbacks;

  // Map questionId -> endpoint name
  // questionId may be '1','2',... or '7a','7b',... etc
  function endpointFor(id) {
    // If an explicit 7-subquestion like '7a' is used, pass as-is.
    if (/^7[a-f]$/.test(id)) return `question${id}_stream`;
    // numeric ids
    const n = parseInt(id, 10);
    if (!isNaN(n)) {
      return `question${n}_stream`;
    }
    // fallback
    return `question${id}_stream`;
  }

  const endpoint = endpointFor(questionId);

  // Build query params from inputs object (inputs values are strings from inputs)
  const params = new URLSearchParams();
  // typical inputs may be { n: '2', m: '1040', pm: '10', type: 'a' } etc
  for (const [k, v] of Object.entries(inputs || {})) {
    if (v === undefined || v === null || v === "") continue;
    // if question 7 main ID, we may have inputs.type used by UI (but we map questionId already)
    params.append(k, v);
  }

  // final URL (adjust host/port to your backend)
  const base = "http://127.0.0.1:8000"; // <-- your Python backend
  const url = `${base}/${endpoint}${params.toString() ? `?${params.toString()}` : ""}`;

  try {
    const res = await fetch(url, { method: "GET", signal });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${res.statusText} ${text}`);
    }
    if (!res.body) throw new Error("Streaming not supported by this browser / server response.");

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop(); // last partial line
      for (const line of lines) {
        // skip empty lines if desired:
        onLine(line);
      }
    }
    // remaining buffer
    if (buffer && buffer.trim() !== "") onLine(buffer);
    onDone();
  } catch (err) {
    // If aborted, err.name === 'AbortError' — caller handles that if they want
    onError(err);
    throw err;
  }
}
