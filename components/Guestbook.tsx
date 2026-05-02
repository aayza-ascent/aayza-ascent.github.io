"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type TouchEvent,
} from "react";

const GRID_COLS = 48;
const GRID_ROWS = 24;
const COLORS = [
  "#60A5FA",
  "#3B82F6",
  "#0EA5E9",
  "#7DD3FC",
  "#A5B4FC",
  "#34D399",
  "#FBBF24",
  "#F472B6",
  "#FB7185",
  "#FACC15",
  "#FFFFFF",
  "#11203A",
];

const SEED: [number, number, string][] = [
  [6, 10, "#60A5FA"],
  [6, 11, "#60A5FA"],
  [7, 9, "#60A5FA"],
  [7, 12, "#60A5FA"],
  [8, 8, "#60A5FA"],
  [8, 9, "#60A5FA"],
  [8, 10, "#60A5FA"],
  [8, 11, "#60A5FA"],
  [8, 12, "#60A5FA"],
  [8, 13, "#60A5FA"],
  [9, 8, "#60A5FA"],
  [9, 13, "#60A5FA"],
  [10, 8, "#60A5FA"],
  [10, 13, "#60A5FA"],
  [6, 16, "#7DD3FC"],
  [6, 17, "#7DD3FC"],
  [7, 15, "#7DD3FC"],
  [7, 18, "#7DD3FC"],
  [8, 14, "#7DD3FC"],
  [8, 15, "#7DD3FC"],
  [8, 16, "#7DD3FC"],
  [8, 17, "#7DD3FC"],
  [8, 18, "#7DD3FC"],
  [8, 19, "#7DD3FC"],
  [9, 14, "#7DD3FC"],
  [9, 19, "#7DD3FC"],
  [10, 14, "#7DD3FC"],
  [10, 19, "#7DD3FC"],
  [14, 30, "#FFFFFF"],
  [14, 32, "#FFFFFF"],
  [15, 29, "#FFFFFF"],
  [15, 30, "#FFFFFF"],
  [15, 31, "#FFFFFF"],
  [15, 32, "#FFFFFF"],
  [15, 33, "#FFFFFF"],
  [16, 29, "#FFFFFF"],
  [16, 30, "#FFFFFF"],
  [16, 31, "#FFFFFF"],
  [16, 32, "#FFFFFF"],
  [16, 33, "#FFFFFF"],
  [17, 30, "#FFFFFF"],
  [17, 31, "#FFFFFF"],
  [17, 32, "#FFFFFF"],
  [18, 31, "#FFFFFF"],
  [2, 4, "#FBBF24"],
  [3, 5, "#FBBF24"],
  [2, 6, "#FBBF24"],
  [19, 42, "#34D399"],
  [20, 41, "#34D399"],
  [20, 43, "#34D399"],
  [21, 42, "#34D399"],
];

type PixelMap = Record<string, string>;

function seedGrid(): PixelMap {
  const grid: PixelMap = {};
  SEED.forEach(([r, c, color]) => {
    grid[`${r},${c}`] = color;
  });
  return grid;
}

