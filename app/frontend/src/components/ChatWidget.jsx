import { useEffect, useRef, useState } from 'react';
import { api } from '../lib/api';
import { trackEvent } from '../lib/gtag';

const WELCOME_MESSAGE =
  "Hi! I'm Viha, the Vihakids assistant. Ask me about our Kannada, Hindi, Math or Science classes, grades, boards, or the free demo class.";

// The model replies in plain markdown (mainly **bold**); render just that
// one construct rather than pulling in a full markdown parser for a widget
// this small.
function renderFormatted(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: WELCOME_MESSAGE }]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  function handleOpen() {
    setOpen(true);
    if (messages.length === 1) trackEvent('chat_widget_open', { method: 'chat' });
  }

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setSending(true);
    setError('');

    try {
      // Only send real conversation turns (skip the client-only welcome message).
      const apiMessages = nextMessages.slice(1).slice(-19);
      const { reply } = await api.sendChatMessage(apiMessages);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setError(err.message || "Couldn't send that. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Vihakids chat assistant">
          <div className="chat-panel-header">
            <div>
              <strong>Ask Vihakids</strong>
              <span>Usually replies in seconds</span>
            </div>
            <button type="button" className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
              &times;
            </button>
          </div>

          <div className="chat-messages" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble chat-bubble-${m.role}`}>{renderFormatted(m.content)}</div>
            ))}
            {sending && <div className="chat-bubble chat-bubble-assistant chat-bubble-typing">Typing&hellip;</div>}
          </div>

          {error && <p className="chat-error">{error}</p>}

          <form className="chat-input-row" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              maxLength={1000}
              disabled={sending}
              aria-label="Your message"
            />
            <button type="submit" className="chat-send" disabled={sending || !input.trim()} aria-label="Send message">
              &rarr;
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="chat-fab"
        onClick={() => (open ? setOpen(false) : handleOpen())}
        aria-label={open ? 'Close chat' : 'Chat with Vihakids'}
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  );
}
