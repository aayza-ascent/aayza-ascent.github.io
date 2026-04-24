// src/nowplaying.jsx — Spotify-style "currently listening to" strip pinned to footer

const { useState: useStateNP, useEffect: useEffectNP, useRef: useRefNP } = React;

const TRACKS = [
  { title: "Stop", artist: "Spice Girls", album: "Spiceworld", color: "#FF6B9D", year: "1997",
    cover: "linear-gradient(135deg,#FF6B9D 0%, #A78BFA 50%, #FBBF24 100%)" },
  { title: "The Less I Know The Better", artist: "Tame Impala", album: "Currents", color: "#FB923C", year: "2015",
    cover: "linear-gradient(135deg,#FB923C 0%, #F472B6 100%)" },
  { title: "After Hours", artist: "The Weeknd", album: "After Hours", color: "#DC2626", year: "2020",
    cover: "linear-gradient(135deg,#1A0000 0%, #DC2626 100%)" },
  { title: "Formation", artist: "Beyoncé", album: "Lemonade", color: "#FBBF24", year: "2016",
    cover: "linear-gradient(135deg,#FBBF24 0%, #DC2626 100%)" },
  { title: "Paranoid Android", artist: "Radiohead", album: "OK Computer", color: "#67E8F9", year: "1997",
    cover: "linear-gradient(135deg,#0F1420 0%, #67E8F9 100%)" },
  { title: "Redbone", artist: "Childish Gambino", album: "Awaken, My Love!", color: "#F0ABFC", year: "2016",
    cover: "linear-gradient(135deg,#7E22CE 0%, #F0ABFC 100%)" },
];

