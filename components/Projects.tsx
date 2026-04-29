"use client";

import { useEffect, useState } from "react";
import { PROJECTS, type Project } from "@/lib/data";
import ProjectsFilter, { type Filter } from "./projects/ProjectsFilter";
import ProjectCard from "./projects/ProjectCard";

export default function Projects() {
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<Filter>("All");

  const filtered: Project[] =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.type === filter);
  const total = filtered.length;

  const next = () => {
    setActive((active + 1) % total);
    setFlipped(new Set());
  };
  const prev = () => {
    setActive((active - 1 + total) % total);
    setFlipped(new Set());
  };

  const toggleFlip = (i: number) => {
    const n = new Set(flipped);
    if (n.has(i)) n.delete(i);
    else n.add(i);
    setFlipped(n);
  };

  useEffect(() => {
    setActive(0);
    setFlipped(new Set());
  }, [filter]);

  return (
    <section id="projects">
      <div className="container">
        <div className="eyebrow">03 / Projects</div>
        <h2 className="section-title">
          A <em className="serif">playful deck</em> of recent work.
        </h2>
        <p
          style={{
            maxWidth: 560,
            color: "var(--ink-soft)",
            margin: "12px 0 32px",
          }}
        >
          Click any card to flip it and see tech + links. Use the arrows or drag
          the stack to browse.
        </p>

        <ProjectsFilter filter={filter} onChange={setFilter} />

        <div className="stage">
          <button className="nav-btn prev" onClick={prev} aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="deck">
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.title}
                project={p}
                index={i}
                total={total}
                active={active}
                flipped={flipped.has(i)}
                onActivate={setActive}
                onToggleFlip={toggleFlip}
              />
            ))}
          </div>

          <button className="nav-btn next" onClick={next} aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="stage-caption">
          <span className="mono">
            <span style={{ color: "var(--peri)" }}>●</span>{" "}
            {filtered[active]?.title} -{" "}
            <span style={{ color: "var(--muted)" }}>
              {active + 1} of {total}
            </span>
          </span>
        </div>
      </div>

      <style jsx>{`
        .stage {
          position: relative;
          perspective: 1800px;
          padding: 40px 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 600px;
        }
        .deck {
          position: relative;
          width: min(520px, 100%);
          height: 560px;
          transform-style: preserve-3d;
        }
        .nav-btn {
          appearance: none;
          background: rgba(255, 255, 255, 0.05);
          color: var(--ink);
          border: 1px solid var(--ink-10);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
          backdrop-filter: blur(10px);
          z-index: 10;
        }
        .nav-btn:hover {
          background: linear-gradient(135deg, var(--peri), var(--accent));
          color: var(--white);
          border-color: transparent;
          transform: scale(1.1);
          box-shadow: 0 10px 30px rgba(167, 139, 250, 0.4);
        }
        .stage-caption {
          text-align: center;
          margin-top: var(--space-5);
          font-size: 12px;
        }
        @media (max-width: 720px) {
          .stage {
            padding: var(--space-5) 0;
          }
          .deck {
            width: min(340px, 92vw);
            height: 500px;
          }
          .nav-btn {
            position: absolute;
            z-index: 20;
          }
          .nav-btn.prev {
            left: -4px;
          }
          .nav-btn.next {
            right: -4px;
          }
        }
      `}</style>
    </section>
  );
}
