"use client";

interface ControlsProps {
  playing: boolean;
  progress: number;
  duration: number;
  trackColor: string;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
}

const fmt = (s: number) =>
  `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default function Controls({
  playing,
  progress,
  duration,
  trackColor,
  onPrev,
  onNext,
  onTogglePlay,
}: ControlsProps) {
  const current = Math.floor((progress / 100) * duration);

  return (
    <div className="np-center">
      <div className="np-controls">
        <button className="np-btn" onClick={onPrev} aria-label="Previous">
          ⏮
        </button>
        <button
          className="np-btn np-play"
          onClick={onTogglePlay}
          aria-label="Play/Pause"
        >
          {playing ? "⏸" : "▶"}
        </button>
        <button className="np-btn" onClick={onNext} aria-label="Next">
          ⏭
        </button>
      </div>
      <div className="np-progress">
        <span className="np-time mono">{fmt(current)}</span>
        <div className="np-track">
          <div
            className="np-fill"
            style={{ width: `${progress}%`, background: trackColor }}
          />
          <div
            className="np-thumb"
            style={{ left: `${progress}%`, background: trackColor }}
          />
        </div>
        <span className="np-time mono">{fmt(duration)}</span>
      </div>

      <style jsx>{`
        .np-center {
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: stretch;
        }
        .np-controls {
          display: flex;
          gap: var(--space-2);
          justify-content: center;
          align-items: center;
        }
        .np-btn {
          appearance: none;
          border: 0;
          background: transparent;
          cursor: pointer;
          color: var(--ink-soft);
          font-size: 13px;
          padding: 4px var(--space-2);
          border-radius: 6px;
          transition: all 0.2s ease;
          line-height: 1;
        }
        .np-btn:hover {
          color: var(--ink);
          background: rgba(255, 255, 255, 0.05);
        }
        .np-play {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--ink);
          color: var(--cream);
          display: grid;
          place-items: center;
          font-size: 11px;
        }
        .np-play:hover {
          background: var(--peri);
          color: var(--white);
          transform: scale(1.08);
        }
        .np-progress {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .np-time {
          font-size: 10px;
          color: var(--muted);
          min-width: 32px;
          text-align: center;
        }
        .np-track {
          flex: 1;
          height: 4px;
          background: var(--ink-08);
          border-radius: 2px;
          position: relative;
          cursor: pointer;
        }
        .np-fill {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          border-radius: 2px;
          transition: background 0.3s ease;
        }
        .np-thumb {
          position: absolute;
          top: 50%;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.2s ease;
          box-shadow: 0 2px 6px var(--scrim-40);
        }
        .np-track:hover .np-thumb {
          opacity: 1;
        }
        @media (max-width: 720px) {
          .np-center {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
