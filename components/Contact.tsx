"use client";

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="eyebrow">09 / Let&rsquo;s talk</div>
        <h2 className="section-title">
          Got a project that needs a{" "}
          <em className="serif">careful engineer</em>?
        </h2>

        <div className="contact-card">
          <div>
            <p
              style={{
                color: "var(--ink-soft)",
                maxWidth: 520,
                fontSize: 18,
              }}
            >
              happy to chat anytime!
            </p>
          </div>
          <div className="row" style={{ gap: 10, marginTop: 24 }}>
            <a
              href="mailto:aayzaahmed.wfh@gmail.com"
              className="btn btn-primary"
            >
              aayzaahmed.wfh@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/aayza-ahmed"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              linkedin ↗
            </a>
            <a
              href="https://github.com/aayza-ascent"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              github ↗
            </a>
            <a
              href="/Aayza_CV_Public.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              cv (pdf) ↗
            </a>
          </div>
        </div>

        <footer className="foot">
          <span className="mono">
            © 2026 Aayza Ahmed · built remotely from glasgow 🏴󠁧󠁢󠁳󠁣󠁴󠁿
          </span>
          <span className="mono" style={{ color: "var(--muted)" }}>
            last updated · apr 2026
          </span>
        </footer>
      </div>

      <style jsx>{`
        .contact-card {
          margin-top: var(--space-10);
          padding: var(--space-10);
          border-radius: var(--radius-lg);
          background: rgba(96, 165, 250, 0.06);
          border: 1px solid rgba(96, 165, 250, 0.25);
        }
        .foot {
          margin-top: var(--space-16);
          padding: var(--space-7) 0;
          border-top: 1px dashed var(--ink-12);
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--space-3);
          font-size: 11px;
        }
      `}</style>
    </section>
  );
}
