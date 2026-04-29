'use client';

import { useEffect, useState } from 'react';

const SHORTCUTS: { key: string; action: string }[] = [
  { key: 'H', action: 'Jump to Home' },
  { key: 'W', action: 'Jump to Work' },
  { key: 'P', action: 'Jump to Projects' },
  { key: 'S', action: 'Jump to Stack' },
  { key: 'F', action: 'Jump to Fun (Play)' },
  { key: 'I', action: 'Jump to Photos' },
  { key: 'A', action: 'Jump to API' },
  { key: 'G', action: 'Jump to Guestbook' },
  { key: '?', action: 'Show this help' },
  { key: 'Esc', action: 'Close overlay' },
];

const JUMP_MAP: Record<string, string> = {
  h: 'home',
  w: 'work',
  p: 'projects',
  s: 'stack',
  f: 'hobbies',
  i: 'photos',
  a: 'api',
  g: 'guestbook',
};

function flashSection(el: HTMLElement) {
  el.classList.remove('kb-flash');
  // trigger reflow so the animation re-runs
  void el.offsetWidth;
  el.classList.add('kb-flash');
}

export default function ShortcutHelp() {
  const [open, setOpen] = useState(false);
  const [hintSeen, setHintSeen] = useState(true);

  useEffect(() => {
    try {
      setHintSeen(localStorage.getItem('kb-hint-v1') === '1');
    } catch {
      setHintSeen(false);
    }
  }, []);

  useEffect(() => {
    if (hintSeen) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem('kb-hint-v1', '1');
      } catch {}
      setHintSeen(true);
    }, 9000);
    return () => clearTimeout(t);
  }, [hintSeen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const k = e.key;
      if (k === '?' || (k === '/' && e.shiftKey)) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (k === 'Escape') {
        setOpen(false);
        return;
      }
      const targetId = JUMP_MAP[k.toLowerCase()];
      if (targetId) {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          flashSection(el);
        }
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {!hintSeen && !open && (
        <div className="kb-hint" onClick={() => setOpen(true)}>
          <kbd className="kbd">?</kbd>
          <span>keyboard shortcuts</span>
          <button
            className="kb-hint-x"
            onClick={(e) => {
              e.stopPropagation();
              try {
                localStorage.setItem('kb-hint-v1', '1');
              } catch {}
              setHintSeen(true);
            }}
          >
            ×
          </button>
        </div>
      )}

      <button className="kb-fab" onClick={() => setOpen((o) => !o)} title="Keyboard shortcuts (?)">
        <kbd className="kbd">?</kbd>
      </button>

      {open && (
        <div className="kb-overlay" onClick={() => setOpen(false)}>
          <div className="kb-modal" onClick={(e) => e.stopPropagation()}>
            <div className="kb-head">
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>
                  ∞ / Shortcuts
                </div>
                <h3 className="serif" style={{ fontSize: 32, lineHeight: 1 }}>
                  Power user <em className="serif">mode.</em>
                </h3>
              </div>
              <button className="kb-close" onClick={() => setOpen(false)}>
                ×
              </button>
            </div>
            <div className="kb-grid">
              {SHORTCUTS.map((s) => (
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

      <style jsx>{`
        :global(.kbd) {
          display: inline-grid;
          place-items: center;
          min-width: 20px;
          height: 20px;
          padding: 0 6px;
          border-radius: 5px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04));
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 2px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          color: var(--ink);
        }
        :global(.kbd-lg) {
          min-width: 36px;
          height: 32px;
          font-size: 14px;
          padding: 0 10px;
          border-radius: 7px;
        }
        .kb-fab {
          position: fixed;
          left: var(--space-4);
          bottom: var(--space-4);
          z-index: 91;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(26, 22, 48, 0.78);
          backdrop-filter: blur(18px);
          border: 0.5px solid var(--ink-08);
          box-shadow: 0 8px 24px var(--scrim-40);
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: all 0.25s ease;
        }
        .kb-fab:hover {
          transform: translateY(-2px) scale(1.08);
          border-color: var(--peri);
        }
        .kb-hint {
          position: fixed;
          left: var(--space-4);
          bottom: 66px;
          z-index: 92;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: linear-gradient(135deg, var(--peri), var(--accent));
          color: var(--white);
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          box-shadow: 0 10px 30px rgba(167, 139, 250, 0.4);
          animation: kbBounce 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s both;
        }
        .kb-hint::before {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 18px;
          width: 10px;
          height: 10px;
          background: var(--accent);
          transform: rotate(45deg);
          z-index: -1;
        }
        .kb-hint-x {
          background: var(--ink-20);
          border: 0;
          color: var(--white);
          width: 18px;
          height: 18px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 14px;
          line-height: 1;
          padding: 0;
        }
        @keyframes kbBounce {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .kb-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(14, 11, 26, 0.7);
          backdrop-filter: blur(8px);
          display: grid;
          place-items: center;
          padding: var(--space-5);
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .kb-modal {
          width: 100%;
          max-width: 520px;
          padding: var(--space-8);
          background: linear-gradient(145deg, var(--surface), var(--surface-2));
          border: 0.5px solid var(--ink-10);
          border-radius: var(--radius-md);
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6);
          animation: kbPop 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @keyframes kbPop {
          from {
            transform: scale(0.94);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .kb-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-6);
        }
        .kb-close {
          appearance: none;
          border: 0;
          background: var(--ink-06);
          color: var(--ink);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 20px;
          cursor: pointer;
          line-height: 1;
        }
        .kb-close:hover {
          background: var(--ink-12);
        }
        .kb-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3) var(--space-5);
          margin-bottom: var(--space-5);
        }
        .kb-row {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-2) 0;
          color: var(--ink-soft);
          font-size: 13px;
        }
        .kb-foot {
          font-size: 11px;
          color: var(--muted);
          text-align: center;
          border-top: 1px dashed var(--ink-10);
          padding-top: var(--space-4);
        }
        @media (max-width: 720px) {
          .kb-grid {
            grid-template-columns: 1fr;
          }
          .kb-fab {
            bottom: 90px;
          }
          .kb-hint {
            bottom: 140px;
          }
        }
      `}</style>
    </>
  );
}
