"use client";

import { PROJECTS } from "@/lib/data";

export type Filter = "All" | "Personal" | "Work";

const FILTERS: Filter[] = ["All", "Personal", "Work"];

interface ProjectsFilterProps {
  filter: Filter;
  onChange: (next: Filter) => void;
}

export default function ProjectsFilter({
  filter,
  onChange,
}: ProjectsFilterProps) {
  const countFor = (f: Filter) =>
    f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.type === f).length;

  return (
    <div className="filter-row">
      {FILTERS.map((f) => (
        <button
          key={f}
          className={`filter-pill ${filter === f ? "on" : ""}`}
          onClick={() => onChange(f)}
        >
          {f}
          <span className="count">{countFor(f)}</span>
        </button>
      ))}

      <style jsx>{`
        .filter-row {
          display: flex;
          gap: 10px;
          margin-bottom: var(--space-8);
          flex-wrap: wrap;
        }
        .filter-pill {
          appearance: none;
          border: 1px solid var(--ink-10);
          background: rgba(255, 255, 255, 0.03);
          color: var(--ink-soft);
          padding: 10px 20px;
          border-radius: var(--radius-pill);
          cursor: pointer;
          font-family: "Inter", sans-serif;
          font-size: 13px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }
        .filter-pill:hover {
          background: var(--ink-06);
          color: var(--ink);
        }
        .filter-pill.on {
          background: var(--accent);
          color: #0a1628;
          border-color: transparent;
        }
        .filter-pill .count {
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          background: var(--scrim-25);
          padding: 2px 7px;
          border-radius: var(--radius-pill);
        }
        .filter-pill.on .count {
          background: var(--ink-20);
        }
      `}</style>
    </div>
  );
}
