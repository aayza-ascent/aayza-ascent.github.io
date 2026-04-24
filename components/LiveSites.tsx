'use client';

import { useState, type CSSProperties } from 'react';
import { LIVE_SITES } from '@/lib/data';

export default function LiveSites() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="live">
      <div className="container">
        <div className="eyebrow">03.5 / In the wild</div>
        <h2 className="section-title">
          Live <em className="serif">in production.</em>
        </h2>
        <p style={{ maxWidth: 640, color: 'var(--ink-soft)', margin: '12px 0 40px' }}>
          Real sites, real traffic. Click any card to visit — they open in a new tab so you can keep scrolling here.
        </p>

        <div className="live-grid">
          {LIVE_SITES.map((s, i) => (
            <a
              key={s.title}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="live-card"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={
                {
                  '--tint': s.tint,
                  boxShadow:
                    hover === i
                      ? `0 30px 60px ${s.tint}33, 0 0 0 1px ${s.tint}55, inset 0 1px 0 rgba(255,255,255,.08)`
                      : `0 20px 50px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.05)`,
                } as CSSProperties
              }
            >
              <div className="live-preview" style={{ background: s.preview }}>
                <div className="live-chrome">
                  <div className="chrome-dots">
                    <span style={{ background: '#FF5F57' }} />
                    <span style={{ background: '#FEBC2E' }} />
                    <span style={{ background: '#28C840' }} />
                  </div>
                  <div className="chrome-url mono">
                    <span className="chrome-lock">🔒</span>
                    {s.url.replace(/^https?:\/\//, '')}
                  </div>
                </div>
                <div
                  className="live-preview-tag mono"
                  style={{ background: `${s.tint}22`, color: '#fff', borderColor: `${s.tint}66` }}
                >
                  ● {s.tag}
                </div>
                <div className="live-preview-glyph serif">{s.title.charAt(0)}</div>
              </div>

              <div className="live-body">
                <div className="live-head">
                  <div>
                    <div className="live-subtitle mono" style={{ color: s.tint }}>
                      {s.subtitle}
                    </div>
                    <h3 className="live-title serif">{s.title}</h3>
                  </div>
                  <div className="live-arrow" style={{ background: s.tint }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7 17L17 7M17 7H7M17 7v10"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <p className="live-desc">{s.description}</p>
                <div className="live-stats">
                  {s.stats.map((st) => (
                    <div key={st.label} className="live-stat">
                      <span className="live-stat-value serif" style={{ color: s.tint }}>
                        {st.value}
                      </span>
                      <span className="live-stat-label mono">{st.label}</span>
                    </div>
                  ))}
                  <div className="live-stat live-stat-role">
                    <span className="live-stat-value-sm">{s.role}</span>
                    <span className="live-stat-label mono">{s.year}</span>
                  </div>
                </div>
              </div>

              <div className="live-shine" />
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .live-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 24px;
        }
        .live-card {
          display: flex;
          flex-direction: column;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          background: linear-gradient(145deg, var(--surface), var(--surface-2));
          border: 0.5px solid rgba(255, 255, 255, 0.06);
          text-decoration: none;
          color: inherit;
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease;
          cursor: pointer;
        }
        .live-card:hover {
          transform: translateY(-6px);
        }
        .live-preview {
          position: relative;
          aspect-ratio: 16 / 10;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .live-preview::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.25), transparent 60%);
        }
        .live-preview::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
        }
        .live-chrome {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: rgba(14, 11, 26, 0.35);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.08);
        }
        .chrome-dots {
          display: flex;
          gap: 5px;
        }
        .chrome-dots span {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          opacity: 0.9;
        }
        .chrome-url {
          flex: 1;
          text-align: center;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.85);
          background: rgba(14, 11, 26, 0.4);
          padding: 4px 10px;
          border-radius: 6px;
          border: 0.5px solid rgba(255, 255, 255, 0.06);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          align-items: center;
          gap: 6px;
          justify-content: center;
        }
        .chrome-lock {
          font-size: 8px;
          opacity: 0.7;
        }
        .live-preview-glyph {
          position: absolute;
          bottom: -20px;
          right: -10px;
          font-size: 220px;
          line-height: 0.8;
          color: rgba(255, 255, 255, 0.18);
          font-style: italic;
          pointer-events: none;
          z-index: 1;
        }
        .live-preview-tag {
          position: absolute;
          top: 52px;
          left: 14px;
          z-index: 2;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1px solid;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .live-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .live-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 14px;
        }
        .live-subtitle {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .live-title {
          font-size: 28px;
          line-height: 1;
          color: var(--ink);
        }
        .live-arrow {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: #0e0b1a;
          flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 4px 14px currentColor;
        }
        .live-card:hover .live-arrow {
          transform: rotate(-12deg) scale(1.1);
        }
        .live-desc {
          font-size: 13px;
          line-height: 1.55;
          color: var(--ink-soft);
        }
        .live-stats {
          display: flex;
          gap: 20px;
          padding-top: 14px;
          margin-top: 4px;
          border-top: 1px dashed rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
        }
        .live-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .live-stat-value {
          font-size: 20px;
          line-height: 1;
        }
        .live-stat-value-sm {
          font-size: 12px;
          font-weight: 500;
          color: var(--ink);
        }
        .live-stat-label {
          font-size: 9px;
          letter-spacing: 0.1em;
          color: var(--muted);
          text-transform: uppercase;
        }
        .live-stat-role {
          margin-left: auto;
          text-align: right;
        }
        .live-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.06), transparent);
          transform: skewX(-20deg);
          pointer-events: none;
          transition: left 0.8s ease;
        }
        .live-card:hover .live-shine {
          left: 140%;
        }
        @media (max-width: 640px) {
          .live-grid {
            grid-template-columns: 1fr;
          }
          .live-title {
            font-size: 24px;
          }
          .live-preview-glyph {
            font-size: 160px;
          }
        }
      `}</style>
    </section>
  );
}
