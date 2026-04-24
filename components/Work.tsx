'use client';

import { useState } from 'react';
import { WORK, type Work as WorkItemT } from '@/lib/data';

function WorkItem({ item, open, onToggle }: { item: WorkItemT; open: boolean; onToggle: () => void }) {
  return (
    <div className={`work-card ${open ? 'open' : ''}`}>
      <button className="work-head" onClick={onToggle} aria-expanded={open}>
        <div className="work-logo" style={{ background: item.color }}>
          <span>{item.logo}</span>
        </div>
        <div className="work-head-main">
          <div className="work-company">
            <b>{item.company}</b>
            <span className="mono period">{item.period}</span>
          </div>
          <div className="work-role">{item.role}</div>
        </div>
        <div className="work-chev" aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      <div className="work-body" style={{ maxHeight: open ? 560 : 0 }}>
        <div className="work-body-inner">
          <p className="work-summary">{item.summary}</p>
          <ul className="work-highlights">
            {item.highlights.map((h, i) => (
              <li key={i}>
                <span className="tick">✓</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <div className="row" style={{ gap: 6 }}>
            {item.stack.map((s) => (
              <span className="chip" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .work-card {
          border-radius: 20px;
          background: linear-gradient(145deg, var(--surface), var(--surface-2));
          box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          border: 0.5px solid rgba(255, 255, 255, 0.06);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .work-card.open {
          box-shadow: 14px 14px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08);
          border-color: rgba(167, 139, 250, 0.25);
        }
        .work-head {
          display: flex;
          gap: 18px;
          align-items: center;
          width: 100%;
          padding: 20px 22px;
          background: none;
          border: 0;
          cursor: pointer;
          text-align: left;
          color: inherit;
          font: inherit;
        }
        .work-logo {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          font-family: 'Instrument Serif', serif;
          font-size: 24px;
          color: #fff;
          flex-shrink: 0;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 6px 16px rgba(0, 0, 0, 0.4);
        }
        .work-head-main {
          flex: 1;
          min-width: 0;
        }
        .work-company {
          display: flex;
          align-items: baseline;
          gap: 14px;
          flex-wrap: wrap;
        }
        .work-company b {
          font-size: 18px;
          font-weight: 600;
        }
        .work-company .period {
          font-size: 11px;
          color: var(--muted);
        }
        .work-role {
          font-family: 'Instrument Serif', serif;
          font-size: 22px;
          color: var(--ink-soft);
          margin-top: 2px;
          font-style: italic;
        }
        .work-chev {
          color: var(--muted);
          transition: transform 0.3s ease;
        }
        .work-card.open .work-chev {
          transform: rotate(180deg);
          color: var(--ink);
        }
        .work-body {
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .work-body-inner {
          padding: 0 22px 26px 92px;
        }
        .work-summary {
          color: var(--ink-soft);
          line-height: 1.6;
          margin-bottom: 18px;
          max-width: 640px;
        }
        .work-highlights {
          list-style: none;
          margin-bottom: 18px;
          display: grid;
          gap: 8px;
        }
        .work-highlights li {
          display: flex;
          gap: 10px;
          color: var(--ink);
          font-size: 14px;
          line-height: 1.5;
        }
        .work-highlights .tick {
          color: var(--peri);
          font-weight: 700;
          flex-shrink: 0;
        }
        @media (max-width: 640px) {
          .work-body-inner {
            padding: 0 22px 22px 22px;
          }
          .work-head {
            padding: 16px;
          }
          .work-logo {
            width: 44px;
            height: 44px;
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default function Work() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="work">
      <div className="container">
        <div className="eyebrow">02 / Work</div>
        <h2 className="section-title">
          Places I&rsquo;ve <em className="serif">built things</em> over the last seven years.
        </h2>
        <p style={{ maxWidth: 560, color: 'var(--ink-soft)', margin: '12px 0 48px' }}>
          Click a role to expand. The thread through them: small teams, shipping weekly, and a healthy suspicion of any
          plan longer than six weeks.
        </p>

        <div className="timeline">
          <div className="rail" aria-hidden />
          {WORK.map((w, i) => (
            <div className="timeline-row" key={i}>
              <div className="node" style={{ background: w.color }} />
              <WorkItem item={w} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .timeline {
          position: relative;
          padding-left: 42px;
        }
        .timeline .rail {
          position: absolute;
          left: 10px;
          top: 12px;
          bottom: 12px;
          width: 2px;
          background: linear-gradient(to bottom, var(--peri), rgba(167, 139, 250, 0.3) 40%, transparent);
        }
        .timeline-row {
          position: relative;
          margin-bottom: 16px;
        }
        .timeline-row .node {
          position: absolute;
          left: -36px;
          top: 22px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 3px solid var(--cream);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 20px currentColor, 0 4px 10px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </section>
  );
}
