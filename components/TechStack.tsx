"use client";

import { useState, useMemo } from "react";
import { TECH, type Tech } from "@/lib/data";
import VinylStage from "./tech/VinylStage";
import TrackInfo from "./tech/TrackInfo";

export default function TechStack() {
  const [hover, setHover] = useState<Tech | null>(null);
  const [picked, setPicked] = useState<Tech>(TECH[0]);

  const { inner, middle, outer } = useMemo(
    () => ({
      inner: TECH.filter((t) => t.ring === 0),
      middle: TECH.filter((t) => t.ring === 1),
      outer: TECH.filter((t) => t.ring === 2),
    }),
    [],
  );

  const shown = hover || picked;

  return (
    <section id="stack">
      <div className="container">
        <div className="eyebrow">04 / Tech Stack</div>
        <h2 className="section-title">
          My <em className="serif">mixtape</em> of tools.
        </h2>
        <p
          style={{
            maxWidth: 560,
            color: "var(--ink-soft)",
            margin: "12px 0 40px",
          }}
        >
          Think of this as Side A - the tools on heavy rotation. Hover the
          record to pause it, tap any badge to hear why I like it.
        </p>

        <div className="vinyl-layout">
          <VinylStage
            inner={inner}
            middle={middle}
            outer={outer}
            onHover={setHover}
            onPick={setPicked}
          />
          <TrackInfo shown={shown} onHover={setHover} onPick={setPicked} />
        </div>
      </div>

      <style jsx>{`
        .vinyl-layout {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: var(--space-10);
          align-items: center;
        }
        @media (max-width: 1024px) {
          .vinyl-layout {
            grid-template-columns: 1fr;
            gap: var(--space-8);
          }
          .vinyl-layout > :global(.vinyl-stage) {
            max-width: 420px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
