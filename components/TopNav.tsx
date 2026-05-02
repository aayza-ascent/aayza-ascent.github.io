'use client';

import { useEffect, useState } from 'react';

const LINKS: [string, string][] = [
  ['home', 'Home'],
  ['work', 'Work'],
  ['live', 'Live'],
  ['projects', 'Projects'],
  ['stack', 'Stack'],
  ['hobbies', 'Play'],
  ['photos', 'Photos'],
  ['api', 'API'],
  ['guestbook', 'Guestbook'],
  ['contact', 'Contact'],
];

export function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const ids = LINKS.map(([id]) => id);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('section');
    els.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in');
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function TopNav() {
  useScrollReveal();
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <nav className="top">
        {LINKS.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>
            {active === id && <span className="dot" />}
            {label}
          </a>
        ))}
      </nav>

      <button
        className="nav-burger"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`nav-burger-icon ${open ? 'open' : ''}`} />
      </button>

      {open && (
        <>
          <div className="nav-scrim" onClick={() => setOpen(false)} />
          <nav className="nav-sheet" aria-label="Mobile">
            {LINKS.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={active === id ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        </>
      )}

      <style jsx>{`
        .nav-burger {
          display: none;
        }
        @media (max-width: 720px) {
          .nav-burger {
            display: inline-flex;
            position: fixed;
            top: 12px;
            right: 12px;
            z-index: 102;
            width: 40px;
            height: 40px;
            align-items: center;
            justify-content: center;
            background: rgba(17, 32, 58, 0.85);
            backdrop-filter: blur(14px) saturate(140%);
            -webkit-backdrop-filter: blur(14px) saturate(140%);
            border: 0.5px solid var(--ink-10);
            border-radius: 12px;
            cursor: pointer;
            color: var(--ink);
            box-shadow: 0 8px 22px rgba(0, 0, 0, 0.35);
          }
          .nav-burger-icon,
          .nav-burger-icon::before,
          .nav-burger-icon::after {
            display: block;
            width: 18px;
            height: 1.5px;
            background: var(--ink);
            border-radius: 2px;
            transition: transform 0.2s ease, opacity 0.2s ease;
          }
          .nav-burger-icon {
            position: relative;
          }
          .nav-burger-icon::before,
          .nav-burger-icon::after {
            content: '';
            position: absolute;
            left: 0;
          }
          .nav-burger-icon::before {
            top: -6px;
          }
          .nav-burger-icon::after {
            top: 6px;
          }
          .nav-burger-icon.open {
            background: transparent;
          }
          .nav-burger-icon.open::before {
            transform: translateY(6px) rotate(45deg);
          }
          .nav-burger-icon.open::after {
            transform: translateY(-6px) rotate(-45deg);
          }
          .nav-scrim {
            position: fixed;
            inset: 0;
            z-index: 100;
            background: rgba(10, 22, 40, 0.55);
            backdrop-filter: blur(2px);
          }
          .nav-sheet {
            position: fixed;
            top: 64px;
            left: 12px;
            right: 12px;
            z-index: 101;
            display: flex;
            flex-direction: column;
            padding: 8px;
            background: rgba(17, 32, 58, 0.95);
            backdrop-filter: blur(18px) saturate(150%);
            -webkit-backdrop-filter: blur(18px) saturate(150%);
            border: 0.5px solid var(--ink-10);
            border-radius: 16px;
            box-shadow: 0 18px 50px rgba(0, 0, 0, 0.5);
          }
          .nav-sheet a {
            display: block;
            padding: 12px 14px;
            border-radius: 10px;
            text-decoration: none;
            color: var(--ink-soft);
            font-size: 15px;
            font-weight: 500;
          }
          .nav-sheet a.active {
            background: var(--accent);
            color: #0a1628;
          }
          .nav-sheet a + a {
            margin-top: 2px;
          }
        }
      `}</style>
    </>
  );
}
