// src/shortcuts.jsx — Keyboard shortcut system + help overlay

const { useState: useStateKB, useEffect: useEffectKB } = React;

const SHORTCUTS = [
  { key: "H", action: "Jump to Home",        target: "home" },
  { key: "W", action: "Jump to Work",        target: "work" },
  { key: "P", action: "Jump to Projects",    target: "projects" },
  { key: "S", action: "Jump to Stack",       target: "stack" },
  { key: "F", action: "Jump to Fun (Play)",  target: "hobbies" },
  { key: "I", action: "Jump to Photos",      target: "photos" },
  { key: "A", action: "Jump to API",         target: "api" },
  { key: "G", action: "Jump to Guestbook",   target: "guestbook" },
  { key: "T", action: "Toggle Tweaks panel", target: "__tweaks" },
  { key: "?", action: "Show this help",      target: "__help" },
  { key: "Esc", action: "Close overlay",     target: "__close" },
];

function ShortcutHelp() {
  const [open, setOpen] = useStateKB(false);
  const [hintSeen, setHintSeen] = useStateKB(() => {
    try { return localStorage.getItem("kb-hint-v1") === "1"; } catch(e) { return false; }
  });

  // First-visit hint (bottom-right bubble)
  useEffectKB(() => {
    if (hintSeen) return;
    const t = setTimeout(() => {
      try { localStorage.setItem("kb-hint-v1", "1"); } catch(e){}
      setHintSeen(true);
    }, 9000);
    return () => clearTimeout(t);
  }, [hintSeen]);

  useEffectKB(() => {
    const onKey = (e) => {
      // Don't trigger when typing in inputs
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const k = e.key;

      if (k === "?" || (k === "/" && e.shiftKey)) { e.preventDefault(); setOpen(o => !o); return; }
      if (k === "Escape") { setOpen(false); return; }

      const map = {
        "h":"home", "w":"work", "p":"projects", "s":"stack",
        "f":"hobbies", "i":"photos", "a":"api", "g":"guestbook"
      };
      const targetId = map[k.toLowerCase()];
      if (targetId) {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          flashSection(el);
        }
        setOpen(false);
        return;
      }
      if (k.toLowerCase() === "t") {
        e.preventDefault();
        // Tell tweaks host to toggle
        window.postMessage({ type: "__local_toggle_tweaks" }, "*");
        // Fire both possibilities
        window.parent.postMessage({ type: "__edit_mode_available" }, "*");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Floating hint bubble (dismissable) */}
      {!hintSeen && !open && (
        <div className="kb-hint" onClick={() => setOpen(true)}>
          <kbd className="kbd">?</kbd>
          <span>keyboard shortcuts</span>
          <button className="kb-hint-x" onClick={(e) => {
            e.stopPropagation();
            try { localStorage.setItem("kb-hint-v1","1"); } catch(err){}
            setHintSeen(true);
          }}>×</button>
        </div>
      )}

      {/* Permanent fab */}
      <button className="kb-fab" onClick={() => setOpen(o => !o)} title="Keyboard shortcuts (?)">
        <kbd className="kbd">?</kbd>
      </button>

      {/* Overlay */}
      {open && (
        <div className="kb-overlay" onClick={() => setOpen(false)}>
          <div className="kb-modal" onClick={(e) => e.stopPropagation()}>
            <div className="kb-head">
              <div>
                <div className="eyebrow" style={{marginBottom:6}}>∞ / Shortcuts</div>
                <h3 className="serif" style={{fontSize:32,lineHeight:1}}>
                  Power user <em className="serif">mode.</em>
                </h3>
              </div>
              <button className="kb-close" onClick={() => setOpen(false)}>×</button>
            </div>
            <div className="kb-grid">
              {SHORTCUTS.map(s => (
                <div key={s.key} className="kb-row">
                  <kbd className="kbd kbd-lg">{s.key}</kbd>
                  <span>{s.action}</span>
                </div>
              ))}
            </div>
            <div className="kb-foot mono">tip: press a letter anywhere on the page</div>
          </div>
        </div>
      )}

      <style>{`
        .kbd{display:inline-grid;place-items:center;min-width:20px;height:20px;padding:0 6px;
          border-radius:5px;
          background:linear-gradient(180deg,rgba(255,255,255,.1),rgba(255,255,255,.04));
          border:1px solid rgba(255,255,255,.15);
          box-shadow:0 2px 0 rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.1);
          font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;
          color:var(--ink)}
        .kbd-lg{min-width:36px;height:32px;font-size:14px;padding:0 10px;border-radius:7px}

        .kb-fab{position:fixed;left:16px;bottom:16px;z-index:91;
          width:40px;height:40px;border-radius:50%;
          background:rgba(26,22,48,.78);backdrop-filter:blur(18px);
          border:.5px solid rgba(255,255,255,.08);
          box-shadow:0 8px 24px rgba(0,0,0,.4);
          cursor:pointer;display:grid;place-items:center;
          transition:all .25s ease}
        .kb-fab:hover{transform:translateY(-2px) scale(1.08);border-color:var(--peri)}

        .kb-hint{position:fixed;left:16px;bottom:66px;z-index:92;
          display:flex;align-items:center;gap:10px;padding:10px 14px;
          background:linear-gradient(135deg,var(--peri),var(--accent));color:#fff;
          border-radius:12px;cursor:pointer;
          font-size:12px;font-weight:500;
          box-shadow:0 10px 30px rgba(167,139,250,.4);
          animation:kbBounce .6s cubic-bezier(.2,.8,.2,1) .5s both}
        .kb-hint::before{content:'';position:absolute;bottom:-5px;left:18px;
          width:10px;height:10px;background:var(--accent);
          transform:rotate(45deg);z-index:-1}
        .kb-hint-x{background:rgba(255,255,255,.2);border:0;color:#fff;
          width:18px;height:18px;border-radius:50%;cursor:pointer;
          font-size:14px;line-height:1;padding:0}
        @keyframes kbBounce{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}

        .kb-overlay{position:fixed;inset:0;z-index:200;
          background:rgba(14,11,26,.7);backdrop-filter:blur(8px);
          display:grid;place-items:center;padding:20px;
          animation:fadeIn .2s ease}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .kb-modal{width:100%;max-width:520px;padding:32px;
          background:linear-gradient(145deg,var(--surface),var(--surface-2));
          border:.5px solid rgba(255,255,255,.1);
          border-radius:20px;
          box-shadow:0 40px 80px rgba(0,0,0,.6);
          animation:kbPop .3s cubic-bezier(.2,.8,.2,1)}
        @keyframes kbPop{from{transform:scale(.94);opacity:0}to{transform:scale(1);opacity:1}}
        .kb-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px}
        .kb-close{appearance:none;border:0;background:rgba(255,255,255,.06);
          color:var(--ink);width:32px;height:32px;border-radius:50%;
          font-size:20px;cursor:pointer;line-height:1}
        .kb-close:hover{background:rgba(255,255,255,.12)}
        .kb-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px 20px;margin-bottom:20px}
        .kb-row{display:flex;align-items:center;gap:12px;padding:8px 0;
          color:var(--ink-soft);font-size:13px}
        .kb-foot{font-size:11px;color:var(--muted);text-align:center;
          border-top:1px dashed rgba(255,255,255,.1);padding-top:16px}

        /* Section flash on keyboard jump */
        .kb-flash{animation:kbFlash 1.2s ease}
        @keyframes kbFlash{
          0%{box-shadow:inset 0 0 0 0 rgba(167,139,250,0)}
          30%{box-shadow:inset 0 0 0 3px rgba(167,139,250,.5)}
          100%{box-shadow:inset 0 0 0 0 rgba(167,139,250,0)}
        }

        @media (max-width:600px){
          .kb-grid{grid-template-columns:1fr}
          .kb-fab{bottom:90px}
          .kb-hint{bottom:140px}
        }
      `}</style>
    </>
  );
}

function flashSection(el) {
  el.classList.remove("kb-flash");
  void el.offsetWidth;
  el.classList.add("kb-flash");
}

window.ShortcutHelp = ShortcutHelp;
