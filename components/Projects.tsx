"use client";

import { useState } from "react";
import { PROJECTS, type Project } from "@/lib/data";
import ProjectsFilter, { type Filter } from "./projects/ProjectsFilter";
import ProjectCard from "./projects/ProjectCard";

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered: Project[] =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.type === filter);

  return (
    <section id="projects">
      <div className="container">
        <div className="eyebrow">03 / Projects</div>
        <h2 className="section-title">
          Recent <em className="serif">work</em>.
        </h2>
        <p className="projects-sub">
          A spread of work projects and personal builds — tap any with a link to
          open the source or live site.
        </p>

        <ProjectsFilter filter={filter} onChange={setFilter} />

        <div className="projects-grid">
          {filtered.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .projects-sub {
          max-width: 560px;
          color: var(--ink-soft);
          margin: 12px 0 32px;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-5);
        }
      `}</style>
    </section>
  );
}
