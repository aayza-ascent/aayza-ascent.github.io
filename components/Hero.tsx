"use client";

import { useRef } from "react";
import Blobs from "./hero/Blobs";

const STATS: [string, string][] = [
  ["7", "years shipping"],
  ["1st", "class honours"],
  ["6", "years working remotely"],
  ["100%", "outgoing, funny, and humble (self-rated)"],
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        minHeight: "100vh",
        padding: "140px 32px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Blobs containerRef={heroRef} />

      <svg aria-hidden className="hero-grid" width="100%" height="100%">
        <defs>
          <pattern
            id="grid"
            width="44"
            height="44"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 44 0 L 0 0 0 44"
              fill="none"
              stroke="rgba(255,255,255,.05)"
              strokeWidth=".5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="container hero-inner">
        <div className="hero-top row">
          <span className="chip mono">glasgow · scotland · remote</span>
        </div>

        <h1 className="hero-name">
          <span className="line-a">Hi, I&rsquo;m</span>
          <span className="line-b">
            <span className="name-word">Aayza.</span>
          </span>
          <span className="line-c serif">
            <em>a software engineer</em> who likes
            <br />
            building <span className="hl">playful, durable tools.</span>
          </span>
        </h1>

        <p className="hero-sub">
          Seven years shipping full-stack TypeScript, fully remote, across
          fintech, SaaS and consultancy teams. Currently building AI-powered
          workflow automation and modular dashboards at <b>Ascent Platform</b>.
        </p>

        <div className="row hero-cta">
          <a href="#work" className="btn btn-primary">
            See my work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="#contact" className="btn btn-ghost">
            Say hi ↗
          </a>
          <span
            className="mono"
            style={{ color: "var(--muted)", marginLeft: "auto", fontSize: 12 }}
          >
            move your cursor - the gradient follows
          </span>
        </div>

        <div className="hero-stats">
          {STATS.map(([n, l]) => (
            <div key={l} className="stat">
              <div className="stat-n serif">{n}</div>
              <div className="stat-l mono">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-cue mono">
        scroll
        <span className="bar" />
      </div>

      <style jsx>{`
        .hero-inner {
          position: relative;
          z-index: 2;
        }
        :global(.hero-grid) {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.8;
        }

        .hero-top {
          margin-top: 40px;
        }
        :global(.hero-name) {
          font-family: "Instrument Serif", serif;
          font-weight: 400;
          font-size: clamp(56px, 10vw, 140px);
          line-height: 0.98;
          letter-spacing: -0.025em;
          margin: 34px 0 var(--space-5);
        }
        :global(.hero-name .line-a) {
          display: block;
          font-family: "Inter", sans-serif;
          font-size: clamp(16px, 1.4vw, 18px);
          font-weight: 500;
          color: var(--muted);
          letter-spacing: 0.02em;
          text-transform: uppercase;
          margin-bottom: var(--space-3);
        }
        :global(.hero-name .line-b) {
          display: flex;
          gap: var(--space-7);
          flex-wrap: wrap;
          align-items: baseline;
        }
        :global(.hero-name .name-word) {
          display: inline-block;
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          padding-right: 0.4em;
        }
        :global(.hero-name .name-word:last-of-type) {
          padding-right: 0;
        }
        :global(.hero-name .name-word:hover) {
          transform: translateY(-6px) rotate(-2deg);
        }
        :global(.hero-name .line-c) {
          display: block;
          font-size: 0.52em;
          line-height: 1.15;
          color: var(--ink-soft);
          margin-top: var(--space-5);
          max-width: 880px;
        }
        :global(.hero-name .hl) {
          background: linear-gradient(
            180deg,
            transparent 55%,
            rgba(255, 138, 184, 0.45) 55%,
            rgba(255, 138, 184, 0.45) 92%,
            transparent 92%
          );
          padding: 0 0.08em;
          color: var(--ink);
        }

        .hero-sub {
          max-width: 540px;
          color: var(--ink-soft);
          font-size: clamp(15px, 1.2vw, 17px);
          line-height: 1.55;
          margin-top: 18px;
          margin-bottom: var(--space-8);
        }
        .hero-sub :global(b) {
          color: var(--ink);
          font-weight: 600;
        }

        .hero-cta {
          width: 100%;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          margin-top: 72px;
          padding: 6px;
          border-radius: var(--radius-lg);
          background: rgba(26, 22, 48, 0.5);
          backdrop-filter: blur(12px);
          border: 0.5px solid var(--ink-08);
          box-shadow:
            0 14px 40px var(--scrim-35),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        .stat {
          padding: 22px 18px;
          border-radius: 18px;
          text-align: left;
          transition: background 0.3s ease;
        }
        .stat:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .stat-n {
          font-size: clamp(34px, 3vw, 48px);
          line-height: 1;
          color: var(--ink);
        }
        .stat-l {
          font-size: 10px;
          color: var(--muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: var(--space-2);
        }

        .scroll-cue {
          position: absolute;
          bottom: var(--space-6);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .scroll-cue .bar {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, transparent, var(--ink-soft));
          animation: scrollPulse 2.2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%,
          100% {
            transform: scaleY(0.5);
            transform-origin: top;
            opacity: 0.4;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @media (max-width: 720px) {
          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
