"use client";

import type { Project } from "@/lib/data";
import ProjectIcon from "./ProjectIcon";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasLink = project.link && project.link !== "#";
  const Wrapper = hasLink ? "a" : "div";
  const wrapperProps = hasLink
    ? { href: project.link, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <Wrapper className={`pcard ${hasLink ? "linked" : ""}`} {...wrapperProps}>
      <div className="pcard-top">
        <span className="pcard-tag mono">
          {project.type} · {project.year}
        </span>
        <div className="pcard-icon" aria-hidden>
          <ProjectIcon name={project.icon} />
        </div>
      </div>

      <h3 className="pcard-title serif">{project.title}</h3>
      <p className="pcard-blurb">{project.blurb}</p>

      <div className="pcard-tech-row">
        {project.tech.map((t) => (
          <span key={t} className="pcard-tech mono">
            {t}
          </span>
        ))}
      </div>

      {hasLink && (
        <span className="pcard-cta mono">
          open ↗
        </span>
      )}

      <style jsx>{`
        .pcard {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          padding: var(--space-6);
          border-radius: var(--radius-lg);
          background: var(--surface);
          border: 1px solid var(--ink-08);
          color: var(--ink);
          text-decoration: none;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .pcard.linked {
          cursor: pointer;
        }
        .pcard.linked:hover {
          border-color: rgba(96, 165, 250, 0.4);
          transform: translateY(-2px);
        }
        .pcard-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--space-3);
        }
        .pcard-tag {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          padding-top: 6px;
        }
        .pcard-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 12px;
          background: rgba(96, 165, 250, 0.08);
          border: 1px solid rgba(96, 165, 250, 0.2);
          color: var(--accent);
          overflow: hidden;
        }
        .pcard-title {
          font-size: 26px;
          line-height: 1.1;
          letter-spacing: -0.01em;
          color: var(--ink);
          margin-top: 4px;
        }
        .pcard-blurb {
          color: var(--ink-soft);
          font-size: 14px;
          line-height: 1.55;
          flex: 1;
        }
        .pcard-tech-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding-top: var(--space-3);
          margin-top: auto;
          border-top: 1px dashed var(--ink-08);
        }
        .pcard-tech {
          padding: 4px 10px;
          border-radius: var(--radius-pill);
          background: rgba(96, 165, 250, 0.08);
          border: 1px solid rgba(96, 165, 250, 0.18);
          color: var(--accent);
          font-size: 11px;
        }
        .pcard-cta {
          font-size: 11px;
          color: var(--accent);
          letter-spacing: 0.08em;
        }
      `}</style>
    </Wrapper>
  );
}
