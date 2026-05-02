"use client";

import { GitHubCalendar } from "react-github-calendar";

const USERNAME = "aayza-ascent";

const THEME = {
  light: ["#142540", "#1f3a6b", "#2d5aa0", "#60A5FA", "#A8CFFF"],
  dark: ["#142540", "#1f3a6b", "#2d5aa0", "#60A5FA", "#A8CFFF"],
};

export default function GithubGraph() {
  return (
    <section id="github">
      <div className="container">
        <div className="eyebrow">03.7 / On GitHub</div>
        <h2 className="section-title">
          A year of <em className="serif">commits</em>, in green-blue.
        </h2>
        <p className="gh-sub">
          Pulled live from{" "}
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{USERNAME}
          </a>
          . Public contributions only — the day job lives on private repos.
        </p>

        <div className="gh-card glass">
          <GitHubCalendar
            username={USERNAME}
            theme={THEME}
            colorScheme="dark"
            blockSize={12}
            blockMargin={4}
            fontSize={12}
            labels={{
              totalCount: "{{count}} contributions in the last year",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .gh-sub {
          max-width: 600px;
          color: var(--ink-soft);
          margin: 12px 0 var(--space-10);
        }
        .gh-sub a {
          color: var(--accent);
          text-decoration: none;
          border-bottom: 1px dashed rgba(96, 165, 250, 0.5);
        }
        .gh-sub a:hover {
          border-bottom-color: var(--accent);
        }
        .gh-card {
          padding: var(--space-7);
          border-radius: var(--radius-lg);
          background: rgba(17, 32, 58, 0.45);
          border: 1px solid var(--ink-08);
          overflow-x: auto;
          color: var(--ink-soft);
        }
        .gh-card :global(.react-activity-calendar__count),
        .gh-card :global(.react-activity-calendar__legend-month) {
          color: var(--muted);
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
        }
        .gh-card :global(.react-activity-calendar__footer) {
          color: var(--muted);
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
        }
        @media (max-width: 720px) {
          .gh-card {
            padding: var(--space-5);
          }
        }
      `}</style>
    </section>
  );
}
