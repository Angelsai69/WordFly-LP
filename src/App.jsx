import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,900&family=Short+Stack&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --orange:       #FF6B2C;
      --orange-dark:  #E05520;
      --orange-soft:  #FF8F5E;
      --orange-tint:  #FFF4EE;
      --orange-mist:  #FFE8D6;
      --purple:       #7C3AED;
      --purple-soft:  #9D6EFF;
      --purple-tint:  #F3EEFF;
      --purple-mist:  #E4D4FF;
      --ink:          #1A0F00;
      --ink-60:       rgba(26,15,0,0.6);
      --ink-35:       rgba(26,15,0,0.35);
      --ink-12:       rgba(26,15,0,0.12);
      --ink-06:       rgba(26,15,0,0.06);
      --cream:        #FFFBF7;
      --green:        #16A34A;
      --shadow-orange: 0 12px 40px -8px rgba(255,107,44,0.4);
      --shadow-card:   0 4px 24px -4px rgba(26,15,0,0.1);
      --shadow-float:  0 24px 56px -12px rgba(26,15,0,0.18);
    }

    html { scroll-behavior: smooth; }
    body { font-family: 'Baloo 2', cursive; background: var(--cream); color: var(--ink); -webkit-font-smoothing: antialiased; }
    ::selection { background: var(--orange-mist); color: var(--orange-dark); }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--cream); }
    ::-webkit-scrollbar-thumb { background: var(--orange); border-radius: 99px; }

    /* — Body text weight 550 simulation via font-weight 600 in Baloo 2 — */
    p, li, span.body { font-weight: 600; }

    @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes floatY2  { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-9px) rotate(2deg)} }
    @keyframes blobMorph{ 0%,100%{border-radius:60% 40% 55% 45%/50% 60% 40% 50%;transform:rotate(0deg) scale(1)} 33%{border-radius:45% 55% 40% 60%/60% 40% 55% 45%;transform:rotate(120deg) scale(1.06)} 66%{border-radius:55% 45% 60% 40%/40% 55% 45% 60%;transform:rotate(240deg) scale(0.95)} }
    @keyframes revealUp { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
    @keyframes marqueeScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes pulseGlow{ 0%,100%{box-shadow:0 0 0 0 rgba(255,107,44,0.55)} 50%{box-shadow:0 0 0 14px rgba(255,107,44,0)} }
    @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes gradShift{ 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
    @keyframes blinkCursor{ 0%,100%{border-color:var(--orange)} 50%{border-color:transparent} }

    /* ── Raven mascot animations ── */
    @keyframes ravenBob    { 0%,100%{transform:translateY(0) rotate(0deg)} 25%{transform:translateY(-8px) rotate(-1.5deg)} 75%{transform:translateY(-4px) rotate(1deg)} }
    @keyframes ravenBlink  { 0%,94%,100%{transform:scaleY(1)} 96%{transform:scaleY(0.08)} }
    @keyframes wingFlap    { 0%,100%{transform:rotate(0deg) scaleX(1)} 20%{transform:rotate(-18deg) scaleX(1.08)} 40%{transform:rotate(4deg) scaleX(0.96)} 60%{transform:rotate(-10deg) scaleX(1.05)} 80%{transform:rotate(2deg) scaleX(0.98)} }
    @keyframes wingFlapR   { 0%,100%{transform:rotate(0deg) scaleX(1)} 20%{transform:rotate(18deg) scaleX(1.08)} 40%{transform:rotate(-4deg) scaleX(0.96)} 60%{transform:rotate(10deg) scaleX(1.05)} 80%{transform:rotate(-2deg) scaleX(0.98)} }
    @keyframes bookGlow    { 0%,100%{filter:drop-shadow(0 0 6px rgba(255,107,44,.5))} 50%{filter:drop-shadow(0 0 18px rgba(255,107,44,.9)) drop-shadow(0 0 32px rgba(124,58,237,.4))} }
    @keyframes wordFloat1  { 0%{opacity:0;transform:translate(0,0) rotate(-8deg) scale(0.7)} 15%{opacity:1;transform:translate(-12px,-22px) rotate(-5deg) scale(1)} 85%{opacity:.8;transform:translate(-38px,-78px) rotate(-12deg) scale(.9)} 100%{opacity:0;transform:translate(-44px,-100px) rotate(-15deg) scale(.7)} }
    @keyframes wordFloat2  { 0%{opacity:0;transform:translate(0,0) rotate(6deg) scale(0.7)} 15%{opacity:1;transform:translate(14px,-18px) rotate(4deg) scale(1)} 85%{opacity:.8;transform:translate(40px,-72px) rotate(10deg) scale(.9)} 100%{opacity:0;transform:translate(48px,-95px) rotate(14deg) scale(.7)} }
    @keyframes wordFloat3  { 0%{opacity:0;transform:translate(0,0) rotate(-3deg) scale(0.6)} 15%{opacity:1;transform:translate(-6px,-28px) rotate(-2deg) scale(1)} 85%{opacity:.7;transform:translate(-20px,-90px) rotate(-6deg) scale(.85)} 100%{opacity:0;transform:translate(-24px,-115px) rotate(-8deg) scale(.65)} }
    @keyframes sparkle     { 0%,100%{opacity:0;transform:scale(0) rotate(0deg)} 30%{opacity:1;transform:scale(1.2) rotate(180deg)} 60%{opacity:.6;transform:scale(.8) rotate(300deg)} }
    @keyframes tailSwish   { 0%,100%{transform:rotate(0deg)} 33%{transform:rotate(8deg)} 66%{transform:rotate(-5deg)} }
    @keyframes crownGlow   { 0%,100%{opacity:.7;transform:translateY(0)} 50%{opacity:1;transform:translateY(-2px)} }

    .raven-body   { animation: ravenBob   4.5s ease-in-out infinite; }
    .raven-blink  { animation: ravenBlink 5s   ease-in-out infinite; transform-origin: center center; }
    .wing-l       { animation: wingFlap   6s   ease-in-out infinite 0.3s; transform-origin: 142px 195px; }
    .wing-r       { animation: wingFlapR  6s   ease-in-out infinite 0.5s; transform-origin: 198px 195px; }
    .book-glow    { animation: bookGlow   3s   ease-in-out infinite; }
    .word-float-1 { animation: wordFloat1 3.2s ease-in-out infinite 0s; }
    .word-float-2 { animation: wordFloat2 3.2s ease-in-out infinite 1.1s; }
    .word-float-3 { animation: wordFloat3 3.2s ease-in-out infinite 2.1s; }
    .sparkle-1    { animation: sparkle    2.4s ease-in-out infinite 0.4s; }
    .sparkle-2    { animation: sparkle    2.4s ease-in-out infinite 1.3s; }
    .sparkle-3    { animation: sparkle    2.4s ease-in-out infinite 2.0s; }
    .raven-tail   { animation: tailSwish  3.8s ease-in-out infinite; transform-origin: 170px 278px; }
    .crown-glow   { animation: crownGlow  2.2s ease-in-out infinite; }

    /* Slower floats — 50% longer */
    .float-1  { animation: floatY  8s ease-in-out infinite; }
    .float-2  { animation: floatY  9s ease-in-out infinite 2s; }
    .float-3  { animation: floatY2 10s ease-in-out infinite 1.5s; }
    .float-4  { animation: floatY  11s ease-in-out infinite 0.8s; }
    .float-5  { animation: floatY2 9.5s ease-in-out infinite 3s; }
    .blob     { animation: blobMorph 20s ease-in-out infinite; }
    .blob-2   { animation: blobMorph 26s ease-in-out infinite 4s; }
    .spin-slow{ animation: spinSlow 28s linear infinite; }
    .marquee-track { animation: marqueeScroll 32s linear infinite; }
    .pulse-glow    { animation: pulseGlow 2.2s ease-in-out infinite; }
    .reveal        { animation: revealUp 0.65s cubic-bezier(.22,.68,0,1.2) forwards; }

    /* Short Stack hero title */
    .hero-title {
      font-family: 'Short Stack', cursive !important;
      font-weight: 400 !important;
      font-size: clamp(3.6rem, 8vw, 6.3rem) !important;
      line-height: 1.05 !important;
      letter-spacing: -.01em !important;
      -webkit-text-stroke: 1.5px currentColor;
      paint-order: stroke fill;
    }

    .btn-primary {
      display:inline-flex; align-items:center; gap:8px;
      background:var(--orange); color:white;
      font-family:'Baloo 2',cursive; font-weight:700; font-size:1rem;
      padding:.8rem 1.75rem; border-radius:9999px; border:none; cursor:pointer;
      box-shadow:var(--shadow-orange);
      transition:transform .2s ease, background .2s ease, box-shadow .2s ease;
      white-space:nowrap;
    }
    .btn-primary:hover { background:var(--orange-dark); transform:translateY(-2px); box-shadow:0 16px 48px -8px rgba(255,107,44,.55); }

    .btn-secondary {
      display:inline-flex; align-items:center; gap:8px;
      background:white; color:var(--ink);
      font-family:'Baloo 2',cursive; font-weight:700; font-size:1rem;
      padding:.8rem 1.75rem; border-radius:9999px; border:2px solid var(--ink-12); cursor:pointer;
      transition:all .2s ease; white-space:nowrap;
    }
    .btn-secondary:hover { border-color:var(--orange-mist); background:var(--orange-tint); color:var(--orange-dark); transform:translateY(-2px); }

    .badge {
      display:inline-flex; align-items:center; gap:6px;
      padding:5px 14px; border-radius:9999px;
      background:var(--orange-tint); border:1.5px solid var(--orange-mist);
      color:var(--orange-dark); font-size:.78rem; font-weight:700;
      letter-spacing:.04em; text-transform:uppercase;
    }

    .card {
      background:white; border-radius:28px; border:1.5px solid var(--ink-06);
      box-shadow:var(--shadow-card);
      transition:transform .28s ease, box-shadow .28s ease;
    }
    .card:hover { transform:translateY(-6px); box-shadow:0 20px 48px -8px rgba(255,107,44,.22); }

    /* All h2 section titles use Short Stack — heavier stroke for +50 weight feel */
    h2 {
      font-family: 'Short Stack', cursive !important;
      font-size: clamp(1.9rem,4vw,2.8rem);
      font-weight: 400 !important;
      line-height: 1.18 !important;
      letter-spacing: -.01em !important;
      -webkit-text-stroke: 0.6px currentColor;
      paint-order: stroke fill;
    }
    h3 { font-family:'Fraunces',serif; font-size:1.15rem; font-weight:700; line-height:1.2; }
    p  { line-height:1.72; }

    /* Pure purple sweep — no white flash, slow 60s cycle with 45s gap */
    @keyframes lifeSweep {
      0%    { background-position: -100% center; }
      8%    { background-position:  200% center; }
      100%  { background-position:  200% center; }
    }
    .life-sweep {
      background: linear-gradient(90deg,
        var(--orange) 0%,
        var(--orange) 28%,
        #9333EA 42%,
        #C084FC 50%,
        #9333EA 58%,
        var(--orange) 72%,
        var(--orange) 100%
      );
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: lifeSweep 60s linear infinite;
    }

    /* Section title entrance — 50% slower = 1.125s */
    @keyframes titleReveal {
      from { opacity: 0; transform: translateY(22px) scale(0.97); filter: blur(4px); }
      to   { opacity: 1; transform: translateY(0)   scale(1);    filter: blur(0); }
    }
    .section-title {
      opacity: 0;
      animation: titleReveal 1.125s cubic-bezier(.22,.68,0,1.15) forwards;
    }

    /* Purple tap ripple on demo card header */
    @keyframes tapPulse {
      0%   { box-shadow: 0 0 0 0 rgba(124,58,237,0.5); }
      70%  { box-shadow: 0 0 0 10px rgba(124,58,237,0); }
      100% { box-shadow: 0 0 0 0   rgba(124,58,237,0); }
    }
    .tap-pulse { animation: tapPulse 1.8s ease-out infinite; }

    .wf-section { padding:6rem 1.5rem; }
    .wf-container { max-width:1160px; margin:0 auto; }
    .wf-section-header { text-align:center; margin-bottom:3.5rem; }

    /* Grade carousel */
    .grade-track::-webkit-scrollbar { display: none; }
    .grade-track { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

/* ─── SECTION TITLE — animated on scroll ─────── */
function SectionTitle({ children, style={} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <h2 ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0) scale(1)" : "translateY(22px) scale(0.97)", filter: visible ? "blur(0)" : "blur(4px)", transition: "opacity 4.5s cubic-bezier(.22,.68,0,1.15), transform 4.5s cubic-bezier(.22,.68,0,1.15), filter 4.5s ease", ...style }}>{children}</h2>
  );
}


/* ─── RAVEN MASCOT ───────────────────────────── */
function RavenMascot({ size = 260 }) {
  return (
    <svg
      viewBox="0 0 340 360"
      width={size}
      height={size}
      style={{ overflow: "visible", display: "block" }}
      aria-label="WordFly mascot — a smart raven reading a glowing book"
    >
      <defs>
        {/* Book glow gradient */}
        <radialGradient id="bookRadial" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#FF6B2C" stopOpacity="0.95"/>
          <stop offset="55%" stopColor="#FBBF24" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.3"/>
        </radialGradient>
        {/* Raven body gradient — deep blue-black with purple sheen */}
        <linearGradient id="ravenBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1C1440"/>
          <stop offset="40%" stopColor="#0F0A1E"/>
          <stop offset="100%" stopColor="#2D1B69"/>
        </linearGradient>
        {/* Wing sheen */}
        <linearGradient id="wingSheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D1B69"/>
          <stop offset="50%" stopColor="#0F0A1E"/>
          <stop offset="100%" stopColor="#4C1D95" stopOpacity="0.6"/>
        </linearGradient>
        {/* Eye iris */}
        <radialGradient id="eyeIris" cx="40%" cy="38%">
          <stop offset="0%" stopColor="#FCD34D"/>
          <stop offset="60%" stopColor="#F59E0B"/>
          <stop offset="100%" stopColor="#B45309"/>
        </radialGradient>
        {/* Book pages */}
        <linearGradient id="pageLeft" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEF3C7"/>
          <stop offset="100%" stopColor="#FDE68A"/>
        </linearGradient>
        <linearGradient id="pageRight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FDE68A"/>
          <stop offset="100%" stopColor="#FEF3C7"/>
        </linearGradient>
        {/* Book cover */}
        <linearGradient id="bookCover" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B2C"/>
          <stop offset="100%" stopColor="#E05520"/>
        </linearGradient>
        {/* Glow halo behind raven */}
        <radialGradient id="haloGrad" cx="50%" cy="55%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.22"/>
          <stop offset="60%" stopColor="#FF6B2C" stopOpacity="0.10"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </radialGradient>
        {/* Feather highlight */}
        <linearGradient id="featherHL" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#1C1440" stopOpacity="0"/>
        </linearGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>

      {/* ── Ambient halo ── */}
      <ellipse cx="170" cy="290" rx="90" ry="18" fill="rgba(124,58,237,.12)"/>
      <ellipse cx="170" cy="200" rx="130" ry="130" fill="url(#haloGrad)"/>

      {/* ── Floating word chips (erupt from book) ── */}
      <g className="word-float-1" style={{transformOrigin:"155px 248px"}}>
        <rect x="104" y="232" rx="8" ry="8" width="66" height="22" fill="white" stroke="rgba(255,107,44,.4)" strokeWidth="1.2" filter="url(#softGlow)"/>
        <text x="137" y="247" textAnchor="middle" fontSize="9.5" fontFamily="'Baloo 2',cursive" fontWeight="800" fill="#FF6B2C">luminous</text>
      </g>
      <g className="word-float-2" style={{transformOrigin:"185px 244px"}}>
        <rect x="166" y="228" rx="8" ry="8" width="68" height="22" fill="white" stroke="rgba(124,58,237,.4)" strokeWidth="1.2" filter="url(#softGlow)"/>
        <text x="200" y="243" textAnchor="middle" fontSize="9.5" fontFamily="'Baloo 2',cursive" fontWeight="800" fill="#7C3AED">tenacious</text>
      </g>
      <g className="word-float-3" style={{transformOrigin:"170px 240px"}}>
        <rect x="126" y="224" rx="8" ry="8" width="72" height="22" fill="white" stroke="rgba(255,107,44,.3)" strokeWidth="1.2" filter="url(#softGlow)"/>
        <text x="162" y="239" textAnchor="middle" fontSize="9.2" fontFamily="'Baloo 2',cursive" fontWeight="800" fill="#E05520">ephemeral</text>
      </g>

      {/* ── Sparkles ── */}
      <g className="sparkle-1" style={{transformOrigin:"118px 170px"}}>
        <path d="M118 163 L120 168 L125 170 L120 172 L118 177 L116 172 L111 170 L116 168 Z" fill="#FBBF24"/>
      </g>
      <g className="sparkle-2" style={{transformOrigin:"228px 155px"}}>
        <path d="M228 149 L230 153 L234 155 L230 157 L228 161 L226 157 L222 155 L226 153 Z" fill="#C084FC"/>
      </g>
      <g className="sparkle-3" style={{transformOrigin:"145px 130px"}}>
        <path d="M145 126 L146.5 130 L150 131.5 L146.5 133 L145 137 L143.5 133 L140 131.5 L143.5 130 Z" fill="#FF6B2C" opacity="0.8"/>
      </g>

      {/* ══ RAVEN BODY — main animated group ══ */}
      <g className="raven-body">

        {/* Left wing — behind body */}
        <g className="wing-l">
          <path d="M142 198 C108 182 88 210 82 238 C90 222 110 214 130 218 C122 230 118 248 124 262 C132 242 140 222 142 198 Z"
            fill="url(#wingSheen)" stroke="#0F0A1E" strokeWidth="1"/>
          {/* Wing feather details */}
          <path d="M96 228 C102 218 114 216 124 220" stroke="#2D1B69" strokeWidth="1" fill="none" opacity="0.6"/>
          <path d="M90 240 C98 228 112 224 126 228" stroke="#2D1B69" strokeWidth="1" fill="none" opacity="0.5"/>
          {/* Purple wing sheen highlight */}
          <path d="M136 200 C118 190 98 208 88 228 C100 212 120 208 136 212 Z" fill="url(#featherHL)" opacity="0.5"/>
        </g>

        {/* Right wing — behind body */}
        <g className="wing-r">
          <path d="M198 198 C232 182 252 210 258 238 C250 222 230 214 210 218 C218 230 222 248 216 262 C208 242 200 222 198 198 Z"
            fill="url(#wingSheen)" stroke="#0F0A1E" strokeWidth="1"/>
          <path d="M244 228 C238 218 226 216 216 220" stroke="#2D1B69" strokeWidth="1" fill="none" opacity="0.6"/>
          <path d="M250 240 C242 228 228 224 214 228" stroke="#2D1B69" strokeWidth="1" fill="none" opacity="0.5"/>
          <path d="M204 200 C222 190 242 208 252 228 C240 212 220 208 204 212 Z" fill="url(#featherHL)" opacity="0.5"/>
        </g>

        {/* Tail feathers */}
        <g className="raven-tail">
          <path d="M152 272 C148 292 144 312 138 326 C148 316 156 304 160 292 Z" fill="url(#ravenBody)" stroke="#0F0A1E" strokeWidth="0.8"/>
          <path d="M162 275 C160 298 158 318 156 334 C162 320 166 304 167 290 Z" fill="#1C1440" stroke="#0F0A1E" strokeWidth="0.8"/>
          <path d="M172 275 C174 298 176 318 178 334 C172 320 168 304 167 290 Z" fill="#1C1440" stroke="#0F0A1E" strokeWidth="0.8"/>
          <path d="M182 272 C186 292 190 312 196 326 C186 316 178 304 174 292 Z" fill="url(#ravenBody)" stroke="#0F0A1E" strokeWidth="0.8"/>
          {/* Iridescent feather tip highlights */}
          <path d="M152 290 C150 302 146 314 140 324" stroke="#6D28D9" strokeWidth="1.2" fill="none" opacity="0.45"/>
          <path d="M167 294 C166 308 164 320 162 332" stroke="#7C3AED" strokeWidth="1.2" fill="none" opacity="0.45"/>
        </g>

        {/* Main body */}
        <ellipse cx="170" cy="220" rx="44" ry="58" fill="url(#ravenBody)"/>

        {/* Belly / chest lighter patch */}
        <ellipse cx="170" cy="238" rx="22" ry="30" fill="#1C1440" opacity="0.6"/>

        {/* Body feather texture lines */}
        <path d="M152 200 Q170 194 188 200" stroke="#2D1B69" strokeWidth="1.2" fill="none" opacity="0.7"/>
        <path d="M148 212 Q170 205 192 212" stroke="#2D1B69" strokeWidth="1" fill="none" opacity="0.55"/>
        <path d="M150 224 Q170 218 190 224" stroke="#2D1B69" strokeWidth="1" fill="none" opacity="0.45"/>
        {/* Purple iridescent sheen on shoulder */}
        <path d="M148 195 Q160 188 175 192 Q162 198 148 198 Z" fill="#7C3AED" opacity="0.25"/>

        {/* Neck & head */}
        <path d="M155 175 C152 162 150 148 152 135 C156 118 184 118 188 135 C190 148 188 162 185 175 C180 180 160 180 155 175 Z"
          fill="url(#ravenBody)"/>

        {/* Head */}
        <ellipse cx="170" cy="128" rx="32" ry="30" fill="#0F0A1E"/>
        {/* Head top sheen */}
        <ellipse cx="163" cy="114" rx="14" ry="8" fill="#2D1B69" opacity="0.5" transform="rotate(-15,163,114)"/>

        {/* ── Smart crown / mortarboard ── */}
        <g className="crown-glow">
          {/* Board */}
          <rect x="148" y="96" width="44" height="7" rx="2" fill="#FF6B2C"/>
          {/* Cap body */}
          <path d="M152 96 L170 86 L188 96 L188 103 L152 103 Z" fill="#E05520"/>
          {/* Tassel string */}
          <line x1="192" y1="99" x2="200" y2="108" stroke="#FBBF24" strokeWidth="1.5"/>
          <circle cx="200" cy="110" r="3" fill="#FBBF24"/>
          {/* Orange glow on cap */}
          <rect x="148" y="96" width="44" height="7" rx="2" fill="rgba(255,107,44,.3)" filter="url(#softGlow)"/>
        </g>

        {/* Beak */}
        <path d="M162 142 L155 152 L163 150 L165 158 L170 148 L175 158 L177 150 L185 152 L178 142 Z"
          fill="#1a1a2e" stroke="#2D1B69" strokeWidth="0.8"/>
        {/* Beak highlight */}
        <path d="M163 143 L160 150 L165 148 Z" fill="#2D1B69" opacity="0.6"/>

        {/* ── Eyes ── */}
        {/* Left eye socket */}
        <ellipse cx="159" cy="128" rx="10" ry="10.5" fill="#0a0618"/>
        {/* Left iris */}
        <ellipse cx="159" cy="128" rx="7.5" ry="7.5" fill="url(#eyeIris)"/>
        {/* Left pupil — animated side-to-side */}
        <ellipse cx="159" cy="128.5" rx="4" ry="4.5" fill="#0a0618">
          <animate attributeName="cx" values="158;160;159;158" dur="4s" repeatCount="indefinite"/>
        </ellipse>
        {/* Left eye shine */}
        <ellipse cx="156" cy="125" rx="2" ry="1.8" fill="white" opacity="0.9"/>
        {/* Left eyelid for blink */}
        <ellipse cx="159" cy="128" rx="7.5" ry="7.5" fill="#0F0A1E" className="raven-blink"/>

        {/* Right eye socket */}
        <ellipse cx="181" cy="128" rx="10" ry="10.5" fill="#0a0618"/>
        {/* Right iris */}
        <ellipse cx="181" cy="128" rx="7.5" ry="7.5" fill="url(#eyeIris)"/>
        {/* Right pupil */}
        <ellipse cx="181" cy="128.5" rx="4" ry="4.5" fill="#0a0618">
          <animate attributeName="cx" values="180;182;181;180" dur="4s" repeatCount="indefinite"/>
        </ellipse>
        {/* Right eye shine */}
        <ellipse cx="178" cy="125" rx="2" ry="1.8" fill="white" opacity="0.9"/>
        {/* Right eyelid */}
        <ellipse cx="181" cy="128" rx="7.5" ry="7.5" fill="#0F0A1E" className="raven-blink"/>

        {/* Little feet / perch claws */}
        <g fill="#1C1440" stroke="#0F0A1E" strokeWidth="0.8">
          <path d="M158 272 C155 278 150 282 144 284 C148 280 154 276 156 274 Z"/>
          <path d="M162 274 C160 282 158 288 154 292 C156 284 160 278 161 275 Z"/>
          <path d="M166 274 C166 282 166 290 165 294 C165 286 165 280 165 275 Z"/>
          <path d="M176 274 C178 282 180 288 184 292 C180 284 178 278 177 275 Z"/>
          <path d="M180 272 C183 278 188 282 194 284 C190 280 184 276 182 274 Z"/>
          <path d="M172 274 C174 282 176 288 178 292 C176 284 173 278 173 275 Z"/>
        </g>

        {/* ── Glowing book in wings/talons ── */}
        <g className="book-glow">
          {/* Book shadow */}
          <ellipse cx="170" cy="266" rx="38" ry="6" fill="rgba(0,0,0,.2)"/>
          {/* Book spine */}
          <rect x="163" y="236" width="14" height="28" rx="2" fill="#C2410C"/>
          {/* Left page spread */}
          <path d="M120 234 C135 228 155 232 163 236 L163 264 C155 260 135 256 120 262 Z"
            fill="url(#pageLeft)" stroke="#FDE68A" strokeWidth="0.8"/>
          {/* Right page spread */}
          <path d="M177 236 C185 232 205 228 220 234 L220 262 C205 256 185 260 177 264 Z"
            fill="url(#pageRight)" stroke="#FDE68A" strokeWidth="0.8"/>
          {/* Text lines on left page */}
          <line x1="128" y1="242" x2="158" y2="240" stroke="#D97706" strokeWidth="1.2" opacity="0.6"/>
          <line x1="126" y1="247" x2="156" y2="245" stroke="#D97706" strokeWidth="1" opacity="0.5"/>
          <line x1="127" y1="252" x2="157" y2="250" stroke="#D97706" strokeWidth="1" opacity="0.5"/>
          <line x1="129" y1="257" x2="159" y2="255" stroke="#D97706" strokeWidth="0.8" opacity="0.4"/>
          {/* Text lines on right page */}
          <line x1="182" y1="240" x2="212" y2="242" stroke="#D97706" strokeWidth="1.2" opacity="0.6"/>
          <line x1="184" y1="245" x2="214" y2="247" stroke="#D97706" strokeWidth="1" opacity="0.5"/>
          <line x1="183" y1="250" x2="213" y2="252" stroke="#D97706" strokeWidth="1" opacity="0.5"/>
          <line x1="181" y1="255" x2="211" y2="257" stroke="#D97706" strokeWidth="0.8" opacity="0.4"/>
          {/* Book cover front */}
          <rect x="163" y="236" width="14" height="28" rx="2" fill="url(#bookCover)" stroke="#C2410C" strokeWidth="0.8"/>
          {/* Spine detail */}
          <line x1="168" y1="240" x2="168" y2="260" stroke="rgba(255,255,255,.3)" strokeWidth="0.8"/>
          {/* Book glow aura */}
          <ellipse cx="170" cy="250" rx="52" ry="20" fill="rgba(255,107,44,.08)" filter="url(#softGlow)"/>
        </g>

      </g>{/* end .raven-body */}

      {/* ── Name label beneath mascot ── */}
      <g style={{opacity:0.85}}>
        <rect x="135" y="306" width="70" height="22" rx="11" fill="var(--purple)" opacity="0.92"/>
        <text x="170" y="321" textAnchor="middle" fontSize="10" fontFamily="'Short Stack',cursive" fontWeight="400" fill="white" letterSpacing="0.5">Quill</text>
      </g>
    </svg>
  );
}

/* ─── NAVBAR ─────────────────────────────────── */
function Navbar({ setPage, page }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    if (page === "home") {
      document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });
    } else {
      setPage("home");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" }), 380);
    }
  };

  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:999,padding:"0 1.5rem",
      background: scrolled ? "rgba(255,251,247,0.25)" : "transparent",
      backdropFilter: scrolled ? "blur(18px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(26,15,0,0.04)" : "1px solid transparent",
      transition:"all .3s ease",
    }}>
      <div style={{maxWidth:1160,margin:"0 auto",height:68,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={() => setPage("home")} style={{display:"flex",alignItems:"center",gap:10,background:"none",border:"none",cursor:"pointer"}}>
          <div style={{width:40,height:40,background:"var(--orange)",borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,transform:"rotate(8deg)",boxShadow:"0 4px 14px rgba(255,107,44,.45)"}}>📚</div>
          <span style={{fontFamily:"'Fraunces',serif",fontWeight:900,fontSize:"1.45rem",color:"var(--ink)",letterSpacing:"-.03em"}}>Word<span style={{color:"var(--orange)"}}>Fly</span></span>
        </button>
        <div style={{display:"flex",alignItems:"center",gap:"1.75rem"}}>
          {[["How It Works","how"],["Features","features"],["Grade Levels","grades"],["Pricing","pricing"]].map(([label,id]) => (
            <button key={label} onClick={()=>scrollTo(id)}
              style={{color:"var(--ink-60)",fontWeight:600,fontSize:".95rem",background:"none",border:"none",cursor:"pointer",padding:0,fontFamily:"'Baloo 2',cursive",transition:"color .2s"}}
              onMouseEnter={e=>e.target.style.color="var(--orange)"} onMouseLeave={e=>e.target.style.color="var(--ink-60)"}>{label}</button>
          ))}
          <button className="btn-primary pulse-glow" style={{padding:".6rem 1.4rem",fontSize:".9rem"}} onClick={()=>setPage("get-started")}>Try Free 🚀</button>
        </div>
      </div>
    </nav>
  );
}