export default function Guestbook() {
  const [pixels, setPixels] = useState<PixelMap>(() => seedGrid());
  const [color, setColor] = useState(COLORS[0]);
  const [tool, setTool] = useState<"paint" | "erase">("paint");
  const [dragging, setDragging] = useState(false);
  const [recentCount, setRecentCount] = useState(0);
  const [coords, setCoords] = useState<{ r: number; c: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("guestbook-v2");
      if (raw) setPixels(JSON.parse(raw));
    } catch {}
    try {
      setRecentCount(Number(localStorage.getItem("gb-session-count") || 0));
    } catch {}
  }, []);

  const save = (next: PixelMap) => {
    try {
      localStorage.setItem("guestbook-v2", JSON.stringify(next));
    } catch {}
  };

  const placedCount = Object.keys(pixels).length;

  const paint = (r: number, c: number) => {
    if (r < 0 || r >= GRID_ROWS || c < 0 || c >= GRID_COLS) return;
    const key = `${r},${c}`;
    setPixels((prev) => {
      const next = { ...prev };
      if (tool === "erase") delete next[key];
      else next[key] = color;
      save(next);
      return next;
    });
    try {
      const n = Number(localStorage.getItem("gb-session-count") || 0) + 1;
      localStorage.setItem("gb-session-count", String(n));
      setRecentCount(n);
    } catch {}
  };

  const getCell = (clientX: number, clientY: number) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const c = Math.floor(x / (rect.width / GRID_COLS));
    const r = Math.floor(y / (rect.height / GRID_ROWS));
    return { r, c };
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
    const { r, c } = getCell(e.clientX, e.clientY);
    paint(r, c);
  };
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { r, c } = getCell(e.clientX, e.clientY);
    setCoords({ r, c });
    if (dragging) paint(r, c);
  };
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
    const t = e.touches[0];
    const { r, c } = getCell(t.clientX, t.clientY);
    paint(r, c);
  };
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const t = e.touches[0];
    const { r, c } = getCell(t.clientX, t.clientY);
    setCoords({ r, c });
    if (dragging) paint(r, c);
  };
  const handleUp = () => setDragging(false);

  const clearAll = () => {
    if (!confirm("Clear the whole canvas?")) return;
    setPixels({});
    save({});
  };

  const resetToSeed = () => {
    const grid = seedGrid();
    setPixels(grid);
    save(grid);
  };

  return (
    <section id="guestbook">
      <div className="container">
        <div className="eyebrow">08 / Leave a mark</div>
        <h2 className="section-title">
          The <em className="serif">guestbook</em> - pixel edition.
        </h2>
        <p
          style={{
            maxWidth: 640,
            color: "var(--ink-soft)",
            margin: "12px 0 40px",
          }}
        >
          Scroll-sized crowd art. Pick a color, drag to paint. Your strokes save
          to this browser - bring a friend and build something together.
        </p>

        <div className="gb-wrap">
          <div className="gb-tools">
            <div className="gb-tools-row">
              <div className="gb-palette">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    className={`gb-swatch ${color === c && tool === "paint" ? "active" : ""}`}
                    style={{
                      background: c,
                      borderColor:
                        color === c && tool === "paint"
                          ? "var(--ink)"
                          : "transparent",
                    }}
                    onClick={() => {
                      setColor(c);
                      setTool("paint");
                    }}
                    aria-label={`Color ${c}`}
                  />
                ))}
              </div>
              <div className="gb-tool-btns">
                <button
                  className={`gb-tool ${tool === "erase" ? "active" : ""}`}
                  onClick={() => setTool("erase")}
                  title="Eraser"
                >
                  ◌ Erase
                </button>
                <button
                  className="gb-tool"
                  onClick={resetToSeed}
                  title="Reset to default"
                >
                  ↻ Reset
                </button>
                <button
                  className="gb-tool danger"
                  onClick={clearAll}
                  title="Clear all"
                >
                  ⌫ Clear
                </button>
              </div>
            </div>
          </div>

          <div
            ref={canvasRef}
            className="gb-canvas"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleUp}
            onMouseLeave={() => {
              handleUp();
              setCoords(null);
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleUp}
            style={{ cursor: tool === "erase" ? "cell" : "crosshair" }}
          >
            <div
              className="gb-pixels"
              style={{
                gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
                gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
              }}
            >
              {Array.from({ length: GRID_ROWS * GRID_COLS }).map((_, i) => {
                const r = Math.floor(i / GRID_COLS);
                const c = i % GRID_COLS;
                const col = pixels[`${r},${c}`];
                return (
                  <div
                    key={i}
                    className="gb-cell"
                    style={{ background: col || "transparent" }}
                  />
                );
              })}
            </div>
            <div className="gb-ruler gb-ruler-x">
              {[0, 12, 24, 36, 47].map((n) => (
                <span
                  key={n}
                  style={{ left: `${(n / (GRID_COLS - 1)) * 100}%` }}
                >
                  {n}
                </span>
              ))}
            </div>
            <div className="gb-ruler gb-ruler-y">
              {[0, 8, 16, 23].map((n) => (
                <span
                  key={n}
                  style={{ top: `${(n / (GRID_ROWS - 1)) * 100}%` }}
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          <div className="gb-foot">
            <div className="gb-stat">
              <span className="mono gb-stat-label">PIXELS PLACED</span>
              <span className="serif gb-stat-value">{placedCount}</span>
            </div>
            <div className="gb-stat">
              <span className="mono gb-stat-label">YOUR STROKES</span>
              <span
                className="serif gb-stat-value"
                style={{ color: "var(--accent)" }}
              >
                {recentCount}
              </span>
            </div>
            <div className="gb-stat">
              <span className="mono gb-stat-label">CURSOR</span>
              <span className="mono gb-stat-value-sm">
                {coords
                  ? `(${String(coords.c).padStart(2, "0")}, ${String(coords.r).padStart(2, "0")})`
                  : "-"}
              </span>
            </div>
            <div className="gb-stat">
              <span className="mono gb-stat-label">CURRENT</span>
              <span
                className="gb-stat-swatch"
                style={{
                  background: tool === "erase" ? "transparent" : color,
                  border:
                    tool === "erase"
                      ? "2px dashed var(--muted)"
                      : `2px solid ${color}`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gb-wrap {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        .gb-tools {
          padding: 14px 18px;
          border-radius: var(--radius-md);
          background: var(--surface);
          border: 1px solid var(--ink-08);
        }
        .gb-tools-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-5);
          flex-wrap: wrap;
        }
        .gb-palette {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .gb-swatch {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        .gb-swatch:hover {
          transform: translateY(-2px) scale(1.1);
        }
        .gb-swatch.active {
          transform: scale(1.15);
          box-shadow: 0 4px 16px currentColor;
        }
        .gb-tool-btns {
          display: flex;
          gap: 6px;
        }
        .gb-tool {
          appearance: none;
          border: 1px solid var(--ink-10);
          background: var(--ink-04);
          color: var(--ink-soft);
          padding: var(--space-2) 14px;
          border-radius: 8px;
          cursor: pointer;
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          transition: all 0.2s ease;
        }
        .gb-tool:hover {
          background: var(--ink-08);
          color: var(--ink);
        }
        .gb-tool.active {
          background: var(--accent);
          color: #0a1628;
          border-color: var(--accent);
        }
        .gb-tool.danger:hover {
          background: rgba(239, 68, 68, 0.15);
          color: #fca5a5;
          border-color: rgba(239, 68, 68, 0.3);
        }
        .gb-canvas {
          position: relative;
          width: 100%;
          aspect-ratio: ${GRID_COLS} / ${GRID_ROWS};
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #06101F;
          border: 1px solid var(--ink-08);
          touch-action: none;
          user-select: none;
        }
        .gb-pixels {
          position: absolute;
          inset: 0;
          display: grid;
          gap: 0;
        }
        .gb-cell {
          border-right: 0.5px solid rgba(255, 255, 255, 0.025);
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.025);
          transition: background 0.15s ease;
        }
        .gb-cell:hover {
          box-shadow: inset 0 0 0 1px var(--ink-20);
        }
        .gb-ruler {
          position: absolute;
          pointer-events: none;
          font-family: "JetBrains Mono", monospace;
          font-size: 8px;
          color: var(--muted);
        }
        .gb-ruler span {
          position: absolute;
        }
        .gb-ruler-x {
          top: 6px;
          left: 0;
          right: 0;
          height: 12px;
        }
        .gb-ruler-x span {
          transform: translateX(-50%);
        }
        .gb-ruler-y {
          top: 0;
          bottom: 0;
          left: 6px;
          width: 16px;
        }
        .gb-ruler-y span {
          transform: translateY(-50%);
        }
        .gb-foot {
          display: flex;
          gap: var(--space-8);
          align-items: center;
          padding: 14px 18px;
          background: var(--surface);
          border-radius: var(--radius-md);
          border: 1px solid var(--ink-08);
          flex-wrap: wrap;
        }
        .gb-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .gb-stat-label {
          font-size: 9px;
          letter-spacing: 0.15em;
          color: var(--muted);
        }
        .gb-stat-value {
          font-size: 24px;
          line-height: 1;
          color: var(--ink);
        }
        .gb-stat-value-sm {
          font-size: 14px;
          color: var(--ink-soft);
        }
        .gb-stat-swatch {
          width: 24px;
          height: 24px;
          border-radius: 6px;
        }
        @media (max-width: 720px) {
          .gb-canvas {
            aspect-ratio: ${GRID_COLS} / ${GRID_ROWS * 1.2};
          }
          .gb-swatch {
            width: 24px;
            height: 24px;
          }
          .gb-tools-row {
            gap: 12px;
          }
          .gb-ruler-x span:nth-child(2),
          .gb-ruler-x span:nth-child(4) {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
