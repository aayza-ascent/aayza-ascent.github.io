"use client";

import { useEffect, useRef, type RefObject } from "react";

interface BlobsProps {
  containerRef: RefObject<HTMLElement | null>;
}

export default function Blobs({ containerRef }: BlobsProps) {
  const blobs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  useEffect(() => {
    const offsets: [number, number, number][] = [
      [1.0, 1.0, 280],
      [0.6, 0.6, 160],
      [0.9, 0.9, 120],
    ];
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const r = containerRef.current?.getBoundingClientRect();
      if (!r) return;
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      blobs.current.forEach((el, i) => {
        if (!el) return;
        const [sx, sy, half] = offsets[i];
        el.style.transform = `translate(${cx * sx - half}px, ${cy * sy - half}px)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [containerRef]);

  return (
    <>
      {(["peri", "blush", "mint"] as const).map((variant, i) => (
        <div
          key={variant}
          ref={(el) => {
            blobs.current[i] = el;
          }}
          className={`blob blob-${variant}`}
          aria-hidden
        />
      ))}
      <style jsx>{`
        .blob {
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 1;
          mix-blend-mode: screen;
          opacity: calc(0.85 * var(--motion, 1) + 0.2);
        }
        .blob-peri {
          width: 620px;
          height: 620px;
          background: radial-gradient(circle, var(--peri) 0%, transparent 70%);
        }
        .blob-blush {
          width: 360px;
          height: 360px;
          background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
        }
        .blob-mint {
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, var(--cyan) 0%, transparent 70%);
        }
      `}</style>
    </>
  );
}
