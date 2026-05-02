"use client";

const STATS: [string, string][] = [
  ["7", "years shipping"],
  ["1st", "class honours"],
  ["6", "years working remotely"],
  ["100%", "outgoing, funny, and humble (self-rated)"],
];

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        padding: "140px 32px 80px",
        position: "relative",
      }}
    >
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
            building <span className="hl">durable, well-crafted tools.</span>
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
          <a href="#api" className="btn btn-ghost">
            Say hi ↗
          </a>
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

      <style jsx>{`
        .hero-inner {
          position: relative;
          z-index: 2;
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
          padding-right: 0.4em;
        }
        :global(.hero-name .name-word:last-of-type) {
          padding-right: 0;
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
          color: var(--accent);
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
          margin-top: 72px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--ink-08);
          background: rgba(17, 32, 58, 0.4);
          overflow: hidden;
        }
        .stat {
          padding: 22px 20px;
          text-align: left;
        }
        .stat + .stat {
          border-left: 1px solid var(--ink-08);
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

        @media (max-width: 720px) {
          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          .stat:nth-child(2) {
            border-left: 1px solid var(--ink-08);
          }
          .stat:nth-child(3),
          .stat:nth-child(4) {
            border-top: 1px solid var(--ink-08);
          }
          .stat:nth-child(3) {
            border-left: 0;
          }
        }
      `}</style>
    </section>
  );
}
