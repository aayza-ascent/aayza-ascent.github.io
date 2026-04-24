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

  return (
    <nav className="top">
      {LINKS.map(([id, label]) => (
        <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>
          {active === id && <span className="dot" />}
          {label}
        </a>
      ))}
    </nav>
  );
}
