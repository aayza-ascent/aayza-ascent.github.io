"use client";

import { useEffect, useState } from "react";
import { PROJECTS, type Project, type ProjectIconName } from "@/lib/data";

function ProjectIcon({
  name,
  color,
}: {
  name: ProjectIconName;
  color: string;
}) {
  const size = 88;
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 64 64",
    fill: "none" as const,
  };
  switch (name) {
    case "lumen":
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="22" fill={color} opacity=".3" />
          <circle cx="32" cy="32" r="14" fill={color} />
          <circle cx="32" cy="32" r="5" fill="#fff" />
        </svg>
      );
    case "loop":
      return (
        <svg {...common}>
          <path
            d="M20 32a12 12 0 1 1 24 0 12 12 0 1 1-24 0z"
            stroke={color}
            strokeWidth="4"
          />
          <circle cx="44" cy="32" r="5" fill={color} />
        </svg>
      );
    case "parakeet":
      return (
        <svg {...common}>
          <path
            d="M16 44l12-24 10 14 10-12"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="48" cy="22" r="4" fill={color} />
        </svg>
      );
    case "tangerine":
      return (
        <svg {...common}>
          <rect x="14" y="14" width="16" height="16" rx="3" fill={color} />
          <rect
            x="34"
            y="14"
            width="16"
            height="16"
            rx="8"
            fill={color}
            opacity=".5"
          />
          <rect
            x="14"
            y="34"
            width="16"
            height="16"
            rx="8"
            fill={color}
            opacity=".5"
          />
          <rect x="34" y="34" width="16" height="16" rx="3" fill={color} />
        </svg>
      );
    case "pebble":
      return (
        <svg {...common}>
          <path
            d="M14 42c0-16 12-22 18-22s18 6 18 22-36 16-36 0z"
            fill={color}
          />
          <rect x="22" y="34" width="20" height="3" fill="#fff" rx="1" />
        </svg>
      );
    case "atlas":
      return (
        <svg {...common}>
          <circle
            cx="32"
            cy="32"
            r="20"
            stroke={color}
            strokeWidth="3"
            fill="none"
          />
          <ellipse
            cx="32"
            cy="32"
            rx="20"
            ry="9"
            stroke={color}
            strokeWidth="3"
            fill="none"
          />
          <line
            x1="12"
            y1="32"
            x2="52"
            y2="32"
            stroke={color}
            strokeWidth="3"
          />
        </svg>
      );
  }
}

type Filter = "All" | "Personal" | "Work";

