// src/app.jsx — Root App with nav + tweaks + scroll reveal

const { useEffect: useEffectApp, useState: useStateApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "aubergine",
  "font": "instrument",
  "density": "regular",
  "motion": "normal"
}/*EDITMODE-END*/;

const PALETTES = {
  aubergine: { cream:"#0E0B1A", surface:"#1A1630", surface2:"#221C3E", ink:"#F5F1EA", inkSoft:"#B8B0C7", muted:"#7A7391", peri:"#A78BFA", blush:"#FF8AB8", mint:"#6EE7B7", accent:"#FF6B9D" },
  midnight:  { cream:"#07090E", surface:"#0F1420", surface2:"#161D30", ink:"#E8EDF5", inkSoft:"#9BA6BD", muted:"#5C6680", peri:"#60A5FA", blush:"#22D3EE", mint:"#34D399", accent:"#F472B6" },
  forest:    { cream:"#0A1410", surface:"#0F1C18", surface2:"#152721", ink:"#EAF2EC", inkSoft:"#9DB3A6", muted:"#5A7065", peri:"#86EFAC", blush:"#FCD34D", mint:"#7DD3FC", accent:"#FB923C" },
  cosmos:    { cream:"#0B0818", surface:"#161129", surface2:"#1F1938", ink:"#F3EFFF", inkSoft:"#BFB6D6", muted:"#8278A2", peri:"#C084FC", blush:"#F0ABFC", mint:"#7DD3FC", accent:"#FB7185" },
};

const FONT_STACKS = {
  instrument: { serif: "'Instrument Serif', serif", body: "'Inter', sans-serif" },
  fraunces:   { serif: "'Instrument Serif', serif", body: "'JetBrains Mono', monospace" },
  clean:      { serif: "'Inter', sans-serif", body: "'Inter', sans-serif" },
};

function TopNav({ active }) {
  const links = [
    ["home", "Home"],
    ["work", "Work"],
    ["live", "Live"],
    ["projects", "Projects"],
    ["stack", "Stack"],
    ["hobbies", "Play"],
    ["photos", "Photos"],
    ["api", "API"],
    ["guestbook", "Guestbook"],
  ];
  return (
    <nav className="top">
      {links.map(([id, label]) => (
        <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>
          {active === id && <span className="dot"/>}
          {label}
        </a>
      ))}
    </nav>
  );
}

function useScrollReveal() {
  useEffectApp(() => {
    const els = document.querySelectorAll(".reveal, section");
    els.forEach(el => el.classList.add("reveal"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("in");
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useStateApp("home");
  useEffectApp(() => {
    const ids = ["home","work","live","projects","stack","hobbies","photos","api","guestbook"];
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return active;
}

function applyPalette(name) {
  const p = PALETTES[name] || PALETTES.aubergine;
  const r = document.documentElement.style;
  r.setProperty("--cream", p.cream);
  r.setProperty("--cream-2", p.surface || p.cream);
  r.setProperty("--surface", p.surface || p.cream);
  r.setProperty("--surface-2", p.surface2 || p.surface || p.cream);
  r.setProperty("--ink", p.ink);
  r.setProperty("--ink-soft", p.inkSoft);
  r.setProperty("--muted", p.muted);
  r.setProperty("--peri", p.peri);
  r.setProperty("--blush", p.blush);
  r.setProperty("--mint", p.mint);
  r.setProperty("--accent", p.accent);
  document.body.style.background = p.cream;
  document.body.style.color = p.ink;
}

function applyFont(name) {
  const f = FONT_STACKS[name] || FONT_STACKS.instrument;
  document.body.style.fontFamily = f.body;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useScrollReveal();
  const active = useActiveSection();

  useEffectApp(() => { applyPalette(t.palette); }, [t.palette]);
  useEffectApp(() => { applyFont(t.font); }, [t.font]);
  useEffectApp(() => { document.documentElement.setAttribute("data-density", t.density); }, [t.density]);
  useEffectApp(() => { document.documentElement.setAttribute("data-motion", t.motion); }, [t.motion]);

  return (
    <>
      <TopNav active={active}/>
      <Hero/>
      <Work/>
      <LiveSites/>
      <Projects/>
      <TechStack/>
      <Hobbies/>
      <Photos/>
      <ApiWidget/>
      <Guestbook/>

      <NowPlaying/>
      <ShortcutHelp/>

      <TweaksPanel>
        <TweakSection label="Palette"/>
        <TweakRadio
          label="Colors"
          value={t.palette}
          options={["aubergine","midnight","forest","cosmos"]}
          onChange={(v) => setTweak("palette", v)}
        />

        <TweakSection label="Typography"/>
        <TweakRadio
          label="Font"
          value={t.font}
          options={["instrument","fraunces","clean"]}
          onChange={(v) => setTweak("font", v)}
        />

        <TweakSection label="Layout"/>
        <TweakRadio
          label="Density"
          value={t.density}
          options={["compact","regular","comfy"]}
          onChange={(v) => setTweak("density", v)}
        />

        <TweakSection label="Motion"/>
        <TweakRadio
          label="Intensity"
          value={t.motion}
          options={["off","low","normal","high"]}
          onChange={(v) => setTweak("motion", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
