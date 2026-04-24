// src/hero.jsx — Hero with cursor-reactive gradient blob

const { useEffect, useRef, useState } = React;

function Hero() {
  const blobRef = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);
  const heroRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let tx = window.innerWidth / 2,
      ty = window.innerHeight / 2;
    let cx = tx,
      cy = ty;
    let raf;
    const onMove = (e) => {
      const r = heroRef.current?.getBoundingClientRect();
      if (!r) return;
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${cx - 280}px, ${cy - 280}px)`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate(${cx * 0.6 - 160}px, ${cy * 0.6 - 160}px)`;
      }
      if (blob3Ref.current) {
        blob3Ref.current.style.transform = `translate(${cx * 0.9 - 120}px, ${cy * 0.9 - 120}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        minHeight: "100vh",
        padding: "140px 32px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blobs */}
      <div ref={blobRef} className="blob blob-peri" aria-hidden="true" />
      <div ref={blob2Ref} className="blob blob-blush" aria-hidden="true" />
      <div ref={blob3Ref} className="blob blob-mint" aria-hidden="true" />

      {/* Grid overlay */}
      <svg aria-hidden="true" className="hero-grid" width="100%" height="100%">
        <defs>
          <pattern
            id="grid"
            width="44"
            height="44"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 44 0 L 0 0 0 44"
              fill="none"
              stroke="rgba(255,255,255,.05)"
              strokeWidth=".5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="container hero-inner">
        <div className="hero-top row">
          <span
            className="chip"
            style={{
              background: "rgba(110,231,183,.12)",
              borderColor: "rgba(110,231,183,.3)",
              color: "var(--mint)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 99,
                background: "#6EE7B7",
                boxShadow:
                  "0 0 0 3px rgba(110,231,183,.2), 0 0 12px rgba(110,231,183,.6)",
              }}
            />
            Unavailable
          </span>
          <span className="chip mono">glasgow · scotland · remote</span>
        </div>

        <h1 className="hero-name">
          <span className="line-a">Hi, I’m</span>
          <span className="line-b">
            <span className="name-word">Aayza</span>
            <span className="name-word">Ahmed</span>
            <span className="name-dot">.</span>
          </span>
          <span className="line-c serif">
            <em>a software engineer</em> who likes
            <br />
            building <span className="hl">playful, durable tools.</span>
          </span>
        </h1>

        <p className="hero-sub">
          Seven years shipping full-stack TypeScript, fully remote, across
          fintech, SaaS and consultancy teams. Currently building AI-powered
          workflow automation and modular dashboards at <b>Ascent Platform</b>.
        </p>

        <div className="row hero-cta">
          <a href="#work" className="btn btn-primary">
            See my work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="#contact" className="btn btn-ghost">
            Say hi ↗
          </a>
          <span
            className="mono"
            style={{ color: "var(--muted)", marginLeft: "auto", fontSize: 12 }}
          >
            move your cursor — the gradient follows
          </span>
        </div>

        {/* Stat strip */}
        <div className="hero-stats">
          {[
            ["7", "years shipping"],
            ["1st", "class honours"],
            ["100%", "remote since '20"],
            ["AWS", "cloud practitioner"],
          ].map(([n, l], i) => (
            <div key={i} className="stat">
              <div className="stat-n serif">{n}</div>
              <div className="stat-l mono">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="scroll-cue mono">
        scroll
        <span className="bar" />
      </div>

      <style>{`
        .hero-inner{position:relative;z-index:2}
        .hero-grid{position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.8}

        .blob{position:absolute;left:0;top:0;border-radius:50%;filter:blur(90px);
          pointer-events:none;z-index:1;mix-blend-mode:screen;opacity:calc(.85 * var(--motion, 1) + .2)}
        .blob-peri{width:620px;height:620px;background:radial-gradient(circle,#A78BFA 0%,transparent 70%)}
        .blob-blush{width:360px;height:360px;background:radial-gradient(circle,#FF6B9D 0%,transparent 70%)}
        .blob-mint{width:280px;height:280px;background:radial-gradient(circle,#67E8F9 0%,transparent 70%)}

        .hero-top{margin-top:40px}
        .hero-name{font-family:'Instrument Serif',serif;font-weight:400;
          font-size:clamp(56px,10vw,140px);line-height:.98;letter-spacing:-.025em;margin:34px 0 20px}
        .hero-name .line-a{display:block;font-family:'Inter',sans-serif;
          font-size:clamp(16px,1.4vw,18px);font-weight:500;color:var(--muted);
          letter-spacing:.02em;text-transform:uppercase;margin-bottom:12px}
        .hero-name .line-b{display:flex;gap:28px;flex-wrap:wrap;align-items:baseline}
        .hero-name .name-word{display:inline-block;transition:transform .4s cubic-bezier(.2,.8,.2,1);padding-right:.4em}
        .hero-name .name-word:last-of-type{padding-right:0}
        .hero-name .name-word:hover{transform:translateY(-6px) rotate(-2deg)}
        .hero-name .name-dot{display:inline-block;color:var(--accent);font-style:italic;
          animation:dotPulse 2s ease-in-out infinite;margin-left:-.15em}
        @keyframes dotPulse{0%,100%{transform:scale(1);color:var(--accent)}50%{transform:scale(1.2);color:var(--peri)}}
        .hero-name .line-c{display:block;font-size:.52em;line-height:1.15;color:var(--ink-soft);
          margin-top:20px;max-width:880px}
        .hero-name .hl{background:linear-gradient(180deg, transparent 55%, rgba(255,138,184,.45) 55%, rgba(255,138,184,.45) 92%, transparent 92%);
          padding:0 .08em;color:var(--ink)}

        .hero-sub{max-width:540px;color:var(--ink-soft);font-size:clamp(15px,1.2vw,17px);
          line-height:1.55;margin-top:18px;margin-bottom:32px}
        .hero-sub b{color:var(--ink);font-weight:600}

        .hero-cta{width:100%}

        .hero-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;
          margin-top:72px;padding:6px;border-radius:22px;
          background:rgba(26,22,48,.5);backdrop-filter:blur(12px);
          border:.5px solid rgba(255,255,255,.08);
          box-shadow:0 14px 40px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.05)}
        .stat{padding:22px 18px;border-radius:18px;text-align:left;
          transition:background .3s ease}
        .stat:hover{background:rgba(255,255,255,.05)}
        .stat-n{font-size:clamp(34px,3vw,48px);line-height:1;color:var(--ink)}
        .stat-l{font-size:10px;color:var(--muted);letter-spacing:.1em;
          text-transform:uppercase;margin-top:8px}

        .scroll-cue{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);
          display:flex;flex-direction:column;align-items:center;gap:10px;
          font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)}
        .scroll-cue .bar{width:1px;height:36px;background:linear-gradient(to bottom,transparent,var(--ink-soft));
          animation:scrollPulse 2.2s ease-in-out infinite}
        @keyframes scrollPulse{
          0%,100%{transform:scaleY(0.5);transform-origin:top;opacity:.4}
          50%{transform:scaleY(1);opacity:1}
        }

        @media (max-width:640px){
          .hero-stats{grid-template-columns:repeat(2,1fr)}
        }
      `}</style>
    </section>
  );
}

window.Hero = Hero;
