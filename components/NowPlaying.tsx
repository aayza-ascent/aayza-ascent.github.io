"use client";

import { useEffect, useState } from "react";
import CoverArt from "./now-playing/CoverArt";
import Controls from "./now-playing/Controls";
import { TRACKS } from "./now-playing/data";

const DURATION_SECONDS = 235;

export default function NowPlaying() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(12);
  const [collapsed, setCollapsed] = useState(false);
  const track = TRACKS[idx];

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setIdx((i) => (i + 1) % TRACKS.length);
          return 0;
        }
        return p + 0.25;
      });
    }, 200);
    return () => clearInterval(t);
  }, [playing]);

  const next = () => {
    setIdx((idx + 1) % TRACKS.length);
    setProgress(0);
  };
  const prev = () => {
    setIdx((idx - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  return (
    <div className={`np-wrap ${collapsed ? "collapsed" : ""}`}>
      <div className="np-bar">
        <div className="np-left">
          <CoverArt cover={track.cover} playing={playing} />
          <div className="np-meta">
            <div className="np-status mono">
              <span
                className="np-live-dot"
                style={{ background: playing ? "var(--mint)" : "var(--muted)" }}
              />
              {playing ? "NOW PLAYING" : "PAUSED"}
            </div>
            <div className="np-title">{track.title}</div>
            <div className="np-artist">
              <span style={{ color: track.color }}>●</span> {track.artist} ·{" "}
              <span className="mono">{track.album}</span>
            </div>
          </div>
        </div>

        <Controls
          playing={playing}
          progress={progress}
          duration={DURATION_SECONDS}
          trackColor={track.color}
          onPrev={prev}
          onNext={next}
          onTogglePlay={() => setPlaying(!playing)}
        />

        <div className="np-right">
          <button
            className="np-icon"
            title="Minimize"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "▲" : "▼"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .np-wrap {
          position: fixed;
          left: var(--space-4);
          right: var(--space-4);
          bottom: var(--space-4);
          z-index: 90;
          pointer-events: none;
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .np-wrap.collapsed {
          transform: translateY(calc(100% - 28px));
        }
        .np-bar {
          display: grid;
          grid-template-columns: 1fr 1.2fr auto;
          gap: var(--space-6);
          align-items: center;
          max-width: 1100px;
          margin: 0 auto;
          padding: 10px 18px;
          background: rgba(26, 22, 48, 0.78);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 0.5px solid var(--ink-08);
          border-radius: var(--radius-md);
          box-shadow:
            0 16px 50px var(--scrim-50),
            inset 0 1px 0 var(--ink-06);
          pointer-events: auto;
        }
        .np-left {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
        }
        .np-meta {
          min-width: 0;
          flex: 1;
        }
        .np-status {
          font-size: 9px;
          color: var(--muted);
          letter-spacing: 0.15em;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 2px;
        }
        .np-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          animation: pulseDot 1.5s ease-in-out infinite;
        }
        @keyframes pulseDot {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        .np-title {
          font-family: "Instrument Serif", serif;
          font-size: 18px;
          line-height: 1.1;
          color: var(--ink);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .np-artist {
          font-size: 11px;
          color: var(--ink-soft);
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .np-right {
          display: flex;
          gap: var(--space-2);
        }
        .np-icon {
          appearance: none;
          border: 1px solid var(--ink-10);
          background: var(--ink-04);
          color: var(--ink-soft);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 10px;
          line-height: 1;
          transition: all 0.2s ease;
        }
        .np-icon:hover {
          background: var(--ink-10);
          color: var(--ink);
        }
        @media (max-width: 720px) {
          .np-wrap {
            left: var(--space-2);
            right: var(--space-2);
            bottom: var(--space-2);
          }
          .np-bar {
            grid-template-columns: 1fr auto;
            gap: var(--space-3);
            padding: var(--space-2) var(--space-3);
          }
          .np-title {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}
