"use client";

import { useEffect, useState } from "react";
import { TRACKS } from "./now-playing/data";

const CYCLE_MS = 12000;

export default function NowPlaying() {
  const [idx, setIdx] = useState(0);
  const track = TRACKS[idx];

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % TRACKS.length);
    }, CYCLE_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="np-pill" aria-label="Now playing">
      <span className="np-dot" />
      <span className="np-label mono">NOW PLAYING</span>
      <span className="np-title serif">{track.title}</span>
      <span className="np-sep" aria-hidden>·</span>
      <span className="np-artist">{track.artist}</span>

      <style jsx>{`
        .np-pill {
          position: fixed;
          right: var(--space-4);
          bottom: var(--space-4);
          z-index: 90;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          max-width: calc(100vw - 32px);
          background: rgba(17, 32, 58, 0.78);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          border: 0.5px solid var(--ink-08);
          border-radius: var(--radius-pill);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
          color: var(--ink);
          font-size: 13px;
          line-height: 1;
          overflow: hidden;
        }
        .np-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px rgba(96, 165, 250, 0.6);
          animation: npPulse 1.8s ease-in-out infinite;
          flex: 0 0 auto;
        }
        .np-label {
          font-size: 10px;
          letter-spacing: 0.15em;
          color: var(--muted);
          flex: 0 0 auto;
        }
        .np-title {
          font-size: 14px;
          color: var(--ink);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
        }
        .np-sep {
          color: var(--ink-soft);
          flex: 0 0 auto;
        }
        .np-artist {
          font-size: 12px;
          color: var(--ink-soft);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
        }
        @keyframes npPulse {
          0%, 100% { opacity: 0.5; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 720px) {
          .np-pill {
            left: var(--space-2);
            right: var(--space-2);
            bottom: var(--space-2);
            max-width: none;
            justify-content: flex-start;
            padding: 8px 12px;
            font-size: 12px;
            gap: 8px;
          }
          .np-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