function NowPlaying() {
  const [idx, setIdx] = useStateNP(0);
  const [playing, setPlaying] = useStateNP(true);
  const [progress, setProgress] = useStateNP(12); // 0-100
  const [collapsed, setCollapsed] = useStateNP(false);

  const track = TRACKS[idx];

  // Progress tick
  useEffectNP(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setIdx(i => (i + 1) % TRACKS.length);
          return 0;
        }
        return p + 0.25;
      });
    }, 200);
    return () => clearInterval(t);
  }, [playing]);

  // Reset progress on manual track change
  const next = () => { setIdx((idx + 1) % TRACKS.length); setProgress(0); };
  const prev = () => { setIdx((idx - 1 + TRACKS.length) % TRACKS.length); setProgress(0); };

  const duration = 235; // fake seconds
  const current = Math.floor((progress / 100) * duration);
  const fmt = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  return (
    <div className={`np-wrap ${collapsed ? "collapsed" : ""}`}>
      <div className="np-bar">
        {/* Cover + track info */}
        <div className="np-left">
          <div className="np-cover" style={{background: track.cover}}>
            <div className="np-cover-shine"/>
            {playing && (
              <div className="np-eq">
                <span style={{animationDelay:"0s"}}/>
                <span style={{animationDelay:"-.3s"}}/>
                <span style={{animationDelay:"-.6s"}}/>
                <span style={{animationDelay:"-.2s"}}/>
              </div>
            )}
          </div>
          <div className="np-meta">
            <div className="np-status mono">
              <span className="np-live-dot" style={{background: playing ? "var(--mint)" : "var(--muted)"}}/>
              {playing ? "NOW PLAYING" : "PAUSED"}
            </div>
            <div className="np-title">{track.title}</div>
            <div className="np-artist">
              <span style={{color: track.color}}>●</span> {track.artist} · <span className="mono">{track.album}</span>
            </div>
          </div>
        </div>

        {/* Controls + progress */}
        <div className="np-center">
          <div className="np-controls">
            <button className="np-btn" onClick={prev} aria-label="Previous">⏮</button>
            <button className="np-btn np-play" onClick={() => setPlaying(!playing)} aria-label="Play/Pause">
              {playing ? "⏸" : "▶"}
            </button>
            <button className="np-btn" onClick={next} aria-label="Next">⏭</button>
          </div>
          <div className="np-progress">
            <span className="np-time mono">{fmt(current)}</span>
            <div className="np-track">
              <div className="np-fill" style={{width: `${progress}%`, background: track.color}}/>
              <div className="np-thumb" style={{left: `${progress}%`, background: track.color}}/>
            </div>
            <span className="np-time mono">{fmt(duration)}</span>
          </div>
        </div>

        {/* Right: collapse */}
        <div className="np-right">
          <button className="np-icon" title="Minimize" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "▲" : "▼"}
          </button>
        </div>
      </div>

      <style>{`
        .np-wrap{position:fixed;left:16px;right:16px;bottom:16px;z-index:90;
          pointer-events:none;
          transition:transform .4s cubic-bezier(.2,.8,.2,1)}
        .np-wrap.collapsed{transform:translateY(calc(100% - 28px))}

        .np-bar{display:grid;grid-template-columns:1fr 1.2fr auto;gap:24px;
          align-items:center;
          max-width:1100px;margin:0 auto;padding:10px 18px;
          background:rgba(26,22,48,.78);
          backdrop-filter:blur(24px) saturate(180%);
          -webkit-backdrop-filter:blur(24px) saturate(180%);
          border:.5px solid rgba(255,255,255,.08);
          border-radius:16px;
          box-shadow:0 16px 50px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.06);
          pointer-events:auto}

        .np-left{display:flex;align-items:center;gap:14px;min-width:0}
        .np-cover{width:52px;height:52px;border-radius:8px;position:relative;
          flex-shrink:0;overflow:hidden;
          box-shadow:0 4px 16px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.15)}
        .np-cover-shine{position:absolute;inset:0;
          background:linear-gradient(135deg, rgba(255,255,255,.3) 0%, transparent 50%);
          pointer-events:none}
        .np-eq{position:absolute;bottom:6px;left:6px;display:flex;gap:2px;align-items:end;height:14px}
        .np-eq span{width:2px;background:#fff;border-radius:1px;
          animation:eq 1.1s ease-in-out infinite}
        @keyframes eq{
          0%,100%{height:3px}
          50%{height:14px}
        }
        .np-eq span:nth-child(2){animation-duration:.9s}
        .np-eq span:nth-child(3){animation-duration:1.3s}
        .np-eq span:nth-child(4){animation-duration:1s}

        .np-meta{min-width:0;flex:1}
        .np-status{font-size:9px;color:var(--muted);letter-spacing:.15em;
          display:flex;align-items:center;gap:6px;margin-bottom:2px}
        .np-live-dot{width:6px;height:6px;border-radius:50%;
          animation:pulseDot 1.5s ease-in-out infinite}
        @keyframes pulseDot{0%,100%{opacity:.4;transform:scale(.8)}50%{opacity:1;transform:scale(1.1)}}
        .np-title{font-family:'Instrument Serif',serif;font-size:18px;line-height:1.1;
          color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .np-artist{font-size:11px;color:var(--ink-soft);margin-top:2px;
          white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

        .np-center{display:flex;flex-direction:column;gap:6px;align-items:stretch}
        .np-controls{display:flex;gap:8px;justify-content:center;align-items:center}
        .np-btn{appearance:none;border:0;background:transparent;cursor:pointer;
          color:var(--ink-soft);font-size:13px;padding:4px 8px;border-radius:6px;
          transition:all .2s ease;line-height:1}
        .np-btn:hover{color:var(--ink);background:rgba(255,255,255,.05)}
        .np-play{width:28px;height:28px;border-radius:50%;
          background:var(--ink);color:var(--cream);
          display:grid;place-items:center;font-size:11px}
        .np-play:hover{background:var(--peri);color:#fff;transform:scale(1.08)}

        .np-progress{display:flex;align-items:center;gap:10px}
        .np-time{font-size:10px;color:var(--muted);min-width:32px;text-align:center}
        .np-track{flex:1;height:4px;background:rgba(255,255,255,.08);
          border-radius:2px;position:relative;cursor:pointer}
        .np-fill{position:absolute;left:0;top:0;bottom:0;border-radius:2px;
          transition:background .3s ease}
        .np-thumb{position:absolute;top:50%;width:10px;height:10px;border-radius:50%;
          transform:translate(-50%,-50%);
          opacity:0;transition:opacity .2s ease;
          box-shadow:0 2px 6px rgba(0,0,0,.4)}
        .np-track:hover .np-thumb{opacity:1}

        .np-right{display:flex;gap:8px}
        .np-icon{appearance:none;border:1px solid rgba(255,255,255,.1);
          background:rgba(255,255,255,.04);color:var(--ink-soft);
          width:28px;height:28px;border-radius:50%;cursor:pointer;
          font-size:10px;line-height:1;transition:all .2s ease}
        .np-icon:hover{background:rgba(255,255,255,.1);color:var(--ink)}

        @media (max-width:820px){
          .np-wrap{left:8px;right:8px;bottom:8px}
          .np-bar{grid-template-columns:1fr auto;gap:12px;padding:8px 12px}
          .np-center{display:none}
          .np-cover{width:42px;height:42px}
          .np-title{font-size:15px}
        }
      `}</style>
    </div>
  );
}

window.NowPlaying = NowPlaying;
