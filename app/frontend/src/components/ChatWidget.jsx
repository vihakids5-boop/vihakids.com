import { useEffect, useRef, useState } from 'react';
import { api } from '../lib/api';
import { trackEvent } from '../lib/gtag';

const WELCOME_MESSAGE =
  "Hi! I'm Viha, the Vihakids assistant. Ask me about our English, Hindi, Math, Science or Kannada classes, grades, boards, or the free demo class.";

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 3.5c-5.25 0-9.5 3.58-9.5 8s4.25 8 9.5 8c.72 0 1.42-.07 2.09-.2.98.82 2.4 1.4 4.16 1.6-.62-.82-1-1.75-1.13-2.68C18.66 16.63 19.5 15.9 20.5 15c.65-1.1 1-2.3 1-3.5 0-4.42-4.25-8-9.5-8Z"
        fill="currentColor"
      />
      <circle cx="8.25" cy="11.5" r="1.15" fill="var(--oxide)" />
      <circle cx="12" cy="11.5" r="1.15" fill="var(--oxide)" />
      <circle cx="15.75" cy="11.5" r="1.15" fill="var(--oxide)" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

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
      const { reply, registrationCreated } = await api.sendChatMessage(apiMessages);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      if (registrationCreated) trackEvent('generate_lead', { method: 'chatbot' });
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
        className={`chat-fab${open ? ' chat-fab-open' : ''}`}
        onClick={() => (open ? setOpen(false) : handleOpen())}
        aria-label={open ? 'Close chat' : 'Chat with Vihakids'}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
        {!open && <span className="chat-fab-badge" aria-hidden="true">🎓</span>}
      </button>
    </div>
  );
}
