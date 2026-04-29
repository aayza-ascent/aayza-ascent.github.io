"use client";

interface CoverArtProps {
  cover: string;
  playing: boolean;
}

export default function CoverArt({ cover, playing }: CoverArtProps) {
  return (
    <div className="np-cover" style={{ background: cover }}>
      <div className="np-cover-shine" />
      {playing && (
        <div className="np-eq">
          <span style={{ animationDelay: "0s" }} />
          <span style={{ animationDelay: "-.3s" }} />
          <span style={{ animationDelay: "-.6s" }} />
          <span style={{ animationDelay: "-.2s" }} />
        </div>
      )}
      <style jsx>{`
        .np-cover {
          width: 52px;
          height: 52px;
          border-radius: var(--space-2);
          position: relative;
          flex-shrink: 0;
          overflow: hidden;
          box-shadow:
            0 4px 16px var(--scrim-40),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
        .np-cover-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.3) 0%,
            transparent 50%
          );
          pointer-events: none;
        }
        .np-eq {
          position: absolute;
          bottom: 6px;
          left: 6px;
          display: flex;
          gap: 2px;
          align-items: end;
          height: 14px;
        }
        .np-eq span {
          width: 2px;
          background: var(--white);
          border-radius: 1px;
          animation: eq 1.1s ease-in-out infinite;
        }
        @keyframes eq {
          0%,
          100% {
            height: 3px;
          }
          50% {
            height: 14px;
          }
        }
        .np-eq span:nth-child(2) {
          animation-duration: 0.9s;
        }
        .np-eq span:nth-child(3) {
          animation-duration: 1.3s;
        }
        .np-eq span:nth-child(4) {
          animation-duration: 1s;
        }
        @media (max-width: 720px) {
          .np-cover {
            width: 42px;
            height: 42px;
          }
        }
      `}</style>
    </div>
  );
}
