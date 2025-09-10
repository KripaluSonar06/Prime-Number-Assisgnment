export async function streamFromBackend(questionId, inputs = {}, callbacks = {}) {
  const { onLine = () => {}, onError = () => {}, onDone = () => {}, signal } = callbacks;

  function endpointFor(id) {
    if (/^7[a-f]$/.test(id)) return `question${id}_stream`;
    const n = parseInt(id, 10);
    if (!isNaN(n)) return `question${n}_stream`;
    return `question${id}_stream`;
  }

  const endpoint = endpointFor(questionId);

  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(inputs || {})) {
    if (v === undefined || v === null || v === "") continue;
    params.append(k, v);
  }

  const url = `http://127.0.0.1:8000/${endpoint}${params.toString() ? `?${params.toString()}` : ""}`;

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
      buffer = lines.pop();
      for (const line of lines) {
        onLine(line);
      }
    }
    if (buffer && buffer.trim() !== "") onLine(buffer);
    onDone();

  } catch (err) {
    if (err.name === 'AbortError') {
      // silently handle user abort, call onDone anyway if needed
      onDone();
      return;
    }
    onError(err);
    throw err;
  }
}
