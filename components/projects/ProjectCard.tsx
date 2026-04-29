"use client";

import type { Project } from "@/lib/data";
import ProjectIcon from "./ProjectIcon";

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  active: number;
  flipped: boolean;
  onActivate: (index: number) => void;
  onToggleFlip: (index: number) => void;
}

export default function ProjectCard({
  project,
  index,
  total,
  active,
  flipped,
  onActivate,
  onToggleFlip,
}: ProjectCardProps) {
  const offset = index - active;
  const abs = Math.abs(offset);
  const isActive = offset === 0;

  return (
    <div
      className={`deck-card ${isActive ? "active" : ""} ${flipped ? "flipped" : ""}`}
      style={{
        transform: `translateX(${offset * 40}px) translateZ(${-abs * 80}px) rotateY(${offset * -8}deg) rotateZ(${offset * 2}deg)`,
        zIndex: 100 - abs,
        opacity: abs > 3 ? 0 : 1 - abs * 0.15,
        pointerEvents: isActive ? "auto" : "none",
      }}
      onClick={() => (isActive ? onToggleFlip(index) : onActivate(index))}
    >
      <div className="deck-card-inner">
        {!flipped && (
          <div
            className="deck-face deck-front"
            style={{
              backgroundColor: "var(--cream)",
              backgroundImage: `linear-gradient(145deg, ${project.tint}20, var(--surface-2))`,
              borderColor: `${project.tint}40`,
            }}
          >
            <div className="dc-top">
              <span
                className="dc-chip"
                style={{
                  background: `${project.tint}22`,
                  color: project.tint,
                  border: `1px solid ${project.tint}44`,
                }}
              >
                {project.type} · {project.year}
              </span>
              <div className="dc-num mono">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </div>
            </div>

            <div
              className="dc-icon"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${project.tint}44, ${project.tint}11)`,
                boxShadow: `0 0 60px ${project.tint}33, inset 0 0 30px ${project.tint}22`,
              }}
            >
              <ProjectIcon name={project.icon} color={project.tint} />
            </div>

            <div className="dc-body">
              <h3 className="dc-title serif">{project.title}</h3>
              <p className="dc-blurb">{project.blurb}</p>
            </div>

            <div className="dc-bottom">
              <span className="mono flip-cue">tap to flip →</span>
              <div className="dots">
                {Array.from({ length: total }).map((_, j) => (
                  <span
                    key={j}
                    className={`dot ${j === active ? "on" : ""}`}
                    style={{
                      background:
                        j === active
                          ? project.tint
                          : "rgba(255,255,255,.15)",
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              className="dc-shape s1"
              style={{ background: project.tint }}
            />
            <div
              className="dc-shape s2"
              style={{ borderColor: project.tint }}
            />
          </div>
        )}

        {flipped && (
          <div
            className="deck-face deck-back"
            style={{
              background: `linear-gradient(145deg, ${project.tint}, ${project.tint}CC)`,
            }}
          >
            <div className="db-top">
              <div className="mono db-meta">Details</div>
              <div className="mono db-meta">{project.year}</div>
            </div>

            <h3 className="db-title serif">{project.title}</h3>

            <div className="db-section">
              <div className="db-label mono">{"// tech stack"}</div>
              <div className="row db-tech-row">
                {project.tech.map((tech) => (
                  <span key={tech} className="db-tech-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="db-section">
              <div className="db-label mono">{"// what i did"}</div>
              <p className="db-about">{project.blurb}</p>
            </div>

            <div className="db-links">
              <a
                href={project.link}
                className="db-link"
                onClick={(e) => e.stopPropagation()}
              >
                live demo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7M17 7H7M17 7v10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
              <a
                href={project.link}
                className="db-link"
                onClick={(e) => e.stopPropagation()}
              >
                source
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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

            <span className="db-flip-cue mono">← tap to flip back</span>
          </div>
        )}
      </div>

      <style jsx>{`
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
        .deck-face {
          position: absolute;
          inset: 0;
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          display: flex;
          flex-direction: column;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border: 1.5px solid;
          box-shadow:
            0 30px 80px var(--scrim-50),
            inset 0 1px 0 var(--ink-08);
          overflow: hidden;
        }
        .deck-front {
          color: var(--ink);
        }
        .deck-front > :global(*) {
          position: relative;
          z-index: 1;
        }
        .deck-back {
          color: var(--cream);
        }

        .dc-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        .dc-chip {
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          padding: 4px 10px;
          border-radius: var(--radius-pill);
          font-weight: 500;
        }
        .dc-num {
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.12em;
        }
        .dc-icon {
          width: 140px;
          height: 140px;
          border-radius: 32px;
          display: grid;
          place-items: center;
          margin: var(--space-6) auto;
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
        .dc-body {
          flex: 1;
          position: relative;
          z-index: 2;
        }
        .dc-title {
          font-size: 48px;
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: var(--space-3);
        }
        .dc-blurb {
          font-size: 15px;
          color: var(--ink-soft);
          line-height: 1.55;
          max-width: 38ch;
        }
        .dc-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: var(--space-5);
          padding-top: 18px;
          border-top: 1px dashed var(--ink-08);
          position: relative;
          z-index: 2;
        }
        .flip-cue {
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.08em;
          transition: color 0.3s ease;
        }
        .deck-card:hover .flip-cue {
          color: var(--ink);
        }
        .dots {
          display: flex;
          gap: 5px;
        }
        .dots :global(.dot) {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .dots :global(.dot.on) {
          width: 22px;
          border-radius: 3px;
        }

        .dc-shape {
          position: absolute;
          pointer-events: none;
        }
        .dc-shape.s1 {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          top: -60px;
          right: -60px;
          opacity: 0.15;
          filter: blur(40px);
        }
        .dc-shape.s2 {
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

        .db-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .db-meta {
          font-size: 11px;
          color: rgba(0, 0, 0, 0.5);
          letter-spacing: 0.15em;
        }
        .db-top .db-meta:first-child {
          text-transform: uppercase;
        }
        .db-title {
          font-size: 56px;
          line-height: 1;
          letter-spacing: -0.02em;
          margin: var(--space-6) 0 var(--space-8);
          color: var(--cream);
        }
        .db-section {
          margin-bottom: var(--space-6);
        }
        .db-label {
          font-size: 11px;
          color: rgba(0, 0, 0, 0.5);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .db-tech-row {
          gap: 6px;
          margin-top: var(--space-2);
        }
        .db-tech-chip {
          display: inline-flex;
          padding: 5px 11px;
          border-radius: var(--radius-pill);
          background: rgba(0, 0, 0, 0.15);
          color: var(--cream);
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          border: 1px solid rgba(0, 0, 0, 0.12);
        }
        .db-about {
          font-family: "Instrument Serif", serif;
          font-size: 22px;
          line-height: 1.3;
          color: var(--cream);
          font-style: italic;
          max-width: 30ch;
        }
        .db-links {
          display: flex;
          gap: var(--space-3);
          margin-top: auto;
          padding-top: var(--space-5);
          border-top: 1px dashed rgba(0, 0, 0, 0.15);
        }
        .db-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px var(--space-4);
          border-radius: var(--radius-pill);
          background: rgba(0, 0, 0, 0.15);
          color: var(--cream);
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.25s ease;
        }
        .db-link:hover {
          background: rgba(0, 0, 0, 0.25);
          transform: translateY(-2px);
        }
        .db-flip-cue {
          position: absolute;
          bottom: 14px;
          left: var(--space-8);
          font-size: 10px;
          color: rgba(0, 0, 0, 0.4);
          letter-spacing: 0.08em;
        }
        @media (max-width: 720px) {
          .dc-title {
            font-size: 36px;
          }
          .db-title {
            font-size: 40px;
          }
        }
      `}</style>
    </div>
  );
}
