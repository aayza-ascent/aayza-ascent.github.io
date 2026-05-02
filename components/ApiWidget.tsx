"use client";

import { useCallback, useEffect, useState } from "react";

type Joke = { setup: string; punchline: string };

const FALLBACK_JOKES: Joke[] = [
  {
    setup: "Why do programmers prefer dark mode?",
    punchline: "Because light attracts bugs.",
  },
  {
    setup: "How many programmers does it take to change a light bulb?",
    punchline: "None. It’s a hardware problem.",
  },
  {
    setup: "Why did the developer go broke?",
    punchline: "Because they used up all their cache.",
  },
  {
    setup: "What’s a programmer’s favorite hangout?",
    punchline: "The Foo Bar.",
  },
  {
    setup: "Why did the function break up with the loop?",
    punchline: "It felt like they were going in circles.",
  },
  {
    setup: "What do you call a programmer from Finland?",
    punchline: "Nerdic.",
  },
  {
    setup: "Why do Java developers wear glasses?",
    punchline: "Because they don’t C#.",
  },
  {
    setup: "What’s the object-oriented way to become wealthy?",
    punchline: "Inheritance.",
  },
];

export default function ApiWidget() {
  const [joke, setJoke] = useState<Joke>(FALLBACK_JOKES[0]);
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [source, setSource] = useState("local");
  const [count, setCount] = useState(1);

  const fetchJoke = useCallback(async () => {
    setLoading(true);
    setRevealed(false);
    await new Promise((r) => setTimeout(r, 450));
    try {
      const res = await fetch(
        "https://official-joke-api.appspot.com/jokes/programming/random",
      );
      const data = await res.json();
      if (Array.isArray(data) && data[0]?.setup) {
        setJoke({ setup: data[0].setup, punchline: data[0].punchline });
        setSource("official-joke-api.appspot.com");
      } else {
        throw new Error("bad payload");
      }
    } catch {
      const j =
        FALLBACK_JOKES[Math.floor(Math.random() * FALLBACK_JOKES.length)];
      setJoke(j);
      setSource("local fallback");
    } finally {
      setLoading(false);
      setCount((c) => c + 1);
    }
  }, []);

  useEffect(() => {
    fetchJoke();
  }, [fetchJoke]);

  return (
    <section id="api">
      <div className="container">
        <div className="eyebrow">07 / Live API</div>
        <h2 className="section-title">
          A <em className="serif">joke</em>, freshly fetched.
        </h2>
        <p
          style={{
            maxWidth: 560,
            color: "var(--ink-soft)",
            margin: "12px 0 48px",
          }}
        >
          This widget pulls a random programming joke from a public API each
          time you hit <em>refresh</em>. Tap the punchline to reveal it.
        </p>

        <div className="api-card glass">
          <div className="api-meta">
            <span className="mono">
              <span
                className="dot"
                style={{ background: loading ? "#FFD98E" : "#4ADE80" }}
              />
              {loading ? "GET /jokes/programming/random" : `200 OK · ${source}`}
            </span>
            <span className="mono" style={{ color: "var(--muted)" }}>
              request #{count}
            </span>
          </div>

          <div className={`api-body ${loading ? "loading" : ""}`}>
            {loading ? (
              <div className="skeleton">
                <div className="sk-line" style={{ width: "85%" }} />
                <div className="sk-line" style={{ width: "60%" }} />
                <div
                  className="sk-line"
                  style={{ width: "40%", marginTop: 24 }}
                />
              </div>
            ) : (
              <>
                <div className="joke-setup serif">
                  &ldquo;{joke.setup}&rdquo;
                </div>
                <button
                  className={`joke-punch ${revealed ? "shown" : ""}`}
                  onClick={() => setRevealed(true)}
                  aria-label={
                    revealed ? "Punchline" : "Tap to reveal punchline"
                  }
                >
                  {revealed ? joke.punchline : "▸ tap to reveal the punchline"}
                </button>
              </>
            )}
          </div>

          <div className="api-actions">
            <button
              className="btn btn-primary"
              onClick={fetchJoke}
              disabled={loading}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                style={{
                  animation: loading ? "spinIcon 1s linear infinite" : "none",
                }}
              >
                <path
                  d="M21 12a9 9 0 1 1-3.2-6.9M21 4v5h-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {loading ? "fetching…" : "refresh"}
            </button>
            <span
              className="mono"
              style={{ color: "var(--muted)", fontSize: 11 }}
            >
              powered by official-joke-api · public endpoint
            </span>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes spinIcon {
          to {
            transform: rotate(360deg);
          }
        }
        .api-card {
          padding: var(--space-8);
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
          background: var(--surface);
          border: 1px solid var(--ink-08);
        }
        .api-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          color: var(--ink-soft);
          padding-bottom: var(--space-4);
          border-bottom: 1px dashed var(--ink-10);
        }
        .api-meta .dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 6px;
          vertical-align: middle;
          box-shadow: 0 0 10px currentColor;
        }
        .api-body {
          min-height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: var(--space-6);
          padding: var(--space-5) 0;
        }
        .joke-setup {
          font-size: clamp(28px, 3.5vw, 42px);
          line-height: 1.15;
          color: var(--ink);
          max-width: 26ch;
        }
        .joke-punch {
          appearance: none;
          background: rgba(96, 165, 250, 0.1);
          border: 1px dashed rgba(96, 165, 250, 0.4);
          padding: 16px 22px;
          border-radius: 14px;
          cursor: pointer;
          font-family: "JetBrains Mono", monospace;
          font-size: 13px;
          color: var(--accent);
          text-align: left;
          transition: background 0.2s ease;
          align-self: flex-start;
          max-width: 100%;
        }
        .joke-punch:hover {
          background: rgba(96, 165, 250, 0.18);
        }
        .joke-punch.shown {
          background: rgba(96, 165, 250, 0.08);
          border: 1px solid rgba(96, 165, 250, 0.3);
          color: var(--ink);
          font-family: "Instrument Serif", serif;
          font-style: italic;
          font-size: 22px;
          padding: 20px 26px;
        }
        .api-actions {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          flex-wrap: wrap;
          padding-top: var(--space-4);
          border-top: 1px dashed var(--ink-10);
        }
        .skeleton {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .sk-line {
          height: 28px;
          border-radius: var(--space-2);
          background: linear-gradient(
            90deg,
            var(--ink-04),
            var(--ink-12),
            var(--ink-04)
          );
          background-size: 200% 100%;
          animation: skShine 1.2s linear infinite;
        }
        @keyframes skShine {
          from {
            background-position: 200% 0;
          }
          to {
            background-position: -200% 0;
          }
        }
      `}</style>
    </section>
  );
}
