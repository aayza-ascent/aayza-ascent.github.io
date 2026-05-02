"use client";

import { useMemo } from "react";
import { TECH, type Tech } from "@/lib/data";

const RING_LABELS: Record<0 | 1 | 2, { label: string; subtitle: string }> = {
  0: { label: "Daily drivers", subtitle: "On hand, every project" },
  1: { label: "Backend & data", subtitle: "Where the business logic lives" },
  2: { label: "Also in the toolkit", subtitle: "Reach-for-when-needed" },
};

export default function TechStack() {
  const groups = useMemo(
    () =>
      ([0, 1, 2] as const).map((ring) => ({
        ring,
        ...RING_LABELS[ring],
        items: TECH.filter((t: Tech) => t.ring === ring),
      })),
    [],
  );

  return (
    <section id="stack">
      <div className="container">
        <div className="eyebrow">04 / Tech Stack</div>
        <h2 className="section-title">
          Tools I <em className="serif">reach for</em>.
        </h2>
        <p className="stack-sub">
          Grouped by how often they show up day-to-day. Years of context behind
          each, distilled to a single line.
        </p>

        <div className="stack-groups">
          {groups.map((g) => (
            <div key={g.ring} className="stack-group">
              <div className="stack-group-head">
                <div className="stack-group-num mono">
                  {String(g.ring + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="stack-group-label">{g.label}</div>
                  <div className="stack-group-sub mono">{g.subtitle}</div>
                </div>
              </div>

              <ul className="stack-list">
                {g.items.map((t) => (
                  <li key={t.name} className="stack-item">
                    <div className="stack-item-head">
                      <span className="stack-glyph mono" aria-hidden>
                        {t.glyph}
                      </span>
                      <span className="stack-name">{t.name}</span>
                    </div>
                    <p className="stack-note serif">{t.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .stack-sub {
          max-width: 600px;
          color: var(--ink-soft);
          margin: 12px 0 var(--space-12);
        }
        .stack-groups {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-10);
          align-items: start;
        }
        .stack-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
          padding: var(--space-7);
          border-radius: var(--radius-lg);
          background: rgba(17, 32, 58, 0.45);
          border: 1px solid var(--ink-08);
        }
        .stack-group-head {
          display: flex;
          align-items: flex-start;
          gap: var(--space-4);
          padding-bottom: var(--space-5);
          border-bottom: 1px dashed var(--ink-08);
        }
        .stack-group-num {
          font-size: 12px;
          letter-spacing: 0.12em;
          color: var(--accent);
          background: rgba(96, 165, 250, 0.08);
          border: 1px solid rgba(96, 165, 250, 0.2);
          border-radius: 8px;
          padding: 6px 10px;
          line-height: 1;
          flex-shrink: 0;
        }
        .stack-group-label {
          font-family: "Instrument Serif", serif;
          font-size: 24px;
          line-height: 1.05;
          color: var(--ink);
          letter-spacing: -0.01em;
        }
        .stack-group-sub {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 4px;
        }
        .stack-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
        }
        .stack-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .stack-item + .stack-item {
          padding-top: var(--space-5);
          border-top: 1px solid var(--ink-06);
        }
        .stack-item-head {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .stack-glyph {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(96, 165, 250, 0.1);
          color: var(--accent);
          font-size: 11px;
          font-weight: 600;
          flex-shrink: 0;
        }
        .stack-name {
          font-size: 15px;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: -0.005em;
        }
        .stack-note {
          font-size: 16px;
          line-height: 1.4;
          color: var(--ink-soft);
          font-style: italic;
          margin: 0;
        }
        @media (max-width: 1024px) {
          .stack-groups {
            grid-template-columns: 1fr;
            gap: var(--space-6);
          }
        }
        @media (max-width: 720px) {
          .stack-group {
            padding: var(--space-6);
          }
          .stack-group-label {
            font-size: 22px;
          }
        }
      `}</style>
    </section>
  );
}
