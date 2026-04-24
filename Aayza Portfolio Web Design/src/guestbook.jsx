// src/guestbook.jsx — Collaborative pixel canvas guestbook (localStorage-backed)

const { useState: useStateGB, useEffect: useEffectGB, useRef: useRefGB } = React;

const GRID_COLS = 48;
const GRID_ROWS = 24;
const COLORS = [
  "#FF6B9D", "#A78BFA", "#6EE7B7", "#FBBF24", "#67E8F9",
  "#FB923C", "#F472B6", "#C084FC", "#34D399", "#F0ABFC",
  "#FFFFFF", "#1A1630"
];

// Seed pixels so it doesn't look empty on first load
const SEED = [
  // "AA" monogram, roughly
  // A
  [6,10,"#A78BFA"],[6,11,"#A78BFA"],[7,9,"#A78BFA"],[7,12,"#A78BFA"],
  [8,8,"#A78BFA"],[8,9,"#A78BFA"],[8,10,"#A78BFA"],[8,11,"#A78BFA"],[8,12,"#A78BFA"],[8,13,"#A78BFA"],
  [9,8,"#A78BFA"],[9,13,"#A78BFA"],[10,8,"#A78BFA"],[10,13,"#A78BFA"],
  // A
  [6,16,"#FF6B9D"],[6,17,"#FF6B9D"],[7,15,"#FF6B9D"],[7,18,"#FF6B9D"],
  [8,14,"#FF6B9D"],[8,15,"#FF6B9D"],[8,16,"#FF6B9D"],[8,17,"#FF6B9D"],[8,18,"#FF6B9D"],[8,19,"#FF6B9D"],
  [9,14,"#FF6B9D"],[9,19,"#FF6B9D"],[10,14,"#FF6B9D"],[10,19,"#FF6B9D"],
  // Heart
  [14,30,"#FF6B9D"],[14,32,"#FF6B9D"],
  [15,29,"#FF6B9D"],[15,30,"#FF6B9D"],[15,31,"#FF6B9D"],[15,32,"#FF6B9D"],[15,33,"#FF6B9D"],
  [16,29,"#FF6B9D"],[16,30,"#FF6B9D"],[16,31,"#FF6B9D"],[16,32,"#FF6B9D"],[16,33,"#FF6B9D"],
  [17,30,"#FF6B9D"],[17,31,"#FF6B9D"],[17,32,"#FF6B9D"],
  [18,31,"#FF6B9D"],
  // little stars
  [2,4,"#FBBF24"],[3,5,"#FBBF24"],[2,6,"#FBBF24"],
  [19,42,"#6EE7B7"],[20,41,"#6EE7B7"],[20,43,"#6EE7B7"],[21,42,"#6EE7B7"],
];

function loadPixels() {
  try {
    const raw = localStorage.getItem("guestbook-v2");
    if (raw) return JSON.parse(raw);
  } catch(e){}
  const grid = {};
  SEED.forEach(([r,c,color]) => { grid[`${r},${c}`] = color; });
  return grid;
}

function savePixels(pixels) {
  try { localStorage.setItem("guestbook-v2", JSON.stringify(pixels)); } catch(e){}
}

