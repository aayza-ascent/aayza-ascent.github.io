"use client";

import { useState } from "react";
import { HOBBIES, FACTS, type Hobby } from "@/lib/data";

function FlipCard({ h }: { h: Hobby }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      className={`flip ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
      aria-pressed={flipped}
    >
      <div className="flip-inner">
        <div className="face front">
          <div
            className="emoji-wrap"
            style={{
              background: `radial-gradient(circle, ${h.color}44, transparent)`,
            }}
          >
            <div className="emoji">{h.emoji}</div>
          </div>
          <div>
            <div className="flip-label serif" style={{ color: h.color }}>
              {h.front}
            </div>
            <div className="flip-hint mono" style={{ marginTop: 8 }}>
              tap to flip
            </div>
          </div>
        </div>
        <div
          className="face back"
          style={{
            background: `linear-gradient(145deg, ${h.color}, ${h.color}CC)`,
          }}
        >
          <p>{h.back}</p>
          <div className="flip-hint mono" style={{ color: "rgba(0,0,0,.45)" }}>
            tap to flip back
          </div>
        </div>
      </div>
      <style jsx>{`
        .flip {
          appearance: none;
          border: 0;
          background: transparent;
          padding: 0;
          cursor: pointer;
          perspective: 1200px;
          aspect-ratio: 5 / 4;
          width: 100%;
        }
        .flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
          transform-style: preserve-3d;
        }
        .flip.flipped .flip-inner {
          transform: rotateY(180deg);
        }
        .face {
          position: absolute;
          inset: 0;
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border: 0.5px solid var(--ink-08);
          box-shadow:
            10px 10px 30px var(--scrim-40),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          text-align: left;
        }
        .front {
          background: linear-gradient(145deg, var(--surface), var(--surface-2));
          color: var(--ink);
        }
        .back {
          transform: rotateY(180deg);
          color: var(--cream);
        }
        .back :global(p) {
          font-family: "Instrument Serif", serif;
          font-size: 22px;
          line-height: 1.25;
          font-style: italic;
        }
        .emoji {
          font-size: 42px;
          line-height: 1;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));
        }
        .flip-label {
          font-size: 28px;
          line-height: 1;
          color: var(--ink);
        }
        .flip-hint {
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
        }
        .emoji-wrap {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-md);
          display: grid;
          place-items: center;
          filter: blur(0);
        }
      `}</style>
    </button>
  );
}

export default function Hobbies() {
  const [fact, setFact] = useState(FACTS[0]);
  const [spinning, setSpinning] = useState(false);

  const randomize = () => {
    setSpinning(true);
    let i = 0;
    const timer = setInterval(() => {
      setFact(FACTS[Math.floor(Math.random() * FACTS.length)]);
      i++;
      if (i > 8) {
        clearInterval(timer);
        setSpinning(false);
      }
    }, 60);
  };

  return (
    <section id="hobbies">
      <div className="container">
        <div className="eyebrow">05 / Off the clock</div>
        <h2 className="section-title">
          When I&rsquo;m <em className="serif">not at the keyboard</em>.
        </h2>
        <p
          style={{
            maxWidth: 560,
            color: "var(--ink-soft)",
            margin: "12px 0 48px",
          }}
        >
          Six things that take up most of my weekends. Tap any card - the back
          has the actual specifics.
        </p>

        <div className="flip-grid">
          {HOBBIES.map((h) => (
            <FlipCard key={h.front} h={h} />
          ))}
        </div>

        <div className="facts glass">
          <div className="facts-left">
            <div className="eyebrow" style={{ marginBottom: 8 }}>
              Fun fact generator
            </div>
            <div className={`fact serif ${spinning ? "spin" : ""}`} key={fact}>
              {fact}
            </div>
          </div>
          <button className="btn btn-primary shuffle" onClick={randomize}>
            <span className={`shuf-icon ${spinning ? "spin" : ""}`}>⇄</span>
            New fact
          </button>
        </div>
      </div>

      <style jsx>{`
        .flip-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-5);
          margin-bottom: var(--space-12);
        }
        .facts.glass {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-6);
          padding: var(--space-7) var(--space-8);
          flex-wrap: wrap;
          background: linear-gradient(
            135deg,
            rgba(167, 139, 250, 0.1),
            rgba(255, 138, 184, 0.08)
          );
          border: 0.5px solid rgba(167, 139, 250, 0.2);
        }
        .facts-left {
          flex: 1;
          min-width: 260px;
        }
        .fact {
          font-size: clamp(22px, 2vw, 28px);
          line-height: 1.25;
          color: var(--ink);
          animation: factIn 0.5s ease;
        }
        .fact.spin {
          opacity: 0.6;
        }
        @keyframes factIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .shuf-icon {
          display: inline-block;
          transition: transform 0.4s ease;
        }
        .shuf-icon.spin {
          animation: shufSpin 0.6s ease;
        }
        @keyframes shufSpin {
          from {
            transform: rotate(0);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @media (max-width: 720px) {
          .flip-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 520px) {
          .flip-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
