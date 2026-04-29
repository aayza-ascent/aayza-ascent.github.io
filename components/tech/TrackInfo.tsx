"use client";

import { TECH, type Tech, type TechRing } from "@/lib/data";

interface TrackInfoProps {
  shown: Tech;
  onHover: (t: Tech | null) => void;
  onPick: (t: Tech) => void;
}

const TIER_LABELS: Record<TechRing, string> = {
  0: "daily driver",
  1: "often reached for",
  2: "on rotation",
};

const TIER_STYLES: Record<TechRing, { bg: string; color: string; border: string }> = {
  0: { bg: "rgba(110,231,183,.15)", color: "var(--mint)", border: "rgba(110,231,183,.3)" },
  1: { bg: "rgba(167,139,250,.15)", color: "var(--peri)", border: "rgba(167,139,250,.3)" },
  2: { bg: "rgba(255,138,184,.15)", color: "var(--blush)", border: "rgba(255,138,184,.3)" },
};

const RING_DURATIONS: Record<TechRing, string> = {
  0: "4:32",
  1: "3:48",
  2: "2:56",
};

const PROFICIENCY_LEVEL: Record<TechRing, number> = { 0: 5, 1: 4, 2: 3 };

export default function TrackInfo({ shown, onHover, onPick }: TrackInfoProps) {
  const tierStyle = TIER_STYLES[shown.ring];
  const level = PROFICIENCY_LEVEL[shown.ring];

  return (
    <div className="vinyl-info">
      <div className="track-now mono">
        NOW PLAYING · <span className="pulse">●</span>
      </div>
      <div className="track-title serif" style={{ color: shown.color }}>
        {shown.name}
      </div>
      <div className="track-tier">
        <span
          className="tier-pill"
          style={{
            background: tierStyle.bg,
            color: tierStyle.color,
            borderColor: tierStyle.border,
          }}
        >
          {TIER_LABELS[shown.ring]}
        </span>
      </div>
      <div className="track-bars">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`bar ${i < level ? "on" : ""}`}
            style={{
              background: i < level ? shown.color : "var(--ink-08)",
            }}
          />
        ))}
        <span className="bar-label mono">proficiency</span>
      </div>

      <div className="tracklist">
        <div className="tl-head mono">{"// FULL TRACKLIST"}</div>
        {TECH.map((t, i) => (
          <button
            key={t.name}
            className={`tl-row ${shown.name === t.name ? "on" : ""}`}
            onMouseEnter={() => onHover(t)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onPick(t)}
          >
            <span className="tl-num mono">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="tl-dot" style={{ background: t.color }} />
            <span className="tl-name">{t.name}</span>
            <span className="tl-dur mono">{RING_DURATIONS[t.ring]}</span>
          </button>
        ))}
      </div>

      <style jsx>{`
        .vinyl-info {
          padding: var(--space-8);
          border-radius: 24px;
          background: linear-gradient(145deg, var(--surface), var(--surface-2));
          border: 0.5px solid var(--ink-06);
          box-shadow:
            0 20px 60px var(--scrim-40),
            inset 0 1px 0 var(--ink-04);
        }
        .track-now {
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.15em;
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: var(--space-3);
        }
        .pulse {
          color: var(--mint);
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        .track-title {
          font-size: clamp(44px, 5vw, 68px);
          line-height: 0.95;
          letter-spacing: -0.02em;
          transition: color 0.4s ease;
          margin-bottom: var(--space-4);
        }
        .tier-pill {
          display: inline-block;
          padding: 6px 14px;
          border-radius: var(--radius-pill);
          border: 1px solid;
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .track-bars {
          display: flex;
          align-items: center;
          gap: 6px;
          margin: var(--space-5) 0 var(--space-7);
        }
        .bar {
          width: 28px;
          height: 8px;
          border-radius: 2px;
          transition: background 0.3s ease;
        }
        .bar-label {
          font-size: 10px;
          color: var(--muted);
          margin-left: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .tracklist {
          border-top: 1px dashed var(--ink-10);
          padding-top: 18px;
        }
        .tl-head {
          font-size: 10px;
          color: var(--muted);
          letter-spacing: 0.1em;
          margin-bottom: 10px;
        }
        .tl-row {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          padding: var(--space-2) 10px;
          border-radius: 10px;
          background: transparent;
          border: 0;
          cursor: pointer;
          color: var(--ink-soft);
          font-family: "Inter", sans-serif;
          font-size: 13px;
          text-align: left;
          transition: all 0.2s ease;
        }
        .tl-row:hover,
        .tl-row.on {
          background: rgba(167, 139, 250, 0.1);
          color: var(--ink);
        }
        .tl-num {
          color: var(--muted);
          font-size: 10px;
          width: 22px;
        }
        .tl-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 8px currentColor;
        }
        .tl-name {
          flex: 1;
          font-weight: 500;
        }
        .tl-dur {
          color: var(--muted);
          font-size: 10px;
        }
      `}</style>
    </div>
  );
}