export default function Projects() {
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<Filter>("All");

  const filtered: Project[] =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.type === filter);
  const total = filtered.length;

  const next = () => {
    setActive((active + 1) % total);
    setFlipped(new Set());
  };
  const prev = () => {
    setActive((active - 1 + total) % total);
    setFlipped(new Set());
  };

  const toggleFlip = (i: number) => {
    const n = new Set(flipped);
    if (n.has(i)) n.delete(i);
    else n.add(i);
    setFlipped(n);
  };

  useEffect(() => {
    setActive(0);
    setFlipped(new Set());
  }, [filter]);

  return (
    <section id="projects">
      <div className="container">
        <div className="eyebrow">03 / Projects</div>
        <h2 className="section-title">
          A <em className="serif">playful deck</em> of recent work.
        </h2>
        <p
          style={{
            maxWidth: 560,
            color: "var(--ink-soft)",
            margin: "12px 0 32px",
          }}
        >
          Click any card to flip it and see tech + links. Use the arrows or drag
          the stack to browse.
        </p>

        <div className="filter-row">
          {(["All", "Personal", "Work"] as Filter[]).map((f) => (
            <button
              key={f}
              className={`filter-pill ${filter === f ? "on" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
              <span className="count">
                {f === "All"
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.type === f).length}
              </span>
            </button>
          ))}
        </div>

        <div className="stage">
          <button className="nav-btn prev" onClick={prev} aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="deck">
            {filtered.map((p, i) => {
              const offset = i - active;
              const abs = Math.abs(offset);
              const isFlipped = flipped.has(i);
              const isActive = offset === 0;
              return (
                <div
                  key={p.title}
                  className={`deck-card ${isActive ? "active" : ""} ${isFlipped ? "flipped" : ""}`}
                  style={{
                    transform: `translateX(${offset * 40}px) translateZ(${-abs * 80}px) rotateY(${offset * -8}deg) rotateZ(${offset * 2}deg)`,
                    zIndex: 100 - abs,
                    opacity: abs > 3 ? 0 : 1 - abs * 0.15,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  onClick={() => (isActive ? toggleFlip(i) : setActive(i))}
                >
                  <div className="deck-card-inner">
                    {!isFlipped && (
                      <div
                        className="deck-face deck-front"
                        style={{
                          backgroundColor: "var(--cream)",
                          backgroundImage: `linear-gradient(145deg, ${p.tint}20, var(--surface-2))`,
                          borderColor: `${p.tint}40`,
                        }}
                      >
                        <div className="dc-top">
                          <span
                            className="dc-chip"
                            style={{
                              background: `${p.tint}22`,
                              color: p.tint,
                              border: `1px solid ${p.tint}44`,
                            }}
                          >
                            {p.type} · {p.year}
                          </span>
                          <div className="dc-num mono">
                            {String(i + 1).padStart(2, "0")} /{" "}
                            {String(total).padStart(2, "0")}
                          </div>
                        </div>

                        <div
                          className="dc-icon"
                          style={{
                            background: `radial-gradient(circle at 30% 30%, ${p.tint}44, ${p.tint}11)`,
                            boxShadow: `0 0 60px ${p.tint}33, inset 0 0 30px ${p.tint}22`,
                          }}
                        >
                          <ProjectIcon name={p.icon} color={p.tint} />
                        </div>

                        <div className="dc-body">
                          <h3 className="dc-title serif">{p.title}</h3>
                          <p className="dc-blurb">{p.blurb}</p>
                        </div>

                        <div className="dc-bottom">
                          <span className="mono flip-cue">tap to flip →</span>
                          <div className="dots">
                            {filtered.map((_, j) => (
                              <span
                                key={j}
                                className={`dot ${j === active ? "on" : ""}`}
                                style={{
                                  background:
                                    j === active
                                      ? p.tint
                                      : "rgba(255,255,255,.15)",
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        <div
                          className="dc-shape s1"
                          style={{ background: p.tint }}
                        />
                        <div
                          className="dc-shape s2"
                          style={{ borderColor: p.tint }}
                        />
                      </div>
                    )}

                    {isFlipped && (
                      <div
                        className="deck-face deck-back"
                        style={{
                          background: `linear-gradient(145deg, ${p.tint}, ${p.tint}CC)`,
                        }}
                      >
                        <div className="db-top">
                          <div
                            className="mono"
                            style={{
                              fontSize: 11,
                              color: "rgba(0,0,0,.5)",
                              letterSpacing: ".15em",
                              textTransform: "uppercase",
                            }}
                          >
                            Details
                          </div>
                          <div
                            className="mono"
                            style={{ fontSize: 11, color: "rgba(0,0,0,.5)" }}
                          >
                            {p.year}
                          </div>
                        </div>

                        <h3 className="db-title serif">{p.title}</h3>

                        <div className="db-section">
                          <div className="db-label mono">{"// tech stack"}</div>
                          <div className="row" style={{ gap: 6, marginTop: 8 }}>
                            {p.tech.map((tech) => (
                              <span key={tech} className="db-tech-chip">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="db-section">
                          <div className="db-label mono">{"// what i did"}</div>
                          <p className="db-about">{p.blurb}</p>
                        </div>

                        <div className="db-links">
                          <a
                            href={p.link}
                            className="db-link"
                            onClick={(e) => e.stopPropagation()}
                          >
                            live demo
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M7 17L17 7M17 7H7M17 7v10"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </a>
                          <a
                            href={p.link}
                            className="db-link"
                            onClick={(e) => e.stopPropagation()}
                          >
                            source
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.5a3 3 0 0 0-.8-2.2c2.8-.3 5.8-1.4 5.8-6.3a4.9 4.9 0 0 0-1.4-3.4 4.6 4.6 0 0 0-.1-3.4s-1.1-.3-3.5 1.3a12 12 0 0 0-6.4 0c-2.4-1.6-3.5-1.3-3.5-1.3a4.6 4.6 0 0 0-.1 3.4A4.9 4.9 0 0 0 4.6 10c0 4.9 3 6 5.8 6.3a3 3 0 0 0-.8 2.2V22"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        </div>

                        <span className="db-flip-cue mono">
                          ← tap to flip back
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button className="nav-btn next" onClick={next} aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="stage-caption">
          <span className="mono">
            <span style={{ color: "var(--peri)" }}>●</span>{" "}
            {filtered[active]?.title} -{" "}
            <span style={{ color: "var(--muted)" }}>
              {active + 1} of {total}
            </span>
          </span>
        </div>
      </div>

      <style jsx>{`
        .filter-row {
          display: flex;
          gap: 10px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        .filter-pill {
          appearance: none;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
          color: var(--ink-soft);
          padding: 10px 20px;
          border-radius: 999px;
          cursor: pointer;
          font-family: "Inter", sans-serif;
          font-size: 13px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }
        .filter-pill:hover {
          background: rgba(255, 255, 255, 0.06);
          color: var(--ink);
        }
        .filter-pill.on {
          background: linear-gradient(135deg, var(--peri), var(--accent));
          color: #fff;
          border-color: transparent;
          box-shadow: 0 8px 24px rgba(167, 139, 250, 0.35);
        }
        .filter-pill .count {
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          background: rgba(0, 0, 0, 0.25);
          padding: 2px 7px;
          border-radius: 999px;
        }
        .filter-pill.on .count {
          background: rgba(255, 255, 255, 0.2);
        }
        .stage {
          position: relative;
          perspective: 1800px;
          padding: 40px 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 600px;
        }
        .deck {
          position: relative;
          width: min(520px, 100%);
          height: 560px;
          transform-style: preserve-3d;
        }
        .deck-card {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          transition:
            transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1),
            opacity 0.4s ease;
          cursor: pointer;
          will-change: transform;
        }
        .deck-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .deck-card :global(.deck-face) {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border: 1.5px solid;
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }
        .deck-card :global(.deck-front) {
          color: var(--ink);
        }
        .deck-card :global(.deck-front > *) {
          position: relative;
          z-index: 1;
        }
        .deck-card :global(.deck-back) {
          color: #0e0b1a;
        }

        .deck-card :global(.dc-top) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        .deck-card :global(.dc-chip) {
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 999px;
          font-weight: 500;
        }
        .deck-card :global(.dc-num) {
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.12em;
        }
        .deck-card :global(.dc-icon) {
          width: 140px;
          height: 140px;
          border-radius: 32px;
          display: grid;
          place-items: center;
          margin: 24px auto;
          position: relative;
          z-index: 2;
          animation: iconFloat 4s ease-in-out infinite;
        }
        @keyframes iconFloat {
          0%,
          100% {
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(-8px) rotate(2deg);
          }
        }
        .deck-card :global(.dc-body) {
          flex: 1;
          position: relative;
          z-index: 2;
        }
        .deck-card :global(.dc-title) {
          font-size: 48px;
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }
        .deck-card :global(.dc-blurb) {
          font-size: 15px;
          color: var(--ink-soft);
          line-height: 1.55;
          max-width: 38ch;
        }
        .deck-card :global(.dc-bottom) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          padding-top: 18px;
          border-top: 1px dashed rgba(255, 255, 255, 0.08);
          position: relative;
          z-index: 2;
        }
        .deck-card :global(.flip-cue) {
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.08em;
          transition: color 0.3s ease;
        }
        .deck-card:hover :global(.flip-cue) {
          color: var(--ink);
        }
        .deck-card :global(.dots) {
          display: flex;
          gap: 5px;
        }
        .deck-card :global(.dots .dot) {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .deck-card :global(.dots .dot.on) {
          width: 22px;
          border-radius: 3px;
        }

        .deck-card :global(.dc-shape) {
          position: absolute;
          pointer-events: none;
        }
        .deck-card :global(.dc-shape.s1) {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          top: -60px;
          right: -60px;
          opacity: 0.15;
          filter: blur(40px);
        }
        .deck-card :global(.dc-shape.s2) {
          width: 100px;
          height: 100px;
          border: 2px solid;
          border-radius: 30% 70% 60% 40%;
          bottom: 40px;
          right: 30px;
          opacity: 0.15;
          animation: shapeMorph 8s ease-in-out infinite;
        }
        @keyframes shapeMorph {
          0%,
          100% {
            border-radius: 30% 70% 60% 40%;
            transform: rotate(0);
          }
          50% {
            border-radius: 60% 40% 30% 70%;
            transform: rotate(180deg);
          }
        }

        .deck-card :global(.db-top) {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .deck-card :global(.db-title) {
          font-size: 56px;
          line-height: 1;
          letter-spacing: -0.02em;
          margin: 24px 0 32px;
          color: #0e0b1a;
        }
        .deck-card :global(.db-section) {
          margin-bottom: 24px;
        }
        .deck-card :global(.db-label) {
          font-size: 11px;
          color: rgba(0, 0, 0, 0.5);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .deck-card :global(.db-tech-chip) {
          display: inline-flex;
          padding: 5px 11px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.15);
          color: #0e0b1a;
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          border: 1px solid rgba(0, 0, 0, 0.12);
        }
        .deck-card :global(.db-about) {
          font-family: "Instrument Serif", serif;
          font-size: 22px;
          line-height: 1.3;
          color: #0e0b1a;
          font-style: italic;
          max-width: 30ch;
        }
        .deck-card :global(.db-links) {
          display: flex;
          gap: 12px;
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px dashed rgba(0, 0, 0, 0.15);
        }
        .deck-card :global(.db-link) {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.15);
          color: #0e0b1a;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.25s ease;
        }
        .deck-card :global(.db-link:hover) {
          background: rgba(0, 0, 0, 0.25);
          transform: translateY(-2px);
        }
        .deck-card :global(.db-flip-cue) {
          position: absolute;
          bottom: 14px;
          left: 32px;
          font-size: 10px;
          color: rgba(0, 0, 0, 0.4);
          letter-spacing: 0.08em;
        }

        .nav-btn {
          appearance: none;
          background: rgba(255, 255, 255, 0.05);
          color: var(--ink);
          border: 1px solid rgba(255, 255, 255, 0.1);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
          backdrop-filter: blur(10px);
          z-index: 10;
        }
        .nav-btn:hover {
          background: linear-gradient(135deg, var(--peri), var(--accent));
          color: #fff;
          border-color: transparent;
          transform: scale(1.1);
          box-shadow: 0 10px 30px rgba(167, 139, 250, 0.4);
        }
        .stage-caption {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
        }
        @media (max-width: 720px) {
          .stage {
            padding: 20px 0;
          }
          .deck {
            width: min(340px, 92vw);
            height: 500px;
          }
          .nav-btn {
            position: absolute;
            z-index: 20;
          }
          .nav-btn.prev {
            left: -4px;
          }
          .nav-btn.next {
            right: -4px;
          }
          .deck-card :global(.dc-title) {
            font-size: 36px;
          }
          .deck-card :global(.db-title) {
            font-size: 40px;
          }
        }
      `}</style>
    </section>
  );
}
