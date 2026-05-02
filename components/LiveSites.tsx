"use client";

import { LIVE_SITES } from "@/lib/data";

export default function LiveSites() {
  return (
    <section id="live">
      <div className="container">
        <div className="eyebrow">03.5 / In the wild</div>
        <h2 className="section-title">
          Live <em className="serif">in production.</em>
        </h2>
        <p
          style={{
            maxWidth: 640,
            color: "var(--ink-soft)",
            margin: "12px 0 40px",
          }}
        >
          Real projects out in the wild. Click any card to visit - they open in
          a new tab so you can keep scrolling here.
        </p>

        <div className="live-grid">
          {LIVE_SITES.map((s) => (
            <a
              key={s.title}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="live-card"
            >
              <div className="live-head">
                <div>
                  <div className="live-subtitle mono">{s.subtitle}</div>
                  <h3 className="live-title serif">{s.title}</h3>
                </div>
                <span className="live-tag mono">● {s.tag}</span>
              </div>

              <p className="live-desc">{s.description}</p>

              <div className="live-url mono">
                <span className="live-lock" aria-hidden>
                  🔒
                </span>
                {s.url.replace(/^https?:\/\//, "")}
              </div>

              <div className="live-stats">
                {s.stats.map((st) => (
                  <div key={st.label} className="live-stat">
                    <span className="live-stat-value serif">{st.value}</span>
                    <span className="live-stat-label mono">{st.label}</span>
                  </div>
                ))}
                <div className="live-stat live-stat-role">
                  <span className="live-stat-value-sm">{s.role}</span>
                  <span className="live-stat-label mono">{s.year}</span>
                </div>
              </div>

              <span className="live-arrow" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7M17 7H7M17 7v10"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .live-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: var(--space-5);
        }
        .live-card {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          padding: var(--space-6);
          border-radius: var(--radius-lg);
          background: var(--surface);
          border: 1px solid var(--ink-08);
          text-decoration: none;
          color: inherit;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .live-card:hover {
          border-color: rgba(96, 165, 250, 0.4);
          transform: translateY(-2px);
        }
        .live-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--space-3);
        }
        .live-subtitle {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 6px;
        }
        .live-title {
          font-size: 26px;
          line-height: 1;
          color: var(--ink);
          letter-spacing: -0.01em;
        }
        .live-tag {
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: var(--radius-pill);
          background: rgba(96, 165, 250, 0.12);
          color: var(--accent);
          border: 1px solid rgba(96, 165, 250, 0.25);
          flex-shrink: 0;
        }
        .live-desc {
          font-size: 13px;
          line-height: 1.55;
          color: var(--ink-soft);
        }
        .live-url {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--muted);
          background: rgba(0, 0, 0, 0.25);
          padding: 6px 10px;
          border-radius: 8px;
          border: 1px solid var(--ink-08);
          align-self: flex-start;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .live-lock {
          font-size: 9px;
          opacity: 0.7;
        }
        .live-stats {
          display: flex;
          gap: var(--space-5);
          padding-top: var(--space-4);
          margin-top: auto;
          border-top: 1px dashed var(--ink-08);
          flex-wrap: wrap;
        }
        .live-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .live-stat-value {
          font-size: 18px;
          line-height: 1;
          color: var(--accent);
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
        .live-arrow {
          position: absolute;
          top: var(--space-5);
          right: var(--space-5);
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          background: rgba(96, 165, 250, 0.1);
          color: var(--accent);
          opacity: 0;
          transform: translate(4px, -4px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .live-card:hover .live-arrow {
          opacity: 1;
          transform: translate(0, 0);
        }
        @media (max-width: 720px) {
          .live-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
