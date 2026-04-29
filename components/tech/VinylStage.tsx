"use client";

import type { Tech } from "@/lib/data";

interface VinylStageProps {
  inner: Tech[];
  middle: Tech[];
  outer: Tech[];
  onHover: (t: Tech | null) => void;
  onPick: (t: Tech) => void;
}

const ORBIT_RADII = {
  outer: 235,
  middle: 160,
  inner: 92,
} as const;

interface OrbitProps {
  ring: keyof typeof ORBIT_RADII;
  items: Tech[];
  badgeClass: string;
  onHover: VinylStageProps["onHover"];
  onPick: VinylStageProps["onPick"];
}

function Orbit({ ring, items, badgeClass, onHover, onPick }: OrbitProps) {
  const radius = ORBIT_RADII[ring];
  return (
    <div className={`orbit orbit-${ring}`}>
      {items.map((t, i) => {
        const angle = (i / items.length) * 360;
        // middle ring rotates the glyph WITH the disc, others counter-rotate
        const counter = ring === "middle" ? angle : -angle;
        const fontSize = ring === "inner" ? 12 : undefined;
        return (
          <div
            key={t.name}
            className="orbit-slot"
            style={{ transform: `rotate(${angle}deg) translateY(-${radius}px)` }}
          >
            <button
              className={badgeClass}
              style={{
                background: t.color,
                boxShadow: `0 0 ${ring === "outer" ? 24 : ring === "middle" ? 20 : 16}px ${t.color}${ring === "inner" ? "77" : "66"}`,
              }}
              onMouseEnter={() => onHover(t)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onPick(t)}
            >
              <span style={{ transform: `rotate(${counter}deg)`, display: "block", fontSize }}>
                {t.glyph}
              </span>
            </button>
          </div>
        );
      })}
      <style jsx>{`
        .orbit {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          pointer-events: none;
        }
        .orbit-slot {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
}

export default function VinylStage({
  inner,
  middle,
  outer,
  onHover,
  onPick,
}: VinylStageProps) {
  return (
    <div className="vinyl-stage">
      <div className="vinyl">
        <div className="vinyl-disc">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="groove"
              style={{ inset: `${8 + i * 8}%` }}
            />
          ))}

          <Orbit ring="outer" items={outer} badgeClass="tbadge" onHover={onHover} onPick={onPick} />
          <Orbit ring="middle" items={middle} badgeClass="tbadge tbadge-md" onHover={onHover} onPick={onPick} />
          <Orbit ring="inner" items={inner} badgeClass="tbadge tbadge-sm" onHover={onHover} onPick={onPick} />

          <div className="vinyl-label">
            <div className="vl-text serif">
              SIDE
              <br />A
            </div>
            <div className="vl-hole" />
          </div>
        </div>

        <div className="tonearm">
          <div className="tonearm-base" />
          <div className="tonearm-arm" />
          <div className="tonearm-head" />
        </div>
      </div>

      <style jsx>{`
        .vinyl-stage {
          position: relative;
          aspect-ratio: 1 / 1;
          perspective: 1200px;
        }
        .vinyl {
          position: relative;
          width: 100%;
          height: 100%;
          transform: rotateX(12deg);
          transform-style: preserve-3d;
        }
        .vinyl-disc {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(
            circle at 50% 50%,
            var(--cream-2) 0%,
            #0a0a14 100%
          );
          box-shadow:
            0 40px 80px rgba(0, 0, 0, 0.7),
            0 0 0 1px var(--ink-04),
            inset 0 0 120px rgba(167, 139, 250, 0.1);
          animation: spinDisc 28s linear infinite;
          will-change: transform;
        }
        .vinyl-disc:hover {
          animation-play-state: paused;
        }
        @keyframes spinDisc {
          from {
            transform: rotate(0);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .groove {
          position: absolute;
          border-radius: 50%;
          border: 1px solid var(--ink-04);
          pointer-events: none;
        }
        .vinyl-disc :global(.tbadge) {
          appearance: none;
          border: 2px solid var(--ink-20);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          cursor: pointer;
          display: grid;
          place-items: center;
          font-family: "JetBrains Mono", monospace;
          font-weight: 700;
          font-size: 14px;
          color: var(--white);
          text-shadow: 0 1px 3px var(--scrim-50);
          transform: translate(-50%, -50%);
          transition:
            scale 0.2s ease,
            box-shadow 0.2s ease;
          backdrop-filter: blur(4px);
        }
        .vinyl-disc :global(.tbadge-md) {
          width: 48px;
          height: 48px;
          font-size: 12px;
        }
        .vinyl-disc :global(.tbadge-sm) {
          width: 40px;
          height: 40px;
        }
        .vinyl-disc :global(.tbadge:hover) {
          scale: 1.3;
          z-index: 10;
        }
        .vinyl-label {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 35%;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          background: radial-gradient(circle, var(--accent), var(--peri));
          display: grid;
          place-items: center;
          box-shadow:
            inset 0 0 30px rgba(0, 0, 0, 0.3),
            0 0 40px rgba(255, 107, 157, 0.4);
          color: var(--white);
          text-align: center;
        }
        .vl-text {
          font-size: 22px;
          line-height: 0.95;
          letter-spacing: 0.1em;
          font-style: italic;
        }
        .vl-hole {
          position: absolute;
          width: 10%;
          height: 10%;
          border-radius: 50%;
          background: var(--cream);
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.8);
        }
        .tonearm {
          position: absolute;
          top: -4%;
          right: -2%;
          width: 45%;
          height: 50%;
          pointer-events: none;
          z-index: 3;
        }
        .tonearm-base {
          position: absolute;
          top: 0;
          right: 0;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(145deg, #3a3448, #1a1824);
          box-shadow:
            inset 0 2px 4px var(--ink-10),
            0 8px 20px var(--scrim-50);
          border: 1px solid var(--ink-10);
        }
        .tonearm-base::after {
          content: "";
          position: absolute;
          inset: 35%;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 12px var(--accent);
        }
        .tonearm-arm {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 80%;
          height: 4px;
          transform-origin: right center;
          transform: rotate(30deg);
          background: linear-gradient(to left, #555066, #2a2638);
          border-radius: 2px;
          box-shadow: 0 3px 8px var(--scrim-40);
        }
        .tonearm-head {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 20px;
          height: 20px;
          transform-origin: right center;
          transform: rotate(30deg) translate(-70%, 100%);
          background: linear-gradient(145deg, #ccc, #888);
          border-radius: 3px;
          box-shadow: 0 3px 6px var(--scrim-50);
        }
      `}</style>
    </div>
  );
}