function Guestbook() {
  const [pixels, setPixels] = useStateGB(() => loadPixels());
  const [color, setColor] = useStateGB(COLORS[0]);
  const [tool, setTool] = useStateGB("paint"); // "paint" | "erase"
  const [dragging, setDragging] = useStateGB(false);
  const [recentCount, setRecentCount] = useStateGB(0);
  const [coords, setCoords] = useStateGB(null); // {r,c} for hover readout
  const canvasRef = useRefGB();

  // Stats
  const placedCount = Object.keys(pixels).length;

  useEffectGB(() => {
    const last = Number(localStorage.getItem("gb-session-count") || 0);
    setRecentCount(last);
  }, []);

  const paint = (r, c) => {
    if (r < 0 || r >= GRID_ROWS || c < 0 || c >= GRID_COLS) return;
    const key = `${r},${c}`;
    setPixels(prev => {
      const next = { ...prev };
      if (tool === "erase") delete next[key];
      else next[key] = color;
      savePixels(next);
      return next;
    });
    // increment session counter
    const n = Number(localStorage.getItem("gb-session-count") || 0) + 1;
    localStorage.setItem("gb-session-count", String(n));
    setRecentCount(n);
  };

  const getCell = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX ?? e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY ?? e.touches?.[0]?.clientY) - rect.top;
    const c = Math.floor(x / (rect.width / GRID_COLS));
    const r = Math.floor(y / (rect.height / GRID_ROWS));
    return { r, c };
  };

  const handleDown = (e) => {
    e.preventDefault();
    setDragging(true);
    const { r, c } = getCell(e);
    paint(r, c);
  };
  const handleMove = (e) => {
    const { r, c } = getCell(e);
    setCoords({ r, c });
    if (dragging) paint(r, c);
  };
  const handleUp = () => setDragging(false);

  const clearAll = () => {
    if (!confirm("Clear the whole canvas?")) return;
    setPixels({});
    savePixels({});
  };

  const resetToSeed = () => {
    const grid = {};
    SEED.forEach(([r,c,col]) => { grid[`${r},${c}`] = col; });
    setPixels(grid);
    savePixels(grid);
  };

  return (
    <section id="guestbook">
      <div className="container">
        <div className="eyebrow">08 / Leave a mark</div>
        <h2 className="section-title">
          The <em className="serif">guestbook</em> — pixel edition.
        </h2>
        <p style={{maxWidth:640,color:"var(--ink-soft)",margin:"12px 0 40px"}}>
          Scroll-sized crowd art. Pick a color, drag to paint. Your strokes save to this browser —
          bring a friend and build something together.
        </p>

        <div className="gb-wrap">
          {/* Toolbar */}
          <div className="gb-tools">
            <div className="gb-tools-row">
              <div className="gb-palette">
                {COLORS.map(c => (
                  <button
                    key={c}
                    className={`gb-swatch ${color === c && tool === "paint" ? "active" : ""}`}
                    style={{background: c, borderColor: color === c && tool === "paint" ? "var(--ink)" : "transparent"}}
                    onClick={() => { setColor(c); setTool("paint"); }}
                    aria-label={`Color ${c}`}
                  />
                ))}
              </div>
              <div className="gb-tool-btns">
                <button
                  className={`gb-tool ${tool === "erase" ? "active" : ""}`}
                  onClick={() => setTool("erase")}
                  title="Eraser"
                >◌ Erase</button>
                <button className="gb-tool" onClick={resetToSeed} title="Reset to default">↻ Reset</button>
                <button className="gb-tool danger" onClick={clearAll} title="Clear all">⌫ Clear</button>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div
            ref={canvasRef}
            className="gb-canvas"
            onMouseDown={handleDown}
            onMouseMove={handleMove}
            onMouseUp={handleUp}
            onMouseLeave={() => { handleUp(); setCoords(null); }}
            onTouchStart={handleDown}
            onTouchMove={(e) => { e.preventDefault(); handleMove(e.touches[0]); }}
            onTouchEnd={handleUp}
            style={{cursor: tool === "erase" ? "cell" : "crosshair"}}
          >
            {/* Grid lines (rendered via bg) + pixel squares */}
            <div className="gb-pixels" style={{gridTemplateColumns:`repeat(${GRID_COLS},1fr)`, gridTemplateRows:`repeat(${GRID_ROWS},1fr)`}}>
              {Array.from({length: GRID_ROWS * GRID_COLS}).map((_, i) => {
                const r = Math.floor(i / GRID_COLS);
                const c = i % GRID_COLS;
                const col = pixels[`${r},${c}`];
                return (
                  <div
                    key={i}
                    className="gb-cell"
                    style={{background: col || "transparent"}}
                  />
                );
              })}
            </div>
            {/* Ruler ticks */}
            <div className="gb-ruler gb-ruler-x">
              {[0, 12, 24, 36, 47].map(n => (
                <span key={n} style={{left: `${(n/(GRID_COLS-1))*100}%`}}>{n}</span>
              ))}
            </div>
            <div className="gb-ruler gb-ruler-y">
              {[0, 8, 16, 23].map(n => (
                <span key={n} style={{top: `${(n/(GRID_ROWS-1))*100}%`}}>{n}</span>
              ))}
            </div>
          </div>

          {/* Footer stats */}
          <div className="gb-foot">
            <div className="gb-stat">
              <span className="mono gb-stat-label">PIXELS PLACED</span>
              <span className="serif gb-stat-value">{placedCount}</span>
            </div>
            <div className="gb-stat">
              <span className="mono gb-stat-label">YOUR STROKES</span>
              <span className="serif gb-stat-value" style={{color:"var(--mint)"}}>{recentCount}</span>
            </div>
            <div className="gb-stat">
              <span className="mono gb-stat-label">CURSOR</span>
              <span className="mono gb-stat-value-sm">
                {coords ? `(${String(coords.c).padStart(2,"0")}, ${String(coords.r).padStart(2,"0")})` : "—"}
              </span>
            </div>
            <div className="gb-stat">
              <span className="mono gb-stat-label">CURRENT</span>
              <span className="gb-stat-swatch" style={{background: tool === "erase" ? "transparent" : color, border: tool === "erase" ? "2px dashed var(--muted)" : "2px solid " + color}}/>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .gb-wrap{display:flex;flex-direction:column;gap:16px}
        .gb-tools{padding:14px 18px;border-radius:16px;
          background:linear-gradient(145deg,var(--surface),var(--surface-2));
          border:.5px solid rgba(255,255,255,.06);
          box-shadow:0 10px 30px rgba(0,0,0,.3)}
        .gb-tools-row{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}
        .gb-palette{display:flex;gap:6px;flex-wrap:wrap}
        .gb-swatch{width:28px;height:28px;border-radius:8px;cursor:pointer;
          border:2px solid transparent;transition:all .2s ease;
          box-shadow:0 2px 8px rgba(0,0,0,.3)}
        .gb-swatch:hover{transform:translateY(-2px) scale(1.1)}
        .gb-swatch.active{transform:scale(1.15);box-shadow:0 4px 16px currentColor}

        .gb-tool-btns{display:flex;gap:6px}
        .gb-tool{appearance:none;border:1px solid rgba(255,255,255,.1);
          background:rgba(255,255,255,.04);color:var(--ink-soft);
          padding:8px 14px;border-radius:8px;cursor:pointer;
          font-family:'JetBrains Mono',monospace;font-size:11px;
          transition:all .2s ease}
        .gb-tool:hover{background:rgba(255,255,255,.08);color:var(--ink)}
        .gb-tool.active{background:var(--peri);color:#fff;border-color:var(--peri)}
        .gb-tool.danger:hover{background:rgba(239,68,68,.15);color:#FCA5A5;border-color:rgba(239,68,68,.3)}

        .gb-canvas{position:relative;width:100%;aspect-ratio:${GRID_COLS}/${GRID_ROWS};
          border-radius:16px;overflow:hidden;
          background:
            linear-gradient(145deg,#0a0716,#14102a);
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,.06),
            inset 0 2px 20px rgba(0,0,0,.5),
            0 20px 60px rgba(0,0,0,.4);
          touch-action:none;user-select:none}
        .gb-pixels{position:absolute;inset:0;display:grid;gap:0}
        .gb-cell{
          border-right:.5px solid rgba(255,255,255,.025);
          border-bottom:.5px solid rgba(255,255,255,.025);
          transition:background .15s ease}
        .gb-cell:hover{box-shadow:inset 0 0 0 1px rgba(255,255,255,.2)}

        .gb-ruler{position:absolute;pointer-events:none;
          font-family:'JetBrains Mono',monospace;font-size:8px;color:var(--muted)}
        .gb-ruler span{position:absolute}
        .gb-ruler-x{top:6px;left:0;right:0;height:12px}
        .gb-ruler-x span{transform:translateX(-50%)}
        .gb-ruler-y{top:0;bottom:0;left:6px;width:16px}
        .gb-ruler-y span{transform:translateY(-50%)}

        .gb-foot{display:flex;gap:32px;align-items:center;padding:14px 18px;
          background:linear-gradient(145deg,var(--surface),var(--surface-2));
          border-radius:16px;
          border:.5px solid rgba(255,255,255,.06);
          flex-wrap:wrap}
        .gb-stat{display:flex;flex-direction:column;gap:2px}
        .gb-stat-label{font-size:9px;letter-spacing:.15em;color:var(--muted)}
        .gb-stat-value{font-size:24px;line-height:1;color:var(--ink)}
        .gb-stat-value-sm{font-size:14px;color:var(--ink-soft)}
        .gb-stat-swatch{width:24px;height:24px;border-radius:6px}

        @media (max-width:720px){
          .gb-canvas{aspect-ratio:${GRID_COLS}/${GRID_ROWS*1.2}}
          .gb-swatch{width:24px;height:24px}
          .gb-tools-row{gap:12px}
          .gb-ruler-x span:nth-child(2),.gb-ruler-x span:nth-child(4){display:none}
        }
      `}</style>
    </section>
  );
}

window.Guestbook = Guestbook;