/* ─── HERO ───────────────────────────────────── */
function Hero({ setPage }) {
  const words = ["perseverant","luminous","tenacious","serendipity","extraordinary","ephemeral"];
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [fwd, setFwd] = useState(true);

  useEffect(() => {
    const w = words[idx];
    let t;
    if (fwd) {
      if (text.length < w.length) t = setTimeout(() => setText(w.slice(0,text.length+1)), 90);
      else t = setTimeout(() => setFwd(false), 1600);
    } else {
      if (text.length > 0) t = setTimeout(() => setText(text.slice(0,-1)), 55);
      else { setIdx((idx+1)%words.length); setFwd(true); }
    }
    return () => clearTimeout(t);
  }, [text,fwd,idx]);

  return (
    <section style={{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",overflow:"hidden",background:"linear-gradient(145deg,#FFFBF7 0%,#FFF4EE 45%,#F4EEFF 100%)"}}>
      {/* BG */}
      <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
        <div className="blob"   style={{position:"absolute",top:"-15%",right:"5%",width:560,height:560,background:"radial-gradient(circle,rgba(255,107,44,.14) 0%,transparent 70%)",filter:"blur(20px)"}}/>
        <div className="blob-2" style={{position:"absolute",bottom:"0%",left:"-8%",width:480,height:480,background:"radial-gradient(circle,rgba(124,58,237,.13) 0%,transparent 70%)",filter:"blur(20px)"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(26,15,0,.07) 1px,transparent 1px)",backgroundSize:"28px 28px",opacity:.6}}/>
      </div>

      <div className="wf-container" style={{padding:"7rem 1.5rem 4rem",position:"relative",zIndex:2}}>
        <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:"4rem",alignItems:"flex-start"}}>

          {/* Copy — wider on left */}
          <div style={{display:"flex",flexDirection:"column",gap:"1.5rem",alignItems:"flex-start",maxWidth:660}}>
            <div className="badge reveal">✨ AI-Powered · Grades 1–8 · Ad-Free</div>

            {/* ── HERO TITLE: Short Stack, ~50% bigger ── */}
            <div className="reveal" style={{animationDelay:"80ms"}}>
              <h1 className="hero-title" style={{color:"var(--ink)"}}>
                Where words<br/>
                come to{" "}
                <span className="life-sweep" style={{WebkitTextStroke:"0px transparent"}}>life</span>
              </h1>
            </div>

            <p className="reveal" style={{animationDelay:"160ms",color:"var(--ink-60)",fontSize:"1.15rem",maxWidth:520,fontWeight:600}}>
              AI games help kids learn new words faster — and enjoy learning every day.
            </p>

            {/* Live typewriter word */}
            <div className="reveal card" style={{animationDelay:"220ms",padding:"1rem 1.5rem",display:"inline-flex",alignItems:"center",gap:".75rem",borderColor:"var(--orange-mist)"}}>
              <span style={{fontSize:"1.5rem"}}>📖</span>
              <span style={{color:"var(--ink-60)",fontSize:".9rem",fontWeight:700}}>Today's word:</span>
              <span style={{fontFamily:"'Fraunces',serif",fontWeight:900,fontSize:"1.25rem",color:"var(--orange)",borderRight:"2.5px solid var(--orange)",paddingRight:4,animation:"blinkCursor .9s step-end infinite",minWidth:180,display:"inline-block"}}>{text}</span>
            </div>

            <div className="reveal" style={{animationDelay:"300ms",display:"flex",gap:".75rem",flexWrap:"wrap"}}>
              <button className="btn-primary" onClick={()=>setPage("get-started")} style={{fontSize:"1.05rem",padding:".9rem 2rem"}}>Start Your Child's Story →</button>
              <button className="btn-secondary" onClick={()=>setPage("demo")}>▶ See It In Action</button>
            </div>

            <div className="reveal" style={{animationDelay:"380ms",display:"flex",alignItems:"center",gap:"1rem"}}>
              <div style={{display:"flex"}}>
                {[10,11,12,13,14].map(n=>(
                  <img key={n} src={`https://i.pravatar.cc/36?img=${n}`} alt="" style={{width:32,height:32,borderRadius:"50%",border:"2.5px solid white",marginLeft:n===10?0:-10,boxShadow:"0 1px 4px rgba(0,0,0,.12)"}}/>
                ))}
              </div>
              <p style={{color:"var(--ink-60)",fontSize:".875rem",fontWeight:700}}><strong style={{color:"var(--ink)"}}>12,000+</strong> kids already learning</p>
            </div>
          </div>

          {/* RIGHT: Raven mascot centrepiece + 5 genre chips orbiting */}
          <div style={{position:"relative",height:480,display:"flex",alignItems:"center",justifyContent:"center",paddingTop:"4rem"}}>

            {/* Soft radial glow behind mascot */}
            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-54%)",width:280,height:280,background:"radial-gradient(circle,rgba(124,58,237,.13) 0%,rgba(255,107,44,.08) 55%,transparent 100%)",borderRadius:"50%",filter:"blur(18px)",pointerEvents:"none"}}/>

            {/* Raven mascot — center */}
            <div style={{position:"relative",zIndex:3}}>
              <RavenMascot size={270}/>
            </div>

            {/* 1 — Dragon Cave — top-center */}
            <div className="float-1" style={{position:"absolute",top:"2%",left:"50%",transform:"translateX(-50%)",zIndex:4,background:"white",borderRadius:99,padding:".55rem 1.1rem",border:"1.5px solid var(--ink-06)",boxShadow:"0 8px 28px rgba(255,107,44,0.18)",display:"flex",alignItems:"center",gap:".5rem",whiteSpace:"nowrap"}}>
              <span style={{fontSize:16}}>🐉</span>
              <span style={{fontWeight:700,fontSize:".8rem",color:"var(--ink)"}}>Dragon Cave</span>
            </div>

            {/* 2 — Wizard World — left-high */}
            <div className="float-2" style={{position:"absolute",top:"18%",left:"-4%",zIndex:4,background:"white",borderRadius:99,padding:".55rem 1.1rem",border:"1.5px solid var(--ink-06)",boxShadow:"0 8px 28px rgba(255,107,44,0.14)",display:"flex",alignItems:"center",gap:".5rem",whiteSpace:"nowrap"}}>
              <span style={{fontSize:16}}>🧙</span>
              <span style={{fontWeight:700,fontSize:".8rem",color:"var(--ink)"}}>Wizard World</span>
            </div>

            {/* 3 — Space Adventure — right-high */}
            <div className="float-3" style={{position:"absolute",top:"22%",right:"-2%",zIndex:4,background:"white",borderRadius:99,padding:".55rem 1.1rem",border:"1.5px solid var(--ink-06)",boxShadow:"0 6px 18px rgba(26,15,0,0.07)",display:"flex",alignItems:"center",gap:".5rem",whiteSpace:"nowrap"}}>
              <span style={{fontSize:16}}>🚀</span>
              <span style={{fontWeight:700,fontSize:".8rem",color:"var(--ink)"}}>Space Adventure</span>
            </div>

            {/* 4 — Fairy Tales — left-low */}
            <div className="float-4" style={{position:"absolute",bottom:"20%",left:"-2%",zIndex:4,background:"white",borderRadius:99,padding:".55rem 1.1rem",border:"1.5px solid var(--ink-06)",boxShadow:"0 6px 18px rgba(26,15,0,0.07)",display:"flex",alignItems:"center",gap:".5rem",whiteSpace:"nowrap"}}>
              <span style={{fontSize:16}}>🧚</span>
              <span style={{fontWeight:700,fontSize:".8rem",color:"var(--ink)"}}>Fairy Tales</span>
            </div>

            {/* 5 — Spy Games — right-low */}
            <div className="float-5" style={{position:"absolute",bottom:"14%",right:"0%",zIndex:4,background:"white",borderRadius:99,padding:".55rem 1.1rem",border:"1.5px solid var(--ink-06)",boxShadow:"0 6px 18px rgba(26,15,0,0.06)",display:"flex",alignItems:"center",gap:".5rem",whiteSpace:"nowrap"}}>
              <span style={{fontSize:16}}>🕵️</span>
              <span style={{fontWeight:700,fontSize:".8rem",color:"var(--ink)"}}>Spy Games</span>
            </div>

          </div>
        </div>
      </div>

      <div style={{position:"absolute",bottom:0,left:0,right:0}}>
        <svg viewBox="0 0 1440 80" fill="none" style={{display:"block",width:"100%"}}>
          <path d="M0 40 C360 80 1080 0 1440 40 L1440 80 L0 80 Z" fill="white" opacity="0.6"/>
        </svg>
      </div>
    </section>
  );
}

/* ─── TRUST BAR ──────────────────────────────── */
function TrustBar() {
  const items = ["📚 500+ Vocabulary Words","🎯 Grades 1–8 Adaptive","🔒 COPPA Compliant","🚫 Zero Ads","🏫 600+ Schools","⭐ 4.9 App Store","🧠 Research-Backed","👨‍👩‍👧 12,000+ Families","📖 AI-Generated Stories","🏆 EdTech Award 2025"];
  return (
    <div style={{background:"var(--ink)",padding:"1rem 0",overflow:"hidden"}}>
      <div style={{display:"flex",gap:"3rem",whiteSpace:"nowrap"}}>
        <div className="marquee-track" style={{display:"flex",gap:"3rem",flexShrink:0}}>
          {[...items,...items].map((item,i)=>(
            <span key={i} style={{fontSize:".82rem",fontWeight:700,color:"rgba(255,255,255,.5)",letterSpacing:".04em"}}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── HOW IT WORKS ───────────────────────────── */
function HowItWorks() {
  const steps = [
    {icon:"🎓",num:"01",color:"var(--orange)",bg:"var(--orange-tint)",border:"var(--orange-mist)",title:"AI Selects Grade-Level Words",desc:"WordFly maps your child's grade (1–8) to the vocabulary they need — aligned with school curricula. Words are chosen to challenge but never overwhelm."},
    {icon:"✍️",num:"02",color:"var(--purple)",bg:"var(--purple-tint)",border:"var(--purple-mist)",title:"Your Child Shapes the Story",desc:"The AI generates a story opening. Your child picks what happens next — their choices drive the plot forward, making every story unique to them."},
    {icon:"📖",num:"03",color:"#D97706",bg:"#FFFBEB",border:"#FDE68A",title:"Words Appear In Context",desc:"Target vocabulary is woven naturally into the narrative. Kids tap a highlighted word to see its meaning, hear it pronounced, and save it."},
    {icon:"⚡",num:"04",color:"var(--green)",bg:"#F0FDF4",border:"#BBF7D0",title:"Game Challenge Unlocks Next Chapter",desc:"A short, fun quiz challenge on the story's vocabulary unlocks the next chapter. Beat it, earn XP, and dive deeper into the adventure."},
  ];

  return (
    <section id="how" className="wf-section" style={{background:"white"}}>
      <div className="wf-container">
        <div className="wf-section-header">
          <div className="badge" style={{marginBottom:"1rem"}}>✦ How It Works</div>
          <SectionTitle>Learning disguised as <span style={{color:"var(--orange)"}}>storytelling</span></SectionTitle>
          <p style={{color:"var(--ink-60)",marginTop:"1rem",fontSize:"1.05rem",maxWidth:500,margin:"1rem auto 0",fontWeight:600}}>Four simple steps that have kids learning 3× more vocabulary — without it ever feeling like studying.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"1.25rem"}}>
          {steps.map((s,i)=>(
            <div key={i} className="card" style={{padding:"2rem",border:`1.5px solid ${s.border}`,background:s.bg,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:"1rem",right:"1.25rem",fontFamily:"'Fraunces',serif",fontWeight:900,fontSize:"4rem",color:"rgba(0,0,0,.04)",lineHeight:1}}>{s.num}</div>
              <div style={{width:54,height:54,borderRadius:16,background:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:"1.25rem",boxShadow:`0 4px 14px ${s.border}`}}>{s.icon}</div>
              <h3 style={{marginBottom:".6rem",color:s.color}}>{s.title}</h3>
              <p style={{fontSize:".9rem",color:"var(--ink-60)",lineHeight:1.7,fontWeight:600}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── STORY DEMO — now with ALL floating UI combined ──── */
function StoryDemo() {
  const [step, setStep] = useState(0);
  const [showDef, setShowDef] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [streakPop, setStreakPop] = useState(false);
  const [xpPop, setXpPop] = useState(false);

  const story = [
    { text: (tap) => (
        <p style={{fontSize:".85rem",lineHeight:1.7,color:"var(--ink)",fontWeight:600}}>
          Maya discovered a{" "}
          <span onClick={tap} style={{background:showDef?"var(--orange)":"var(--orange-mist)",color:showDef?"white":"var(--orange-dark)",fontWeight:700,borderRadius:6,padding:"2px 8px",cursor:"pointer",textDecoration:"underline dotted",transition:"all .2s"}}>perseverant</span>
          {" "}little sprout growing through the cracked sidewalk. No matter how many boots had stomped above it, the plant kept pushing upward toward the sun…
        </p>
      ),
      def:{ word:"perseverant", meaning:"continuing despite difficulty or delay", example:'"Her perseverant spirit helped her finish the marathon."' },
      choices:["🌱 Water it gently and mark the spot","🔎 Dig it up to examine the roots","🗒️ Draw it in your nature journal"],
      quiz:{ q:"What does 'perseverant' mean?", opts:["Giving up easily","Continuing despite difficulty","Growing very fast","Being very tall"], ans:1 }
    },
    { text: () => (
        <p style={{fontSize:".85rem",lineHeight:1.7,color:"var(--ink)",fontWeight:600}}>
          Maya carefully watered the sprout each day — a{" "}
          <span style={{background:"var(--orange-mist)",color:"var(--orange-dark)",fontWeight:700,borderRadius:6,padding:"2px 8px"}}>perseverant</span>
          {" "}act of hope. Weeks passed. The plant grew{" "}
          <span style={{background:"var(--purple-mist)",color:"var(--purple)",fontWeight:700,borderRadius:6,padding:"2px 8px"}}>magnificent</span>
          {" "}— taller than Maya, with silver leaves that shimmered in the moonlight…
        </p>
      ),
      def:null,
      choices:["🌙 Return at midnight to watch it glow","👩‍👩‍👧 Invite the neighborhood to see it","📸 Take a photo and post it online"],
      quiz:null
    },
  ];
  const cur = story[step % story.length];

  const handleQuizAnswer = (idx) => {
    setQuizAnswer(idx);
    if (idx === cur.quiz.ans) {
      setTimeout(() => {
        setXpPop(true);
        setTimeout(() => setXpPop(false), 2200);
        setQuizActive(false);
        setQuizAnswer(null);
        setStep(step + 1);
        setShowDef(false);
      }, 800);
    }
  };

  const handleChoice = () => {
    if (cur.quiz) { setQuizActive(true); }
    else { setStep(step+1); setShowDef(false); }
  };

  return (
    <section className="wf-section" style={{background:"linear-gradient(160deg,#FFF4EE 0%,#F4EEFF 100%)"}}>
      <div className="wf-container">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center"}}>

          {/* LEFT: description + feature list */}
          <div>
            <div className="badge" style={{marginBottom:"1rem"}}>✦ Live Demo</div>
            <SectionTitle>See a real story <span style={{color:"var(--orange)"}}>in action</span></SectionTitle>
            <p style={{color:"var(--ink-60)",marginTop:"1rem",lineHeight:1.75,fontSize:"1rem",fontWeight:600}}>
              This is what your child actually sees. Vocabulary words are highlighted inside the story — tap one to instantly see the definition, hear it, and save it. Then make story choices and take on a fun game challenge to unlock the next chapter.
            </p>
            <div style={{marginTop:"2rem",display:"flex",flexDirection:"column",gap:".9rem"}}>
              {[
                ["👆","Tap any highlighted word — see the definition popup instantly"],
                ["🎧","Hear every word pronounced out loud with one tap"],
                ["📝","Your child's story choices steer the plot forward"],
                ["🔥","Daily streak tracker keeps them coming back every day"],
                ["⚡","Game-style challenge unlocks the next chapter after reading"],
                ["⭐","XP and badges reward every word learned and quiz passed"],
              ].map(([ic,t],i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:".75rem"}}>
                  <div style={{width:36,height:36,borderRadius:11,background:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0,boxShadow:"var(--shadow-card)"}}>{ic}</div>
                  <p style={{color:"var(--ink-60)",fontSize:".9rem",lineHeight:1.6,marginTop:4,fontWeight:600}}>{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: fully interactive story card + floating badges */}
          <div style={{position:"relative",display:"flex",justifyContent:"center"}}>

            {/* Main story card */}
            <div className="card" style={{padding:"1.75rem",boxShadow:"var(--shadow-float)",width:"100%",maxWidth:400,position:"relative",zIndex:2}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.25rem"}}>
                <div style={{display:"flex",alignItems:"center",gap:".6rem"}}>
                  <span style={{fontSize:22}}>📚</span>
                  <div>
                    <div style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:".9rem"}}>The Silver Sprout</div>
                    <div style={{fontSize:".68rem",color:"var(--ink-60)",fontWeight:600}}>Grade 3 · Nature · Chapter {step+1}</div>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{background:"var(--orange-tint)",border:"1px solid var(--orange-mist)",color:"var(--orange)",fontWeight:800,fontSize:".72rem",padding:"3px 10px",borderRadius:99}}>⭐ {150+step*80} XP</div>
                  <div style={{background:"var(--purple-tint)",border:"1px solid var(--purple-mist)",color:"var(--purple)",fontWeight:800,fontSize:".72rem",padding:"3px 10px",borderRadius:99}}>🔥 12</div>
                </div>
              </div>

              {/* Story text */}
              <div style={{background:"var(--cream)",borderRadius:14,padding:"1rem",marginBottom:"1rem",minHeight:90}}>
                {cur.text(() => setShowDef(!showDef))}
              </div>

              {/* Word definition popup */}
              {showDef && cur.def && (
                <div style={{background:"var(--orange)",borderRadius:14,padding:".9rem 1rem",marginBottom:"1rem"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <span style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:"1rem",color:"white"}}>{cur.def.word}</span>
                    <button onClick={()=>setShowDef(false)} style={{background:"rgba(255,255,255,.2)",border:"none",color:"white",cursor:"pointer",borderRadius:"50%",width:20,height:20,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                  </div>
                  <p style={{fontSize:".78rem",color:"rgba(255,255,255,.9)",marginTop:".25rem",fontWeight:600}}>adj. {cur.def.meaning}</p>
                  <p style={{fontSize:".75rem",color:"rgba(255,255,255,.75)",marginTop:".4rem",fontStyle:"italic",fontWeight:600}}>{cur.def.example}</p>
                  <div style={{display:"flex",gap:6,marginTop:".6rem"}}>
                    {["🔊 Hear it","📝 Save word"].map(b=>(
                      <button key={b} style={{background:"rgba(255,255,255,.18)",border:"1px solid rgba(255,255,255,.3)",color:"white",fontFamily:"'Baloo 2',cursive",fontWeight:600,fontSize:".72rem",padding:"3px 10px",borderRadius:99,cursor:"pointer"}}>{b}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quiz challenge overlay */}
              {quizActive && cur.quiz ? (
                <div style={{background:"var(--purple-tint)",borderRadius:14,padding:"1rem",border:"1.5px solid var(--purple-mist)"}}>
                  <p style={{fontSize:".72rem",fontWeight:800,color:"var(--purple)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:".6rem"}}>⚡ Challenge — Unlock Next Chapter!</p>
                  <p style={{fontSize:".85rem",fontWeight:700,color:"var(--ink)",marginBottom:".75rem"}}>{cur.quiz.q}</p>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {cur.quiz.opts.map((opt,i)=>{
                      const isCorrect = i === cur.quiz.ans;
                      const isSelected = quizAnswer === i;
                      let bg = "white", border = "var(--ink-06)", color = "var(--ink-60)";
                      if (isSelected && isCorrect) { bg = "#DCFCE7"; border = "#16A34A"; color = "#16A34A"; }
                      else if (isSelected && !isCorrect) { bg = "#FEE2E2"; border = "#EF4444"; color = "#EF4444"; }
                      return (
                        <button key={i} onClick={()=>quizAnswer===null&&handleQuizAnswer(i)} style={{padding:".55rem .85rem",borderRadius:10,background:bg,border:`1.5px solid ${border}`,color,fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".78rem",cursor:"pointer",textAlign:"left",transition:"all .18s"}}
                          onMouseEnter={e=>{if(quizAnswer===null)e.currentTarget.style.background="var(--purple-mist)"}} onMouseLeave={e=>{if(quizAnswer===null)e.currentTarget.style.background="white"}}
                        >{isSelected&&isCorrect?"✅ ":isSelected&&!isCorrect?"❌ ":""}{opt}</button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <>
                  <p style={{fontSize:".7rem",fontWeight:800,color:"var(--ink-35)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:".5rem"}}>What should Maya do?</p>
                  <div style={{display:"flex",flexDirection:"column",gap:7}}>
                    {cur.choices.map((c,i)=>(
                      <button key={i} onClick={handleChoice} style={{padding:".65rem 1rem",borderRadius:12,textAlign:"left",background:i===0?"var(--orange-tint)":"white",border:`1.5px solid ${i===0?"var(--orange)":"var(--ink-12)"}`,color:i===0?"var(--orange-dark)":"var(--ink-60)",fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".82rem",cursor:"pointer",transition:"all .18s"}}
                        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.01)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}
                      >{c}</button>
                    ))}
                  </div>
                </>
              )}

              {/* XP progress bar */}
              <div style={{marginTop:"1rem",display:"flex",alignItems:"center",gap:".6rem"}}>
                <span style={{fontSize:".7rem",fontWeight:700,color:"var(--ink-60)"}}>Daily XP</span>
                <div style={{flex:1,height:7,background:"var(--ink-06)",borderRadius:99,overflow:"hidden"}}>
                  <div style={{width:`${55+step*13}%`,height:"100%",background:"linear-gradient(90deg,var(--orange),#FF8F5E)",borderRadius:99,transition:"width .5s ease"}}/>
                </div>
                <span style={{fontSize:".7rem",fontWeight:800,color:"var(--orange)"}}>{55+step*13}%</span>
              </div>

              <p style={{fontSize:".68rem",color:"var(--ink-35)",textAlign:"center",marginTop:".75rem",fontWeight:600}}>
                {showDef ? "✅ Tap 'Save word' to add to your dictionary!" : quizActive ? "🎯 Answer correctly to unlock the next chapter!" : "👆 Tap the orange word to see its meaning"}
              </p>
            </div>

            {/* Floating: XP earned pop */}
            {xpPop && (
              <div className="float-3 card" style={{position:"absolute",top:"-8%",right:"-8%",padding:".7rem 1rem",zIndex:5,background:"#DCFCE7",borderColor:"#BBF7D0",boxShadow:"0 12px 32px rgba(22,163,74,.3)"}}>
                <div style={{display:"flex",alignItems:"center",gap:".5rem"}}>
                  <span style={{fontSize:18}}>🏆</span>
                  <div>
                    <div style={{fontWeight:800,fontSize:".82rem",color:"#16A34A"}}>+80 XP Earned!</div>
                    <div style={{fontSize:".65rem",color:"#16A34A",fontWeight:600}}>Challenge complete!</div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Live Demo floating info badges ── */}

            {/* 12-Day Streak — purple — top-right */}
            <div className="float-1" style={{position:"absolute",top:"-10%",right:"-16%",zIndex:4,background:"var(--purple)",borderRadius:18,padding:".7rem 1.1rem",border:"none",boxShadow:"0 10px 28px rgba(124,58,237,.38)",display:"flex",alignItems:"center",gap:".6rem",whiteSpace:"nowrap"}}>
              <span style={{fontSize:18}}>🔥</span>
              <div>
                <div style={{fontWeight:800,fontSize:".8rem",color:"white"}}>12-Day Streak!</div>
                <div style={{fontSize:".65rem",color:"rgba(255,255,255,.7)",fontWeight:600}}>+Bonus XP today</div>
              </div>
            </div>

            {/* New Word: perseverant — orange tint — left-top */}
            <div className="float-3" style={{position:"absolute",top:"10%",left:"-18%",zIndex:4,background:"var(--orange-tint)",borderRadius:18,padding:".75rem 1.1rem",border:"1.5px solid var(--orange-mist)",boxShadow:"0 8px 24px rgba(255,107,44,.18)",display:"flex",alignItems:"center",gap:".6rem",whiteSpace:"nowrap",maxWidth:190}}>
              <span style={{fontSize:18}}>💡</span>
              <div>
                <div style={{fontWeight:800,fontSize:".78rem",color:"var(--orange-dark)"}}>perseverant</div>
                <div style={{fontSize:".62rem",color:"var(--ink-60)",fontWeight:600,lineHeight:1.4}}>adj. continuing despite difficulty</div>
              </div>
            </div>

            {/* Grade Level — purple card — bottom-left */}
            <div className="float-2" style={{position:"absolute",bottom:"-8%",left:"-14%",zIndex:4,background:"var(--purple)",borderRadius:18,padding:".7rem 1.1rem",border:"none",boxShadow:"0 8px 24px rgba(124,58,237,.3)",display:"flex",alignItems:"center",gap:".6rem",whiteSpace:"nowrap"}}>
              <span style={{fontSize:18}}>🎓</span>
              <div>
                <div style={{fontWeight:800,fontSize:".78rem",color:"white"}}>Grade 3 · Nature</div>
                <div style={{fontSize:".62rem",color:"rgba(255,255,255,.7)",fontWeight:600}}>Adaptive difficulty on</div>
              </div>
            </div>

            {/* Quiz ready badge — green — bottom-right */}
            <div className="float-4" style={{position:"absolute",bottom:"-6%",right:"-14%",zIndex:5,background:"#16A34A",borderRadius:18,padding:".65rem 1rem",border:"none",boxShadow:"0 10px 28px rgba(22,163,74,.35)",display:"flex",alignItems:"center",gap:".55rem",whiteSpace:"nowrap"}}>
              <span style={{fontSize:17}}>⚡</span>
              <div>
                <div style={{fontWeight:800,fontSize:".78rem",color:"white"}}>Quiz is ready.</div>
                <div style={{fontSize:".62rem",color:"rgba(255,255,255,.75)",fontWeight:600}}>Tap to unlock Ch. 2</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── GRADE LEVELS — horizontal scroll carousel ── */
function GradeLevels() {
  const trackRef = useRef(null);
  const grades = [
    {g:1,e:"🌱",theme:"Animals & Nature Tales",desc:"Simple, warm stories about animals, seasons, and the natural world. Perfect for new readers building their first vocabulary bank.",words:["big","happy","soft","climb","wonder","bright"],color:"#FFF4EE",accent:"#FF6B2C",border:"#FFE8D6"},
    {g:2,e:"🌼",theme:"Magical Creatures & Friendship",desc:"Enchanted forests, talking animals, and the magic of making new friends. Stories that feel like fairy tales.",words:["curious","gentle","brave","shadow","sparkle","whimsy"],color:"#FFFBEB",accent:"#D97706",border:"#FDE68A"},
    {g:3,e:"🌿",theme:"Adventurers & Hidden Worlds",desc:"Secret doors, underground kingdoms, and young heroes setting off on their first great adventure.",words:["luminous","ancient","journey","discover","perseverant","mystical"],color:"#F0FDF4",accent:"#16A34A",border:"#BBF7D0"},
    {g:4,e:"🔭",theme:"Inventors & Mystery Solvers",desc:"Detectives with gadgets, young scientists in hidden labs, and puzzles that need brains to crack.",words:["formidable","expedition","ingenious","vibrant","hypothesis","intricate"],color:"#EFF6FF",accent:"#2563EB",border:"#BFDBFE"},
    {g:5,e:"🗺️",theme:"Epic Quests & Lost Civilizations",desc:"Ancient temples, lost maps, and bold explorers uncovering secrets buried for centuries.",words:["treacherous","tenacious","sovereignty","analyze","dilemma","arduous"],color:"#F5F3FF",accent:"#7C3AED",border:"#DDD6FE"},
    {g:6,e:"🌌",theme:"Space Exploration & Time Travel",desc:"Wormholes, time paradoxes, and civilizations on the edge of the known universe.",words:["circumnavigate","eloquent","paradox","ambiguous","metaphorical","trajectory"],color:"#FFF0FA",accent:"#C026D3",border:"#F5D0FE"},
    {g:7,e:"⚗️",theme:"Political Intrigue & Science",desc:"Underground resistance movements, moral dilemmas, and the power of knowledge versus authority.",words:["serendipity","ephemeral","juxtapose","proliferate","rhetoric","clandestine"],color:"#F0FDF4",accent:"#0D9488",border:"#99F6E4"},
    {g:8,e:"📜",theme:"Historical Mysteries & Dystopias",desc:"Stories set at the edge of history and future — where the past and what-might-be collide.",words:["extrapolate","intrinsic","paradigm","corroborate","sovereignty","insidious"],color:"#F8F9FA",accent:"#334155",border:"#CBD5E1"},
  ];

  const scroll = (dir) => {
    if (trackRef.current) trackRef.current.scrollBy({ left: dir * 360, behavior:"smooth" });
  };

  return (
    <section id="grades" className="wf-section" style={{background:"var(--cream)"}}>
      <div className="wf-container">
        <div className="wf-section-header">
          <div className="badge" style={{marginBottom:"1rem"}}>✦ Grade Levels</div>
          <SectionTitle>Perfectly matched to <span style={{color:"var(--orange)"}}>every grade</span></SectionTitle>
          <p style={{color:"var(--ink-60)",marginTop:"1rem",fontSize:"1.05rem",maxWidth:460,margin:"1rem auto 0",fontWeight:600}}>
            The AI automatically selects vocabulary for Grades 1–8, aligned with school curricula and your child's reading level.
          </p>
        </div>

        {/* Carousel wrapper */}
        <div style={{position:"relative"}}>
          {/* Left arrow */}
          <button onClick={()=>scroll(-1)} style={{position:"absolute",left:-22,top:"50%",transform:"translateY(-50%)",zIndex:10,width:44,height:44,borderRadius:"50%",background:"white",border:"1.5px solid var(--ink-06)",boxShadow:"var(--shadow-card)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,color:"var(--ink)",transition:"all .2s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor="var(--orange)"} onMouseLeave={e=>e.currentTarget.style.borderColor="var(--ink-06)"}
          >‹</button>

          {/* Scrollable track */}
          <div ref={trackRef} className="grade-track" style={{display:"flex",gap:"1.1rem",overflowX:"auto",paddingBottom:"1rem",scrollSnapType:"x mandatory"}}>
            {grades.map(gr=>(
              <div key={gr.g} style={{
                minWidth:320, maxWidth:320,
                background:gr.color, borderRadius:24,
                border:`1.5px solid ${gr.border}`,
                padding:"1.75rem",
                flexShrink:0,
                scrollSnapAlign:"start",
                boxShadow:"var(--shadow-card)",
                transition:"transform .28s, box-shadow .28s",
                cursor:"default",
                display:"flex", flexDirection:"column",
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow=`0 20px 48px -8px ${gr.accent}33`;}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="var(--shadow-card)";}}
              >
                {/* Header */}
                <div style={{display:"flex",alignItems:"center",gap:".85rem",marginBottom:"1rem"}}>
                  <div style={{width:52,height:52,borderRadius:16,background:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,boxShadow:`0 4px 14px ${gr.border}`,flexShrink:0}}>{gr.e}</div>
                  <div>
                    <div style={{fontFamily:"'Fraunces',serif",fontWeight:900,fontSize:"1.25rem",color:gr.accent,lineHeight:1}}>Grade {gr.g}</div>
                    <div style={{fontSize:".78rem",color:"var(--ink-60)",fontWeight:700,marginTop:3}}>{gr.theme}</div>
                  </div>
                </div>

                {/* Description */}
                <p style={{fontSize:".82rem",color:"var(--ink-60)",lineHeight:1.65,marginBottom:"1.1rem",fontWeight:600,flex:1}}>{gr.desc}</p>

                {/* Divider */}
                <div style={{height:1,background:`${gr.accent}20`,marginBottom:"1rem"}}/>

                {/* Sample words */}
                <p style={{fontSize:".68rem",fontWeight:800,color:"var(--ink-35)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:".6rem"}}>Sample Vocabulary</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:".35rem",marginBottom:"1.25rem"}}>
                  {gr.words.map(w=>(
                    <span key={w} style={{padding:"3px 11px",borderRadius:99,background:"white",border:`1.5px solid ${gr.accent}30`,color:gr.accent,fontWeight:700,fontSize:".72rem"}}>{w}</span>
                  ))}
                </div>

                {/* CTA — always at bottom */}
                <button style={{width:"100%",padding:".6rem",borderRadius:12,background:gr.accent,color:"white",fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".82rem",border:"none",cursor:"pointer",boxShadow:`0 6px 18px -4px ${gr.accent}50`,transition:"opacity .18s",marginTop:"auto"}}
                  onMouseEnter={e=>e.currentTarget.style.opacity=".88"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}
                >Start Grade {gr.g} Adventure →</button>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button onClick={()=>scroll(1)} style={{position:"absolute",right:-22,top:"50%",transform:"translateY(-50%)",zIndex:10,width:44,height:44,borderRadius:"50%",background:"white",border:"1.5px solid var(--ink-06)",boxShadow:"var(--shadow-card)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,color:"var(--ink)",transition:"all .2s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor="var(--orange)"} onMouseLeave={e=>e.currentTarget.style.borderColor="var(--ink-06)"}
          >›</button>
        </div>

        {/* Scroll hint */}
        <p style={{textAlign:"center",fontSize:".75rem",color:"var(--ink-35)",marginTop:"1.25rem",fontWeight:600}}>← Scroll to explore all 8 grades →</p>
      </div>
    </section>
  );
}

/* ─── FEATURES ───────────────────────────────── */
function Features() {
  const features = [
    {
      icon:"🤖", span:2,
      title:"AI-Generated Stories System",
      desc:"Every story is unique, generated in real-time based on your child's grade, genre preference, and the choices they make. The AI also tracks which words your child struggles with and automatically reintroduces them in future stories — using spaced repetition to build lasting memory.",
    },
    {
      icon:"🧠", span:1,
      title:"Memory Science",
      desc:"WordFly uses proven spaced-repetition and contextual embedding to ensure words move from short-term to long-term memory — the same science behind the world's top language learning apps.",
    },
    {
      icon:"✏️", span:1,
      title:"Child-Driven Choices",
      desc:"Kids are co-authors. Their decisions steer the narrative, keeping them emotionally invested — which is exactly when real learning happens.",
    },
    {
      icon:"📊", span:1,
      title:"Parent In Control",
      desc:"See every word your child learned, quiz scores, daily streaks, and a clean weekly progress in a real-time Dashboard. Always informed, never overwhelmed.",
    },
    {
      icon:"🔥", span:1,
      title:"Daily Streak & Rewards",
      desc:"A daily reading ritual is the secret to long-term vocabulary growth. Kids earn bonus XP, badges, and exclusive story unlocks for maintaining their streak — turning learning into a daily highlight.",
    },
    {
      icon:"⚡", span:1,
      title:"Game Level Challenges",
      desc:"Each chapter ends with a game-style challenge. Short, fun, and satisfying to beat — designed to feel like leveling up, not a test.",
    },
    {
      icon:"🔒", span:1,
      title:"Safe & COPPA Compliant",
      desc:"Zero ads. Zero data selling. A fully safe environment built for children. Parents stay in control at all times.",
    },
    {
      icon:"🌍", span:1,
      title:"15+ Story Genres",
      desc:"Space, fantasy, mystery, ocean, history, sports, science, mythology, and more — vocabulary is tailored to each genre so words feel natural inside every story.",
    },
  ];

  const iconBg = ["var(--orange-tint)","var(--purple-tint)","#EFF6FF","#F0FDF4","#FFF0FA","var(--orange-tint)","#EFF6FF","var(--purple-tint)"];

  return (
    <section id="features" className="wf-section" style={{background:"white"}}>
      <div className="wf-container">
        <div className="wf-section-header">
          <div className="badge" style={{marginBottom:"1rem"}}>✦ Features</div>
          <SectionTitle>Everything kids need.<br/><span style={{color:"var(--purple)"}}>Everything parents want.</span></SectionTitle>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.25rem"}}>
          {features.map((f,i)=>(
            <div key={i} className="card" style={{padding:"2rem",gridColumn:`span ${f.span}`}}>
              <div style={{width:52,height:52,borderRadius:16,background:iconBg[i],display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:"1.1rem"}}>{f.icon}</div>
              <h3 style={{marginBottom:".5rem",fontSize:"1.05rem"}}>{f.title}</h3>
              <p style={{color:"var(--ink-60)",fontSize:".875rem",lineHeight:1.75,fontWeight:600}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── STATS ──────────────────────────────────── */
function Stats() {
  return (
    <section style={{background:"var(--ink)",padding:"4rem 1.5rem"}}>
      <div className="wf-container">
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"2.5rem",textAlign:"center"}}>
          {[["3×","More vocabulary retained vs. flashcards"],["92%","Kids ask to continue their story next day"],["500+","Grade-appropriate words per level"],["12K+","Families using WordFly today"]].map(([v,l],i)=>(
            <div key={i}>
              <div style={{fontFamily:"'Fraunces',serif",fontWeight:900,fontSize:"3.2rem",color:"var(--orange)",letterSpacing:"-.02em",lineHeight:1}}>{v}</div>
              <p style={{color:"rgba(255,255,255,.45)",fontSize:".875rem",marginTop:".5rem",fontWeight:600,lineHeight:1.5}}>{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ───────────────────────────── */
function Testimonials() {
  const reviews = [
    {q:"My daughter used to dread vocabulary homework. Now she asks for 'just one more chapter' every night. WordFly is genuinely magic.",n:"Sarah M.",r:"Mom of 8-year-old, Grade 3",img:11},
    {q:"The stories are so creative — my son learned 'tenacious' and 'ephemeral' last week. He used both at the dinner table. He's 10!",n:"David T.",r:"Dad of 10-year-old, Grade 5",img:12},
    {q:"As a teacher I've seen every vocab app. WordFly is the only one kids still talk about at recess. The story format is genius.",n:"Ms. Patel",r:"Grade 4 Teacher, PS 147",img:47},
    {q:"I love the parent dashboard — I can see every word she's mastered. The real-time progress tracking actually motivates her too!",n:"Priya K.",r:"Mom of 7-year-old, Grade 2",img:44},
    {q:"My twins literally compete on the family leaderboard. They've learned 300 new words this month. As a parent I couldn't be happier.",n:"James L.",r:"Dad of twin 11-year-olds, Grade 6",img:15},
    {q:"Safe, ad-free, and genuinely educational. I let my kid play freely — and that peace of mind alone is worth the subscription.",n:"Amara O.",r:"Mom of 9-year-old, Grade 4",img:46},
  ];
  return (
    <section className="wf-section" style={{background:"var(--ink)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:800,height:800,background:"radial-gradient(circle,rgba(255,107,44,.1) 0%,transparent 65%)",pointerEvents:"none"}}/>
      <div className="wf-container" style={{position:"relative"}}>
        <div className="wf-section-header">
          <div className="badge" style={{background:"rgba(255,107,44,.12)",borderColor:"rgba(255,107,44,.2)",color:"var(--orange-soft)",marginBottom:"1rem"}}>✦ Parent Reviews</div>
          <SectionTitle style={{color:"white"}}>Parents <span style={{color:"var(--orange)"}}>love</span> it.<br/>Kids <span style={{fontStyle:"italic",color:"var(--orange-soft)"}}>can't stop</span>.</SectionTitle>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"1.25rem"}}>
          {reviews.map((r,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.05)",border:"1.5px solid rgba(255,255,255,.07)",borderRadius:28,padding:"1.75rem",transition:"background .25s",cursor:"default",display:"flex",flexDirection:"column",justifyContent:"space-between",minHeight:200}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,107,44,.08)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.05)"}
            >
              <div>
                <div style={{display:"flex",gap:2,marginBottom:"1rem"}}>{[1,2,3,4,5].map(s=><span key={s} style={{color:"#F59E0B",fontSize:13}}>★</span>)}</div>
                <p style={{color:"rgba(255,255,255,.82)",fontSize:".88rem",lineHeight:1.75,marginBottom:"1.5rem",fontStyle:"italic",fontWeight:600}}>"{r.q}"</p>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:".75rem",paddingTop:".75rem",borderTop:"1px solid rgba(255,255,255,.07)"}}>
                <img src={`https://i.pravatar.cc/36?img=${r.img}`} alt={r.n} style={{width:38,height:38,borderRadius:"50%",border:"2px solid var(--orange)",flexShrink:0}}/>
                <div>
                  <div style={{fontWeight:700,fontSize:".82rem",color:"white"}}>{r.n}</div>
                  <div style={{fontSize:".7rem",color:"rgba(255,255,255,.4)",fontWeight:600}}>{r.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PRICING ─── Free tier: all grades 1–8 ──── */
function PricingCard({ plan, i, setPage }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
        { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
      );
      obs.observe(el);
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  const p = plan;
  /* NOTE: overflow must stay "hidden" for the decorative circle inside premium card,
     so we wrap in an outer div that handles the slide-up, and the inner div handles overflow. */
  return (
    <div ref={ref} style={{
      willChange: "transform, opacity",
      opacity: visible ? 1 : 0,
      transform: visible ? (p.highlight ? "translateY(0) scale(1.035)" : "translateY(0) scale(1)") : "translateY(56px) scale(1)",
      transition: `opacity 0.7s ease ${i * 0.14}s, transform 0.7s cubic-bezier(0.22, 0.68, 0, 1.2) ${i * 0.14}s`,
    }}>
      <div style={{
        background: p.highlight ? "var(--orange)" : "white",
        borderRadius: 28,
        padding: "2.5rem 2rem",
        border: p.highlight ? "none" : "1.5px solid var(--ink-06)",
        boxShadow: p.highlight ? "var(--shadow-orange)" : "var(--shadow-card)",
        position: "relative",
        overflow: "hidden",
        height: "100%",
      }}>
        {p.highlight && <div style={{position:"absolute",top:-60,right:-60,width:200,height:200,background:"rgba(255,255,255,.12)",borderRadius:"50%",pointerEvents:"none"}}/>}
        {p.badge && <div style={{position:"absolute",top:18,right:18,background:"rgba(255,255,255,.22)",color:"white",fontWeight:700,fontSize:".7rem",padding:"3px 10px",borderRadius:99,border:"1px solid rgba(255,255,255,.3)"}}>{p.badge}</div>}
        <h3 style={{fontFamily:"'Fraunces',serif",fontSize:"1.35rem",color:p.highlight?"white":"var(--ink)",marginBottom:".25rem"}}>{p.name}</h3>
        <p style={{fontSize:".82rem",color:p.highlight?"rgba(255,255,255,.65)":"var(--ink-60)",marginBottom:"1.5rem",fontWeight:600}}>{p.desc}</p>
        <div style={{marginBottom:"1.75rem"}}>
          <span style={{fontFamily:"'Fraunces',serif",fontWeight:900,fontSize:"2.8rem",color:p.highlight?"white":"var(--ink)",lineHeight:1}}>{p.price}</span>
          <span style={{color:p.highlight?"rgba(255,255,255,.55)":"var(--ink-35)",fontSize:".9rem",fontWeight:600}}>{p.per}</span>
        </div>
        <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:".7rem",marginBottom:"2rem"}}>
          {p.features.map((f,j)=>(
            <li key={j} style={{display:"flex",alignItems:"center",gap:".6rem",color:p.highlight?"rgba(255,255,255,.88)":"var(--ink-60)",fontSize:".875rem",fontWeight:600}}>
              <span style={{width:20,height:20,borderRadius:"50%",background:p.highlight?"rgba(255,255,255,.2)":"var(--orange-tint)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".65rem",color:p.highlight?"white":"var(--orange)",flexShrink:0,fontWeight:700}}>✓</span>{f}
            </li>
          ))}
        </ul>
        <button onClick={()=>setPage("get-started")} style={{width:"100%",padding:".875rem",borderRadius:14,fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".95rem",cursor:"pointer",border:"none",transition:"all .2s",background:p.highlight?"white":"var(--orange)",color:p.highlight?"var(--orange-dark)":"white",boxShadow:p.highlight?"none":"var(--shadow-orange)"}}
          onMouseEnter={e=>e.currentTarget.style.opacity=".9"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}
        >{p.cta}</button>
      </div>
    </div>
  );
}

function Pricing({ setPage }) {
  const plans = [
    {
      name:"Free", price:"$0", per:"", desc:"Perfect for trying it out",
      features:["1 child profile","3 AI stories per week","All grades 1–8 vocabulary","Basic game challenges","Daily streak tracker"],
      highlight:false, cta:"Start for Free",
    },
    {
      name:"Premium", price:"$8.99", per:"/mo", desc:"Everything your child needs",
      features:["1 child profile","Unlimited AI stories","All grades 1–8","Full real-time parent dashboard","Word collection journal","Audio pronunciations","Memory science tracking","7-day free trial"],
      highlight:true, cta:"Start Free Trial", badge:"Most Popular",
    },
    {
      name:"Family", price:"$16.99", per:"/mo", desc:"For the whole household",
      features:["Up to 4 child profiles","All Premium features","Family leaderboard","Sibling word battles","Bonus XP streak rewards","Priority support","7-day free trial"],
      highlight:false, cta:"Start Free Trial",
    },
  ];

  return (
    <section id="pricing" className="wf-section" style={{background:"var(--cream)"}}>
      <div className="wf-container">
        <div className="wf-section-header">
          <div className="badge" style={{marginBottom:"1rem"}}>✦ Pricing</div>
          <SectionTitle>Simple, honest <span style={{color:"var(--orange)"}}>pricing</span></SectionTitle>
          <p style={{color:"var(--ink-60)",marginTop:"1rem",fontSize:"1rem",maxWidth:420,margin:"1rem auto 0",fontWeight:600}}>No hidden fees. Cancel anytime. Free trial needs no credit card.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem",maxWidth:960,margin:"0 auto",alignItems:"start"}}>
          {plans.map((p,i)=>(
            <PricingCard key={i} plan={p} i={i} setPage={setPage}/>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── no mention of 3-5 questions ──────── */
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    {q:"What grades does WordFly support?",a:"WordFly supports Grades 1–8. The AI automatically selects vocabulary aligned with your child's grade and reading level — no setup needed. Even the Free plan includes all grades."},
    {q:"How does the AI choose which words to teach?",a:"Our AI maps grade-appropriate word lists (aligned with Common Core standards) to the story genre your child picks. Words appear naturally in the narrative, never as isolated lists."},
    {q:"What are the quiz challenges like? Will they stress my child out?",a:"Not at all! Our game challenges are short, fun, and feel like leveling up in a game — not taking a test. Kids love beating them because it unlocks the next chapter of their story."},
    {q:"How does the daily streak work?",a:"Every day a child reads and completes a challenge, their streak grows. Longer streaks earn bonus XP, exclusive story unlocks, and special badges. It turns learning into a daily ritual kids look forward to."},
    {q:"Is my child's data safe?",a:"Absolutely. WordFly is fully COPPA-compliant. We collect only what's needed to personalize learning, never sell data, and never show advertisements of any kind."},
    {q:"Can my child use WordFly alongside school?",a:"Yes, and many teachers recommend it. The vocabulary is curriculum-aligned so kids practice the exact words they need — while enjoying stories that feel nothing like homework."},
    {q:"What if my child doesn't like reading?",a:"That's exactly who WordFly was built for! The story-choice format is closer to a game than a book. Kids who 'hate reading' consistently love WordFly because they're playing, not reading."},
  ];

  return (
    <section className="wf-section" style={{background:"white"}}>
      <div className="wf-container" style={{maxWidth:740}}>
        <div className="wf-section-header">
          <div className="badge" style={{marginBottom:"1rem"}}>✦ FAQ</div>
          <SectionTitle>Questions? <span style={{color:"var(--orange)",fontStyle:"italic"}}>We've got you.</span></SectionTitle>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:".75rem"}}>
          {faqs.map((f,i)=>(
            <div key={i} style={{background:"var(--cream)",borderRadius:20,overflow:"hidden",border:`1.5px solid ${open===i?"var(--orange)":"var(--ink-06)"}`,transition:"border-color .2s"}}>
              <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",padding:"1.25rem 1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
                <span style={{fontWeight:700,fontSize:".95rem",color:"var(--ink)",paddingRight:"1rem"}}>{f.q}</span>
                <span style={{color:"var(--orange)",fontSize:"1.25rem",flexShrink:0,lineHeight:1,transition:"transform .25s",transform:open===i?"rotate(45deg)":"none",display:"block"}}>+</span>
              </button>
              {open===i&&(
                <div style={{padding:"0 1.5rem 1.25rem",color:"var(--ink-60)",fontSize:".875rem",lineHeight:1.75,borderTop:"1px solid var(--ink-06)",fontWeight:600}}>
                  <div style={{paddingTop:".85rem"}}>{f.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA BANNER ─────────────────────────────── */
function CTABanner({ setPage }) {
  return (
    <section className="wf-section" style={{background:"var(--cream)"}}>
      <div className="wf-container" style={{maxWidth:900}}>
        <div style={{background:"linear-gradient(135deg,var(--orange) 0%,#FF3CAC 55%,var(--purple) 100%)",borderRadius:40,padding:"4.5rem 3rem",textAlign:"center",position:"relative",overflow:"hidden",boxShadow:"0 32px 72px -12px rgba(255,107,44,.45)"}}>
          <div style={{position:"absolute",top:-80,right:-80,width:280,height:280,background:"rgba(255,255,255,.1)",borderRadius:"50%",pointerEvents:"none"}}/>
          <div style={{position:"absolute",bottom:-60,left:-60,width:220,height:220,background:"rgba(255,255,255,.08)",borderRadius:"50%",pointerEvents:"none"}}/>
          <div style={{position:"relative"}}>
            <div style={{fontSize:"3.5rem",marginBottom:"1rem"}}>🚀</div>
            <h2 style={{color:"white",marginBottom:"1rem",fontSize:"clamp(1.8rem,4.5vw,2.8rem)"}}>Ready to watch your child<br/>fall in love with words?</h2>
            <p style={{color:"rgba(255,255,255,.78)",fontSize:"1.05rem",marginBottom:"2.5rem",maxWidth:480,margin:"0 auto 2.5rem",fontWeight:600}}>Join 12,000+ families. Start free — no credit card, no commitment. First story takes 60 seconds to begin.</p>
            <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
              {[["🍎 Download for iOS","white","var(--orange-dark)"],["🤖 Download for Android","rgba(255,255,255,.15)","white"]].map(([label,bg,color],i)=>(
                <button key={i} onClick={()=>setPage("get-started")} style={{background:bg,color,fontFamily:"'Baloo 2',cursive",fontWeight:i===0?800:700,fontSize:"1rem",padding:".9rem 2rem",borderRadius:999,border:i===1?"1.5px solid rgba(255,255,255,.3)":"none",cursor:"pointer",boxShadow:i===0?"0 8px 24px rgba(0,0,0,.15)":"none",transition:"all .2s"}}
                  onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}
                >{label}</button>
              ))}
            </div>
            <p style={{color:"rgba(255,255,255,.5)",fontSize:".8rem",marginTop:"1.25rem",fontWeight:600}}>Free 7-day trial · No credit card · Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────── */
function Footer({ setPage, page }) {
  // Map footer link labels → section IDs (for home-page scroll) or page routes
  const sectionLinks = {
    "How It Works":    { section:"how" },
    "Features":        { section:"features" },
    "Grade Levels":    { section:"grades" },
    "Pricing":         { section:"pricing" },
  };

  const handleLink = (label) => {
    const sl = sectionLinks[label];
    if (sl) {
      if (page === "home") {
        document.getElementById(sl.section)?.scrollIntoView({ behavior:"smooth", block:"start" });
      } else {
        setPage("home");
        setTimeout(() => document.getElementById(sl.section)?.scrollIntoView({ behavior:"smooth", block:"start" }), 380);
      }
    } else {
      setPage(label.toLowerCase().replace(/ /g,"-"));
    }
  };

  const cols = [
    {title:"Learn More", links:["How It Works","Grade Levels","Features","Pricing"]},
    {title:"Company",    links:["About Us","Blog","Careers","Press"]},
    {title:"Support",    links:["Terms of Use","Contact Us","Privacy Policy","Trust Center"]},
  ];
  return (
    <footer style={{background:"var(--ink)",padding:"4rem 1.5rem 2rem"}}>
      <div className="wf-container">
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"2.5rem",marginBottom:"3rem"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1rem"}}>
              <div style={{width:36,height:36,background:"var(--orange)",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,transform:"rotate(8deg)"}}>📚</div>
              <span style={{fontFamily:"'Fraunces',serif",fontWeight:900,fontSize:"1.3rem",color:"white"}}>Word<span style={{color:"var(--orange)"}}>Fly</span></span>
            </div>
            <p style={{color:"rgba(255,255,255,.38)",fontSize:".85rem",lineHeight:1.7,maxWidth:240,marginBottom:"1.25rem",fontWeight:600}}>AI-powered vocabulary learning through personalized stories for Grades 1–8. Because the best lessons are the ones kids don't notice.</p>
            <div style={{display:"flex",gap:".5rem"}}>
              {["𝕏","𝑓","in","▶"].map((ic,i)=>(
                <div key={i} style={{width:34,height:34,borderRadius:10,background:"rgba(255,255,255,.06)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,.35)",fontSize:13,cursor:"pointer",border:"1px solid rgba(255,255,255,.05)",transition:"all .2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,107,44,.2)";e.currentTarget.style.color="var(--orange)";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.06)";e.currentTarget.style.color="rgba(255,255,255,.35)";}}
                >{ic}</div>
              ))}
            </div>
          </div>
          {cols.map((col,i)=>(
            <div key={i}>
              <h4 style={{fontWeight:700,color:"white",marginBottom:"1rem",fontSize:".9rem"}}>{col.title}</h4>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:".6rem"}}>
                {col.links.map((l,j)=>(
                  <li key={j}><button onClick={()=>handleLink(l)} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.38)",fontSize:".82rem",fontFamily:"'Baloo 2',cursive",transition:"color .18s",padding:0,textAlign:"left",fontWeight:600}}
                    onMouseEnter={e=>e.target.style.color="var(--orange)"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.38)"}
                  >{l}</button></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:"1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:".75rem"}}>
          <p style={{color:"rgba(255,255,255,.25)",fontSize:".78rem",fontWeight:600}}>© 2026 WordFly Inc. All rights reserved.</p>
          <div style={{display:"flex",gap:"1.25rem"}}>
            {["Privacy Policy","Trust Center","Cookie Policy"].map(l=>(
              <button key={l} onClick={()=>setPage(l.toLowerCase().replace(/ /g,"-"))} style={{background:"none",border:"none",color:"rgba(255,255,255,.25)",fontSize:".75rem",cursor:"pointer",fontFamily:"'Baloo 2',cursive",transition:"color .18s",fontWeight:600}}
                onMouseEnter={e=>e.target.style.color="var(--orange)"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.25)"}
              >{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── COOKIE BAR ─────────────────────────────── */
function CookieBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div style={{
      position:"fixed", bottom:0, left:0, right:0, zIndex:1000,
      background:"rgba(15,10,28,0.96)",
      backdropFilter:"blur(16px)",
      borderTop:"1px solid rgba(124,58,237,0.25)",
      padding:".9rem 2rem",
      display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1.5rem",
      boxShadow:"0 -8px 32px rgba(124,58,237,0.15)",
      flexWrap:"wrap",
    }}>
      {/* Left: purple glow dot + text */}
      <div style={{display:"flex",alignItems:"center",gap:".85rem",flex:1,minWidth:260}}>
        <div style={{width:10,height:10,borderRadius:"50%",background:"var(--purple)",boxShadow:"0 0 8px 3px rgba(124,58,237,0.6)",flexShrink:0,animation:"pulseGlow 2s ease-in-out infinite"}}/>
        <p style={{color:"rgba(255,255,255,.72)",fontSize:".8rem",lineHeight:1.55,fontWeight:600,margin:0}}>
          We use cookies to personalize your child's learning experience and remember their progress.{" "}
          <button onClick={()=>setVisible(false)} style={{background:"none",border:"none",color:"var(--purple-soft)",fontWeight:700,cursor:"pointer",fontFamily:"'Baloo 2',cursive",fontSize:".8rem",textDecoration:"underline",padding:0}}>Cookie Policy</button>
        </p>
      </div>
      {/* Right: buttons */}
      <div style={{display:"flex",gap:".6rem",flexShrink:0}}>
        <button onClick={()=>setVisible(false)} style={{
          padding:".45rem 1.25rem", borderRadius:99,
          background:"transparent", border:"1.5px solid rgba(255,255,255,.18)",
          color:"rgba(255,255,255,.55)", fontFamily:"'Baloo 2',cursive", fontWeight:600, fontSize:".8rem", cursor:"pointer",
          transition:"all .2s",
        }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.4)";e.currentTarget.style.color="white";}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.18)";e.currentTarget.style.color="rgba(255,255,255,.55)";}}
        >Decline</button>
        <button onClick={()=>setVisible(false)} style={{
          padding:".45rem 1.4rem", borderRadius:99,
          background:"var(--purple)", border:"none",
          color:"white", fontFamily:"'Baloo 2',cursive", fontWeight:700, fontSize:".8rem", cursor:"pointer",
          boxShadow:"0 4px 16px rgba(124,58,237,0.45)",
          transition:"all .2s",
        }}
          onMouseEnter={e=>e.currentTarget.style.background="var(--purple-soft)"}
          onMouseLeave={e=>e.currentTarget.style.background="var(--purple)"}
        >Accept All</button>
      </div>
    </div>
  );
}

/* ─── SKELETON LOADER ────────────────────────── */
function SkeletonBar({ w="100%", h=16, r=8, mb=0 }) {
  return <div style={{width:w,height:h,borderRadius:r,background:"linear-gradient(90deg,#f0ece8 25%,#e8e4e0 50%,#f0ece8 75%)",backgroundSize:"200% 100%",animation:"skeletonShimmer 1.4s ease-in-out infinite",marginBottom:mb}}/>;
}
function PageSkeleton() {
  return (
    <div style={{minHeight:"100vh",padding:"5rem 1.5rem 4rem",background:"var(--cream)"}}>
      <style>{`
        @keyframes skeletonShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes pageIn {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .page-in { animation: pageIn 0.42s cubic-bezier(.22,.68,0,1.2) forwards; }
      `}</style>
      <div style={{maxWidth:1160,margin:"0 auto"}}>
        {/* Hero skeleton */}
        <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:"4rem",paddingTop:"4rem",marginBottom:"5rem"}}>
          <div>
            <SkeletonBar w="55%" h={14} r={99} mb={28}/>
            <SkeletonBar w="90%" h={52} r={12} mb={12}/>
            <SkeletonBar w="70%" h={52} r={12} mb={28}/>
            <SkeletonBar w="85%" h={20} r={6} mb={10}/>
            <SkeletonBar w="65%" h={20} r={6} mb={32}/>
            <div style={{display:"flex",gap:12}}>
              <SkeletonBar w={180} h={48} r={99}/>
              <SkeletonBar w={140} h={48} r={99}/>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14,paddingTop:"4rem"}}>
            {[130,100,115].map((w,i)=><SkeletonBar key={i} w={w} h={44} r={99}/>)}
          </div>
        </div>
        {/* Trust bar skeleton */}
        <SkeletonBar w="100%" h={44} r={0} mb={64}/>
        {/* Cards row */}
        <SkeletonBar w="40%" h={28} r={8} mb={16} style={{margin:"0 auto 16px"}}/>
        <SkeletonBar w="25%" h={16} r={6} mb={40} style={{margin:"0 auto 40px"}}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1.25rem"}}>
          {[0,1,2,3].map(i=>(
            <div key={i} style={{borderRadius:24,padding:"1.75rem",background:"white",border:"1.5px solid var(--ink-06)"}}>
              <SkeletonBar w={52} h={52} r={16} mb={20}/>
              <SkeletonBar w="70%" h={16} r={6} mb={10}/>
              <SkeletonBar w="100%" h={12} r={4} mb={6}/>
              <SkeletonBar w="85%" h={12} r={4} mb={6}/>
              <SkeletonBar w="60%" h={12} r={4}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE TRANSITION WRAPPER ────────────────── */
function PageTransition({ children, pageKey }) {
  const [show, setShow] = useState(false);
  const [skeleton, setSkeleton] = useState(true);

  useEffect(() => {
    setShow(false);
    setSkeleton(true);
    const t1 = setTimeout(() => setSkeleton(false), 320);
    const t2 = setTimeout(() => setShow(true), 340);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [pageKey]);

  if (skeleton) return <PageSkeleton/>;
  return <div className="page-in">{children}</div>;
}

/* ─── 404 PAGE ───────────────────────────────── */
function NotFoundPage({ setPage }) {
  const [dots, setDots] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setDots(d => (d+1)%4), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"6rem 1.5rem 4rem",background:"linear-gradient(145deg,#FFFBF7 0%,#FFF4EE 40%,#F4EEFF 100%)",position:"relative",overflow:"hidden"}}>
      {/* BG blobs */}
      <div className="blob" style={{position:"absolute",top:"-10%",right:"5%",width:400,height:400,background:"radial-gradient(circle,rgba(255,107,44,.1) 0%,transparent 70%)",filter:"blur(24px)",pointerEvents:"none"}}/>
      <div className="blob-2" style={{position:"absolute",bottom:"-5%",left:"-5%",width:340,height:340,background:"radial-gradient(circle,rgba(124,58,237,.1) 0%,transparent 70%)",filter:"blur(24px)",pointerEvents:"none"}}/>
      {/* Dot pattern */}
      <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(26,15,0,.05) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none"}}/>

      <div style={{textAlign:"center",maxWidth:520,position:"relative",zIndex:2}}>
        {/* Animated 404 */}
        <div style={{position:"relative",marginBottom:"1.5rem",display:"inline-block"}}>
          <div style={{fontFamily:"'Short Stack',cursive",fontWeight:400,fontSize:"clamp(6rem,16vw,10rem)",lineHeight:1,color:"var(--ink)",letterSpacing:"-.02em",WebkitTextStroke:"2px var(--ink)",opacity:.06,userSelect:"none",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",whiteSpace:"nowrap"}}>404</div>
          <div style={{fontSize:"clamp(5rem,12vw,7.5rem)",lineHeight:1,filter:"drop-shadow(0 8px 24px rgba(255,107,44,.3))"}}>🗺️</div>
        </div>

        <div className="badge" style={{marginBottom:"1.25rem"}}>✦ Page Not Found</div>

        <h2 style={{fontFamily:"'Short Stack',cursive",fontWeight:400,fontSize:"clamp(1.8rem,5vw,2.6rem)",color:"var(--ink)",marginBottom:"1rem",WebkitTextStroke:"0.6px var(--ink)"}}>
          Oops! This page got<br/>
          <span style={{color:"var(--orange)"}}>lost in the story</span>
          {"...".slice(0,dots+1)}
        </h2>

        <p style={{color:"var(--ink-60)",fontSize:"1rem",lineHeight:1.75,fontWeight:600,marginBottom:"2.5rem",maxWidth:400,margin:"0 auto 2.5rem"}}>
          It looks like this chapter doesn't exist — or maybe the dragon ate it. Let's get you back to safety.
        </p>

        <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btn-primary" onClick={()=>setPage("home")} style={{fontSize:"1rem",padding:".9rem 2rem"}}>
            🏠 Back to Home
          </button>
          <button className="btn-secondary" onClick={()=>window.history.back()} style={{fontSize:"1rem"}}>
            ← Go Back
          </button>
        </div>

        {/* Fun suggestion */}
        <div style={{marginTop:"2.5rem",padding:"1.25rem 1.75rem",background:"white",borderRadius:20,border:"1.5px solid var(--ink-06)",boxShadow:"var(--shadow-card)",display:"inline-block",textAlign:"left"}}>
          <p style={{fontSize:".82rem",color:"var(--ink-60)",fontWeight:600,margin:0}}>
            💡 <strong style={{color:"var(--ink)"}}>While you're here:</strong> did you know the word{" "}
            <span style={{color:"var(--orange)",fontWeight:700}}>serendipity</span> means a happy accident? Just like finding this page 🙂
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── MISC PAGES ─────────────────────────────── */
/* ─── ABOUT US PAGE ──────────────────────────── */
function AboutUs({ setPage }) {
  const team = [
    { name:"Maya Chen",     role:"Co-founder & CEO",          tag:"Former teacher · Reading Specialist",  img:44, country:"🇺🇸" },
    { name:"Luca Ferreira", role:"Co-founder & CTO",          tag:"NLP Researcher · Ex-DeepMind",          img:15, country:"🇧🇷" },
    { name:"Priya Nair",    role:"Head of Learning Design",   tag:"Curriculum PhD · 12 yrs classroom exp", img:47, country:"🇮🇳" },
    { name:"James Okonkwo", role:"Lead AI Engineer",          tag:"Transformers & RL · EdTech veteran",    img:12, country:"🇳🇬" },
    { name:"Sofia Eriksson",role:"Creative Director",         tag:"Children's book illustrator",           img:49, country:"🇸🇪" },
    { name:"Ravi Patel",    role:"Game Designer",             tag:"Narrative systems · Duolingo alum",     img:13, country:"🇬🇧" },
    { name:"Amara Diallo",  role:"Head of Safety & Privacy",  tag:"COPPA · FERPA compliance expert",       img:46, country:"🇫🇷" },
    { name:"Tom Walsh",     role:"VP of School Partnerships", tag:"600+ district relationships",           img:11, country:"🇺🇸" },
  ];

  const values = [
    { icon:"📖", title:"Words before worksheets", desc:"Vocabulary sticks when it lives inside a story kids actually care about. We build the story first." },
    { icon:"🧠", title:"Science-backed, play-forward", desc:"Every mechanic — spaced repetition, contextual learning, choice-driven narrative — is grounded in research. Then wrapped in fun." },
    { icon:"🔒", title:"Safety without compromise", desc:"No ads. No dark patterns. COPPA compliant. Every feature earns its place by helping kids — nothing else." },
    { icon:"🌍", title:"Built for every kid", desc:"Grade 1 through 8. Urban classrooms and rural homes. 15+ genres so every child finds a story that feels like theirs." },
  ];

  const milestones = [
    { year:"2022", event:"WordFly founded in Austin, TX by Maya & Luca" },
    { year:"2023", event:"First 50 classrooms — piloted in Texas & Ontario" },
    { year:"2023", event:"Seed round closed. Team grows to 8" },
    { year:"2024", event:"500+ classrooms, 12,000 active students" },
    { year:"2024", event:"EdTech Award — Best Literacy App" },
    { year:"2025", event:"AI story engine v2 — adaptive difficulty launch" },
    { year:"2026", event:"Common Core alignment certified by reading specialists" },
  ];

  return (
    <div style={{minHeight:"100vh",background:"white"}}>

      {/* ── Hero banner ── */}
      <div style={{
        background:"linear-gradient(145deg,#FFFBF7 0%,#FFF0E8 40%,#F4EEFF 100%)",
        padding:"9rem 1.5rem 5rem",
        position:"relative",
        overflow:"hidden",
      }}>
        {/* BG blobs */}
        <div className="blob" style={{position:"absolute",top:"-10%",right:"3%",width:420,height:420,background:"radial-gradient(circle,rgba(255,107,44,.12) 0%,transparent 70%)",filter:"blur(28px)",pointerEvents:"none"}}/>
        <div className="blob-2" style={{position:"absolute",bottom:"-5%",left:"-5%",width:360,height:360,background:"radial-gradient(circle,rgba(124,58,237,.11) 0%,transparent 70%)",filter:"blur(24px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(26,15,0,.05) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none"}}/>

        <div className="wf-container" style={{position:"relative",zIndex:2,textAlign:"center"}}>
          <button onClick={()=>setPage("home")} style={{background:"var(--orange-tint)",border:"1.5px solid var(--orange-mist)",cursor:"pointer",color:"var(--orange)",fontWeight:700,fontFamily:"'Baloo 2',cursive",fontSize:".9rem",display:"inline-flex",alignItems:"center",gap:6,marginBottom:"2rem",padding:"6px 16px",borderRadius:99}}>← Back to Home</button>
          <div className="badge" style={{marginBottom:"1.25rem"}}>✦ About WordFly</div>
          <SectionTitle style={{maxWidth:680,margin:"0 auto"}}>
            We help kids fall in love<br/>
            with <span style={{color:"var(--orange)"}}>words</span>
          </SectionTitle>
          <p style={{color:"var(--ink-60)",fontSize:"1.1rem",lineHeight:1.8,maxWidth:560,margin:"1.5rem auto 0",fontWeight:600}}>
            A small, passionate team on a big mission — making vocabulary learning feel like play, not homework.
          </p>
        </div>
      </div>

      {/* ── Trusted by Schools ── */}
      <section className="wf-section" style={{background:"var(--cream)"}}>
        <div className="wf-container">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"center"}}>

            {/* Left — copy */}
            <div>
              <div className="badge" style={{marginBottom:"1.25rem"}}>🏫 Trusted by Schools</div>
              <SectionTitle style={{textAlign:"left"}}>
                500+ classrooms.<br/><span style={{color:"var(--orange)"}}>Real results.</span>
              </SectionTitle>
              <p style={{color:"var(--ink-60)",marginTop:"1.25rem",lineHeight:1.85,fontWeight:600,fontSize:"1rem"}}>
                Over 500 classrooms across the US and Canada use WordFly every day. Our content is Common Core aligned, COPPA compliant, and reviewed by reading specialists.
              </p>
              <p style={{color:"var(--ink-60)",marginTop:"1rem",lineHeight:1.85,fontWeight:600,fontSize:"1rem"}}>
                Students using WordFly show an average <strong style={{color:"var(--orange)"}}>34% improvement</strong> in standardized vocabulary tests within just 8 weeks.
              </p>

              {/* Trust badges row */}
              <div style={{display:"flex",flexWrap:"wrap",gap:".75rem",marginTop:"2rem"}}>
                {["✅ Common Core Aligned","🔒 COPPA Compliant","📋 Reading Specialist Reviewed","🏆 EdTech Award 2025"].map((b,i)=>(
                  <div key={i} style={{padding:"6px 14px",borderRadius:99,background:"white",border:"1.5px solid var(--ink-06)",fontSize:".78rem",fontWeight:700,color:"var(--ink-60)",boxShadow:"var(--shadow-card)"}}>
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — stat cards */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.25rem"}}>
              {[
                { n:"500+",  l:"Classrooms",             sub:"US & Canada",         bg:"var(--orange)",    c:"white" },
                { n:"34%",   l:"Vocab improvement",       sub:"Within 8 weeks",      bg:"white",            c:"var(--ink)" },
                { n:"12K+",  l:"Active students",         sub:"Grades 1–8",          bg:"var(--purple)",    c:"white" },
                { n:"4.9★",  l:"App Store rating",        sub:"2,400+ reviews",      bg:"white",            c:"var(--ink)" },
              ].map((s,i)=>(
                <div key={i} style={{background:s.bg,borderRadius:24,padding:"1.75rem 1.5rem",border:s.bg==="white"?"1.5px solid var(--ink-06)":"none",boxShadow:s.bg==="var(--orange)"?"var(--shadow-orange)":s.bg==="var(--purple)"?"0 8px 32px rgba(124,58,237,.3)":"var(--shadow-card)"}}>
                  <div style={{fontFamily:"'Fraunces',serif",fontWeight:900,fontSize:"2.4rem",color:s.c,lineHeight:1}}>{s.n}</div>
                  <div style={{fontWeight:700,fontSize:".88rem",color:s.c,marginTop:".4rem",opacity: s.bg==="white"?1:.9}}>{s.l}</div>
                  <div style={{fontSize:".72rem",fontWeight:600,color:s.c,opacity:.6,marginTop:".2rem"}}>{s.sub}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Our Mission ── */}
      <section className="wf-section" style={{background:"var(--ink)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:700,background:"radial-gradient(circle,rgba(255,107,44,.09) 0%,transparent 65%)",pointerEvents:"none"}}/>
        <div className="wf-container" style={{position:"relative",zIndex:2}}>
          <div style={{maxWidth:720,margin:"0 auto",textAlign:"center"}}>
            <div className="badge" style={{background:"rgba(255,107,44,.12)",borderColor:"rgba(255,107,44,.2)",color:"rgba(255,107,44,.9)",marginBottom:"1.5rem"}}>✦ Our Mission</div>
            <SectionTitle style={{color:"white",maxWidth:620,margin:"0 auto"}}>
              Not just memorizing words —<br/>
              <span style={{color:"var(--orange)"}}>building curiosity</span>
            </SectionTitle>
            <p style={{color:"rgba(255,255,255,.65)",fontSize:"1.05rem",lineHeight:1.9,marginTop:"1.5rem",fontWeight:600}}>
              Our platform uses AI-guided stories where children help shape the plot, discover new vocabulary in context naturally, and reinforce learning through light, fun quizzes. The goal isn't just memorizing words — it's building curiosity, confidence, and a lifelong love of reading.
            </p>
          </div>

          {/* Values grid */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"1.25rem",marginTop:"3.5rem"}}>
            {values.map((v,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,.05)",border:"1.5px solid rgba(255,255,255,.07)",borderRadius:24,padding:"2rem 1.75rem",transition:"background .25s"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,107,44,.08)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.05)"}
              >
                <div style={{fontSize:"2rem",marginBottom:"1rem"}}>{v.icon}</div>
                <h3 style={{fontFamily:"'Fraunces',serif",fontSize:"1.05rem",fontWeight:700,color:"white",marginBottom:".6rem"}}>{v.title}</h3>
                <p style={{color:"rgba(255,255,255,.55)",fontSize:".875rem",lineHeight:1.75,fontWeight:600}}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Team ── */}
      <section className="wf-section" style={{background:"white"}}>
        <div className="wf-container">
          <div className="wf-section-header">
            <div className="badge" style={{marginBottom:"1rem"}}>🤝 Our Team</div>
            <SectionTitle>12 people. One <span style={{color:"var(--orange)"}}>big mission.</span></SectionTitle>
            <p style={{color:"var(--ink-60)",marginTop:"1rem",fontSize:"1rem",maxWidth:520,margin:"1rem auto 0",fontWeight:600}}>
              Educators, AI researchers, storytellers, game designers, and parents — united by the belief that every child deserves to love words.
              Based in <strong style={{color:"var(--ink)"}}>Austin, Texas</strong> with teammates across eight countries.
            </p>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:"1.5rem",marginTop:"1rem"}}>
            {team.map((m,i)=>(
              <div key={i} className="card" style={{padding:"1.75rem",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:".75rem"}}>
                <div style={{position:"relative"}}>
                  <img src={`https://i.pravatar.cc/80?img=${m.img}`} alt={m.name} style={{width:72,height:72,borderRadius:"50%",border:"3px solid var(--orange-mist)",objectFit:"cover"}}/>
                  <div style={{position:"absolute",bottom:-2,right:-2,fontSize:"1rem",lineHeight:1}}>{m.country}</div>
                </div>
                <div>
                  <div style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:"1rem",color:"var(--ink)"}}>{m.name}</div>
                  <div style={{fontSize:".78rem",fontWeight:700,color:"var(--orange)",marginTop:".2rem"}}>{m.role}</div>
                  <div style={{fontSize:".72rem",color:"var(--ink-60)",fontWeight:600,marginTop:".4rem",lineHeight:1.5}}>{m.tag}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Austin HQ blurb */}
          <div style={{marginTop:"3rem",background:"var(--cream)",borderRadius:28,padding:"2.5rem 2.5rem",border:"1.5px solid var(--ink-06)",display:"flex",alignItems:"center",gap:"2.5rem",flexWrap:"wrap"}}>
            <div style={{fontSize:"3.5rem",flexShrink:0}}>📍</div>
            <div style={{flex:1,minWidth:240}}>
              <h3 style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:"1.2rem",color:"var(--ink)",marginBottom:".5rem"}}>Austin, Texas — and everywhere</h3>
              <p style={{color:"var(--ink-60)",lineHeight:1.8,fontWeight:600,fontSize:".95rem"}}>
                Our HQ is in Austin, but our team spans eight countries — Brazil, India, Nigeria, Sweden, the UK, France, Canada, and the US. We're remote-first, async-friendly, and obsessed with making tools that actually help kids.
              </p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:".5rem",flexShrink:0}}>
              <button className="btn-primary" onClick={()=>setPage("careers")} style={{fontSize:".9rem",padding:".75rem 1.5rem"}}>Join the team →</button>
              <button className="btn-secondary" onClick={()=>setPage("contact-us")} style={{fontSize:".9rem",padding:".75rem 1.5rem"}}>Get in touch</button>
            </div>
          </div>

        </div>
      </section>

      {/* ── Timeline / Milestones ── */}
      <section className="wf-section" style={{background:"var(--cream)"}}>
        <div className="wf-container" style={{maxWidth:760}}>
          <div className="wf-section-header">
            <div className="badge" style={{marginBottom:"1rem"}}>📅 Our Journey</div>
            <SectionTitle>From idea to <span style={{color:"var(--orange)"}}>12,000 kids</span></SectionTitle>
          </div>
          <div style={{position:"relative",paddingLeft:"2.5rem"}}>
            {/* Vertical line */}
            <div style={{position:"absolute",left:"10px",top:0,bottom:0,width:"2px",background:"linear-gradient(to bottom,var(--orange),var(--purple))",borderRadius:99}}/>
            {milestones.map((m,i)=>(
              <div key={i} style={{position:"relative",marginBottom:"2rem",display:"flex",gap:"1.5rem",alignItems:"flex-start"}}>
                {/* Dot */}
                <div style={{position:"absolute",left:"-2.5rem",top:"4px",width:18,height:18,borderRadius:"50%",background:i%2===0?"var(--orange)":"var(--purple)",border:"3px solid white",boxShadow:`0 0 0 3px ${i%2===0?"rgba(255,107,44,.2)":"rgba(124,58,237,.2)"}`,flexShrink:0}}/>
                <div style={{background:"white",borderRadius:18,padding:"1.1rem 1.5rem",border:"1.5px solid var(--ink-06)",boxShadow:"var(--shadow-card)",flex:1}}>
                  <div style={{fontSize:".72rem",fontWeight:800,color:i%2===0?"var(--orange)":"var(--purple)",letterSpacing:".08em",textTransform:"uppercase",marginBottom:".3rem"}}>{m.year}</div>
                  <div style={{fontWeight:700,fontSize:".92rem",color:"var(--ink)",lineHeight:1.5}}>{m.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section style={{background:"linear-gradient(135deg,var(--orange) 0%,#FF3CAC 50%,var(--purple) 100%)",padding:"4rem 1.5rem",textAlign:"center"}}>
        <div className="wf-container" style={{maxWidth:600}}>
          <h2 style={{color:"white",fontSize:"clamp(1.6rem,4vw,2.4rem)",marginBottom:"1rem",WebkitTextStroke:"0px transparent"}}>Ready to see Quill in action?</h2>
          <p style={{color:"rgba(255,255,255,.8)",fontWeight:600,marginBottom:"2rem",fontSize:"1rem"}}>Start free — no credit card needed. Your child's first story is ready in seconds.</p>
          <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={()=>setPage("get-started")} style={{background:"white",color:"var(--orange-dark)",fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:"1rem",padding:".9rem 2.2rem",borderRadius:99,border:"none",cursor:"pointer",boxShadow:"0 8px 28px rgba(0,0,0,.15)",transition:"transform .2s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}
            >Start Your Child's Story →</button>
            <button onClick={()=>setPage("home")} style={{background:"rgba(255,255,255,.15)",color:"white",fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:"1rem",padding:".9rem 2.2rem",borderRadius:99,border:"1.5px solid rgba(255,255,255,.35)",cursor:"pointer",transition:"transform .2s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}
            >← Back to Home</button>
          </div>
        </div>
      </section>

    </div>
  );
}


/* ─── PRIVACY POLICY PAGE ────────────────────── */
function PrivacyPolicy({ setPage }) {

  const sections = [
    {
      id:"coppa",
      icon:"👧",
      title:"Children's Privacy (COPPA Compliance)",
      accent:"var(--purple)",
      accentLight:"var(--purple-tint)",
      accentMist:"var(--purple-mist)",
      content: (
        <>
          <p>Protecting children's privacy is central to how WordFly is designed.</p>
          <p>WordFly is intended for learners ages <strong>6–18</strong>. We do not knowingly collect personal information from children under 13 without verifiable parental consent, as required by the Children's Online Privacy Protection Act (COPPA).</p>
          <div style={{background:"var(--purple-tint)",border:"1.5px solid var(--purple-mist)",borderRadius:16,padding:"1rem 1.25rem",marginTop:"1.25rem",display:"flex",gap:".75rem",alignItems:"flex-start"}}>
            <span style={{fontSize:18,flexShrink:0,marginTop:2}}>ℹ️</span>
            <p style={{margin:0,color:"var(--purple)",fontWeight:700,fontSize:".88rem",lineHeight:1.7}}>
              Parents or guardians may review, request deletion, or limit the collection of their child's information at any time by contacting us at{" "}
              <a href="mailto:privacy@wordfly.com" style={{color:"var(--purple)",textDecoration:"underline"}}>privacy@wordfly.com</a>.
            </p>
          </div>
        </>
      ),
    },
    {
      id:"collect",
      icon:"📦",
      title:"Information We Collect",
      accent:"var(--orange)",
      accentLight:"var(--orange-tint)",
      accentMist:"var(--orange-mist)",
      content: (
        <>
          <p>To provide and improve the learning experience, we may collect the following types of information:</p>
          <div style={{display:"flex",flexDirection:"column",gap:".85rem",marginTop:"1.25rem"}}>
            {[
              { n:"1", title:"Account Information",      desc:"Basic account details such as name, email address, and grade level." },
              { n:"2", title:"Learning Progress Data",   desc:"Educational activity data including vocabulary progress, quiz scores, reading history, and learning streaks." },
              { n:"3", title:"Device & Usage Data",      desc:"Non-identifiable technical data such as browser type, device type, and performance logs to help us maintain and improve the app." },
              { n:"4", title:"Optional Profile Information", desc:"Users may optionally add limited profile details such as avatar preferences or learning goals." },
            ].map((item,i)=>(
              <div key={i} style={{display:"flex",gap:"1rem",alignItems:"flex-start",background:"white",borderRadius:14,padding:"1rem 1.25rem",border:"1.5px solid var(--ink-06)",boxShadow:"var(--shadow-card)"}}>
                <div style={{width:28,height:28,borderRadius:8,background:"var(--orange-tint)",border:"1.5px solid var(--orange-mist)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Fraunces',serif",fontWeight:900,fontSize:".85rem",color:"var(--orange)",flexShrink:0}}>{item.n}</div>
                <div>
                  <div style={{fontWeight:800,fontSize:".88rem",color:"var(--ink)",marginBottom:".25rem"}}>{item.title}</div>
                  <div style={{fontSize:".83rem",color:"var(--ink-60)",lineHeight:1.6,fontWeight:600}}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{background:"#F0FDF4",border:"1.5px solid #BBF7D0",borderRadius:14,padding:"1rem 1.25rem",marginTop:"1.25rem",display:"flex",gap:".75rem",alignItems:"flex-start"}}>
            <span style={{fontSize:17,flexShrink:0,marginTop:1}}>✅</span>
            <p style={{margin:0,color:"#15803D",fontWeight:700,fontSize:".85rem",lineHeight:1.65}}>We do not collect sensitive personal data, including precise location data, government identification numbers, or financial information.</p>
          </div>
        </>
      ),
    },
    {
      id:"nosell",
      icon:"🚫",
      title:"No Selling of Personal Data",
      accent:"#16A34A",
      accentLight:"#F0FDF4",
      accentMist:"#BBF7D0",
      content: (
        <>
          <div style={{background:"#F0FDF4",border:"1.5px solid #BBF7D0",borderRadius:16,padding:"1.25rem 1.5rem",display:"flex",gap:"1rem",alignItems:"center"}}>
            <span style={{fontSize:"2rem",flexShrink:0}}>🛑</span>
            <p style={{margin:0,fontWeight:800,fontSize:"1rem",color:"#15803D",lineHeight:1.6}}>
              WordFly does not sell, rent, or trade personal data to third parties — including for advertising or marketing purposes. Ever.
            </p>
          </div>
          <p style={{marginTop:"1.25rem"}}>Your information is used only to operate, maintain, and improve the educational experience within the WordFly platform.</p>
        </>
      ),
    },
    {
      id:"security",
      icon:"🛡️",
      title:"Data Security",
      accent:"#2563EB",
      accentLight:"#EFF6FF",
      accentMist:"#BFDBFE",
      content: (
        <>
          <p>We implement industry-standard safeguards to protect user data:</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1rem",marginTop:"1.25rem"}}>
            {[
              { icon:"🔐", label:"Encryption in transit", value:"TLS 1.3" },
              { icon:"💾", label:"Encryption at rest",    value:"AES-256" },
              { icon:"☁️", label:"Cloud infrastructure",  value:"SOC 2 Type II certified" },
              { icon:"🔑", label:"Access control",        value:"Authorised personnel only" },
            ].map((item,i)=>(
              <div key={i} style={{background:"#EFF6FF",border:"1.5px solid #BFDBFE",borderRadius:16,padding:"1.1rem",textAlign:"center"}}>
                <div style={{fontSize:"1.75rem",marginBottom:".5rem"}}>{item.icon}</div>
                <div style={{fontSize:".72rem",fontWeight:700,color:"#2563EB",textTransform:"uppercase",letterSpacing:".06em",marginBottom:".25rem"}}>{item.label}</div>
                <div style={{fontSize:".85rem",fontWeight:800,color:"var(--ink)"}}>{item.value}</div>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      id:"rights",
      icon:"⚙️",
      title:"Your Privacy Rights",
      accent:"var(--orange)",
      accentLight:"var(--orange-tint)",
      accentMist:"var(--orange-mist)",
      content: (
        <>
          <p>Parents and users have the right to:</p>
          <div style={{display:"flex",flexDirection:"column",gap:".6rem",margin:"1.1rem 0"}}>
            {[
              ["📋","Access personal data"],
              ["✏️","Correct inaccurate information"],
              ["📤","Export account data"],
              ["🗑️","Request deletion of personal data"],
            ].map(([ic,txt],i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:".75rem",background:"white",border:"1.5px solid var(--ink-06)",borderRadius:12,padding:".75rem 1rem",boxShadow:"var(--shadow-card)"}}>
                <span style={{fontSize:16,width:28,textAlign:"center",flexShrink:0}}>{ic}</span>
                <span style={{fontWeight:700,fontSize:".88rem",color:"var(--ink)"}}>{txt}</span>
              </div>
            ))}
          </div>
          <div style={{background:"var(--orange-tint)",border:"1.5px solid var(--orange-mist)",borderRadius:16,padding:"1.1rem 1.25rem",marginTop:".5rem"}}>
            <p style={{margin:0,fontWeight:700,fontSize:".88rem",color:"var(--orange-dark)",lineHeight:1.7}}>
              To submit a request, contact{" "}
              <a href="mailto:privacy@wordfly.com" style={{color:"var(--orange-dark)",fontWeight:800}}>privacy@wordfly.com</a>.
              We aim to respond to all verified requests within <strong>30 days</strong>.
            </p>
          </div>
        </>
      ),
    },
  ];

  return (
    <div style={{minHeight:"100vh",background:"white"}}>

      {/* ── Header banner ── */}
      <div style={{background:"linear-gradient(145deg,#FFFBF7 0%,#F4EEFF 100%)",padding:"9rem 1.5rem 4.5rem",position:"relative",overflow:"hidden"}}>
        <div className="blob"   style={{position:"absolute",top:"-10%",right:"3%",width:380,height:380,background:"radial-gradient(circle,rgba(124,58,237,.12) 0%,transparent 70%)",filter:"blur(28px)",pointerEvents:"none"}}/>
        <div className="blob-2" style={{position:"absolute",bottom:"-5%",left:"-5%",width:320,height:320,background:"radial-gradient(circle,rgba(255,107,44,.10) 0%,transparent 70%)",filter:"blur(24px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(26,15,0,.05) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none"}}/>

        <div className="wf-container" style={{position:"relative",zIndex:2,maxWidth:760}}>
          <button onClick={()=>setPage("home")} style={{display:"inline-flex",alignItems:"center",gap:6,background:"var(--orange-tint)",border:"1.5px solid var(--orange-mist)",borderRadius:99,padding:"6px 16px",fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".88rem",color:"var(--orange-dark)",cursor:"pointer",marginBottom:"2rem"}}>← Back to Home</button>

          <div className="badge" style={{marginBottom:"1.25rem",background:"var(--purple-tint)",borderColor:"var(--purple-mist)",color:"var(--purple)"}}>🔒 Legal · Privacy</div>

          <h1 style={{fontFamily:"'Short Stack',cursive",fontWeight:400,fontSize:"clamp(2.2rem,5vw,3.2rem)",color:"var(--ink)",lineHeight:1.1,WebkitTextStroke:".6px var(--ink)",marginBottom:"1.25rem"}}>
            Privacy <span style={{color:"var(--purple)"}}>Policy</span>
          </h1>

          <p style={{color:"var(--ink-60)",fontSize:"1rem",lineHeight:1.75,fontWeight:600,maxWidth:580,marginBottom:"1.5rem"}}>
            WordFly is built for families. We designed our privacy practices around children first — not as an afterthought.
          </p>

          {/* Meta row */}
          <div style={{display:"flex",flexWrap:"wrap",gap:".75rem"}}>
            {["Effective: January 1, 2026","Last updated: March 1, 2026","Applies to: WordFly app & website"].map((m,i)=>(
              <div key={i} style={{padding:"5px 14px",borderRadius:99,background:"white",border:"1.5px solid var(--ink-06)",fontSize:".75rem",fontWeight:700,color:"var(--ink-60)"}}>
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{padding:"4rem 1.5rem 6rem"}}>
        <div className="wf-container" style={{maxWidth:760,display:"grid",gridTemplateColumns:"1fr",gap:"1.5rem"}}>

          {sections.map((sec,i)=>(
            <div key={sec.id} id={sec.id} style={{background:"var(--cream)",borderRadius:28,border:"1.5px solid var(--ink-06)",overflow:"hidden",boxShadow:"var(--shadow-card)"}}>
              {/* Section header bar */}
              <div style={{background:sec.accentLight,borderBottom:`1.5px solid ${sec.accentMist}`,padding:"1.25rem 1.75rem",display:"flex",alignItems:"center",gap:".85rem"}}>
                <div style={{width:40,height:40,borderRadius:12,background:"white",border:`1.5px solid ${sec.accentMist}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,boxShadow:"var(--shadow-card)"}}>{sec.icon}</div>
                <h2 style={{fontFamily:"'Short Stack',cursive",fontWeight:400,fontSize:"clamp(1.1rem,2.5vw,1.4rem)",color:"var(--ink)",WebkitTextStroke:".4px var(--ink)",margin:0,lineHeight:1.2}}>{sec.title}</h2>
                <div style={{marginLeft:"auto",fontSize:".7rem",fontWeight:800,color:sec.accent,background:"white",padding:"3px 10px",borderRadius:99,border:`1.5px solid ${sec.accentMist}`,whiteSpace:"nowrap"}}>§ 0{i+1}</div>
              </div>
              {/* Section body */}
              <div style={{padding:"1.75rem",color:"var(--ink-60)",fontSize:".9rem",lineHeight:1.8,fontWeight:600}}>
                {sec.content}
              </div>
            </div>
          ))}

          {/* Contact card */}
          <div style={{background:"var(--ink)",borderRadius:28,padding:"2.25rem 2.5rem",display:"flex",gap:"2rem",alignItems:"center",flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:220}}>
              <div style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:"1.2rem",color:"white",marginBottom:".5rem"}}>Questions about your privacy?</div>
              <p style={{color:"rgba(255,255,255,.55)",fontSize:".875rem",lineHeight:1.7,fontWeight:600,margin:0}}>
                We're a small team and we read every message. Reach out directly and we'll respond within 2 business days.
              </p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:".6rem",flexShrink:0}}>
              <a href="mailto:privacy@wordfly.com" style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:"var(--orange)",color:"white",fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".9rem",padding:".75rem 1.5rem",borderRadius:99,textDecoration:"none",boxShadow:"var(--shadow-orange)"}}>
                ✉️ privacy@wordfly.com
              </a>
              <button onClick={()=>setPage("data-security")} style={{background:"rgba(255,255,255,.08)",border:"1.5px solid rgba(255,255,255,.15)",color:"rgba(255,255,255,.7)",fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".88rem",padding:".65rem 1.5rem",borderRadius:99,cursor:"pointer"}}>
                🛡️ View Data Security Details
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─── LEGAL STACK ROW (extracted to obey Hook rules) ── */
function LegalStackRow({ p, setPage }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      onClick={()=>setPage(p.route)}
      style={{
        display:"flex", alignItems:"center", gap:"1rem",
        padding:"1rem 1.25rem", borderRadius:18,
        border:`1.5px solid ${hovered ? p.tagBorder : "var(--ink-06)"}`,
        background: hovered ? p.tagBg : "white",
        cursor:"pointer", transition:"all .2s",
        boxShadow: hovered ? "0 4px 18px rgba(0,0,0,.07)" : "var(--shadow-card)",
      }}
    >
      <div style={{width:32,height:32,borderRadius:10,background:hovered?p.tagBg:"var(--cream)",border:`1.5px solid ${hovered?p.tagBorder:"var(--ink-06)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Fraunces',serif",fontWeight:900,fontSize:".78rem",color:hovered?p.tagColor:"var(--ink-60)",flexShrink:0,transition:"all .2s"}}>
        {p.n}
      </div>
      <div style={{fontSize:"1.3rem",flexShrink:0}}>{p.icon}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap",marginBottom:".2rem"}}>
          <span style={{fontWeight:800,fontSize:".9rem",color:"var(--ink)"}}>{p.title}</span>
          <span style={{padding:"2px 10px",borderRadius:99,background:p.tagBg,border:`1.5px solid ${p.tagBorder}`,fontSize:".65rem",fontWeight:800,color:p.tagColor,letterSpacing:".04em",textTransform:"uppercase"}}>{p.tag}</span>
        </div>
        <p style={{margin:0,fontSize:".8rem",color:"var(--ink-60)",fontWeight:600,lineHeight:1.5}}>{p.desc}</p>
      </div>
      <div style={{fontSize:"1rem",color:hovered?p.tagColor:"var(--ink-60)",transition:"transform .2s, color .2s",transform:hovered?"translateX(3px)":"none",flexShrink:0}}>→</div>
    </div>
  );
}

/* ─── TRUST CENTER PAGE ──────────────────────── */
function TrustCenter({ setPage }) {

  const badges = [
    { icon:"🛡️", label:"COPPA Compliant",          bg:"var(--purple-tint)",  border:"var(--purple-mist)",  color:"var(--purple)"  },
    { icon:"🔒", label:"Secure Data Protection",    bg:"#EFF6FF",             border:"#BFDBFE",             color:"#2563EB"        },
    { icon:"🤖", label:"Responsible AI",             bg:"var(--orange-tint)",  border:"var(--orange-mist)",  color:"var(--orange)"  },
    { icon:"📚", label:"Educator Guided",            bg:"#F0FDF4",             border:"#BBF7D0",             color:"#15803D"        },
    { icon:"🚫", label:"No Ads. Ever.",              bg:"#FFF1F2",             border:"#FECDD3",             color:"#BE123C"        },
  ];

  const sections = [
    {
      id:"privacy",
      icon:"🛡️",
      title:"Privacy First",
      accent:"var(--purple)",
      accentLight:"var(--purple-tint)",
      accentMist:"var(--purple-mist)",
      content: (
        <>
          <p>We follow strict privacy standards designed specifically for children's platforms.</p>
          <div style={{display:"flex",flexDirection:"column",gap:".6rem",margin:"1.1rem 0"}}>
            {[
              "COPPA-compliant child privacy protections",
              "No advertising or behavioral tracking",
              "No selling of personal data — ever",
              "Parents can review or delete their child's data anytime",
            ].map((item,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:".75rem",background:"white",border:"1.5px solid var(--purple-mist)",borderRadius:12,padding:".7rem 1rem"}}>
                <span style={{width:22,height:22,borderRadius:"50%",background:"var(--purple-tint)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".7rem",color:"var(--purple)",fontWeight:800,flexShrink:0}}>✓</span>
                <span style={{fontWeight:700,fontSize:".875rem",color:"var(--ink)"}}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{background:"var(--purple-tint)",border:"1.5px solid var(--purple-mist)",borderRadius:14,padding:"1rem 1.25rem",display:"flex",gap:".75rem",alignItems:"flex-start"}}>
            <span style={{fontSize:17,flexShrink:0,marginTop:1}}>ℹ️</span>
            <p style={{margin:0,color:"var(--purple)",fontWeight:700,fontSize:".85rem",lineHeight:1.7}}>
              Your child's information is used only to support learning progress — nothing else.
            </p>
          </div>
        </>
      ),
    },
    {
      id:"ai",
      icon:"🤖",
      title:"Responsible AI for Kids",
      accent:"var(--orange)",
      accentLight:"var(--orange-tint)",
      accentMist:"var(--orange-mist)",
      content: (
        <>
          <p>Our AI generates stories and quizzes that make learning vocabulary feel like an adventure. To keep every experience safe and age-appropriate:</p>
          <div style={{display:"flex",flexDirection:"column",gap:".6rem",margin:"1.1rem 0"}}>
            {[
              "AI responses are filtered for age-appropriate content",
              "Systems are continuously monitored and improved",
              "Educators help guide vocabulary selection and learning design",
            ].map((item,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:".75rem",background:"white",border:"1.5px solid var(--orange-mist)",borderRadius:12,padding:".7rem 1rem"}}>
                <span style={{width:22,height:22,borderRadius:"50%",background:"var(--orange-tint)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".7rem",color:"var(--orange)",fontWeight:800,flexShrink:0}}>✓</span>
                <span style={{fontWeight:700,fontSize:".875rem",color:"var(--ink)"}}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{background:"var(--orange-tint)",border:"1.5px solid var(--orange-mist)",borderRadius:14,padding:"1rem 1.25rem",display:"flex",gap:".75rem",alignItems:"flex-start"}}>
            <span style={{fontSize:17,flexShrink:0,marginTop:1}}>💡</span>
            <p style={{margin:0,color:"var(--orange-dark)",fontWeight:700,fontSize:".85rem",lineHeight:1.7}}>
              AI helps power the experience, but education experts guide the learning goals.
            </p>
          </div>
        </>
      ),
    },
    {
      id:"educators",
      icon:"👩‍🏫",
      title:"Designed With Educators",
      accent:"#15803D",
      accentLight:"#F0FDF4",
      accentMist:"#BBF7D0",
      content: (
        <>
          <p>WordFly is built with direct input from education professionals at every stage of development.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:"1rem",margin:"1.25rem 0"}}>
            {[
              {icon:"🏫",label:"Teachers"},
              {icon:"🗣️",label:"Language Specialists"},
              {icon:"🎮",label:"Game Designers"},
              {icon:"👨‍👩‍👧",label:"Parents"},
            ].map((r,i)=>(
              <div key={i} style={{background:"white",border:"1.5px solid #BBF7D0",borderRadius:16,padding:"1.25rem 1rem",textAlign:"center",boxShadow:"var(--shadow-card)"}}>
                <div style={{fontSize:"1.75rem",marginBottom:".5rem"}}>{r.icon}</div>
                <div style={{fontWeight:800,fontSize:".82rem",color:"var(--ink)"}}>{r.label}</div>
              </div>
            ))}
          </div>
          <div style={{background:"#F0FDF4",border:"1.5px solid #BBF7D0",borderRadius:14,padding:"1rem 1.25rem",display:"flex",gap:".75rem",alignItems:"flex-start"}}>
            <span style={{fontSize:17,flexShrink:0,marginTop:1}}>🎯</span>
            <p style={{margin:0,color:"#15803D",fontWeight:700,fontSize:".85rem",lineHeight:1.7}}>
              Our goal is to combine learning science, storytelling, and playful quizzes to make vocabulary learning genuinely engaging.
            </p>
          </div>
        </>
      ),
    },
    {
      id:"security",
      icon:"🔒",
      title:"Secure by Design",
      accent:"#2563EB",
      accentLight:"#EFF6FF",
      accentMist:"#BFDBFE",
      content: (
        <>
          <p>We apply modern, industry-standard security practices to protect every user's data.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(185px,1fr))",gap:"1rem",marginTop:"1.25rem"}}>
            {[
              {icon:"🔐",label:"Encryption in transit", value:"TLS 1.3"},
              {icon:"💾",label:"Encryption at rest",    value:"AES-256"},
              {icon:"☁️",label:"Cloud infrastructure",  value:"SOC 2 Type II"},
              {icon:"🔑",label:"Access control",        value:"Authorised personnel only"},
            ].map((item,i)=>(
              <div key={i} style={{background:"#EFF6FF",border:"1.5px solid #BFDBFE",borderRadius:16,padding:"1.25rem 1rem",textAlign:"center",boxShadow:"var(--shadow-card)"}}>
                <div style={{fontSize:"1.6rem",marginBottom:".5rem"}}>{item.icon}</div>
                <div style={{fontSize:".7rem",fontWeight:700,color:"#2563EB",textTransform:"uppercase",letterSpacing:".06em",marginBottom:".3rem"}}>{item.label}</div>
                <div style={{fontSize:".88rem",fontWeight:800,color:"var(--ink)"}}>{item.value}</div>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      id:"team",
      icon:"🌍",
      title:"A Global Team Focused on Learning",
      accent:"var(--orange)",
      accentLight:"var(--orange-tint)",
      accentMist:"var(--orange-mist)",
      content: (
        <>
          <p>Our team includes educators, AI researchers, game designers, and parents spread across multiple countries — all working toward one mission:</p>
          <div style={{background:"var(--ink)",borderRadius:20,padding:"1.75rem 2rem",margin:"1.25rem 0",textAlign:"center"}}>
            <p style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:"1.15rem",color:"white",lineHeight:1.6,margin:0}}>
              "Helping children build confidence with words and develop a lifelong love of reading."
            </p>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:".6rem"}}>
            {["🇺🇸 United States","🇧🇷 Brazil","🇮🇳 India","🇳🇬 Nigeria","🇸🇪 Sweden","🇬🇧 United Kingdom","🇫🇷 France","🇨🇦 Canada"].map((c,i)=>(
              <div key={i} style={{padding:"5px 13px",borderRadius:99,background:"white",border:"1.5px solid var(--orange-mist)",fontSize:".78rem",fontWeight:700,color:"var(--ink-60)"}}>{c}</div>
            ))}
          </div>
        </>
      ),
    },
  ];

  return (
    <div style={{minHeight:"100vh",background:"white"}}>

      {/* ── Header ── */}
      <div style={{background:"linear-gradient(145deg,var(--ink) 0%,#1C1440 60%,#2D1B69 100%)",padding:"9rem 1.5rem 4rem",position:"relative",overflow:"hidden"}}>
        <div className="blob"   style={{position:"absolute",top:"-10%",right:"4%",width:420,height:420,background:"radial-gradient(circle,rgba(124,58,237,.25) 0%,transparent 70%)",filter:"blur(28px)",pointerEvents:"none"}}/>
        <div className="blob-2" style={{position:"absolute",bottom:"-5%",left:"-4%",width:360,height:360,background:"radial-gradient(circle,rgba(255,107,44,.15) 0%,transparent 70%)",filter:"blur(24px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none"}}/>

        <div className="wf-container" style={{position:"relative",zIndex:2,maxWidth:820}}>
          <button onClick={()=>setPage("home")} style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,.1)",border:"1.5px solid rgba(255,255,255,.2)",borderRadius:99,padding:"6px 16px",fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".88rem",color:"rgba(255,255,255,.8)",cursor:"pointer",marginBottom:"2rem"}}>← Back to Home</button>

          <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"5px 14px",borderRadius:99,background:"rgba(124,58,237,.25)",border:"1.5px solid rgba(124,58,237,.4)",marginBottom:"1.25rem"}}>
            <span style={{fontSize:".78rem",fontWeight:700,color:"#C084FC",letterSpacing:".04em",textTransform:"uppercase"}}>✦ Trust & Safety</span>
          </div>

          <h1 style={{fontFamily:"'Short Stack',cursive",fontWeight:400,fontSize:"clamp(2rem,5vw,3.2rem)",color:"white",WebkitTextStroke:".5px rgba(255,255,255,.4)",lineHeight:1.1,marginBottom:"1.1rem"}}>
            Built for Kids.<br/><span style={{color:"var(--orange)"}}>Trusted by Parents.</span>
          </h1>
          <p style={{color:"rgba(255,255,255,.6)",fontSize:"1rem",lineHeight:1.8,maxWidth:580,fontWeight:600,marginBottom:"2.5rem"}}>
            At WordFly, safety and privacy come first. We designed the platform to help children build vocabulary through storytelling while ensuring their learning environment is secure, respectful, and age-appropriate.
          </p>

          {/* ── Trust badge row ── */}
          <div style={{display:"flex",flexWrap:"wrap",gap:".75rem"}}>
            {badges.map((b,i)=>(
              <div key={i} className={`float-${(i%5)+1}`} style={{display:"flex",alignItems:"center",gap:".55rem",padding:".6rem 1.1rem",borderRadius:99,background:b.bg,border:`1.5px solid ${b.border}`,boxShadow:"0 4px 16px rgba(0,0,0,.12)"}}>
                <span style={{fontSize:17}}>{b.icon}</span>
                <span style={{fontWeight:800,fontSize:".82rem",color:b.color,whiteSpace:"nowrap"}}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sections ── */}
      <div style={{padding:"4rem 1.5rem 6rem"}}>
        <div className="wf-container" style={{maxWidth:820,display:"grid",gridTemplateColumns:"1fr",gap:"1.5rem"}}>

          {sections.map((sec,i)=>(
            <div key={sec.id} id={sec.id} style={{background:"var(--cream)",borderRadius:28,border:"1.5px solid var(--ink-06)",overflow:"hidden",boxShadow:"var(--shadow-card)"}}>
              {/* Header bar */}
              <div style={{background:sec.accentLight,borderBottom:`1.5px solid ${sec.accentMist}`,padding:"1.2rem 1.75rem",display:"flex",alignItems:"center",gap:".85rem"}}>
                <div style={{width:40,height:40,borderRadius:12,background:"white",border:`1.5px solid ${sec.accentMist}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,boxShadow:"var(--shadow-card)"}}>{sec.icon}</div>
                <h2 style={{fontFamily:"'Short Stack',cursive",fontWeight:400,fontSize:"clamp(1.05rem,2.5vw,1.35rem)",color:"var(--ink)",WebkitTextStroke:".4px var(--ink)",margin:0,lineHeight:1.2}}>{sec.title}</h2>
                <div style={{marginLeft:"auto",fontSize:".7rem",fontWeight:800,color:sec.accent,background:"white",padding:"3px 10px",borderRadius:99,border:`1.5px solid ${sec.accentMist}`,whiteSpace:"nowrap"}}>§ 0{i+1}</div>
              </div>
              {/* Body */}
              <div style={{padding:"1.75rem",color:"var(--ink-60)",fontSize:".9rem",lineHeight:1.8,fontWeight:600}}>
                {sec.content}
              </div>
            </div>
          ))}

          {/* ── Bottom CTA ── */}
          <div style={{background:"linear-gradient(135deg,var(--orange) 0%,#FF3CAC 50%,var(--purple) 100%)",borderRadius:28,padding:"2.5rem 2.5rem",display:"flex",gap:"2rem",alignItems:"center",flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:220}}>
              <div style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:"1.2rem",color:"white",marginBottom:".5rem"}}>Questions about trust or safety?</div>
              <p style={{color:"rgba(255,255,255,.75)",fontSize:".875rem",lineHeight:1.7,fontWeight:600,margin:0}}>
                We're a small, transparent team. Reach out and we'll respond within 2 business days.
              </p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:".65rem",flexShrink:0}}>
              <button onClick={()=>setPage("contact-us")} style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:"white",color:"var(--orange-dark)",fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".9rem",padding:".75rem 1.6rem",borderRadius:99,border:"none",cursor:"pointer",boxShadow:"0 6px 24px rgba(0,0,0,.15)"}}>
                ✉️ Contact Us
              </button>
              <button onClick={()=>setPage("privacy-policy")} style={{background:"rgba(255,255,255,.15)",border:"1.5px solid rgba(255,255,255,.3)",color:"white",fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".88rem",padding:".65rem 1.6rem",borderRadius:99,cursor:"pointer"}}>
                🔒 Privacy Policy
              </button>
            </div>
          </div>

          {/* ── Legal Stack ── */}
          <div style={{background:"var(--cream)",borderRadius:28,border:"1.5px solid var(--ink-06)",overflow:"hidden",boxShadow:"var(--shadow-card)"}}>
            {/* Header */}
            <div style={{background:"var(--ink)",padding:"1.5rem 1.75rem",display:"flex",alignItems:"center",gap:".85rem"}}>
              <div style={{width:40,height:40,borderRadius:12,background:"rgba(255,255,255,.08)",border:"1.5px solid rgba(255,255,255,.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>📋</div>
              <div>
                <h2 style={{fontFamily:"'Short Stack',cursive",fontWeight:400,fontSize:"clamp(1.05rem,2.5vw,1.3rem)",color:"white",WebkitTextStroke:".4px rgba(255,255,255,.4)",margin:0,lineHeight:1.2}}>Legal Stack</h2>
                <p style={{color:"rgba(255,255,255,.4)",fontSize:".75rem",fontWeight:700,margin:".2rem 0 0",letterSpacing:".02em"}}>Our complete set of policies — written to be readable, not just legal.</p>
              </div>
            </div>

            {/* Policy list */}
            <div style={{padding:"1.5rem 1.75rem",display:"flex",flexDirection:"column",gap:".75rem"}}>
              {[
                {
                  n:"01", icon:"🔒", title:"Privacy Policy",
                  tag:"COPPA Compliant",   tagBg:"var(--purple-tint)",   tagColor:"var(--purple)",   tagBorder:"var(--purple-mist)",
                  desc:"How we collect, use, and protect personal data — designed for families first.",
                  route:"privacy-policy",
                },
                {
                  n:"02", icon:"📄", title:"Terms of Service",
                  tag:"All Users",         tagBg:"var(--orange-tint)",   tagColor:"var(--orange)",   tagBorder:"var(--orange-mist)",
                  desc:"The rules of the road for using WordFly — plain language, no surprises.",
                  route:"terms-of-service",
                },
                {
                  n:"03", icon:"🍪", title:"Cookie Policy",
                  tag:"Tracking-free",     tagBg:"#FEF9C3",              tagColor:"#A16207",         tagBorder:"#FDE68A",
                  desc:"We only use essential cookies. No ad tracking, no behavioral profiling.",
                  route:"cookie-policy",
                },
                {
                  n:"04", icon:"👧", title:"Children's Privacy",
                  tag:"Under 13 · COPPA",  tagBg:"var(--purple-tint)",   tagColor:"var(--purple)",   tagBorder:"var(--purple-mist)",
                  desc:"Specific protections for learners under 13, including parental rights and COPPA procedures.",
                  route:"childrens-privacy",
                },
                {
                  n:"05", icon:"🗂️", title:"Data Retention Policy",
                  tag:"Transparency",      tagBg:"#EFF6FF",              tagColor:"#2563EB",         tagBorder:"#BFDBFE",
                  desc:"How long we keep different types of data, and how you can request deletion at any time.",
                  route:"data-security",
                },
                {
                  n:"06", icon:"🤖", title:"AI Transparency Policy",
                  tag:"Responsible AI",    tagBg:"var(--orange-tint)",   tagColor:"var(--orange)",   tagBorder:"var(--orange-mist)",
                  desc:"How our AI generates stories and quizzes, what safeguards are in place, and how educators guide it.",
                  route:"ai-transparency",
                },
                {
                  n:"07", icon:"✅", title:"Acceptable Use Policy",
                  tag:"Platform Rules",    tagBg:"#F0FDF4",              tagColor:"#15803D",         tagBorder:"#BBF7D0",
                  desc:"What WordFly is for — and what it's not. Clear guidelines for students, parents, and schools.",
                  route:"acceptable-use",
                },
                {
                  n:"08", icon:"🏫", title:"School & Parental Consent",
                  tag:"FERPA · COPPA",     tagBg:"var(--purple-tint)",   tagColor:"var(--purple)",   tagBorder:"var(--purple-mist)",
                  desc:"How schools and parents grant and manage consent, including district-level agreements.",
                  route:"parental-consent",
                },
                {
                  n:"09", icon:"🤝", title:"Third-Party Services & Analytics",
                  tag:"Data Sharing",      tagBg:"#EFF6FF",              tagColor:"#2563EB",         tagBorder:"#BFDBFE",
                  desc:"Which external providers we use, what data they handle, and how children's data is protected.",
                  route:"third-party-services",
                },
              ].map((p,i)=> <LegalStackRow key={i} p={p} setPage={setPage}/> )}
            </div>

            {/* Footer note */}
            <div style={{borderTop:"1.5px solid var(--ink-06)",padding:"1.1rem 1.75rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:".75rem",background:"white"}}>
              <p style={{margin:0,fontSize:".75rem",color:"var(--ink-60)",fontWeight:600}}>
                📬 Questions about any policy? Contact us at{" "}
                <a href="mailto:privacy@wordfly.com" style={{color:"var(--orange)",fontWeight:700,textDecoration:"none"}}>privacy@wordfly.com</a>
              </p>
              <div style={{fontSize:".7rem",fontWeight:700,color:"var(--ink-60)",padding:"4px 12px",borderRadius:99,background:"var(--cream)",border:"1.5px solid var(--ink-06)"}}>
                Last reviewed: March 2026
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─── CONTACT US PAGE ────────────────────────── */
function ContactUs({ setPage }) {
  const [form, setForm]           = useState({ name:"", email:"", subject:"", message:"" });
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);

  const set = (k,v) => { setForm(f=>({...f,[k]:v})); setErrors(e=>({...e,[k]:""})); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Please enter your name";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Please enter a valid email";
    if (!form.subject.trim()) e.subject = "Please enter a subject";
    if (!form.message.trim()) e.message = "Please write a message";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSending(true);
    setTimeout(() => { setSending(false); setSubmitted(true); }, 1200);
  };

  const inputBase = (field) => ({
    width:"100%", boxSizing:"border-box",
    padding:".75rem 1rem",
    borderRadius:12,
    border:`1.5px solid ${errors[field] ? "#EF4444" : "var(--orange-mist)"}`,
    background: errors[field] ? "#FEF2F2" : "var(--orange-tint)",
    fontFamily:"'Baloo 2',cursive",
    fontWeight:600, fontSize:".92rem",
    color:"var(--ink)", outline:"none",
    transition:"border-color .18s, background .18s",
  });

  const labelSt = {
    display:"block", fontSize:".72rem", fontWeight:800,
    letterSpacing:".08em", textTransform:"uppercase",
    color:"var(--ink-60)", marginBottom:".4rem",
  };

  const focusIn  = e => { e.target.style.borderColor="var(--orange)";      e.target.style.background="white"; };
  const focusOut = (field) => e => {
    e.target.style.borderColor = errors[field] ? "#EF4444" : "var(--orange-mist)";
    e.target.style.background  = errors[field] ? "#FEF2F2" : "var(--orange-tint)";
  };

  return (
    <div style={{minHeight:"100vh", background:"var(--cream)"}}>

      {/* ── Header bar ── */}
      <div style={{background:"linear-gradient(135deg,var(--orange) 0%,#FF8F5E 100%)",padding:"7.5rem 1.5rem 2.5rem",position:"relative",overflow:"hidden"}}>
        <div className="blob"   style={{position:"absolute",top:"-20%",right:"0%",width:340,height:340,background:"radial-gradient(circle,rgba(255,255,255,.15) 0%,transparent 70%)",filter:"blur(20px)",pointerEvents:"none"}}/>
        <div className="blob-2" style={{position:"absolute",bottom:"-10%",left:"-5%",width:280,height:280,background:"radial-gradient(circle,rgba(124,58,237,.2) 0%,transparent 70%)",filter:"blur(20px)",pointerEvents:"none"}}/>
        <div className="wf-container" style={{position:"relative",zIndex:2,maxWidth:740,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
          <div style={{display:"flex",alignItems:"center",gap:".85rem"}}>
            <div style={{width:42,height:42,borderRadius:13,background:"rgba(255,255,255,.22)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,border:"1.5px solid rgba(255,255,255,.3)"}}>✉️</div>
            <h1 style={{fontFamily:"'Short Stack',cursive",fontWeight:400,fontSize:"clamp(1.6rem,4vw,2.2rem)",color:"white",WebkitTextStroke:".4px rgba(255,255,255,.5)",margin:0,lineHeight:1}}>Contact Us</h1>
          </div>
          <button onClick={()=>setPage("home")} style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,.2)",border:"1.5px solid rgba(255,255,255,.35)",borderRadius:99,padding:"7px 18px",fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".88rem",color:"white",cursor:"pointer"}}>← Back</button>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{padding:"2.5rem 1.5rem 5rem"}}>
        <div className="wf-container" style={{maxWidth:740}}>
          {submitted ? (
            /* Success */
            <div style={{background:"white",borderRadius:28,padding:"4rem 2.5rem",textAlign:"center",boxShadow:"var(--shadow-float)",border:"1.5px solid var(--ink-06)"}}>
              <div style={{fontSize:"4rem",marginBottom:"1.25rem"}}>🎉</div>
              <h2 style={{fontFamily:"'Short Stack',cursive",fontWeight:400,WebkitTextStroke:".5px var(--ink)",marginBottom:".75rem",fontSize:"1.8rem"}}>Message sent!</h2>
              <p style={{color:"var(--ink-60)",fontWeight:600,lineHeight:1.75,maxWidth:380,margin:"0 auto 2rem"}}>
                Thanks, <strong style={{color:"var(--ink)"}}>{form.name.split(" ")[0]}</strong>! We'll reply to <strong style={{color:"var(--orange)"}}>{form.email}</strong> within 24 hours.
              </p>
              <div style={{display:"flex",gap:".75rem",justifyContent:"center",flexWrap:"wrap"}}>
                <button className="btn-primary" onClick={()=>setPage("home")}>← Back to Home</button>
                <button className="btn-secondary" onClick={()=>{setSubmitted(false);setForm({name:"",email:"",subject:"",message:""});}}>Send another</button>
              </div>
            </div>
          ) : (
            <div style={{display:"grid",gap:"1.5rem"}}>

              {/* ── Form card ── */}
              <div style={{background:"white",borderRadius:28,padding:"2.5rem 2.25rem",boxShadow:"var(--shadow-float)",border:"1.5px solid var(--ink-06)"}}>
                <h2 style={{fontFamily:"'Short Stack',cursive",fontWeight:400,fontSize:"1.5rem",color:"var(--ink)",WebkitTextStroke:".4px var(--ink)",marginBottom:"1.75rem",lineHeight:1.1}}>Send a Message</h2>

                {/* Name + Email */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.1rem",marginBottom:"1.1rem"}}>
                  {[["name","Name","Your name","text"],["email","Email","your@email.com","email"]].map(([field,lbl,ph,type])=>(
                    <div key={field}>
                      <label style={labelSt}>{lbl}</label>
                      <input type={type} value={form[field]} onChange={e=>set(field,e.target.value)} placeholder={ph}
                        style={inputBase(field)} onFocus={focusIn} onBlur={focusOut(field)}/>
                      {errors[field] && <div style={{fontSize:".72rem",color:"#EF4444",fontWeight:700,marginTop:".3rem"}}>{errors[field]}</div>}
                    </div>
                  ))}
                </div>

                {/* Subject */}
                <div style={{marginBottom:"1.1rem"}}>
                  <label style={labelSt}>Subject</label>
                  <input value={form.subject} onChange={e=>set("subject",e.target.value)} placeholder="How can we help?"
                    style={inputBase("subject")} onFocus={focusIn} onBlur={focusOut("subject")}/>
                  {errors.subject && <div style={{fontSize:".72rem",color:"#EF4444",fontWeight:700,marginTop:".3rem"}}>{errors.subject}</div>}
                </div>

                {/* Message */}
                <div style={{marginBottom:"1.75rem"}}>
                  <label style={labelSt}>Message</label>
                  <textarea value={form.message} onChange={e=>set("message",e.target.value)} placeholder="Tell us more..."
                    rows={6} style={{...inputBase("message"),resize:"vertical",minHeight:130}}
                    onFocus={focusIn} onBlur={focusOut("message")}/>
                  {errors.message && <div style={{fontSize:".72rem",color:"#EF4444",fontWeight:700,marginTop:".3rem"}}>{errors.message}</div>}
                </div>

                {/* Submit */}
                <button onClick={handleSubmit} disabled={sending} style={{
                    width:"100%", padding:"1rem", borderRadius:14, border:"none",
                    background: sending ? "var(--orange-mist)" : "linear-gradient(135deg,var(--orange) 0%,#FF8F5E 100%)",
                    color: sending ? "var(--orange)" : "white",
                    fontFamily:"'Baloo 2',cursive", fontWeight:800, fontSize:"1rem",
                    cursor: sending ? "default" : "pointer",
                    boxShadow: sending ? "none" : "var(--shadow-orange)",
                    transition:"all .25s", display:"flex", alignItems:"center", justifyContent:"center", gap:".6rem",
                  }}
                  onMouseEnter={e=>{ if(!sending){ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 16px 40px rgba(255,107,44,.45)"; }}}
                  onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow=sending?"none":"var(--shadow-orange)"; }}
                >
                  {sending ? <><span style={{display:"inline-block",animation:"spinSlow 1s linear infinite"}}>⏳</span> Sending…</> : <>Send Message →</>}
                </button>
              </div>

              {/* ── Info strip ── */}
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap",gap:"1.25rem",padding:".9rem 1.5rem",background:"white",borderRadius:20,border:"1.5px solid var(--ink-06)",boxShadow:"var(--shadow-card)"}}>
                {[
                  {icon:"📍", text:"1234 Learning Lane, Austin TX 78701"},
                  {icon:"📞", text:"(512) 555-0192"},
                  {icon:"⏱️", text:"Response time: within 24 hours"},
                ].map((item,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:".45rem",fontSize:".82rem",fontWeight:700,color:"var(--ink-60)"}}>
                    <span style={{fontSize:14}}>{item.icon}</span>{item.text}
                    {i < 2 && <span style={{color:"var(--ink-12)",marginLeft:".6rem"}}>·</span>}
                  </div>
                ))}
              </div>

              {/* ── Quick contact tiles ── */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:"1rem"}}>
                {[
                  {icon:"✉️", title:"General enquiries",  sub:"privacy@wordfly.com", accent:"var(--orange)"},
                  {icon:"🏫", title:"Schools & districts", sub:"schools@wordfly.com",    accent:"var(--purple)"},
                  {icon:"🐞", title:"Report a bug",        sub:"bugs@wordfly.com",       accent:"#2563EB"},
                ].map((t,i)=>(
                  <div key={i} style={{background:"var(--cream)",borderRadius:20,padding:"1.35rem 1.25rem",border:"1.5px solid var(--ink-06)",textAlign:"center",boxShadow:"var(--shadow-card)",cursor:"pointer",transition:"transform .2s, box-shadow .2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(255,107,44,.15)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="var(--shadow-card)";}}
                  >
                    <div style={{fontSize:"1.75rem",marginBottom:".5rem"}}>{t.icon}</div>
                    <div style={{fontWeight:800,fontSize:".88rem",color:"var(--ink)",marginBottom:".3rem"}}>{t.title}</div>
                    <div style={{fontSize:".75rem",fontWeight:700,color:t.accent}}>{t.sub}</div>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── SHARED POLICY LAYOUT ───────────────────── */
function PolicyPage({ setPage, badge, badgeBg, badgeColor, badgeBorder, title, titleAccent, subtitle, meta, sections, contact="privacy@wordfly.com" }) {
  const isDark = badgeColor === "ink";
  const headerGrad = isDark
    ? "linear-gradient(145deg,var(--ink) 0%,#1C1440 60%,#2D1B69 100%)"
    : badgeColor === "orange" ? "linear-gradient(145deg,#FFFBF7 0%,#FFF0E8 100%)"
    : badgeColor === "blue"   ? "linear-gradient(145deg,#F0F9FF 0%,#EFF6FF 100%)"
    : badgeColor === "green"  ? "linear-gradient(145deg,#F0FDF4 0%,#ECFDF5 100%)"
    : "linear-gradient(145deg,#FFFBF7 0%,#F4EEFF 100%)";
  const textColor = isDark ? "white" : "var(--ink)";
  const subColor  = isDark ? "rgba(255,255,255,.6)" : "var(--ink-60)";
  const btnBg     = isDark ? "rgba(255,255,255,.1)" : "var(--orange-tint)";
  const btnBorder = isDark ? "rgba(255,255,255,.2)"  : "var(--orange-mist)";
  const btnColor  = isDark ? "rgba(255,255,255,.8)"  : "var(--orange-dark)";
  const accentTagColor = badgeColor==="orange"?"var(--orange)":badgeColor==="blue"?"#2563EB":badgeColor==="green"?"#15803D":"var(--purple)";

  return (
    <div style={{minHeight:"100vh",background:"white"}}>
      <div style={{background:headerGrad,padding:"9rem 1.5rem 4.5rem",position:"relative",overflow:"hidden"}}>
        <div className="blob"   style={{position:"absolute",top:"-10%",right:"3%",width:380,height:380,background:`radial-gradient(circle,${isDark?"rgba(124,58,237,.2)":"rgba(255,107,44,.1)"} 0%,transparent 70%)`,filter:"blur(28px)",pointerEvents:"none"}}/>
        <div className="blob-2" style={{position:"absolute",bottom:"-5%",left:"-5%",width:320,height:320,background:`radial-gradient(circle,${isDark?"rgba(255,107,44,.12)":"rgba(124,58,237,.08)"} 0%,transparent 70%)`,filter:"blur(24px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(26,15,0,.04) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none"}}/>
        <div className="wf-container" style={{position:"relative",zIndex:2,maxWidth:760}}>
          <button onClick={()=>setPage("home")} style={{display:"inline-flex",alignItems:"center",gap:6,background:btnBg,border:`1.5px solid ${btnBorder}`,borderRadius:99,padding:"6px 16px",fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".88rem",color:btnColor,cursor:"pointer",marginBottom:"2rem"}}>← Back to Home</button>
          <div style={{display:"inline-flex",alignItems:"center",padding:"5px 14px",borderRadius:99,background:badgeBg,border:`1.5px solid ${badgeBorder}`,marginBottom:"1.25rem"}}>
            <span style={{fontSize:".78rem",fontWeight:700,color:accentTagColor,letterSpacing:".04em",textTransform:"uppercase"}}>{badge}</span>
          </div>
          <h1 style={{fontFamily:"'Short Stack',cursive",fontWeight:400,fontSize:"clamp(2rem,5vw,3.2rem)",color:textColor,WebkitTextStroke:isDark?".5px rgba(255,255,255,.4)":".6px var(--ink)",lineHeight:1.1,marginBottom:"1.1rem"}}>
            {title} <span style={{color:titleAccent}}>{subtitle}</span>
          </h1>
          <div style={{display:"flex",flexWrap:"wrap",gap:".75rem",marginTop:"1.5rem"}}>
            {meta.map((m,i)=>(
              <div key={i} style={{padding:"5px 14px",borderRadius:99,background:isDark?"rgba(255,255,255,.08)":"white",border:`1.5px solid ${isDark?"rgba(255,255,255,.12)":"var(--ink-06)"}`,fontSize:".75rem",fontWeight:700,color:isDark?"rgba(255,255,255,.5)":"var(--ink-60)"}}>{m}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{padding:"4rem 1.5rem 6rem"}}>
        <div className="wf-container" style={{maxWidth:760,display:"flex",flexDirection:"column",gap:"1.5rem"}}>
          {sections.map((sec,i)=>(
            <div key={i} style={{background:"var(--cream)",borderRadius:28,border:"1.5px solid var(--ink-06)",overflow:"hidden",boxShadow:"var(--shadow-card)"}}>
              <div style={{background:sec.accentLight||"var(--orange-tint)",borderBottom:`1.5px solid ${sec.accentMist||"var(--orange-mist)"}`,padding:"1.2rem 1.75rem",display:"flex",alignItems:"center",gap:".85rem"}}>
                <div style={{width:40,height:40,borderRadius:12,background:"white",border:`1.5px solid ${sec.accentMist||"var(--orange-mist)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{sec.icon}</div>
                <h2 style={{fontFamily:"'Short Stack',cursive",fontWeight:400,fontSize:"clamp(1rem,2.5vw,1.3rem)",color:"var(--ink)",WebkitTextStroke:".4px var(--ink)",margin:0,lineHeight:1.2}}>{sec.title}</h2>
                <div style={{marginLeft:"auto",fontSize:".68rem",fontWeight:800,color:sec.accentColor||"var(--orange)",background:"white",padding:"3px 10px",borderRadius:99,border:`1.5px solid ${sec.accentMist||"var(--orange-mist)"}`,whiteSpace:"nowrap"}}>§ {String(i+1).padStart(2,"0")}</div>
              </div>
              <div style={{padding:"1.75rem",color:"var(--ink-60)",fontSize:".9rem",lineHeight:1.85,fontWeight:600}}>
                {sec.content}
              </div>
            </div>
          ))}
          <div style={{background:"var(--ink)",borderRadius:28,padding:"2rem 2.5rem",display:"flex",gap:"2rem",alignItems:"center",flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:220}}>
              <div style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:"1.1rem",color:"white",marginBottom:".4rem"}}>Questions?</div>
              <p style={{color:"rgba(255,255,255,.5)",fontSize:".85rem",lineHeight:1.7,fontWeight:600,margin:0}}>We're a small team and we read every message. We aim to respond within 2 business days.</p>
            </div>
            <a href={"mailto:"+contact} style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:"var(--orange)",color:"white",fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".88rem",padding:".75rem 1.5rem",borderRadius:99,textDecoration:"none",boxShadow:"var(--shadow-orange)",flexShrink:0}}>
              {"✉️ "+contact}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckList({ items, accent="#FF6B2C", accentLight="var(--orange-tint)", accentBorder="var(--orange-mist)" }) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:".55rem",margin:".85rem 0"}}>
      {items.map((item,i)=>(
        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:".75rem",background:"white",border:"1.5px solid "+accentBorder,borderRadius:12,padding:".7rem 1rem"}}>
          <span style={{width:22,height:22,borderRadius:"50%",background:accentLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".68rem",color:accent,fontWeight:900,flexShrink:0,marginTop:1}}>{"✓"}</span>
          <span style={{fontWeight:700,fontSize:".875rem",color:"var(--ink)",lineHeight:1.5}}>{item}</span>
        </div>
      ))}
    </div>
  );
}
function CrossList({ items }) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:".55rem",margin:".85rem 0"}}>
      {items.map((item,i)=>(
        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:".75rem",background:"#FFF1F2",border:"1.5px solid #FECDD3",borderRadius:12,padding:".7rem 1rem"}}>
          <span style={{width:22,height:22,borderRadius:"50%",background:"#FECDD3",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".68rem",color:"#BE123C",fontWeight:900,flexShrink:0,marginTop:1}}>{"✕"}</span>
          <span style={{fontWeight:700,fontSize:".875rem",color:"var(--ink)",lineHeight:1.5}}>{item}</span>
        </div>
      ))}
    </div>
  );
}
function InfoBox({ color, children }) {
  const c = color||"orange";
  const map = {
    orange:{ bg:"var(--orange-tint)", border:"var(--orange-mist)", text:"var(--orange-dark)", icon:"💡" },
    purple:{ bg:"var(--purple-tint)", border:"var(--purple-mist)", text:"var(--purple)",      icon:"ℹ️" },
    green: { bg:"#F0FDF4",            border:"#BBF7D0",            text:"#15803D",            icon:"✅" },
    blue:  { bg:"#EFF6FF",            border:"#BFDBFE",            text:"#2563EB",            icon:"🔵" },
    red:   { bg:"#FFF1F2",            border:"#FECDD3",            text:"#BE123C",            icon:"⚠️" },
  };
  const s = map[c]||map.orange;
  return (
    <div style={{background:s.bg,border:"1.5px solid "+s.border,borderRadius:14,padding:"1rem 1.25rem",display:"flex",gap:".75rem",alignItems:"flex-start",marginTop:"1rem"}}>
      <span style={{fontSize:16,flexShrink:0,marginTop:2}}>{s.icon}</span>
      <div style={{color:s.text,fontWeight:700,fontSize:".875rem",lineHeight:1.7}}>{children}</div>
    </div>
  );
}
function SecGrid({ items, accent, accentLight, accentBorder }) {
  const a=accent||"#2563EB", al=accentLight||"#EFF6FF", ab=accentBorder||"#BFDBFE";
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))",gap:"1rem",margin:"1rem 0"}}>
      {items.map((item,i)=>(
        <div key={i} style={{background:al,border:"1.5px solid "+ab,borderRadius:16,padding:"1.1rem",textAlign:"center"}}>
          <div style={{fontSize:"1.6rem",marginBottom:".5rem"}}>{item.icon}</div>
          <div style={{fontSize:".7rem",fontWeight:700,color:a,textTransform:"uppercase",letterSpacing:".06em",marginBottom:".25rem"}}>{item.label}</div>
          <div style={{fontSize:".83rem",fontWeight:800,color:"var(--ink)"}}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── TERMS OF SERVICE PAGE ───────────────────── */
function TermsOfService({ setPage }) {
  const sections = [
    {
      icon:"✅", title:"Acceptance of Terms",
      accentColor:"#15803D", accentLight:"#F0FDF4", accentMist:"#BBF7D0",
      content: (<>
        <p>By accessing or using the Service, you agree to be bound by these Terms.</p>
        <CheckList accent="#15803D" accentLight="#F0FDF4" accentBorder="#BBF7D0" items={[
          "If you are 18 or older, you may create and manage your own account.",
          "If you are under 18, a parent or legal guardian must review and accept these Terms on your behalf and supervise your use of the Service.",
        ]}/>
        <InfoBox color="red">If you do not agree with these Terms, you may not use WordFly.</InfoBox>
      </>),
    },
    {
      icon:"📚", title:"Permitted Use",
      accentColor:"var(--orange)", accentLight:"var(--orange-tint)", accentMist:"var(--orange-mist)",
      content: (<>
        <p>WordFly is licensed for <strong style={{color:"var(--ink)"}}>personal, non-commercial educational use</strong>. Users may access interactive stories, vocabulary activities, and quizzes designed to support language development.</p>
        <p style={{marginTop:".75rem",fontWeight:700,color:"var(--ink)",fontSize:".88rem"}}>Unless explicitly authorised, users may not:</p>
        <CrossList items={[
          "Copy, reproduce, or redistribute platform content",
          "Create derivative works from our stories, learning materials, or software",
          "Extract or reuse large portions of the platform's datasets or content library",
          "Use the Service for commercial purposes",
        ]}/>
        <InfoBox color="orange">All intellectual property rights in the Service remain the property of WordFly and its licensors.</InfoBox>
      </>),
    },
    {
      icon:"🤖", title:"AI-Generated Content",
      accentColor:"var(--purple)", accentLight:"var(--purple-tint)", accentMist:"var(--purple-mist)",
      content: (<>
        <p>WordFly uses artificial intelligence to generate interactive stories, vocabulary examples, and learning exercises.</p>
        <CheckList accent="var(--purple)" accentLight="var(--purple-tint)" accentBorder="var(--purple-mist)" items={[
          "AI content may be guided or reviewed by educators",
          "Automated systems may occasionally produce errors or unexpected responses",
          "Content is intended for educational support — not authoritative academic material",
          "We continuously improve our AI for quality, safety, and accuracy",
        ]}/>
      </>),
    },
    {
      icon:"🚫", title:"Prohibited Conduct",
      accentColor:"#BE123C", accentLight:"#FFF1F2", accentMist:"#FECDD3",
      content: (<>
        <p>To maintain a safe learning environment, users agree not to:</p>
        <CrossList items={[
          "Share account credentials or allow unauthorised access",
          "Harass, bully, or harm other users",
          "Attempt to reverse-engineer, extract, or replicate our AI systems or software",
          "Upload or generate unlawful, harmful, offensive, or copyright-infringing content",
          "Interfere with or disrupt the security or operation of the Service",
        ]}/>
        <InfoBox color="red">Violations may result in account suspension or termination.</InfoBox>
      </>),
    },
    {
      icon:"💳", title:"Subscriptions and Refunds",
      accentColor:"var(--orange)", accentLight:"var(--orange-tint)", accentMist:"var(--orange-mist)",
      content: (<>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",margin:".85rem 0"}}>
          {[
            {tier:"Free Tier",    desc:"Basic vocabulary learning features available to all users.",                           bg:"var(--cream)",       border:"var(--ink-06)",        accent:"var(--ink-60)"},
            {tier:"Premium Tier", desc:"Additional features unlocked through monthly or annual subscriptions.",                bg:"var(--orange-tint)", border:"var(--orange-mist)",   accent:"var(--orange)"},
          ].map((t,i)=>(
            <div key={i} style={{background:t.bg,border:"1.5px solid "+t.border,borderRadius:16,padding:"1.25rem"}}>
              <div style={{fontWeight:800,fontSize:".88rem",color:t.accent,marginBottom:".4rem"}}>{t.tier}</div>
              <div style={{fontSize:".82rem",color:"var(--ink-60)",fontWeight:600,lineHeight:1.5}}>{t.desc}</div>
            </div>
          ))}
        </div>
        <CheckList items={["Subscriptions are billed in advance","Automatically renew unless cancelled","Can be cancelled anytime through account settings"]}/>
        <InfoBox color="orange">Refund requests may be submitted within <strong>14 days</strong> of purchase, subject to applicable platform policies (Apple App Store / Google Play).</InfoBox>
      </>),
    },
    {
      icon:"⚖️", title:"Limitation of Liability",
      accentColor:"#2563EB", accentLight:"#EFF6FF", accentMist:"#BFDBFE",
      content: (<>
        <p>The Service is provided <strong style={{color:"var(--ink)"}}>as is</strong> and <strong style={{color:"var(--ink)"}}>as available</strong>.</p>
        <p style={{marginTop:".75rem"}}>To the maximum extent permitted by law, WordFly shall not be liable for indirect, incidental, consequential, or special damages arising from use of or inability to use the Service.</p>
        <InfoBox color="blue">Our total liability shall not exceed the total amount paid by the user to WordFly during the <strong>12 months</strong> preceding the claim. Some jurisdictions may not allow certain limitations.</InfoBox>
      </>),
    },
    {
      icon:"🤖", title:"Responsible AI and Transparency",
      accentColor:"var(--purple)", accentLight:"var(--purple-tint)", accentMist:"var(--purple-mist)",
      content: (<>
        <p>WordFly uses AI to help generate interactive story adventures, vocabulary examples and definitions, personalised learning prompts, and practice quizzes.</p>
        <CheckList accent="var(--purple)" accentLight="var(--purple-tint)" accentBorder="var(--purple-mist)" items={[
          "Age-appropriate prompt design and content filtering",
          "Restricted AI capabilities for child accounts",
          "Continuous system monitoring and improvement",
          "Educator review and curriculum-informed vocabulary lists",
        ]}/>
        <InfoBox color="purple">AI responses should be considered learning assistance rather than authoritative instruction. We continuously improve our AI systems by monitoring safety, updating safeguards, and reviewing feedback.</InfoBox>
      </>),
    },
  ];
  return (
    <PolicyPage setPage={setPage}
      badge="📄 Legal · Terms" badgeBg="var(--orange-tint)" badgeColor="orange" badgeBorder="var(--orange-mist)"
      title="Terms of" subtitle="Service" titleAccent="var(--orange)"
      meta={["Effective: January 1, 2025","Version: 2.1","Applies to: All users"]}
      sections={sections}
    />
  );
}

/* ─── COOKIES POLICY PAGE ─────────────────────── */
function CookiesPolicy({ setPage }) {
  const sections = [
    {
      icon:"🍪", title:"What Are Cookies?",
      accentColor:"#A16207", accentLight:"#FEF9C3", accentMist:"#FDE68A",
      content: (<>
        <p>Cookies are small text files stored on your device when you visit a website. They help us keep you signed in, remember your preferences, and understand how the platform is being used.</p>
        <InfoBox color="green">WordFly uses only <strong>essential and functional cookies</strong>. We do not use advertising cookies, third-party tracking pixels, or behavioral profiling.</InfoBox>
      </>),
    },
    {
      icon:"✅", title:"Cookies We Use",
      accentColor:"#15803D", accentLight:"#F0FDF4", accentMist:"#BBF7D0",
      content: (<>
        <div style={{display:"flex",flexDirection:"column",gap:".75rem",margin:".85rem 0"}}>
          {[
            {icon:"🔐",name:"Authentication cookies",desc:"Keep you securely signed in to your account.",                                              type:"Essential"},
            {icon:"⚙️",name:"Preference cookies",   desc:"Remember your settings such as grade level and theme.",                                     type:"Functional"},
            {icon:"📊",name:"Performance cookies",  desc:"Non-identifiable data to help us diagnose errors and improve speed.",                        type:"Functional"},
          ].map((c,i)=>(
            <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"1rem",background:"white",border:"1.5px solid #BBF7D0",borderRadius:14,padding:"1rem 1.25rem"}}>
              <span style={{fontSize:20,flexShrink:0}}>{c.icon}</span>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:".6rem",flexWrap:"wrap",marginBottom:".25rem"}}>
                  <span style={{fontWeight:800,fontSize:".88rem",color:"var(--ink)"}}>{c.name}</span>
                  <span style={{padding:"2px 8px",borderRadius:99,background:"#F0FDF4",border:"1.5px solid #BBF7D0",fontSize:".65rem",fontWeight:800,color:"#15803D"}}>{c.type}</span>
                </div>
                <div style={{fontSize:".82rem",color:"var(--ink-60)",fontWeight:600,lineHeight:1.5}}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </>),
    },
    {
      icon:"🚫", title:"Cookies We Never Use",
      accentColor:"#BE123C", accentLight:"#FFF1F2", accentMist:"#FECDD3",
      content: (<>
        <CrossList items={[
          "Advertising or retargeting cookies",
          "Third-party social media tracking pixels",
          "Behavioral profiling or cross-site tracking",
          "Selling cookie data to third parties",
        ]}/>
      </>),
    },
    {
      icon:"⚙️", title:"Managing Your Cookies",
      accentColor:"var(--purple)", accentLight:"var(--purple-tint)", accentMist:"var(--purple-mist)",
      content: (<>
        <p>You can control cookies through your browser settings. Disabling essential cookies may affect your ability to stay signed in or access certain features.</p>
        <CheckList accent="var(--purple)" accentLight="var(--purple-tint)" accentBorder="var(--purple-mist)" items={[
          "Browser settings let you view, block, or delete cookies",
          "Essential cookies cannot be disabled without affecting core functionality",
          "We do not gate educational access behind cookie consent beyond what is strictly necessary",
        ]}/>
        <InfoBox color="purple">For children's accounts, we apply the strictest cookie settings automatically — no action needed from parents.</InfoBox>
      </>),
    },
  ];
  return (
    <PolicyPage setPage={setPage}
      badge="🍪 Legal · Cookies" badgeBg="#FEF9C3" badgeColor="orange" badgeBorder="#FDE68A"
      title="Cookies" subtitle="Policy" titleAccent="#A16207"
      meta={["Effective: January 1, 2026","No ad tracking","No third-party profiling"]}
      sections={sections}
    />
  );
}

/* ─── PARENTAL CONSENT PAGE ───────────────────── */
function ParentalConsent({ setPage }) {
  const sections = [
    {
      icon:"👨‍👩‍👧", title:"Parental Consent (COPPA)",
      accentColor:"var(--purple)", accentLight:"var(--purple-tint)", accentMist:"var(--purple-mist)",
      content: (<>
        <p>For users under the age of <strong style={{color:"var(--ink)"}}>13</strong>, WordFly requires verifiable parental consent before collecting or processing personal information, in accordance with the Children's Online Privacy Protection Act (COPPA).</p>
        <CheckList accent="var(--purple)" accentLight="var(--purple-tint)" accentBorder="var(--purple-mist)" items={[
          "Review the information collected about their child",
          "Request correction of inaccurate data",
          "Request deletion of their child's data",
          "Withdraw consent for future data collection",
        ]}/>
        <InfoBox color="purple">Requests can be submitted by contacting <strong>privacy@wordfly.com</strong>. We aim to respond within 30 days.</InfoBox>
      </>),
    },
    {
      icon:"🏫", title:"School Accounts",
      accentColor:"#15803D", accentLight:"#F0FDF4", accentMist:"#BBF7D0",
      content: (<>
        <p>If WordFly is used through a school, teacher, or educational institution, <strong style={{color:"var(--ink)"}}>the school may act as the parent's agent</strong> for providing consent for the collection of limited student data used strictly for educational purposes.</p>
        <CheckList accent="#15803D" accentLight="#F0FDF4" accentBorder="#BBF7D0" items={[
          "Data will only be used to provide the educational service",
          "Student data will not be used for advertising or commercial profiling",
          "Schools and parents may request data access or deletion at any time",
        ]}/>
        <InfoBox color="green">Schools using WordFly are asked to review and agree to our School Data Agreement. Contact <strong>schools@wordfly.com</strong> to get started.</InfoBox>
      </>),
    },
    {
      icon:"🗂️", title:"Data Retention and Account Deletion",
      accentColor:"#2563EB", accentLight:"#EFF6FF", accentMist:"#BFDBFE",
      content: (<>
        <p>We retain user information only for as long as necessary to provide the Service and support educational progress tracking.</p>
        <div style={{display:"flex",flexDirection:"column",gap:".6rem",margin:".85rem 0"}}>
          {[
            {icon:"👤",label:"Account data",      period:"Retained while the account is active",            color:"var(--orange)"},
            {icon:"📖",label:"Learning progress", period:"Retained to support history and achievements",    color:"var(--purple)"},
            {icon:"⚙️",label:"Technical logs",    period:"Retained temporarily for security and diagnostics",color:"#2563EB"},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:"1rem",background:"white",border:"1.5px solid #BFDBFE",borderRadius:12,padding:".75rem 1.1rem"}}>
              <span style={{fontSize:18,width:28,textAlign:"center",flexShrink:0}}>{r.icon}</span>
              <div style={{flex:1}}>
                <span style={{fontWeight:800,fontSize:".88rem",color:"var(--ink)"}}>{r.label}:</span>
                <span style={{fontWeight:600,fontSize:".84rem",color:"var(--ink-60)",marginLeft:".4rem"}}>{r.period}</span>
              </div>
              <div style={{width:8,height:8,borderRadius:"50%",background:r.color,flexShrink:0}}/>
            </div>
          ))}
        </div>
        <InfoBox color="blue">Users or parents may request <strong>permanent deletion</strong> at any time by contacting <strong>privacy@wordfly.com</strong>.</InfoBox>
      </>),
    },
    {
      icon:"🤖", title:"AI Safety and Content Moderation",
      accentColor:"var(--orange)", accentLight:"var(--orange-tint)", accentMist:"var(--orange-mist)",
      content: (<>
        <p>WordFly uses AI systems to generate interactive stories and learning exercises. To maintain a safe learning environment:</p>
        <CheckList items={[
          "AI outputs are designed with age-appropriate safeguards",
          "Content systems include automated filtering and moderation",
          "Certain responses may be reviewed using educator-guided prompts",
        ]}/>
        <InfoBox color="orange">Users may report inappropriate content by contacting <strong>support@wordfly.com</strong>.</InfoBox>
      </>),
    },
    {
      icon:"🧑‍🎓", title:"Acceptable Use for Students",
      accentColor:"#15803D", accentLight:"#F0FDF4", accentMist:"#BBF7D0",
      content: (<>
        <p>WordFly is designed to be a safe and respectful learning environment for all students.</p>
        <p style={{fontWeight:700,color:"var(--ink)",margin:".85rem 0 .4rem",fontSize:".88rem"}}>Students agree to:</p>
        <CheckList accent="#15803D" accentLight="#F0FDF4" accentBorder="#BBF7D0" items={[
          "Use the platform for educational purposes",
          "Interact respectfully with learning activities and content",
          "Avoid submitting harmful, abusive, or inappropriate input",
        ]}/>
        <p style={{fontWeight:700,color:"var(--ink)",margin:".85rem 0 .4rem",fontSize:".88rem"}}>Students may not:</p>
        <CrossList items={[
          "Attempt to bypass safety controls",
          "Generate harmful or offensive content through prompts",
          "Use the platform to harass others",
          "Attempt to disrupt or interfere with the Service",
        ]}/>
        <InfoBox color="red">Accounts that violate these guidelines may be suspended or terminated.</InfoBox>
      </>),
    },
  ];
  return (
    <PolicyPage setPage={setPage}
      badge="👨‍👩‍👧 Legal · Consent" badgeBg="var(--purple-tint)" badgeColor="purple" badgeBorder="var(--purple-mist)"
      title="School and" subtitle="Parental Consent" titleAccent="var(--purple)"
      meta={["COPPA Compliant","FERPA Aware","Effective: January 1, 2026"]}
      sections={sections}
    />
  );
}

/* ─── CHILDREN'S PRIVACY PAGE ────────────────── */
function ChildrensPrivacy({ setPage }) {
  const sections = [
    {
      icon:"👧", title:"Children's Privacy (COPPA Compliance)",
      accentColor:"var(--purple)", accentLight:"var(--purple-tint)", accentMist:"var(--purple-mist)",
      content: (<>
        <p>Protecting children's privacy is central to how WordFly is designed — it's not a policy add-on, it's a founding principle.</p>
        <p style={{marginTop:".85rem"}}>WordFly is intended for learners ages <strong style={{color:"var(--ink)"}}>6–18</strong>. We do not knowingly collect personal information from children under 13 without verifiable parental consent, as required by the Children's Online Privacy Protection Act (COPPA).</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",margin:"1.5rem 0"}}>
          {[
            {icon:"📋",label:"What we collect",    val:"Only what's needed to run the service: name, grade level, email (parent), and learning progress data."},
            {icon:"🚫",label:"What we never do",   val:"We never collect precise location, financial info, government IDs, or sensitive personal data."},
            {icon:"📣",label:"No ads, ever",       val:"Child accounts are never shown advertising or subjected to behavioural tracking or profiling."},
            {icon:"🔒",label:"Parental control",   val:"Parents can review, correct, or delete their child's data at any time, no questions asked."},
          ].map((c,i)=>(
            <div key={i} style={{background:"white",border:"1.5px solid var(--purple-mist)",borderRadius:16,padding:"1.1rem 1.25rem",boxShadow:"var(--shadow-card)"}}>
              <div style={{fontSize:"1.5rem",marginBottom:".5rem"}}>{c.icon}</div>
              <div style={{fontWeight:800,fontSize:".82rem",color:"var(--purple)",textTransform:"uppercase",letterSpacing:".05em",marginBottom:".35rem"}}>{c.label}</div>
              <div style={{fontSize:".82rem",fontWeight:600,color:"var(--ink-60)",lineHeight:1.6}}>{c.val}</div>
            </div>
          ))}
        </div>
        <InfoBox color="purple">Parents or guardians may review, request deletion, or limit the collection of their child's information at any time by contacting <strong>privacy@wordfly.com</strong>.</InfoBox>
      </>),
    },
    {
      icon:"✅", title:"What COPPA Means for Your Family",
      accentColor:"var(--orange)", accentLight:"var(--orange-tint)", accentMist:"var(--orange-mist)",
      content: (<>
        <p>Under COPPA, parents and guardians of children under 13 have specific rights regarding personal information collected online. WordFly fully honours all of these rights:</p>
        <CheckList items={[
          "Review the personal information collected about your child",
          "Request correction of any inaccurate information",
          "Request complete deletion of your child's data and account",
          "Withdraw consent for future data collection at any time",
          "Refuse to allow further contact from WordFly",
        ]}/>
        <InfoBox color="orange">All requests are processed within <strong>30 days</strong>. Submit a request any time at <strong>privacy@wordfly.com</strong>.</InfoBox>
      </>),
    },
    {
      icon:"🏫", title:"Children Using WordFly Through School",
      accentColor:"#15803D", accentLight:"#F0FDF4", accentMist:"#BBF7D0",
      content: (<>
        <p>When WordFly is used in a school setting, the school may act as the parent's agent and provide consent for the limited collection of student data used strictly for educational purposes.</p>
        <CheckList accent="#15803D" accentLight="#F0FDF4" accentBorder="#BBF7D0" items={[
          "Data collected via school accounts is used solely to deliver the educational service",
          "Student data is never used for advertising or commercial profiling",
          "Both schools and parents retain the right to request data access or deletion",
        ]}/>
        <InfoBox color="green">Schools are asked to review and agree to our School Data Agreement before deploying WordFly. Contact <strong>schools@wordfly.com</strong> to get started.</InfoBox>
      </>),
    },
    {
      icon:"🗂️", title:"Data Retention for Child Accounts",
      accentColor:"#2563EB", accentLight:"#EFF6FF", accentMist:"#BFDBFE",
      content: (<>
        <p>We retain child account data only for as long as it is needed to provide the learning service.</p>
        <div style={{display:"flex",flexDirection:"column",gap:".6rem",margin:".85rem 0"}}>
          {[
            {icon:"👤", label:"Account data",       period:"Retained while the account is active", color:"var(--purple)"},
            {icon:"📖", label:"Learning progress",  period:"Retained to support learning history and achievements", color:"var(--orange)"},
            {icon:"⚙️", label:"Technical logs",     period:"Retained temporarily for security and system diagnostics", color:"#2563EB"},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:"1rem",background:"white",border:"1.5px solid #BFDBFE",borderRadius:12,padding:".75rem 1.1rem"}}>
              <span style={{fontSize:18,width:28,textAlign:"center",flexShrink:0}}>{r.icon}</span>
              <div style={{flex:1}}>
                <span style={{fontWeight:800,fontSize:".88rem",color:"var(--ink)"}}>{r.label}: </span>
                <span style={{fontWeight:600,fontSize:".83rem",color:"var(--ink-60)"}}>{r.period}</span>
              </div>
              <div style={{width:8,height:8,borderRadius:"50%",background:r.color,flexShrink:0}}/>
            </div>
          ))}
        </div>
        <InfoBox color="blue">A parent or guardian may request <strong>permanent deletion</strong> of a child's account and all associated data at any time by contacting <strong>privacy@wordfly.com</strong>. Once confirmed, personal information is removed from all active systems.</InfoBox>
      </>),
    },
    {
      icon:"🔒", title:"How We Protect Children's Data",
      accentColor:"#2563EB", accentLight:"#EFF6FF", accentMist:"#BFDBFE",
      content: (<>
        <p>We apply the same enterprise-grade protections to children's data as we do to all user data — with additional restrictions specific to child accounts:</p>
        <SecGrid items={[
          {icon:"🔐", label:"In-transit encryption", value:"TLS 1.3"},
          {icon:"💾", label:"At-rest encryption",    value:"AES-256"},
          {icon:"☁️", label:"Infrastructure",        value:"SOC 2 Type II"},
          {icon:"👁️", label:"Access control",        value:"Minimal, need-to-know only"},
        ]} accent="#2563EB" accentLight="#EFF6FF" accentBorder="#BFDBFE"/>
        <InfoBox color="blue">Child accounts have additional restrictions applied by default — no public profiles, no sharing of progress data outside the household or school, and no third-party data access.</InfoBox>
      </>),
    },
  ];
  return (
    <PolicyPage setPage={setPage}
      badge="👧 Legal · Children"
      badgeBg="var(--purple-tint)"
      badgeColor="purple"
      badgeBorder="var(--purple-mist)"
      title="Children's"
      titleAccent="var(--purple)"
      subtitle="Privacy"
      meta={["COPPA Compliant","Ages 6–18","Effective: January 1, 2026","Last updated: March 1, 2026"]}
      sections={sections}
    />
  );
}


function DataSecurity({ setPage }) {
  const sections = [
    {
      icon:"🛡️", title:"Security Infrastructure",
      accentColor:"#2563EB", accentLight:"#EFF6FF", accentMist:"#BFDBFE",
      content: (<>
        <p>We apply industry-standard, multi-layered safeguards to protect every user's data.</p>
        <SecGrid accent="#2563EB" accentLight="#EFF6FF" accentBorder="#BFDBFE" items={[
          {icon:"🔐",label:"Encryption in transit",value:"TLS 1.3"},
          {icon:"💾",label:"Encryption at rest",   value:"AES-256"},
          {icon:"☁️",label:"Cloud infrastructure", value:"SOC 2 Type II"},
          {icon:"🔑",label:"Access control",        value:"Authorised personnel only"},
        ]}/>
      </>),
    },
    {
      icon:"🗂️", title:"Data Retention Policy",
      accentColor:"var(--orange)", accentLight:"var(--orange-tint)", accentMist:"var(--orange-mist)",
      content: (<>
        <p>We retain user information only for as long as necessary to provide the Service.</p>
        <div style={{display:"flex",flexDirection:"column",gap:".6rem",margin:".85rem 0"}}>
          {[
            {icon:"👤",label:"Account data",      period:"While account is active",                  color:"var(--orange)"},
            {icon:"📖",label:"Learning progress", period:"To support history and achievements",      color:"var(--purple)"},
            {icon:"⚙️",label:"Technical logs",    period:"Temporary — security and diagnostics",    color:"#2563EB"},
            {icon:"💳",label:"Billing records",   period:"As required by law (typically 7 years)", color:"#15803D"},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:"1rem",background:"white",border:"1.5px solid var(--orange-mist)",borderRadius:12,padding:".75rem 1.1rem"}}>
              <span style={{fontSize:18,width:28,textAlign:"center",flexShrink:0}}>{r.icon}</span>
              <div style={{flex:1}}>
                <span style={{fontWeight:800,fontSize:".88rem",color:"var(--ink)"}}>{r.label}:</span>
                <span style={{fontWeight:600,fontSize:".84rem",color:"var(--ink-60)",marginLeft:".4rem"}}>{r.period}</span>
              </div>
              <div style={{width:8,height:8,borderRadius:"50%",background:r.color,flexShrink:0}}/>
            </div>
          ))}
        </div>
        <InfoBox color="orange">Users or parents may request <strong>permanent deletion</strong> at any time by contacting <strong>privacy@wordfly.com</strong>.</InfoBox>
      </>),
    },
    {
      icon:"🔍", title:"Access Controls",
      accentColor:"var(--purple)", accentLight:"var(--purple-tint)", accentMist:"var(--purple-mist)",
      content: (<>
        <p>Access to user data is strictly controlled and limited to personnel who require it to operate the service.</p>
        <CheckList accent="var(--purple)" accentLight="var(--purple-tint)" accentBorder="var(--purple-mist)" items={[
          "Role-based access control with minimum necessary permissions",
          "Multi-factor authentication for all internal systems",
          "Regular access reviews and audits",
          "Contractor and vendor agreements with data protection obligations",
        ]}/>
      </>),
    },
    {
      icon:"🚨", title:"Incident Response",
      accentColor:"#BE123C", accentLight:"#FFF1F2", accentMist:"#FECDD3",
      content: (<>
        <p>In the unlikely event of a data breach or security incident, we follow a documented incident response process.</p>
        <CheckList accent="#BE123C" accentLight="#FFF1F2" accentBorder="#FECDD3" items={[
          "Affected users will be notified promptly as required by law",
          "Relevant authorities will be informed where required",
          "We will take immediate steps to contain and remediate any incident",
        ]}/>
        <InfoBox color="red">To report a suspected security issue, contact <strong>privacy@wordfly.com</strong> with the subject line Security Report.</InfoBox>
      </>),
    },
  ];
  return (
    <PolicyPage setPage={setPage}
      badge="🔒 Legal · Security" badgeBg="#EFF6FF" badgeColor="blue" badgeBorder="#BFDBFE"
      title="Data" subtitle="Security" titleAccent="#2563EB"
      meta={["SOC 2 Type II","TLS 1.3 and AES-256","Last reviewed: March 2026"]}
      sections={sections}
    />
  );
}

/* ─── AI TRANSPARENCY POLICY PAGE ────────────── */
function AiTransparency({ setPage }) {
  const sections = [
    {
      icon:"🤖", title:"How We Use AI",
      accentColor:"var(--orange)", accentLight:"var(--orange-tint)", accentMist:"var(--orange-mist)",
      content:(
        <>
          <p>WordFly uses artificial intelligence to help create interactive stories and vocabulary learning experiences for students. AI powers the following features:</p>
          <CheckList items={[
            "Interactive story adventures that introduce new vocabulary in context",
            "Vocabulary examples and explanations tailored to grade level",
            "Personalised practice quizzes and learning prompts",
            "Adaptive learning suggestions based on each learner's progress",
          ]}/>
          <InfoBox color="orange">AI allows the platform to adapt stories and exercises to each learner — making vocabulary learning more engaging and effective without feeling like homework.</InfoBox>
        </>
      ),
    },
    {
      icon:"👩‍🏫", title:"Human Guidance and Oversight",
      accentColor:"#15803D", accentLight:"#F0FDF4", accentMist:"#BBF7D0",
      content:(
        <>
          <p>Although AI helps generate content, WordFly is not fully automated. Human expertise is built into every layer of our system:</p>
          <CheckList accent="#15803D" accentLight="#F0FDF4" accentBorder="#BBF7D0" items={[
            "Educator-guided vocabulary selection for every grade level",
            "Prompt frameworks designed by learning specialists",
            "Ongoing monitoring and quality improvements to AI outputs",
            "Feedback loops from parents, teachers, and students",
          ]}/>
          <div style={{background:"var(--ink)",borderRadius:18,padding:"1.25rem 1.5rem",marginTop:"1rem",textAlign:"center"}}>
            <p style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:"1rem",color:"white",lineHeight:1.65,margin:0}}>
              "AI designed to inspire learning — never to replace teachers or parents."
            </p>
          </div>
        </>
      ),
    },
    {
      icon:"🛡️", title:"Safety and Age-Appropriate Design",
      accentColor:"var(--purple)", accentLight:"var(--purple-tint)", accentMist:"var(--purple-mist)",
      content:(
        <>
          <p>Because WordFly is used by children and students, our AI systems are designed with safety at their core. Safeguards include:</p>
          <CheckList accent="var(--purple)" accentLight="var(--purple-tint)" accentBorder="var(--purple-mist)" items={[
            "Age-appropriate prompt design for every grade level (1–8)",
            "Content filtering systems that run on every AI response",
            "Moderation safeguards to reduce harmful or inappropriate outputs",
            "Continuous monitoring and improvement of AI behaviour",
          ]}/>
          <InfoBox color="purple">These protections help create a safe, positive learning environment. Our safety team reviews flagged content regularly and updates safeguards accordingly.</InfoBox>
        </>
      ),
    },
    {
      icon:"⚠️", title:"Limitations of AI",
      accentColor:"#A16207", accentLight:"#FEF9C3", accentMist:"#FDE68A",
      content:(
        <>
          <p>Artificial intelligence is an evolving technology. Our systems may occasionally:</p>
          <div style={{display:"flex",flexDirection:"column",gap:".55rem",margin:".85rem 0"}}>
            {[
              "Produce incorrect or incomplete information",
              "Misinterpret unusual or unexpected prompts",
              "Generate unexpected or unclear responses",
            ].map((item,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:".75rem",background:"#FEF9C3",border:"1.5px solid #FDE68A",borderRadius:12,padding:".7rem 1rem"}}>
                <span style={{fontSize:14,flexShrink:0,marginTop:2}}>⚠️</span>
                <span style={{fontWeight:700,fontSize:".875rem",color:"var(--ink)",lineHeight:1.5}}>{item}</span>
              </div>
            ))}
          </div>
          <InfoBox color="orange">AI-generated content should be viewed as learning assistance, not authoritative academic instruction. We continuously improve our systems to reduce these issues.</InfoBox>
        </>
      ),
    },
    {
      icon:"🔒", title:"Data and Privacy Protection",
      accentColor:"#2563EB", accentLight:"#EFF6FF", accentMist:"#BFDBFE",
      content:(
        <>
          <p>Protecting children's data is central to how our AI systems are designed. WordFly's AI operates within strict data boundaries:</p>
          <CheckList accent="#2563EB" accentLight="#EFF6FF" accentBorder="#BFDBFE" items={[
            "We do not sell personal data",
            "We do not allow targeted advertising based on student data",
            "Data shared with third-party AI providers is limited to what is necessary",
            "Strong security protections safeguard all user information",
          ]}/>
          <InfoBox color="blue">AI systems used within WordFly are designed to support learning without exploiting personal data. See our <strong>Third-Party Services</strong> page for details on external AI providers.</InfoBox>
        </>
      ),
    },
    {
      icon:"🔄", title:"Continuous Improvement",
      accentColor:"var(--orange)", accentLight:"var(--orange-tint)", accentMist:"var(--orange-mist)",
      content:(
        <>
          <p>We regularly review and improve our AI systems to keep them safe, accurate, and educationally valuable:</p>
          <CheckList items={[
            "Monitoring system performance and safety signals daily",
            "Updating prompts and safeguards based on findings",
            "Incorporating feedback from parents, teachers, and learners",
            "Working with educators to refine vocabulary and content quality",
          ]}/>
          <InfoBox color="orange">Our goal is to build responsible AI tools that help children develop confidence with language — and a lifelong love of reading.</InfoBox>
        </>
      ),
    },
  ];
  return (
    <PolicyPage
      setPage={setPage}
      badge="🤖 Legal · AI"
      badgeBg="var(--orange-tint)"
      badgeColor="orange"
      badgeBorder="var(--orange-mist)"
      title="Responsible AI &"
      titleAccent="var(--orange)"
      subtitle="Transparency Policy"
      meta={["Effective: January 1, 2025","Last updated: January 1, 2025","Applies to: All AI features"]}
      sections={sections}
    />
  );
}

/* ─── THIRD-PARTY SERVICES PAGE ───────────────── */
function ThirdPartyServices({ setPage }) {
  const providers = [
    { icon:"☁️",  category:"Cloud Infrastructure",             examples:["AWS","Google Cloud","Vercel"],                          accent:"#2563EB", accentLight:"#EFF6FF", accentBorder:"#BFDBFE" },
    { icon:"📊",  category:"Analytics & Performance",          examples:["Google Analytics","Firebase Analytics"],                 accent:"var(--orange)", accentLight:"var(--orange-tint)", accentBorder:"var(--orange-mist)" },
    { icon:"💳",  category:"Payment Processing",               examples:["Stripe","Apple App Store","Google Play"],                accent:"#15803D", accentLight:"#F0FDF4", accentBorder:"#BBF7D0" },
    { icon:"🤖",  category:"AI Processing",                    examples:["Third-party AI infrastructure for content generation"],  accent:"var(--purple)", accentLight:"var(--purple-tint)", accentBorder:"var(--purple-mist)" },
  ];

  const sections = [
    {
      icon:"🤝", title:"Why We Use Third-Party Providers",
      accentColor:"var(--orange)", accentLight:"var(--orange-tint)", accentMist:"var(--orange-mist)",
      content:(
        <>
          <p>To operate and improve the WordFly platform, we may rely on trusted third-party service providers that process limited data on our behalf. These providers assist with:</p>
          <CheckList items={[
            "Cloud hosting and infrastructure",
            "Analytics and performance monitoring",
            "Payment processing",
            "Authentication and account security",
            "AI processing and content generation",
          ]}/>
          <InfoBox color="orange">All third-party providers are contractually required to protect user data and use it only for the specific services they provide to WordFly — nothing else.</InfoBox>
        </>
      ),
    },
    {
      icon:"📋", title:"Examples of Third-Party Services",
      accentColor:"#2563EB", accentLight:"#EFF6FF", accentMist:"#BFDBFE",
      content:(
        <>
          <p>Depending on platform configuration, WordFly may use the following categories of providers:</p>
          <div style={{display:"flex",flexDirection:"column",gap:"1rem",margin:"1.1rem 0"}}>
            {providers.map((p,i)=>(
              <div key={i} style={{background:"white",border:`1.5px solid ${p.accentBorder}`,borderRadius:16,padding:"1.1rem 1.25rem",display:"flex",gap:"1rem",alignItems:"flex-start"}}>
                <div style={{width:40,height:40,borderRadius:12,background:p.accentLight,border:`1.5px solid ${p.accentBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{p.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:800,fontSize:".88rem",color:"var(--ink)",marginBottom:".4rem"}}>{p.category}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:".4rem"}}>
                    {p.examples.map((ex,j)=>(
                      <span key={j} style={{padding:"3px 10px",borderRadius:99,background:p.accentLight,border:`1.5px solid ${p.accentBorder}`,fontSize:".72rem",fontWeight:700,color:p.accent}}>{ex}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <InfoBox color="blue">We do not allow third-party providers to sell or use student data for advertising purposes.</InfoBox>
        </>
      ),
    },
    {
      icon:"📡", title:"What Data May Be Shared",
      accentColor:"#A16207", accentLight:"#FEF9C3", accentMist:"#FDE68A",
      content:(
        <>
          <p>Third-party services may collect limited technical information to help us maintain platform reliability, safety, and learning effectiveness. This may include:</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:".85rem",margin:"1.1rem 0"}}>
            {[
              {icon:"📱",label:"Device type"},
              {icon:"🌐",label:"Browser type"},
              {icon:"⚡",label:"Performance metrics"},
              {icon:"📈",label:"Anonymised usage statistics"},
            ].map((item,i)=>(
              <div key={i} style={{background:"#FEF9C3",border:"1.5px solid #FDE68A",borderRadius:14,padding:"1rem",textAlign:"center"}}>
                <div style={{fontSize:"1.5rem",marginBottom:".4rem"}}>{item.icon}</div>
                <div style={{fontWeight:700,fontSize:".8rem",color:"#A16207"}}>{item.label}</div>
              </div>
            ))}
          </div>
          <InfoBox color="orange">This data is non-identifiable and technical in nature. It is never linked to a specific child's name, email, or learning history.</InfoBox>
        </>
      ),
    },
    {
      icon:"👧", title:"Children's Data Protection",
      accentColor:"var(--purple)", accentLight:"var(--purple-tint)", accentMist:"var(--purple-mist)",
      content:(
        <>
          <p>When third-party providers process data related to child users, we apply additional protections:</p>
          <CheckList accent="var(--purple)" accentLight="var(--purple-tint)" accentBorder="var(--purple-mist)" items={[
            "Data shared is limited to the minimum necessary to provide the service",
            "Providers must comply with applicable privacy and child protection laws (COPPA, FERPA)",
            "Student data is never used for targeted advertising or commercial profiling",
            "Providers are prohibited from retaining student data beyond the agreed service term",
          ]}/>
          <InfoBox color="purple">We review our third-party provider agreements regularly to ensure ongoing compliance with child privacy standards.</InfoBox>
        </>
      ),
    },
    {
      icon:"⚙️", title:"Your Control",
      accentColor:"#15803D", accentLight:"#F0FDF4", accentMist:"#BBF7D0",
      content:(
        <>
          <p>Parents and users retain full control over their data. You may at any time:</p>
          <CheckList accent="#15803D" accentLight="#F0FDF4" accentBorder="#BBF7D0" items={[
            "Request information about how your data is used and shared",
            "Request deletion of your account and all associated data",
            "Withdraw consent for optional data collection",
          ]}/>
          <InfoBox color="green">Submit any data request to <strong>privacy@wordfly.com</strong>. We aim to respond to all verified requests within 30 days.</InfoBox>
        </>
      ),
    },
  ];
  return (
    <PolicyPage
      setPage={setPage}
      badge="🤝 Legal · Third Parties"
      badgeBg="#EFF6FF"
      badgeColor="blue"
      badgeBorder="#BFDBFE"
      title="Third-Party Services"
      titleAccent="#2563EB"
      subtitle="& Analytics"
      meta={["Effective: January 1, 2026","Last updated: March 1, 2026","Applies to: All users"]}
      sections={sections}
    />
  );
}


function AcceptableUse({ setPage }) {
  const sections = [
    {
      icon:"🧑‍🎓", title:"Acceptable Use for Students",
      accentColor:"#15803D", accentLight:"#F0FDF4", accentMist:"#BBF7D0",
      content:(
        <>
          <p>WordFly is designed to be a safe and respectful learning environment for all students. To keep it that way, users agree to the following:</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",margin:"1.1rem 0"}}>
            <div>
              <div style={{fontWeight:800,fontSize:".8rem",color:"#15803D",textTransform:"uppercase",letterSpacing:".06em",marginBottom:".6rem"}}>✅ Users agree to</div>
              <CheckList accent="#15803D" accentLight="#F0FDF4" accentBorder="#BBF7D0" items={[
                "Use the platform for educational purposes",
                "Interact respectfully with learning activities",
                "Keep account credentials private",
              ]}/>
            </div>
            <div>
              <div style={{fontWeight:800,fontSize:".8rem",color:"#BE123C",textTransform:"uppercase",letterSpacing:".06em",marginBottom:".6rem"}}>🚫 Users may not</div>
              <CrossList items={[
                "Attempt to bypass safety controls",
                "Generate harmful or offensive content",
                "Use the platform to harass others",
                "Disrupt or interfere with the service",
              ]}/>
            </div>
          </div>
          <InfoBox color="orange">Accounts that violate these guidelines may be suspended or terminated to maintain a safe learning environment for all users.</InfoBox>
        </>
      ),
    },
    {
      icon:"📚", title:"Permitted Use",
      accentColor:"var(--orange)", accentLight:"var(--orange-tint)", accentMist:"var(--orange-mist)",
      content:(
        <>
          <p>WordFly is licensed for personal, non-commercial educational use. Users may access the platform to participate in interactive stories, vocabulary activities, and quizzes designed to support language development.</p>
          <p style={{marginTop:".85rem"}}>Unless explicitly authorised by WordFly, users may not:</p>
          <CrossList items={[
            "Copy, reproduce, or redistribute platform content",
            "Create derivative works from our stories or software",
            "Extract or reuse large portions of the content library",
            "Use the Service for commercial purposes",
          ]}/>
          <InfoBox color="orange">All intellectual property rights in the Service remain the property of WordFly and its licensors.</InfoBox>
        </>
      ),
    },
    {
      icon:"🚫", title:"Prohibited Conduct",
      accentColor:"#BE123C", accentLight:"#FFF1F2", accentMist:"#FECDD3",
      content:(
        <>
          <p>To maintain a safe learning environment, all users agree not to:</p>
          <CrossList items={[
            "Share account credentials or allow unauthorised access",
            "Harass, bully, or harm other users",
            "Attempt to reverse-engineer or replicate our AI systems",
            "Upload or generate harmful, offensive, or infringing content",
            "Interfere with or disrupt the security of the Service",
          ]}/>
          <InfoBox color="red">Violations may result in immediate account suspension or permanent termination without refund.</InfoBox>
        </>
      ),
    },
    {
      icon:"⚖️", title:"Enforcement & Consequences",
      accentColor:"#2563EB", accentLight:"#EFF6FF", accentMist:"#BFDBFE",
      content:(
        <>
          <p>WordFly reserves the right to investigate suspected violations and take appropriate action, including:</p>
          <CheckList accent="#2563EB" accentLight="#EFF6FF" accentBorder="#BFDBFE" items={[
            "Issuing a warning for first-time minor violations",
            "Temporary suspension of account access",
            "Permanent account termination for serious or repeated violations",
            "Reporting to law enforcement where legally required",
          ]}/>
          <InfoBox color="blue">We aim to be fair and transparent in all enforcement decisions. Parents and schools will be notified of any action taken on a child's account.</InfoBox>
        </>
      ),
    },
  ];
  return (
    <PolicyPage
      setPage={setPage}
      badge="✅ Legal · Use"
      badgeBg="#F0FDF4"
      badgeColor="green"
      badgeBorder="#BBF7D0"
      title="Acceptable Use"
      titleAccent="Policy"
      subtitle="Policy"
      meta={["Effective: January 1, 2026","Last updated: March 1, 2026","Applies to: All users"]}
      sections={sections}
    />
  );
}

/* ─── BLOG PAGE ───────────────────────────────── */
function Blog({ setPage }) {
  const [activePost, setActivePost] = useState(null);

  const posts = [
    {
      slug:"vocabulary-games-for-kids",
      date:"March 8, 2026",
      readTime:"5 min read",
      category:"Learning Tips",
      categoryColor:"var(--orange)",
      categoryBg:"var(--orange-tint)",
      categoryBorder:"var(--orange-mist)",
      title:"The Best Vocabulary Learning Games for Kids (That Make Learning Fun and Effective)",
      excerpt:"Helping children build a strong vocabulary is one of the best investments parents can make. But how do you make practice fun instead of frustrating? The answer: turn it into a game.",
      hero:"📚",
      content: [
        {
          type:"intro",
          text:"Helping children build a strong vocabulary is one of the best ways parents can support their academic success. Vocabulary skills affect reading comprehension, writing ability, and overall communication. But many parents face the same challenge: how do you make vocabulary practice fun instead of frustrating? The answer is simple — turn learning into a game.",
        },
        {
          type:"h2", text:"Why Games Help Kids Learn Faster",
        },
        {
          type:"p", text:"Children naturally learn through play. Games create an environment where kids feel curious, motivated, and eager to participate.",
        },
        {
          type:"p", text:"Vocabulary games work because they:",
        },
        {
          type:"checklist", items:[
            "Encourage active participation rather than passive reading",
            "Repeat words naturally through gameplay, reinforcing memory",
            "Provide immediate feedback so kids know when they're right",
            "Make learning enjoyable rather than stressful",
          ],
        },
        {
          type:"callout",
          icon:"💡",
          text:"When kids enjoy the process, they are far more likely to remember new words — and to seek out more of them.",
        },
        {
          type:"h2", text:"Types of Vocabulary Games That Work",
        },
        {
          type:"p", text:"Parents can try several types of vocabulary games at home.",
        },
        {
          type:"h3", text:"Word Discovery Games",
        },
        {
          type:"p", text:"Children search for new words in books, conversations, or stories. Each discovery becomes an opportunity to learn meaning and pronunciation. Try asking: \"What's one word you heard today that you didn't know?\"",
        },
        {
          type:"h3", text:"Story-Building Games",
        },
        {
          type:"p", text:"Kids create stories using new vocabulary words. This helps them understand how words function in real situations — not just as definitions, but as living, breathing parts of language.",
        },
        {
          type:"h3", text:"Word Challenge Games",
        },
        {
          type:"p", text:"Short quizzes or challenges encourage children to recall meanings and use words correctly. The key is keeping them low-stakes and playful.",
        },
        {
          type:"h3", text:"Interactive Vocabulary Adventures",
        },
        {
          type:"p", text:"Digital tools now allow children to explore vocabulary through games, storytelling, and interactive challenges that adapt to their level.",
        },
        {
          type:"h2", text:"Why Context Matters",
        },
        {
          type:"p", text:"Memorizing definitions alone rarely helps children truly understand a word.",
        },
        {
          type:"compare",
          bad:  { label:"Without context", text:"Curiosity means wanting to learn something." },
          good: { label:"With context", text:"Lena's curiosity made her open the mysterious door at the end of the hallway." },
        },
        {
          type:"p", text:"Stories and games give vocabulary context, making words easier to remember — and more meaningful when children encounter them again.",
        },
        {
          type:"h2", text:"Turning Vocabulary Into an Adventure",
        },
        {
          type:"p", text:"Modern learning tools are combining storytelling, games, and personalised learning to make vocabulary practice more engaging than ever.",
        },
        {
          type:"wordfly-cta",
        },
        {
          type:"p", text:"Each lesson becomes part of an exciting journey — children are learning without even realising it.",
        },
        {
          type:"h2", text:"Helping Kids Enjoy Learning",
        },
        {
          type:"p", text:"The goal of vocabulary learning is not just to increase word counts — it's to help children develop curiosity about language. When learning feels like an adventure, kids naturally want to keep exploring.",
        },
        {
          type:"closing", text:"Vocabulary games provide a powerful way to build language skills while making the process fun, engaging, and effective.",
        },
      ],
    },
    {
      slug:"stories-vs-memorization",
      date:"March 11, 2026",
      readTime:"4 min read",
      category:"Learning Science",
      categoryColor:"var(--purple)",
      categoryBg:"var(--purple-tint)",
      categoryBorder:"var(--purple-mist)",
      title:"Why Kids Learn Vocabulary Faster Through Stories Instead of Memorization",
      excerpt:"Memorization can help in the short term — but it rarely creates lasting understanding. Here's why stories are one of the most powerful vocabulary tools educators now rely on.",
      hero:"📖",
      content: [
        {
          type:"intro",
          text:"Many parents remember learning vocabulary by memorizing lists of words and definitions. While memorization can help in the short term, it often fails to create lasting understanding. Children may remember a definition for a test but forget the word soon afterward. Today, educators increasingly recognize that stories are one of the most powerful tools for learning vocabulary.",
        },
        {
          type:"h2", text:"The Problem With Memorization",
        },
        {
          type:"p", text:"Memorization focuses on isolated information. Without context, words remain abstract — children may struggle to understand how and when to use them in real situations.",
        },
        {
          type:"compare",
          bad:  { label:"Memorization", text:"Adventure means an exciting or unusual experience." },
          good: { label:"In a story", text:"Maya packed her bag for a new adventure as she stepped onto the mysterious island." },
        },
        {
          type:"p", text:"In the story moment, the word adventure becomes part of an exciting situation — the child doesn't just know the definition, they feel it.",
        },
        {
          type:"h2", text:"Stories Give Words Meaning",
        },
        {
          type:"p", text:"Stories naturally place words inside real situations. Instead of simply learning a definition, children experience how a word functions within a narrative.",
        },
        {
          type:"checklist", items:[
            "Understand word meaning through context, not just definition",
            "Visualise situations where words are naturally used",
            "Remember vocabulary more easily through narrative memory",
            "Develop stronger reading comprehension over time",
          ],
        },
        {
          type:"h2", text:"Repetition Happens Naturally in Stories",
        },
        {
          type:"p", text:"Another benefit of stories is natural repetition. When children follow a story across multiple chapters, they encounter vocabulary words again and again — in different scenes, with different characters, in different emotional contexts.",
        },
        {
          type:"callout",
          icon:"🔁",
          text:"This repeated exposure strengthens memory and understanding far more effectively than re-reading a definition list.",
        },
        {
          type:"h2", text:"Stories Build Emotional Connections",
        },
        {
          type:"p", text:"Children remember experiences that make them feel curious, excited, or surprised. Stories create emotional connections with words. Instead of being abstract vocabulary terms, words become part of a meaningful journey — one the child was personally invested in.",
        },
        {
          type:"h2", text:"Interactive Stories Make Learning Even Stronger",
        },
        {
          type:"p", text:"New educational tools now combine storytelling with interactive elements that deepen engagement even further. Children can:",
        },
        {
          type:"checklist", items:[
            "Answer questions and challenges during the story",
            "Solve problems using the vocabulary they've just encountered",
            "Decide what happens next — making them active participants, not passive readers",
          ],
        },
        {
          type:"callout",
          icon:"💡",
          text:"These interactions keep kids engaged and give vocabulary words a personal significance — the child used that word to shape the story.",
        },
        {
          type:"wordfly-cta",
        },
        {
          type:"h2", text:"A Better Way to Learn Words",
        },
        {
          type:"p", text:"Vocabulary is the foundation of reading, writing, and communication. When children encounter words in stories instead of memorization lists, they learn faster and remember more.",
        },
        {
          type:"closing", text:"By combining storytelling, interaction, and curiosity, vocabulary learning becomes not just effective — but truly enjoyable.",
        },
      ],
    },
  ];

  // ── Article renderer ──
  const renderContent = (blocks) => blocks.map((block, i) => {
    switch(block.type) {
      case "intro":
        return <p key={i} style={{fontSize:"1.1rem",lineHeight:1.9,color:"var(--ink)",fontWeight:600,borderLeft:"3px solid var(--orange)",paddingLeft:"1.25rem",marginBottom:"1.75rem"}}>{block.text}</p>;
      case "h2":
        return <h2 key={i} style={{fontFamily:"'Short Stack',cursive",fontWeight:400,fontSize:"1.45rem",color:"var(--ink)",WebkitTextStroke:".5px var(--ink)",marginTop:"2.25rem",marginBottom:".75rem",lineHeight:1.2}}>{block.text}</h2>;
      case "h3":
        return <h3 key={i} style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:"1.05rem",color:"var(--ink)",marginTop:"1.5rem",marginBottom:".5rem"}}>{block.text}</h3>;
      case "p":
        return <p key={i} style={{lineHeight:1.85,color:"var(--ink-60)",fontWeight:600,marginBottom:"1rem",fontSize:".95rem"}}>{block.text}</p>;
      case "checklist":
        return (
          <div key={i} style={{display:"flex",flexDirection:"column",gap:".55rem",margin:"1rem 0 1.25rem"}}>
            {block.items.map((item,j)=>(
              <div key={j} style={{display:"flex",alignItems:"flex-start",gap:".75rem",background:"var(--orange-tint)",border:"1.5px solid var(--orange-mist)",borderRadius:12,padding:".7rem 1rem"}}>
                <span style={{width:20,height:20,borderRadius:"50%",background:"var(--orange)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".6rem",color:"white",fontWeight:900,flexShrink:0,marginTop:2}}>✓</span>
                <span style={{fontWeight:700,fontSize:".875rem",color:"var(--ink)",lineHeight:1.5}}>{item}</span>
              </div>
            ))}
          </div>
        );
      case "callout":
        return (
          <div key={i} style={{background:"var(--cream)",border:"1.5px solid var(--ink-06)",borderRadius:16,padding:"1.1rem 1.25rem",display:"flex",gap:".85rem",alignItems:"flex-start",margin:"1.25rem 0"}}>
            <span style={{fontSize:20,flexShrink:0,marginTop:1}}>{block.icon}</span>
            <p style={{margin:0,fontWeight:700,fontSize:".9rem",color:"var(--ink)",lineHeight:1.7,fontStyle:"italic"}}>{block.text}</p>
          </div>
        );
      case "compare":
        return (
          <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",margin:"1.25rem 0"}}>
            <div style={{background:"#FFF1F2",border:"1.5px solid #FECDD3",borderRadius:14,padding:"1.1rem 1.25rem"}}>
              <div style={{fontSize:".7rem",fontWeight:800,color:"#BE123C",textTransform:"uppercase",letterSpacing:".06em",marginBottom:".5rem"}}>❌ {block.bad.label}</div>
              <p style={{margin:0,fontSize:".88rem",fontWeight:600,color:"var(--ink)",lineHeight:1.65,fontStyle:"italic"}}>"{block.bad.text}"</p>
            </div>
            <div style={{background:"#F0FDF4",border:"1.5px solid #BBF7D0",borderRadius:14,padding:"1.1rem 1.25rem"}}>
              <div style={{fontSize:".7rem",fontWeight:800,color:"#15803D",textTransform:"uppercase",letterSpacing:".06em",marginBottom:".5rem"}}>✅ {block.good.label}</div>
              <p style={{margin:0,fontSize:".88rem",fontWeight:600,color:"var(--ink)",lineHeight:1.65,fontStyle:"italic"}}>"{block.good.text}"</p>
            </div>
          </div>
        );
      case "wordfly-cta":
        return (
          <div key={i} style={{background:"linear-gradient(135deg,var(--orange) 0%,#FF3CAC 50%,var(--purple) 100%)",borderRadius:24,padding:"2rem 2.25rem",margin:"2rem 0",textAlign:"center"}}>
            <div style={{fontSize:"2rem",marginBottom:".75rem"}}>📚</div>
            <h3 style={{fontFamily:"'Short Stack',cursive",fontWeight:400,fontSize:"1.3rem",color:"white",WebkitTextStroke:".4px rgba(255,255,255,.5)",marginBottom:".6rem",lineHeight:1.2}}>Where words come to life.</h3>
            <p style={{color:"rgba(255,255,255,.85)",fontWeight:600,fontSize:".88rem",lineHeight:1.7,marginBottom:"1.25rem",maxWidth:380,margin:"0 auto 1.25rem"}}>WordFly turns vocabulary learning into interactive AI-powered story adventures. Children learn new words through stories, interact with characters, answer fun quizzes, and choose what happens next.</p>
            <button onClick={()=>setPage("get-started")} style={{background:"white",color:"var(--orange-dark)",fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".9rem",padding:".75rem 1.75rem",borderRadius:99,border:"none",cursor:"pointer",boxShadow:"0 6px 24px rgba(0,0,0,.15)"}}>
              Start Your Child's Story →
            </button>
          </div>
        );
      case "closing":
        return (
          <div key={i} style={{background:"var(--ink)",borderRadius:18,padding:"1.5rem 1.75rem",margin:"2rem 0 0",textAlign:"center"}}>
            <p style={{margin:0,fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:"1.05rem",color:"white",lineHeight:1.7}}>{block.text}</p>
          </div>
        );
      default: return null;
    }
  });

  // ── Single article view ──
  if (activePost) {
    const post = posts.find(p => p.slug === activePost);
    if (!post) return null;
    return (
      <div style={{minHeight:"100vh",background:"white"}}>
        {/* Article header */}
        <div style={{background:"linear-gradient(145deg,#FFFBF7 0%,#FFF0E8 60%,#F4EEFF 100%)",padding:"8.5rem 1.5rem 3.5rem",position:"relative",overflow:"hidden"}}>
          <div className="blob" style={{position:"absolute",top:"-10%",right:"3%",width:360,height:360,background:"radial-gradient(circle,rgba(255,107,44,.12) 0%,transparent 70%)",filter:"blur(28px)",pointerEvents:"none"}}/>
          <div className="wf-container" style={{maxWidth:760,position:"relative",zIndex:2}}>
            <button onClick={()=>setActivePost(null)} style={{display:"inline-flex",alignItems:"center",gap:6,background:"var(--orange-tint)",border:"1.5px solid var(--orange-mist)",borderRadius:99,padding:"6px 16px",fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".88rem",color:"var(--orange-dark)",cursor:"pointer",marginBottom:"1.75rem"}}>← Back to Blog</button>
            <div style={{display:"flex",alignItems:"center",gap:".75rem",marginBottom:"1.1rem",flexWrap:"wrap"}}>
              <span style={{padding:"4px 12px",borderRadius:99,background:post.categoryBg,border:`1.5px solid ${post.categoryBorder}`,fontSize:".72rem",fontWeight:800,color:post.categoryColor,textTransform:"uppercase",letterSpacing:".06em"}}>{post.category}</span>
              <span style={{fontSize:".78rem",fontWeight:700,color:"var(--ink-60)"}}>📅 {post.date}</span>
              <span style={{fontSize:".78rem",fontWeight:700,color:"var(--ink-60)"}}>⏱️ {post.readTime}</span>
            </div>
            <h1 style={{fontFamily:"'Short Stack',cursive",fontWeight:400,fontSize:"clamp(1.6rem,4vw,2.4rem)",color:"var(--ink)",WebkitTextStroke:".5px var(--ink)",lineHeight:1.2,marginBottom:"1.5rem"}}>{post.title}</h1>
            <div style={{display:"flex",alignItems:"center",gap:".75rem"}}>
              <img src="https://i.pravatar.cc/40?img=44" alt="Maya Chen" style={{width:40,height:40,borderRadius:"50%",border:"2.5px solid var(--orange-mist)"}}/>
              <div>
                <div style={{fontWeight:800,fontSize:".88rem",color:"var(--ink)"}}>Maya Chen</div>
                <div style={{fontSize:".75rem",fontWeight:600,color:"var(--ink-60)"}}>Co-founder & CEO · Reading Specialist</div>
              </div>
            </div>
          </div>
        </div>
        {/* Article body */}
        <div style={{padding:"3rem 1.5rem 6rem"}}>
          <div className="wf-container" style={{maxWidth:760}}>
            {renderContent(post.content)}
            {/* Footer nav */}
            <div style={{borderTop:"1.5px solid var(--ink-06)",paddingTop:"2rem",marginTop:"3rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
              <button onClick={()=>setActivePost(null)} style={{display:"inline-flex",alignItems:"center",gap:6,background:"var(--orange-tint)",border:"1.5px solid var(--orange-mist)",borderRadius:99,padding:"8px 18px",fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".88rem",color:"var(--orange-dark)",cursor:"pointer"}}>← All Articles</button>
              <button onClick={()=>setPage("get-started")} className="btn-primary" style={{fontSize:".9rem"}}>Try WordFly Free 🚀</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Blog index ──
  return (
    <div style={{minHeight:"100vh",background:"var(--cream)"}}>
      {/* Header */}
      <div style={{background:"linear-gradient(145deg,#FFFBF7 0%,#FFF0E8 50%,#F4EEFF 100%)",padding:"9rem 1.5rem 4.5rem",position:"relative",overflow:"hidden"}}>
        <div className="blob"   style={{position:"absolute",top:"-10%",right:"3%",width:380,height:380,background:"radial-gradient(circle,rgba(255,107,44,.12) 0%,transparent 70%)",filter:"blur(28px)",pointerEvents:"none"}}/>
        <div className="blob-2" style={{position:"absolute",bottom:"-5%",left:"-5%",width:320,height:320,background:"radial-gradient(circle,rgba(124,58,237,.10) 0%,transparent 70%)",filter:"blur(24px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(26,15,0,.04) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none"}}/>
        <div className="wf-container" style={{position:"relative",zIndex:2,maxWidth:820}}>
          <button onClick={()=>setPage("home")} style={{display:"inline-flex",alignItems:"center",gap:6,background:"var(--orange-tint)",border:"1.5px solid var(--orange-mist)",borderRadius:99,padding:"6px 16px",fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".88rem",color:"var(--orange-dark)",cursor:"pointer",marginBottom:"2rem"}}>← Back to Home</button>
          <div className="badge" style={{marginBottom:"1.25rem"}}>✦ WordFly Blog</div>
          <SectionTitle>Words, learning, <span style={{color:"var(--orange)"}}>& adventure.</span></SectionTitle>
          <p style={{color:"var(--ink-60)",fontSize:"1rem",lineHeight:1.8,maxWidth:500,margin:"1.25rem 0 0",fontWeight:600}}>Tips for parents, insights on vocabulary learning, and stories from the WordFly team.</p>
        </div>
      </div>

      {/* Posts grid */}
      <div style={{padding:"3.5rem 1.5rem 6rem"}}>
        <div className="wf-container" style={{maxWidth:820}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:"1.75rem"}}>
            {posts.map((post,i)=>(
              <div key={i} className="card" onClick={()=>setActivePost(post.slug)} style={{padding:0,overflow:"hidden",cursor:"pointer",transition:"transform .2s, box-shadow .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 20px 48px rgba(255,107,44,.18)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="var(--shadow-card)";}}
              >
                {/* Card hero */}
                <div style={{background:"linear-gradient(135deg,var(--orange-tint),var(--purple-tint))",height:140,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"4rem",borderBottom:"1.5px solid var(--ink-06)"}}>
                  {post.hero}
                </div>
                {/* Card body */}
                <div style={{padding:"1.5rem"}}>
                  <div style={{display:"flex",alignItems:"center",gap:".6rem",marginBottom:".85rem",flexWrap:"wrap"}}>
                    <span style={{padding:"3px 10px",borderRadius:99,background:post.categoryBg,border:`1.5px solid ${post.categoryBorder}`,fontSize:".68rem",fontWeight:800,color:post.categoryColor,textTransform:"uppercase",letterSpacing:".05em"}}>{post.category}</span>
                    <span style={{fontSize:".75rem",fontWeight:600,color:"var(--ink-60)"}}>📅 {post.date}</span>
                    <span style={{fontSize:".75rem",fontWeight:600,color:"var(--ink-60)"}}>⏱️ {post.readTime}</span>
                  </div>
                  <h3 style={{fontFamily:"'Short Stack',cursive",fontWeight:400,fontSize:"1.1rem",color:"var(--ink)",WebkitTextStroke:".4px var(--ink)",lineHeight:1.3,marginBottom:".75rem"}}>{post.title}</h3>
                  <p style={{fontSize:".85rem",color:"var(--ink-60)",fontWeight:600,lineHeight:1.7,marginBottom:"1.25rem"}}>{post.excerpt}</p>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{display:"flex",alignItems:"center",gap:".5rem"}}>
                      <img src="https://i.pravatar.cc/32?img=44" alt="Maya Chen" style={{width:28,height:28,borderRadius:"50%",border:"2px solid var(--orange-mist)"}}/>
                      <span style={{fontSize:".75rem",fontWeight:700,color:"var(--ink-60)"}}>Maya Chen</span>
                    </div>
                    <span style={{fontSize:".8rem",fontWeight:700,color:"var(--orange)"}}>Read article →</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Coming soon placeholder */}
            <div style={{background:"white",borderRadius:24,border:"1.5px dashed var(--ink-12)",padding:"3rem 2rem",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",gap:".75rem",minHeight:320}}>
              <div style={{fontSize:"2.5rem"}}>✍️</div>
              <div style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:"1rem",color:"var(--ink)"}}>More articles coming soon</div>
              <p style={{fontSize:".82rem",color:"var(--ink-60)",fontWeight:600,lineHeight:1.65,maxWidth:220}}>Tips on reading, vocabulary science, and parent guides. Stay tuned.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── GET STARTED / DEMO PAGE ────────────────── */
function GetStartedPage({ setPage }) {
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"8rem 1.5rem 4rem",background:"linear-gradient(145deg,#FFFBF7,#F4EEFF)"}}>
      <div style={{textAlign:"center",maxWidth:480}}>
        <div style={{fontSize:"4.5rem",marginBottom:"1.5rem"}}>🎉</div>
        <h2 style={{fontFamily:"'Fraunces',serif",fontWeight:900,fontSize:"2.5rem",color:"var(--ink)",marginBottom:"1rem"}}>Let's get started!</h2>
        <p style={{color:"var(--ink-60)",marginBottom:"2rem",lineHeight:1.75,fontWeight:600}}>This is a demo landing page for WordFly. In the real app, you'd choose your child's grade, pick a story genre, and begin their first adventure in under 2 minutes.</p>
        <button className="btn-primary" onClick={()=>setPage("home")}>← Back to Home</button>
      </div>
    </div>
  );
}

function GenericPage({ title, setPage }) {
  return (
    <div style={{minHeight:"100vh",padding:"8rem 1.5rem 4rem",background:"var(--cream)"}}>
      <div style={{maxWidth:720,margin:"0 auto"}}>
        <button onClick={()=>setPage("home")} style={{background:"none",border:"none",cursor:"pointer",color:"var(--orange)",fontWeight:700,marginBottom:"2rem",display:"flex",alignItems:"center",gap:".5rem",fontFamily:"'Baloo 2',cursive",fontSize:".95rem"}}>← Back to Home</button>
        <h2 style={{marginBottom:"1rem",fontSize:"2.2rem"}}>{title}</h2>
        <p style={{color:"var(--ink-60)",lineHeight:1.75,fontWeight:600}}>This page is under construction. <button onClick={()=>setPage("home")} style={{background:"none",border:"none",cursor:"pointer",color:"var(--orange)",fontWeight:700,fontFamily:"inherit"}}>Return home</button>.</p>
      </div>
    </div>
  );
}

/* ─── ROOT ───────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const nav = (p) => { setPage(p); setTimeout(()=>window.scrollTo({top:0,behavior:"smooth"}),10); };

  const renderPage = () => {
    if (page==="get-started"||page==="demo") return <GetStartedPage setPage={nav}/>;
    if (page==="404") return <NotFoundPage setPage={nav}/>;
    if (page==="about-us") return <AboutUs setPage={nav}/>;
    if (page==="blog")     return <Blog setPage={nav}/>;
    if (page==="privacy-policy") return <PrivacyPolicy setPage={nav}/>;
    if (page==="contact-us")     return <ContactUs setPage={nav}/>;
    if (page==="trust-center")      return <TrustCenter setPage={nav}/>;
    if (page==="terms-of-service"||page==="terms-of-use") return <TermsOfService setPage={nav}/>;
    if (page==="cookie-policy")     return <CookiesPolicy setPage={nav}/>;
    if (page==="parental-consent")  return <ParentalConsent setPage={nav}/>;
    if (page==="childrens-privacy") return <ChildrensPrivacy setPage={nav}/>;
    if (page==="data-security")     return <DataSecurity setPage={nav}/>;
    if (page==="ai-transparency")      return <AiTransparency setPage={nav}/>;
    if (page==="acceptable-use")       return <AcceptableUse setPage={nav}/>;
    if (page==="third-party-services") return <ThirdPartyServices setPage={nav}/>;
    if (page==="home") return <>
      <Hero setPage={nav}/>
      <TrustBar/>
      <HowItWorks/>
      <StoryDemo/>
      <GradeLevels/>
      <Features/>
      <Stats/>
      <Testimonials/>
      <Pricing setPage={nav}/>
      <FAQ/>
      <CTABanner setPage={nav}/>
    </>;
    const knownRoutes = ["about-us","blog","careers","press","terms-of-use","contact-us","privacy-policy","trust-center","cookie-policy","data-security","terms-of-service","parental-consent","childrens-privacy","ai-transparency","acceptable-use","third-party-services","how-it-works","grade-levels","story-themes","parent-dashboard"];
    if (!knownRoutes.includes(page)) return <NotFoundPage setPage={nav}/>;
    return <GenericPage title={page.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase())} setPage={nav}/>;
  };

  return (
    <>
      <GlobalStyles/>
      <div style={{fontFamily:"'Baloo 2',cursive"}}>
        <Navbar setPage={nav} page={page}/>
        <PageTransition pageKey={page}>
          {renderPage()}
        </PageTransition>
        <Footer setPage={nav} page={page}/>
        <button className="pulse-glow" onClick={()=>nav("get-started")} title="Get started"
          style={{position:"fixed",bottom:90,right:28,zIndex:999,width:54,height:54,background:"linear-gradient(135deg,var(--orange),#FF3CAC)",border:"none",borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:"0 8px 28px rgba(255,107,44,.5)",transition:"transform .2s"}}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
        >🤖</button>
      </div>
      <CookieBar/>
    </>
  );
}
