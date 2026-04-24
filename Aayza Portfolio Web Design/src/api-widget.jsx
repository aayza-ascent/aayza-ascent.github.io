// src/api-widget.jsx — Live programming jokes from icanhazdadjoke as fallback
// Uses the official jokes endpoint; has a local fallback list if offline.

const { useState: useStateA, useEffect: useEffectA } = React;

const FALLBACK_JOKES = [
  { setup: "Why do programmers prefer dark mode?", punchline: "Because light attracts bugs." },
  { setup: "How many programmers does it take to change a light bulb?", punchline: "None. It’s a hardware problem." },
  { setup: "Why did the developer go broke?", punchline: "Because they used up all their cache." },
  { setup: "What’s a programmer’s favorite hangout?", punchline: "The Foo Bar." },
  { setup: "Why did the function break up with the loop?", punchline: "It felt like they were going in circles." },
  { setup: "What do you call a programmer from Finland?", punchline: "Nerdic." },
  { setup: "Why do Java developers wear glasses?", punchline: "Because they don’t C#." },
  { setup: "What’s the object-oriented way to become wealthy?", punchline: "Inheritance." },
];

function ApiWidget() {
  const [joke, setJoke] = useStateA(FALLBACK_JOKES[0]);
  const [loading, setLoading] = useStateA(false);
  const [revealed, setRevealed] = useStateA(false);
  const [source, setSourceA] = useStateA("local");
  const [count, setCount] = useStateA(1);

  const fetchJoke = async () => {
    setLoading(true);
    setRevealed(false);
    // small delay so loading state is visible
    await new Promise(r => setTimeout(r, 450));
    try {
      const res = await fetch("https://official-joke-api.appspot.com/jokes/programming/random");
      const data = await res.json();
      if (Array.isArray(data) && data[0]?.setup) {
        setJoke({ setup: data[0].setup, punchline: data[0].punchline });
        setSourceA("official-joke-api.appspot.com");
      } else {
        throw new Error("bad payload");
      }
    } catch (e) {
      const j = FALLBACK_JOKES[Math.floor(Math.random() * FALLBACK_JOKES.length)];
      setJoke(j);
      setSourceA("local fallback");
    } finally {
      setLoading(false);
      setCount(c => c + 1);
    }
  };

  useEffectA(() => { fetchJoke(); /* eslint-disable-next-line */ }, []);

  return (
    <section id="api">
      <div className="container">
        <div className="eyebrow">07 / Live API</div>
        <h2 className="section-title">
          A <em className="serif">joke</em>, freshly fetched.
        </h2>
        <p style={{maxWidth:560,color:"var(--ink-soft)",margin:"12px 0 48px"}}>
          This widget pulls a random programming joke from a public API each time you hit <em>refresh</em>.
          Tap the punchline to reveal it.
        </p>

        <div className="api-card glass">
          <div className="api-meta">
            <span className="mono">
              <span className="dot" style={{background: loading ? "#FFD98E" : "#4ADE80"}}/>
              {loading ? "GET /jokes/programming/random" : `200 OK · ${source}`}
            </span>
            <span className="mono" style={{color:"var(--muted)"}}>request #{count}</span>
          </div>

          <div className={`api-body ${loading ? "loading" : ""}`}>
            {loading ? (
              <div className="skeleton">
                <div className="sk-line" style={{width:"85%"}}/>
                <div className="sk-line" style={{width:"60%"}}/>
                <div className="sk-line" style={{width:"40%",marginTop:24}}/>
              </div>
            ) : (
              <>
                <div className="joke-setup serif">“{joke.setup}”</div>
                <button
                  className={`joke-punch ${revealed ? "shown" : ""}`}
                  onClick={() => setRevealed(true)}
                  aria-label={revealed ? "Punchline" : "Tap to reveal punchline"}
                >
                  {revealed ? joke.punchline : "▸ tap to reveal the punchline"}
                </button>
              </>
            )}
          </div>

          <div className="api-actions">
            <button className="btn btn-primary" onClick={fetchJoke} disabled={loading}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{animation: loading ? "spinIcon 1s linear infinite" : "none"}}>
                <path d="M21 12a9 9 0 1 1-3.2-6.9M21 4v5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {loading ? "fetching…" : "refresh"}
            </button>
            <span className="mono" style={{color:"var(--muted)",fontSize:11}}>
              powered by official-joke-api · public endpoint
            </span>
          </div>
        </div>

        {/* Contact CTA */}
        <div id="contact" className="contact-card">
          <div>
            <div className="eyebrow" style={{marginBottom:6}}>Let’s talk</div>
            <h3 className="serif" style={{fontSize:"clamp(34px,4vw,56px)",lineHeight:1.05,letterSpacing:"-.02em"}}>
              Got a project that needs a <em>careful engineer</em>?
            </h3>
            <p style={{color:"var(--ink-soft)",maxWidth:520,marginTop:14}}>
              Open to thoughtful remote roles and consulting. TypeScript, React, full-stack
              builds, AI-assisted workflows — happy to chat whether you need a hand or a whole team.
            </p>
          </div>
          <div className="row" style={{gap:10,marginTop:24}}>
            <a href="mailto:aayzaahmed.wfh@gmail.com" className="btn btn-primary">aayzaahmed.wfh@gmail.com</a>
            <a href="tel:+447397865034" className="btn btn-ghost">+44 7397 865034</a>
            <a href="https://linkedin.com/in/aayza-ahmed" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">linkedin ↗</a>
            <a href="https://github.com/aayzaahmed" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">github ↗</a>
          </div>
        </div>

        <footer className="foot">
          <span className="mono">© 2026 Aayza Ahmed · built remotely from glasgow 🏴󠁧󠁢󠁳󠁣󠁴󠁿</span>
          <span className="mono" style={{color:"var(--muted)"}}>last updated · apr 2026</span>
        </footer>
      </div>

      <style>{`
        @keyframes spinIcon{to{transform:rotate(360deg)}}
        .api-card{padding:32px;display:flex;flex-direction:column;gap:24px;
          background:linear-gradient(145deg,rgba(26,22,48,.85),rgba(14,11,26,.7))}
        .api-meta{display:flex;justify-content:space-between;align-items:center;
          font-size:11px;color:var(--ink-soft);padding-bottom:16px;
          border-bottom:1px dashed rgba(255,255,255,.1)}
        .api-meta .dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;vertical-align:middle;box-shadow:0 0 10px currentColor}
        .api-body{min-height:180px;display:flex;flex-direction:column;justify-content:center;gap:24px;padding:20px 0}
        .joke-setup{font-size:clamp(28px,3.5vw,42px);line-height:1.15;color:var(--ink);max-width:26ch}
        .joke-punch{appearance:none;background:rgba(167,139,250,.12);
          border:1px dashed rgba(167,139,250,.4);
          padding:16px 22px;border-radius:14px;cursor:pointer;
          font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--peri);
          text-align:left;transition:all .3s ease;align-self:flex-start;max-width:100%}
        .joke-punch:hover{background:rgba(167,139,250,.22)}
        .joke-punch.shown{background:linear-gradient(135deg, rgba(110,231,183,.18), rgba(167,139,250,.15));
          border:1px solid rgba(110,231,183,.35);
          color:var(--ink);font-family:'Instrument Serif',serif;font-style:italic;
          font-size:22px;padding:20px 26px}
        .api-actions{display:flex;align-items:center;gap:16px;flex-wrap:wrap;
          padding-top:16px;border-top:1px dashed rgba(255,255,255,.1)}

        .skeleton{display:flex;flex-direction:column;gap:14px}
        .sk-line{height:28px;border-radius:8px;
          background:linear-gradient(90deg, rgba(255,255,255,.04), rgba(255,255,255,.12), rgba(255,255,255,.04));
          background-size:200% 100%;animation:skShine 1.2s linear infinite}
        @keyframes skShine{from{background-position:200% 0}to{background-position:-200% 0}}

        .contact-card{margin-top:100px;padding:56px;border-radius:30px;
          background:linear-gradient(135deg, rgba(167,139,250,.2) 0%, rgba(255,138,184,.15) 100%);
          border:.5px solid rgba(167,139,250,.25);
          box-shadow:0 30px 80px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.08);
          position:relative;overflow:hidden}
        .contact-card::before{content:'';position:absolute;right:-80px;top:-80px;
          width:300px;height:300px;border-radius:50%;
          background:radial-gradient(circle,rgba(103,232,249,.35),transparent 70%);opacity:.8}
        .contact-card::after{content:'';position:absolute;left:-60px;bottom:-60px;
          width:240px;height:240px;border-radius:50%;
          background:radial-gradient(circle,rgba(255,138,184,.3),transparent 70%);opacity:.7}
        .contact-card > *{position:relative;z-index:1}

        .foot{margin-top:100px;padding:28px 0;border-top:1px dashed rgba(255,255,255,.15);
          display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:11px}
      `}</style>
    </section>
  );
}

window.ApiWidget = ApiWidget;
