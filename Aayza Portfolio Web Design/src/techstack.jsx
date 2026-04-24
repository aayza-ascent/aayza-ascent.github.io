// src/techstack.jsx — Vinyl-record style tech stack with marquee + hover cards

const { useState: useStateT, useEffect: useEffectT, useRef: useRefT } = React;

function TechStack() {
  const [hover, setHover] = useStateT(null);
  const [picked, setPicked] = useStateT(window.TECH[0]);

  // Split tech into two rings for the vinyl
  const inner = window.TECH.filter(t => t.ring === 0);
  const middle = window.TECH.filter(t => t.ring === 1);
  const outer = window.TECH.filter(t => t.ring === 2);

  return (
    <section id="stack">
      <div className="container">
        <div className="eyebrow">04 / Tech Stack</div>
        <h2 className="section-title">
          My <em className="serif">mixtape</em> of tools.
        </h2>
        <p style={{maxWidth:560,color:"var(--ink-soft)",margin:"12px 0 40px"}}>
          Think of this as Side A — the tools on heavy rotation. Hover the record to pause it,
          tap any badge to hear why I like it.
        </p>

        <div className="vinyl-layout">
          {/* LEFT: the record */}
          <div className="vinyl-stage">
            <div className="vinyl">
              <div className="vinyl-disc">
                {/* Grooves */}
                {[0,1,2,3,4,5,6,7].map(i => (
                  <div key={i} className="groove" style={{inset: `${8 + i*8}%`}}/>
                ))}

                {/* Outer ring badges */}
                <div className="orbit orbit-outer">
                  {outer.map((t, i) => {
                    const angle = (i / outer.length) * 360;
                    return (
                      <div key={t.name} className="orbit-slot" style={{transform:`rotate(${angle}deg) translateY(-235px)`}}>
                        <button className="tbadge" style={{background:t.color, boxShadow:`0 0 24px ${t.color}66`}}
                                onMouseEnter={() => setHover(t)} onMouseLeave={() => setHover(null)}
                                onClick={() => setPicked(t)}>
                          <span style={{transform:`rotate(-${angle}deg)`,display:"block"}}>{t.glyph}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Middle ring badges (counter-rotating) */}
                <div className="orbit orbit-middle">
                  {middle.map((t, i) => {
                    const angle = (i / middle.length) * 360;
                    return (
                      <div key={t.name} className="orbit-slot" style={{transform:`rotate(${angle}deg) translateY(-160px)`}}>
                        <button className="tbadge tbadge-md" style={{background:t.color, boxShadow:`0 0 20px ${t.color}66`}}
                                onMouseEnter={() => setHover(t)} onMouseLeave={() => setHover(null)}
                                onClick={() => setPicked(t)}>
                          <span style={{transform:`rotate(${angle}deg)`,display:"block"}}>{t.glyph}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Inner ring badges */}
                <div className="orbit orbit-inner">
                  {inner.map((t, i) => {
                    const angle = (i / inner.length) * 360;
                    return (
                      <div key={t.name} className="orbit-slot" style={{transform:`rotate(${angle}deg) translateY(-92px)`}}>
                        <button className="tbadge tbadge-sm" style={{background:t.color, boxShadow:`0 0 16px ${t.color}77`}}
                                onMouseEnter={() => setHover(t)} onMouseLeave={() => setHover(null)}
                                onClick={() => setPicked(t)}>
                          <span style={{transform:`rotate(-${angle}deg)`,display:"block",fontSize:12}}>{t.glyph}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Center label */}
                <div className="vinyl-label">
                  <div className="vl-text serif">SIDE<br/>A</div>
                  <div className="vl-hole"/>
                </div>
              </div>

              {/* Tonearm */}
              <div className="tonearm">
                <div className="tonearm-base"/>
                <div className="tonearm-arm"/>
                <div className="tonearm-head"/>
              </div>
            </div>
          </div>

          {/* RIGHT: track info */}
          <div className="vinyl-info">
            <div className="track-now mono">NOW PLAYING ·  <span className="pulse">●</span></div>
            <div className="track-title serif" style={{color: (hover || picked).color}}>
              {(hover || picked).name}
            </div>
            <div className="track-tier">
              {((hover || picked).ring === 0) && <span className="tier-pill" style={{background:"rgba(110,231,183,.15)",color:"var(--mint)",borderColor:"rgba(110,231,183,.3)"}}>daily driver</span>}
              {((hover || picked).ring === 1) && <span className="tier-pill" style={{background:"rgba(167,139,250,.15)",color:"var(--peri)",borderColor:"rgba(167,139,250,.3)"}}>often reached for</span>}
              {((hover || picked).ring === 2) && <span className="tier-pill" style={{background:"rgba(255,138,184,.15)",color:"var(--blush)",borderColor:"rgba(255,138,184,.3)"}}>on rotation</span>}
            </div>
            <div className="track-bars">
              {Array.from({length:5}).map((_, i) => {
                const level = (hover||picked).ring === 0 ? 5 : (hover||picked).ring === 1 ? 4 : 3;
                return <div key={i} className={`bar ${i < level ? "on" : ""}`} style={{background: i < level ? (hover || picked).color : "rgba(255,255,255,.08)"}}/>
              })}
              <span className="bar-label mono">proficiency</span>
            </div>

            <div className="tracklist">
              <div className="tl-head mono">// FULL TRACKLIST</div>
              {window.TECH.map((t, i) => (
                <button
                  key={t.name}
                  className={`tl-row ${(hover||picked).name === t.name ? "on" : ""}`}
                  onMouseEnter={() => setHover(t)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => setPicked(t)}
                >
                  <span className="tl-num mono">{String(i+1).padStart(2,"0")}</span>
                  <span className="tl-dot" style={{background:t.color}}/>
                  <span className="tl-name">{t.name}</span>
                  <span className="tl-dur mono">{t.ring === 0 ? "4:32" : t.ring === 1 ? "3:48" : "2:56"}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .vinyl-layout{display:grid;grid-template-columns:1.1fr 1fr;gap:48px;align-items:center}

        .vinyl-stage{position:relative;aspect-ratio:1/1;perspective:1200px}
        .vinyl{position:relative;width:100%;height:100%;
          transform:rotateX(12deg);transform-style:preserve-3d}

        .vinyl-disc{position:absolute;inset:0;border-radius:50%;
          background:
            radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0a0a14 100%);
          box-shadow:
            0 40px 80px rgba(0,0,0,.7),
            0 0 0 1px rgba(255,255,255,.04),
            inset 0 0 120px rgba(167,139,250,.1);
          animation:spinDisc 28s linear infinite;
          animation-play-state:running;
          will-change:transform}
        .vinyl-disc:hover{animation-play-state:paused}
        @keyframes spinDisc{from{transform:rotate(0)}to{transform:rotate(360deg)}}

        .groove{position:absolute;border-radius:50%;
          border:1px solid rgba(255,255,255,.04);
          pointer-events:none}

        .orbit{position:absolute;inset:0;display:grid;place-items:center;pointer-events:none}
        .orbit-slot{position:absolute;left:50%;top:50%;
          width:0;height:0;pointer-events:auto}

        .tbadge{appearance:none;border:2px solid rgba(255,255,255,.2);
          width:56px;height:56px;border-radius:50%;cursor:pointer;
          display:grid;place-items:center;
          font-family:'JetBrains Mono',monospace;font-weight:700;font-size:14px;
          color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.5);
          transform:translate(-50%,-50%);
          transition:scale .2s ease, box-shadow .2s ease;
          backdrop-filter:blur(4px)}
        .tbadge-md{width:48px;height:48px;font-size:12px}
        .tbadge-sm{width:40px;height:40px}
        .tbadge:hover{scale:1.3;z-index:10}

        .vinyl-label{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
          width:35%;aspect-ratio:1/1;border-radius:50%;
          background:radial-gradient(circle, var(--accent), var(--peri));
          display:grid;place-items:center;
          box-shadow:inset 0 0 30px rgba(0,0,0,.3), 0 0 40px rgba(255,107,157,.4);
          color:#fff;text-align:center}
        .vl-text{font-size:22px;line-height:.95;letter-spacing:.1em;font-style:italic}
        .vl-hole{position:absolute;width:10%;height:10%;border-radius:50%;
          background:#0E0B1A;box-shadow:inset 0 0 6px rgba(0,0,0,.8)}

        /* Tonearm */
        .tonearm{position:absolute;top:-4%;right:-2%;width:45%;height:50%;
          pointer-events:none;z-index:3}
        .tonearm-base{position:absolute;top:0;right:0;width:50px;height:50px;
          border-radius:50%;background:linear-gradient(145deg,#3a3448,#1a1824);
          box-shadow:inset 0 2px 4px rgba(255,255,255,.1), 0 8px 20px rgba(0,0,0,.5);
          border:1px solid rgba(255,255,255,.1)}
        .tonearm-base::after{content:'';position:absolute;inset:35%;border-radius:50%;
          background:var(--accent);box-shadow:0 0 12px var(--accent)}
        .tonearm-arm{position:absolute;top:18px;right:18px;
          width:80%;height:4px;transform-origin:right center;
          transform:rotate(30deg);
          background:linear-gradient(to left,#555066,#2a2638);
          border-radius:2px;
          box-shadow:0 3px 8px rgba(0,0,0,.4)}
        .tonearm-head{position:absolute;top:14px;right:14px;
          width:20px;height:20px;transform-origin:right center;
          transform:rotate(30deg) translate(-70%, 100%);
          background:linear-gradient(145deg,#ccc,#888);
          border-radius:3px;
          box-shadow:0 3px 6px rgba(0,0,0,.5)}

        /* Right panel */
        .vinyl-info{padding:32px;border-radius:24px;
          background:linear-gradient(145deg,var(--surface),var(--surface-2));
          border:.5px solid rgba(255,255,255,.06);
          box-shadow:0 20px 60px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.04)}
        .track-now{font-size:11px;color:var(--muted);letter-spacing:.15em;
          display:flex;align-items:center;gap:8px;margin-bottom:12px}
        .pulse{color:var(--mint);animation:pulse 1.5s ease-in-out infinite}
        @keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}
        .track-title{font-size:clamp(44px,5vw,68px);line-height:.95;letter-spacing:-.02em;
          transition:color .4s ease;margin-bottom:16px}
        .tier-pill{display:inline-block;padding:6px 14px;border-radius:999px;
          border:1px solid;font-family:'JetBrains Mono',monospace;font-size:11px;
          letter-spacing:.05em;text-transform:uppercase}

        .track-bars{display:flex;align-items:center;gap:6px;margin:20px 0 28px}
        .bar{width:28px;height:8px;border-radius:2px;transition:background .3s ease}
        .bar-label{font-size:10px;color:var(--muted);margin-left:10px;letter-spacing:.1em;text-transform:uppercase}

        .tracklist{border-top:1px dashed rgba(255,255,255,.1);padding-top:18px}
        .tl-head{font-size:10px;color:var(--muted);letter-spacing:.1em;margin-bottom:10px}
        .tl-row{display:flex;align-items:center;gap:14px;width:100%;
          padding:8px 10px;border-radius:10px;
          background:transparent;border:0;cursor:pointer;color:var(--ink-soft);
          font-family:'Inter',sans-serif;font-size:13px;text-align:left;
          transition:all .2s ease}
        .tl-row:hover, .tl-row.on{background:rgba(167,139,250,.1);color:var(--ink)}
        .tl-num{color:var(--muted);font-size:10px;width:22px}
        .tl-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;
          box-shadow:0 0 8px currentColor}
        .tl-name{flex:1;font-weight:500}
        .tl-dur{color:var(--muted);font-size:10px}

        @media (max-width:880px){
          .vinyl-layout{grid-template-columns:1fr;gap:32px}
          .vinyl-stage{max-width:420px;margin:0 auto}
        }
      `}</style>
    </section>
  );
}

window.TechStack = TechStack;
