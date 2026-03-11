import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES + DESIGN TOKENS
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,900&display=swap');

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
      --white:        #FFFFFF;
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

    @keyframes floatY  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
    @keyframes floatY2 { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-10px) rotate(3deg)} }
    @keyframes blobMorph { 0%,100%{border-radius:60% 40% 55% 45%/50% 60% 40% 50%;transform:rotate(0deg) scale(1)} 33%{border-radius:45% 55% 40% 60%/60% 40% 55% 45%;transform:rotate(120deg) scale(1.06)} 66%{border-radius:55% 45% 60% 40%/40% 55% 45% 60%;transform:rotate(240deg) scale(0.95)} }
    @keyframes revealUp { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
    @keyframes marqueeScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes pulseGlow { 0%,100%{box-shadow:0 0 0 0 rgba(255,107,44,0.55)} 50%{box-shadow:0 0 0 14px rgba(255,107,44,0)} }
    @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
    @keyframes blinkCursor { 0%,100%{border-color:var(--orange)} 50%{border-color:transparent} }

    .float-1 { animation: floatY 5s ease-in-out infinite; }
    .float-2 { animation: floatY 5s ease-in-out infinite 1.2s; }
    .float-3 { animation: floatY2 6s ease-in-out infinite 0.6s; }
    .blob    { animation: blobMorph 20s ease-in-out infinite; }
    .blob-2  { animation: blobMorph 26s ease-in-out infinite 4s; }
    .spin-slow { animation: spinSlow 28s linear infinite; }
    .marquee-track { animation: marqueeScroll 32s linear infinite; }
    .pulse-glow { animation: pulseGlow 2.2s ease-in-out infinite; }
    .grad-shift {
      background: linear-gradient(270deg, var(--orange), #FF3CAC, var(--purple), var(--orange));
      background-size: 300% 300%;
      animation: gradShift 5s ease infinite;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .reveal { animation: revealUp 0.65s cubic-bezier(.22,.68,0,1.2) forwards; }

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

    h1,h2,h3 { font-family:'Fraunces',serif; line-height:1.1; letter-spacing:-.02em; }
    h1 { font-size:clamp(2.4rem,5.5vw,4.2rem); font-weight:900; }
    h2 { font-size:clamp(1.9rem,4vw,3rem); font-weight:900; }
    h3 { font-size:1.2rem; font-weight:700; }
    p  { line-height:1.72; }

    .wf-section { padding:6rem 1.5rem; }
    .wf-container { max-width:1160px; margin:0 auto; }
    .wf-section-header { text-align:center; margin-bottom:3.5rem; }
  `}</style>
);

/* ─── NAVBAR ─────────────────────────────────── */
function Navbar({ setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:999,padding:"0 1.5rem",
      background: scrolled ? "rgba(255,251,247,0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(18px)" : "none",
      borderBottom: scrolled ? "1px solid var(--ink-06)" : "1px solid transparent",
      transition:"all .3s ease",
    }}>
      <div style={{maxWidth:1160,margin:"0 auto",height:68,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={() => setPage("home")} style={{display:"flex",alignItems:"center",gap:10,background:"none",border:"none",cursor:"pointer"}}>
          <div style={{width:40,height:40,background:"var(--orange)",borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,transform:"rotate(8deg)",boxShadow:"0 4px 14px rgba(255,107,44,.45)"}}>📚</div>
          <span style={{fontFamily:"'Fraunces',serif",fontWeight:900,fontSize:"1.45rem",color:"var(--ink)",letterSpacing:"-.03em"}}>Word<span style={{color:"var(--orange)"}}>Fly</span></span>
        </button>
        <div style={{display:"flex",alignItems:"center",gap:"1.75rem"}}>
          {[["How It Works","#how"],["Features","#features"],["Grades","#grades"],["Pricing","#pricing"]].map(([label,href]) => (
            <a key={label} href={href} style={{color:"var(--ink-60)",fontWeight:600,fontSize:".95rem",textDecoration:"none",transition:"color .2s"}}
              onMouseEnter={e=>e.target.style.color="var(--orange)"} onMouseLeave={e=>e.target.style.color="var(--ink-60)"}>{label}</a>
          ))}
          <button className="btn-primary pulse-glow" style={{padding:".6rem 1.4rem",fontSize:".9rem"}} onClick={()=>setPage("get-started")}>Try Free 🚀</button>
        </div>
      </div>
    </nav>
  );
}

/* ─── HERO ───────────────────────────────────── */
function Hero({ setPage }) {
  const words = ["luminous","tenacious","serendipity","extraordinary","perseverant","ephemeral"];
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
      <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
        <div className="blob" style={{position:"absolute",top:"-15%",right:"5%",width:560,height:560,background:"radial-gradient(circle,rgba(255,107,44,.14) 0%,transparent 70%)",filter:"blur(20px)"}}/>
        <div className="blob-2" style={{position:"absolute",bottom:"0%",left:"-8%",width:480,height:480,background:"radial-gradient(circle,rgba(124,58,237,.13) 0%,transparent 70%)",filter:"blur(20px)"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(26,15,0,.07) 1px,transparent 1px)",backgroundSize:"28px 28px",opacity:.6}}/>
      </div>

      <div className="wf-container" style={{padding:"7rem 1.5rem 4rem",position:"relative",zIndex:2}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center"}}>

          {/* Copy */}
          <div style={{display:"flex",flexDirection:"column",gap:"1.5rem",alignItems:"flex-start"}}>
            <div className="badge reveal">✨ AI-Powered · Grades 1–8 · Ad-Free</div>

            <h1 className="reveal" style={{animationDelay:"80ms"}}>
              Where kids learn big words through{" "}
              <span style={{color:"var(--orange)"}}>their own</span>{" "}
              <span style={{fontStyle:"italic",color:"var(--purple)"}}>stories</span>
            </h1>

            <p className="reveal" style={{animationDelay:"160ms",color:"var(--ink-60)",fontSize:"1.1rem",maxWidth:480}}>
              WordFly uses AI to build personalized adventures around <em>your child's choices</em>, teaching grade-level vocabulary naturally — woven into plots they actually care about.
            </p>

            {/* Live typewriter */}
            <div className="reveal card" style={{animationDelay:"220ms",padding:"1rem 1.5rem",display:"inline-flex",alignItems:"center",gap:".75rem",borderColor:"var(--orange-mist)"}}>
              <span style={{fontSize:"1.5rem"}}>📖</span>
              <span style={{color:"var(--ink-60)",fontSize:".9rem",fontWeight:600}}>Today's word:</span>
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
              <p style={{color:"var(--ink-60)",fontSize:".875rem",fontWeight:600}}><strong style={{color:"var(--ink)"}}>12,000+</strong> kids already learning</p>
            </div>
          </div>

          {/* App mockup */}
          <div style={{position:"relative",display:"flex",justifyContent:"center"}}>
            <div className="spin-slow" style={{position:"absolute",width:440,height:440,border:"1.5px dashed rgba(255,107,44,.2)",borderRadius:"50%",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>

            {/* Main card */}
            <div className="float-1 card" style={{width:330,padding:"1.5rem",position:"relative",zIndex:3,boxShadow:"var(--shadow-float)"}}>
              <div style={{position:"absolute",top:-12,right:20,background:"var(--purple)",color:"white",fontWeight:700,fontSize:".72rem",padding:"3px 12px",borderRadius:99}}>Grade 4 · Fantasy</div>
              <div style={{display:"flex",gap:5,marginBottom:"1rem"}}>
                {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} style={{width:10,height:10,borderRadius:"50%",background:c}}/>)}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:".75rem",marginBottom:"1rem"}}>
                <div style={{width:46,height:46,borderRadius:"50%",background:"linear-gradient(135deg,#FF6B2C,#FEBC2E)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🦊</div>
                <div>
                  <div style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:".95rem",color:"var(--ink)"}}>The Enchanted Forest</div>
                  <div style={{fontSize:".72rem",color:"var(--ink-60)",fontWeight:600}}>⭐ 320 XP · Chapter 2</div>
                </div>
              </div>
              <div style={{background:"var(--orange-tint)",borderRadius:14,padding:".9rem 1rem",marginBottom:"1rem",borderLeft:"3px solid var(--orange)"}}>
                <p style={{fontSize:".82rem",color:"var(--ink)",lineHeight:1.65}}>
                  Finn crept into the <span style={{background:"var(--orange)",color:"white",fontWeight:700,borderRadius:5,padding:"1px 6px",cursor:"pointer"}}>luminous</span> cave. Strange glowing moss covered every wall — more beautiful, and more <span style={{background:"var(--purple-mist)",color:"var(--purple)",fontWeight:700,borderRadius:5,padding:"1px 6px"}}>mysterious</span>, than anything he'd ever seen…
                </p>
              </div>
              <p style={{fontSize:".7rem",fontWeight:800,color:"var(--ink-35)",marginBottom:".5rem",textTransform:"uppercase",letterSpacing:".06em"}}>What does Finn do?</p>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {[["🔦","Explore deeper into the cave",true],["🏃","Run back to the village",false]].map(([ic,t,act],i)=>(
                  <button key={i} style={{padding:".6rem .9rem",borderRadius:12,background:act?"var(--orange-tint)":"white",border:`1.5px solid ${act?"var(--orange)":"var(--ink-06)"}`,color:act?"var(--orange-dark)":"var(--ink-60)",fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".8rem",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:".5rem",transition:"all .18s"}}>{ic} {t}</button>
                ))}
              </div>
              <div style={{marginTop:"1rem",display:"flex",alignItems:"center",gap:".6rem"}}>
                <span style={{fontSize:".7rem",fontWeight:700,color:"var(--ink-60)"}}>Daily XP</span>
                <div style={{flex:1,height:7,background:"var(--ink-06)",borderRadius:99,overflow:"hidden"}}>
                  <div style={{width:"68%",height:"100%",background:"linear-gradient(90deg,var(--orange),#FF8F5E)",borderRadius:99}}/>
                </div>
                <span style={{fontSize:".7rem",fontWeight:800,color:"var(--orange)"}}>68%</span>
              </div>
            </div>

            {/* Floating word def */}
            <div className="float-2 card" style={{position:"absolute",bottom:"6%",left:"-12%",padding:".85rem 1.1rem",zIndex:4,maxWidth:190,boxShadow:"var(--shadow-float)"}}>
              <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:".35rem"}}><span style={{fontSize:16}}>💡</span><span style={{fontWeight:800,fontSize:".8rem",color:"var(--orange)"}}>luminous</span></div>
              <p style={{fontSize:".73rem",color:"var(--ink-60)",lineHeight:1.5}}>adj. full of light; bright and shining</p>
              <div style={{marginTop:".4rem",display:"flex",gap:4}}>
                {["🔊","📝","✅"].map(e=><div key={e} style={{width:24,height:24,borderRadius:7,background:"var(--orange-tint)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,cursor:"pointer"}}>{e}</div>)}
              </div>
            </div>

            {/* Streak */}
            <div className="float-3 card" style={{position:"absolute",top:"8%",right:"-8%",padding:".7rem 1rem",zIndex:4,background:"var(--purple)",borderColor:"transparent",boxShadow:"0 12px 32px rgba(124,58,237,.4)"}}>
              <div style={{display:"flex",alignItems:"center",gap:".5rem"}}>
                <span style={{fontSize:18}}>🔥</span>
                <div><div style={{fontWeight:800,fontSize:".82rem",color:"white"}}>12-Day Streak!</div><div style={{fontSize:".68rem",color:"rgba(255,255,255,.65)"}}>Keep going!</div></div>
              </div>
            </div>

            {/* Quiz pass */}
            <div className="float-1 card" style={{animationDelay:"2s",position:"absolute",top:"38%",right:"-15%",padding:".7rem 1rem",zIndex:4,boxShadow:"var(--shadow-float)"}}>
              <div style={{display:"flex",alignItems:"center",gap:".5rem"}}>
                <div style={{width:30,height:30,borderRadius:10,background:"#DCFCE7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>✅</div>
                <div><div style={{fontWeight:800,fontSize:".78rem",color:"var(--ink)"}}>Quiz Passed!</div><div style={{fontSize:".65rem",color:"var(--green)",fontWeight:700}}>+50 XP earned</div></div>
              </div>
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
  const items = ["📚 500+ Vocabulary Words","🎯 Grades 1–8 Adaptive","🔒 COPPA Compliant","🚫 Zero Ads","🏫 Loved in 600+ Schools","⭐ 4.9 App Store Rating","🧠 Research-Backed","👨‍👩‍👧 12,000+ Families","📖 AI-Generated Stories","🏆 EdTech Award 2025"];
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
    {icon:"📖",num:"03",color:"#D97706",bg:"#FFFBEB",border:"#FDE68A",title:"Words Appear In Context",desc:"Target vocabulary is woven naturally into the narrative. Kids tap a highlighted word to see its meaning, hear it pronounced, and see it in a sentence."},
    {icon:"⚡",num:"04",color:"var(--green)",bg:"#F0FDF4",border:"#BBF7D0",title:"Light Quiz Unlocks Next Chapter",desc:"A quick 3-question quiz on the story's vocabulary unlocks the next chapter. Pass it, earn XP, and dive deeper into the adventure."},
  ];

  return (
    <section id="how" className="wf-section" style={{background:"white"}}>
      <div className="wf-container">
        <div className="wf-section-header">
          <div className="badge" style={{marginBottom:"1rem"}}>✦ How It Works</div>
          <h2>Learning disguised as <span style={{color:"var(--orange)"}}>storytelling</span></h2>
          <p style={{color:"var(--ink-60)",marginTop:"1rem",fontSize:"1.05rem",maxWidth:500,margin:"1rem auto 0"}}>Four simple steps that have kids learning 3× more vocabulary — without it ever feeling like studying.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"1.25rem"}}>
          {steps.map((s,i)=>(
            <div key={i} className="card" style={{padding:"2rem",border:`1.5px solid ${s.border}`,background:s.bg,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:"1rem",right:"1.25rem",fontFamily:"'Fraunces',serif",fontWeight:900,fontSize:"4rem",color:"rgba(0,0,0,.04)",lineHeight:1}}>{s.num}</div>
              <div style={{width:54,height:54,borderRadius:16,background:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:"1.25rem",boxShadow:`0 4px 14px ${s.border}`}}>{s.icon}</div>
              <h3 style={{marginBottom:".6rem",color:s.color}}>{s.title}</h3>
              <p style={{fontSize:".9rem",color:"var(--ink-60)",lineHeight:1.7}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── STORY DEMO (interactive) ───────────────── */
function StoryDemo() {
  const [step, setStep] = useState(0);
  const [showDef, setShowDef] = useState(false);

  const story = [
    { text: (tap) => <p style={{fontSize:".85rem",lineHeight:1.7,color:"var(--ink)"}}>Maya discovered a <span onClick={tap} style={{background:showDef?"var(--orange)":"var(--orange-mist)",color:showDef?"white":"var(--orange-dark)",fontWeight:700,borderRadius:6,padding:"2px 8px",cursor:"pointer",textDecoration:"underline dotted",transition:"all .2s"}}>perseverant</span> little sprout growing through the cracked sidewalk. No matter how many boots had stomped above it, the plant kept pushing upward…</p>,
      def:{ word:"perseverant", meaning:"continuing despite difficulty or delay", example:'"Her perseverant spirit helped her finish the marathon."' },
      choices:["🌱 Water the little plant","🔎 Dig it up to examine it"] },
    { text: () => <p style={{fontSize:".85rem",lineHeight:1.7,color:"var(--ink)"}}>Maya carefully watered the sprout. Days passed. Then weeks. The plant grew <span style={{background:"var(--purple-mist)",color:"var(--purple)",fontWeight:700,borderRadius:6,padding:"2px 8px"}}>magnificent</span> — taller than Maya herself, with silver leaves that shimmered in the moonlight…</p>,
      def:null,
      choices:["🌙 Come back at midnight","👩‍👩‍👧 Tell the whole neighborhood"] },
  ];
  const cur = story[step % story.length];

  return (
    <section className="wf-section" style={{background:"linear-gradient(160deg,#FFF4EE 0%,#F4EEFF 100%)"}}>
      <div className="wf-container">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center"}}>
          <div>
            <div className="badge" style={{marginBottom:"1rem"}}>✦ Live Demo</div>
            <h2>See a real story <span style={{color:"var(--orange)"}}>in action</span></h2>
            <p style={{color:"var(--ink-60)",marginTop:"1rem",lineHeight:1.75,fontSize:"1rem"}}>This is what your child actually sees. Vocabulary words are highlighted inside the story — tap one to instantly see the definition, hear it, and save it. No interruptions. No boring lists.</p>
            <div style={{marginTop:"2rem",display:"flex",flexDirection:"column",gap:".75rem"}}>
              {[["👆","Tap any highlighted word to see its meaning"],["🎧","Audio pronunciation built in for every word"],["📝","Story choices reinforce word usage naturally"],["⚡","Quick quiz after each chapter locks in retention"]].map(([ic,t],i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:".75rem"}}>
                  <div style={{width:34,height:34,borderRadius:10,background:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0,boxShadow:"var(--shadow-card)"}}>{ic}</div>
                  <p style={{color:"var(--ink-60)",fontSize:".9rem",lineHeight:1.6,marginTop:4}}>{t}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="card" style={{padding:"1.75rem",boxShadow:"var(--shadow-float)",maxWidth:400,margin:"0 auto"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.25rem"}}>
                <div style={{display:"flex",alignItems:"center",gap:".6rem"}}>
                  <span style={{fontSize:22}}>📚</span>
                  <div>
                    <div style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:".9rem"}}>The Silver Sprout</div>
                    <div style={{fontSize:".68rem",color:"var(--ink-60)",fontWeight:600}}>Grade 3 · Chapter {step+1}</div>
                  </div>
                </div>
                <div style={{background:"var(--orange-tint)",border:"1px solid var(--orange-mist)",color:"var(--orange)",fontWeight:700,fontSize:".72rem",padding:"3px 10px",borderRadius:99}}>⭐ {150+step*80} XP</div>
              </div>

              <div style={{background:"var(--cream)",borderRadius:14,padding:"1rem",marginBottom:"1rem",minHeight:90}}>
                {cur.text(() => setShowDef(!showDef))}
              </div>

              {showDef && cur.def && (
                <div style={{background:"var(--orange)",borderRadius:14,padding:".9rem 1rem",marginBottom:"1rem"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <span style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:"1rem",color:"white"}}>{cur.def.word}</span>
                    <button onClick={()=>setShowDef(false)} style={{background:"rgba(255,255,255,.2)",border:"none",color:"white",cursor:"pointer",borderRadius:"50%",width:20,height:20,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                  </div>
                  <p style={{fontSize:".78rem",color:"rgba(255,255,255,.9)",marginTop:".25rem"}}>adj. {cur.def.meaning}</p>
                  <p style={{fontSize:".75rem",color:"rgba(255,255,255,.7)",marginTop:".4rem",fontStyle:"italic"}}>{cur.def.example}</p>
                  <div style={{display:"flex",gap:6,marginTop:".6rem"}}>
                    {["🔊 Hear it","📝 Save word"].map(b=><button key={b} style={{background:"rgba(255,255,255,.18)",border:"1px solid rgba(255,255,255,.3)",color:"white",fontFamily:"'Baloo 2',cursive",fontWeight:600,fontSize:".72rem",padding:"3px 10px",borderRadius:99,cursor:"pointer"}}>{b}</button>)}
                  </div>
                </div>
              )}

              <p style={{fontSize:".7rem",fontWeight:800,color:"var(--ink-35)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:".5rem"}}>What should Maya do?</p>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {cur.choices.map((c,i)=>(
                  <button key={i} onClick={()=>{setStep(step+1);setShowDef(false);}} style={{padding:".65rem 1rem",borderRadius:12,textAlign:"left",background:i===0?"var(--orange-tint)":"white",border:`1.5px solid ${i===0?"var(--orange)":"var(--ink-12)"}`,color:i===0?"var(--orange-dark)":"var(--ink-60)",fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".82rem",cursor:"pointer",transition:"all .18s"}}
                    onMouseEnter={e=>e.currentTarget.style.transform="scale(1.01)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}
                  >{c}</button>
                ))}
              </div>
              <p style={{fontSize:".68rem",color:"var(--ink-35)",textAlign:"center",marginTop:".75rem"}}>
                {showDef ? "✅ Word saved to your dictionary!" : "👆 Tap the orange word to see its meaning"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── GRADE LEVELS ───────────────────────────── */
function GradeLevels() {
  const [active, setActive] = useState(3);
  const grades = [
    {g:1,e:"🌱",theme:"Simple animals & nature tales",words:["big","happy","soft","climb","wonder"],color:"#FFF4EE",accent:"#FF6B2C"},
    {g:2,e:"🌼",theme:"Magical creatures & friendship",words:["curious","gentle","brave","shadow","sparkle"],color:"#FFFBEB",accent:"#D97706"},
    {g:3,e:"🌿",theme:"Adventurers & hidden worlds",words:["perseverant","luminous","ancient","journey","discover"],color:"#F0FDF4",accent:"#16A34A"},
    {g:4,e:"🔭",theme:"Inventors & mystery solvers",words:["hypothesis","formidable","expedition","ingenious","vibrant"],color:"#EFF6FF",accent:"#2563EB"},
    {g:5,e:"🗺️",theme:"Epic quests & lost civilizations",words:["treacherous","tenacious","sovereignty","analyze","dilemma"],color:"#F5F3FF",accent:"#7C3AED"},
    {g:6,e:"🌌",theme:"Space exploration & time travel",words:["metaphorical","circumnavigate","eloquent","paradox","ambiguous"],color:"#FFF4EE",accent:"#FF6B2C"},
    {g:7,e:"⚗️",theme:"Political intrigue & science labs",words:["serendipity","ephemeral","juxtapose","proliferate","rhetoric"],color:"#FDF2F8",accent:"#C026D3"},
    {g:8,e:"📜",theme:"Historical mysteries & dystopias",words:["extrapolate","intrinsic","paradigm","sovereignty","corroborate"],color:"#F8F9FA",accent:"#334155"},
  ];
  const g = grades[active-1];

  return (
    <section id="grades" className="wf-section" style={{background:"var(--cream)"}}>
      <div className="wf-container">
        <div className="wf-section-header">
          <div className="badge" style={{marginBottom:"1rem"}}>✦ Grade Levels</div>
          <h2>Perfectly matched to <span style={{color:"var(--orange)"}}>every grade</span></h2>
          <p style={{color:"var(--ink-60)",marginTop:"1rem",fontSize:"1.05rem",maxWidth:460,margin:"1rem auto 0"}}>The AI automatically selects vocabulary for Grades 1–8, aligned with school curricula and your child's reading level.</p>
        </div>

        <div style={{display:"flex",gap:".5rem",flexWrap:"wrap",justifyContent:"center",marginBottom:"2.5rem"}}>
          {grades.map(gr=>(
            <button key={gr.g} onClick={()=>setActive(gr.g)} style={{padding:".5rem 1.1rem",borderRadius:99,background:active===gr.g?"var(--orange)":"white",color:active===gr.g?"white":"var(--ink-60)",border:`1.5px solid ${active===gr.g?"var(--orange)":"var(--ink-12)"}`,fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".875rem",cursor:"pointer",transition:"all .2s"}}>
              {gr.e} Grade {gr.g}
            </button>
          ))}
        </div>

        <div className="card" style={{padding:"2.5rem",background:g.color,borderColor:"transparent",maxWidth:780,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2rem",alignItems:"center"}}>
            <div>
              <div style={{fontSize:"3.5rem",marginBottom:".75rem"}}>{g.e}</div>
              <h3 style={{fontFamily:"'Fraunces',serif",fontWeight:900,fontSize:"1.5rem",color:g.accent,marginBottom:".5rem"}}>Grade {g.g}</h3>
              <p style={{color:"var(--ink-60)",fontSize:".9rem",marginBottom:"1.25rem"}}>Story themes: <strong style={{color:"var(--ink)"}}>{g.theme}</strong></p>
              <button className="btn-primary" style={{background:g.accent,boxShadow:`0 8px 24px -4px ${g.accent}55`,fontSize:".9rem",padding:".65rem 1.5rem"}}>Start Grade {g.g} →</button>
            </div>
            <div>
              <p style={{fontSize:".78rem",fontWeight:800,color:"var(--ink-35)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:".75rem"}}>Sample vocabulary words</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:".5rem"}}>
                {g.words.map(w=>(
                  <span key={w} style={{padding:"5px 14px",borderRadius:99,background:"white",border:`1.5px solid ${g.accent}33`,color:g.accent,fontWeight:700,fontSize:".82rem"}}>{w}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURES ───────────────────────────────── */
function Features() {
  const features = [
    {icon:"🤖",title:"AI-Generated Stories",desc:"Every story is unique, generated in real-time based on your child's grade, genre preference, and the choices they make as the plot unfolds.",span:2},
    {icon:"✏️",title:"Child-Driven Choices",desc:"Kids are co-authors. Their decisions steer the narrative — keeping them emotionally invested, which is exactly when real learning happens.",span:1},
    {icon:"📊",title:"Parent Dashboard",desc:"See every word your child learned, quiz scores, daily streaks, and a clean weekly progress report.",span:1},
    {icon:"⚡",title:"Light, Fun Quizzes",desc:"3–5 questions after each chapter. Short enough not to feel like a test. Targeted enough to lock in retention.",span:1},
    {icon:"🔒",title:"Safe & COPPA Compliant",desc:"Zero ads. Zero data selling. A fully safe environment built for children. Parents stay in control.",span:1},
    {icon:"🌍",title:"20+ Story Genres",desc:"Space, fantasy, mystery, ocean, history, sports — vocabulary is tailored to the genre so words feel at home in every story.",span:2},
  ];

  return (
    <section id="features" className="wf-section" style={{background:"white"}}>
      <div className="wf-container">
        <div className="wf-section-header">
          <div className="badge" style={{marginBottom:"1rem"}}>✦ Features</div>
          <h2>Everything kids need.<br/><span style={{color:"var(--purple)"}}>Everything parents want.</span></h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.25rem"}}>
          {features.map((f,i)=>(
            <div key={i} className="card" style={{padding:"2rem",gridColumn:`span ${f.span}`}}>
              <div style={{width:52,height:52,borderRadius:16,background:i%2===0?"var(--orange-tint)":"var(--purple-tint)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:"1.1rem"}}>{f.icon}</div>
              <h3 style={{marginBottom:".5rem",fontSize:"1.05rem"}}>{f.title}</h3>
              <p style={{color:"var(--ink-60)",fontSize:".875rem",lineHeight:1.7}}>{f.desc}</p>
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
    {q:"I love the parent dashboard — I can see every word she's mastered. The progress tracking actually motivates her too!",n:"Priya K.",r:"Mom of 7-year-old, Grade 2",img:44},
    {q:"My twins literally compete on the family leaderboard. They've learned 300 new words this month. As a parent I couldn't be happier.",n:"James L.",r:"Dad of twin 11-year-olds, Grade 6",img:15},
    {q:"Safe, ad-free, and genuinely educational. I let my kid play freely, and that peace of mind alone is worth the subscription.",n:"Amara O.",r:"Mom of 9-year-old, Grade 4",img:46},
  ];

  return (
    <section className="wf-section" style={{background:"var(--ink)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:800,height:800,background:"radial-gradient(circle,rgba(255,107,44,.1) 0%,transparent 65%)",pointerEvents:"none"}}/>
      <div className="wf-container" style={{position:"relative"}}>
        <div className="wf-section-header">
          <div className="badge" style={{background:"rgba(255,107,44,.12)",borderColor:"rgba(255,107,44,.2)",color:"var(--orange-soft)",marginBottom:"1rem"}}>✦ Parent Reviews</div>
          <h2 style={{color:"white"}}>Parents <span style={{color:"var(--orange)"}}>love</span> it.<br/>Kids <span style={{fontStyle:"italic",color:"var(--orange-soft)"}}>can't stop</span>.</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"1.25rem"}}>
          {reviews.map((r,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.05)",border:"1.5px solid rgba(255,255,255,.07)",borderRadius:28,padding:"1.75rem",transition:"background .25s",cursor:"default"}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,107,44,.08)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.05)"}
            >
              <div style={{display:"flex",gap:2,marginBottom:"1rem"}}>{[1,2,3,4,5].map(s=><span key={s} style={{color:"#F59E0B",fontSize:13}}>★</span>)}</div>
              <p style={{color:"rgba(255,255,255,.82)",fontSize:".88rem",lineHeight:1.75,marginBottom:"1.5rem",fontStyle:"italic"}}>"{r.q}"</p>
              <div style={{display:"flex",alignItems:"center",gap:".75rem"}}>
                <img src={`https://i.pravatar.cc/36?img=${r.img}`} alt={r.n} style={{width:38,height:38,borderRadius:"50%",border:"2px solid var(--orange)"}}/>
                <div>
                  <div style={{fontWeight:700,fontSize:".82rem",color:"white"}}>{r.n}</div>
                  <div style={{fontSize:".7rem",color:"rgba(255,255,255,.4)"}}>{r.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PRICING ────────────────────────────────── */
function Pricing({ setPage }) {
  const plans = [
    {name:"Free",price:"$0",per:"",desc:"Perfect for trying it out",features:["1 child profile","3 AI stories per week","Grades 1–3 vocabulary","Basic quiz results"],highlight:false,cta:"Start for Free"},
    {name:"Premium",price:"$8.99",per:"/mo",desc:"Everything your child needs",features:["1 child profile","Unlimited AI stories","All grades 1–8","Full parent dashboard","Word collection journal","Audio pronunciations","7-day free trial"],highlight:true,cta:"Start Free Trial",badge:"Most Popular"},
    {name:"Family",price:"$16.99",per:"/mo",desc:"For the whole household",features:["Up to 4 child profiles","All Premium features","Family leaderboard","Sibling word battles","Priority support","7-day free trial"],highlight:false,cta:"Start Free Trial"},
  ];

  return (
    <section id="pricing" className="wf-section" style={{background:"var(--cream)"}}>
      <div className="wf-container">
        <div className="wf-section-header">
          <div className="badge" style={{marginBottom:"1rem"}}>✦ Pricing</div>
          <h2>Simple, honest <span style={{color:"var(--orange)"}}>pricing</span></h2>
          <p style={{color:"var(--ink-60)",marginTop:"1rem",fontSize:"1rem",maxWidth:420,margin:"1rem auto 0"}}>No hidden fees. Cancel anytime. Free trial needs no credit card.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem",maxWidth:960,margin:"0 auto",alignItems:"start"}}>
          {plans.map((p,i)=>(
            <div key={i} style={{background:p.highlight?"var(--orange)":"white",borderRadius:28,padding:"2.5rem 2rem",border:p.highlight?"none":"1.5px solid var(--ink-06)",boxShadow:p.highlight?"var(--shadow-orange)":"var(--shadow-card)",transform:p.highlight?"scale(1.035)":"none",position:"relative",overflow:"hidden"}}>
              {p.highlight&&<div style={{position:"absolute",top:-60,right:-60,width:200,height:200,background:"rgba(255,255,255,.12)",borderRadius:"50%"}}/>}
              {p.badge&&<div style={{position:"absolute",top:18,right:18,background:"rgba(255,255,255,.22)",color:"white",fontWeight:700,fontSize:".7rem",padding:"3px 10px",borderRadius:99,border:"1px solid rgba(255,255,255,.3)"}}>{p.badge}</div>}
              <h3 style={{fontFamily:"'Fraunces',serif",fontSize:"1.35rem",color:p.highlight?"white":"var(--ink)",marginBottom:".25rem"}}>{p.name}</h3>
              <p style={{fontSize:".82rem",color:p.highlight?"rgba(255,255,255,.65)":"var(--ink-60)",marginBottom:"1.5rem"}}>{p.desc}</p>
              <div style={{marginBottom:"1.75rem"}}>
                <span style={{fontFamily:"'Fraunces',serif",fontWeight:900,fontSize:"2.8rem",color:p.highlight?"white":"var(--ink)",lineHeight:1}}>{p.price}</span>
                <span style={{color:p.highlight?"rgba(255,255,255,.55)":"var(--ink-35)",fontSize:".9rem"}}>{p.per}</span>
              </div>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:".7rem",marginBottom:"2rem"}}>
                {p.features.map((f,j)=>(
                  <li key={j} style={{display:"flex",alignItems:"center",gap:".6rem",color:p.highlight?"rgba(255,255,255,.88)":"var(--ink-60)",fontSize:".875rem"}}>
                    <span style={{width:20,height:20,borderRadius:"50%",background:p.highlight?"rgba(255,255,255,.2)":"var(--orange-tint)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".65rem",color:p.highlight?"white":"var(--orange)",flexShrink:0,fontWeight:700}}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button onClick={()=>setPage("get-started")} style={{width:"100%",padding:".875rem",borderRadius:14,fontFamily:"'Baloo 2',cursive",fontWeight:700,fontSize:".95rem",cursor:"pointer",border:"none",transition:"all .2s",background:p.highlight?"white":"var(--orange)",color:p.highlight?"var(--orange-dark)":"white",boxShadow:p.highlight?"none":"var(--shadow-orange)"}}
                onMouseEnter={e=>e.currentTarget.style.opacity=".9"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}
              >{p.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    {q:"What grades does WordFly support?",a:"WordFly supports Grades 1–8. The AI automatically selects vocabulary aligned with your child's grade and reading level — no setup needed."},
    {q:"How does the AI choose which words to teach?",a:"Our AI maps grade-appropriate word lists (aligned with Common Core standards) to the story genre your child picks. Words appear naturally in the narrative, never as isolated lists."},
    {q:"What are the quizzes like? Will they stress my child out?",a:"They're light and fun — 3–5 multiple choice or fill-in-the-blank questions based on words from the story they just read. Think of it as unlocking the next chapter, not taking a test."},
    {q:"Is my child's data safe?",a:"Absolutely. WordFly is fully COPPA-compliant. We collect only what's needed to personalize learning, never sell data, and never show advertisements of any kind."},
    {q:"Can my child use WordFly alongside school?",a:"Yes, and many teachers recommend it. The vocabulary is curriculum-aligned so kids practice the exact words they need — while enjoying stories that feel nothing like homework."},
    {q:"What if my child doesn't like reading?",a:"That's exactly who WordFly was built for! The story-choice format is closer to a game than a book. Kids who 'hate reading' consistently love WordFly because they're playing, not reading."},
  ];

  return (
    <section className="wf-section" style={{background:"white"}}>
      <div className="wf-container" style={{maxWidth:740}}>
        <div className="wf-section-header">
          <div className="badge" style={{marginBottom:"1rem"}}>✦ FAQ</div>
          <h2>Questions? <span style={{color:"var(--orange)",fontStyle:"italic"}}>We've got you.</span></h2>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:".75rem"}}>
          {faqs.map((f,i)=>(
            <div key={i} style={{background:"var(--cream)",borderRadius:20,overflow:"hidden",border:`1.5px solid ${open===i?"var(--orange)":"var(--ink-06)"}`,transition:"border-color .2s"}}>
              <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",padding:"1.25rem 1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
                <span style={{fontWeight:700,fontSize:".95rem",color:"var(--ink)",paddingRight:"1rem"}}>{f.q}</span>
                <span style={{color:"var(--orange)",fontSize:"1.25rem",flexShrink:0,lineHeight:1,transition:"transform .25s",transform:open===i?"rotate(45deg)":"none",display:"block"}}>+</span>
              </button>
              {open===i&&(
                <div style={{padding:"0 1.5rem 1.25rem",color:"var(--ink-60)",fontSize:".875rem",lineHeight:1.75,borderTop:"1px solid var(--ink-06)"}}>
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
            <p style={{color:"rgba(255,255,255,.78)",fontSize:"1.05rem",marginBottom:"2.5rem",maxWidth:480,margin:"0 auto 2.5rem"}}>Join 12,000+ families. Start free — no credit card, no commitment. First story takes 60 seconds to begin.</p>
            <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
              {[["🍎 Download for iOS","white","var(--orange-dark)"],["🤖 Download for Android","rgba(255,255,255,.15)","white"]].map(([label,bg,color],i)=>(
                <button key={i} onClick={()=>setPage("get-started")} style={{background:bg,color,fontFamily:"'Baloo 2',cursive",fontWeight:i===0?800:700,fontSize:"1rem",padding:".9rem 2rem",borderRadius:999,border:i===1?"1.5px solid rgba(255,255,255,.3)":"none",cursor:"pointer",boxShadow:i===0?"0 8px 24px rgba(0,0,0,.15)":"none",transition:"all .2s"}}
                  onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}
                >{label}</button>
              ))}
            </div>
            <p style={{color:"rgba(255,255,255,.5)",fontSize:".8rem",marginTop:"1.25rem"}}>Free 7-day trial · No credit card · Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────── */
function Footer({ setPage }) {
  const cols = [
    {title:"Learn More",links:["How It Works","Grade Levels","Story Themes","Parent Dashboard"]},
    {title:"Company",links:["About Us","Blog","Careers","Press"]},
    {title:"Support",links:["Help Center","Contact Us","Privacy Policy","Terms of Use"]},
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
            <p style={{color:"rgba(255,255,255,.38)",fontSize:".85rem",lineHeight:1.7,maxWidth:240,marginBottom:"1.25rem"}}>AI-powered vocabulary learning through personalized stories for Grades 1–8. Because the best lessons are the ones kids don't notice.</p>
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
                  <li key={j}><button onClick={()=>setPage(l.toLowerCase().replace(/ /g,"-"))} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.38)",fontSize:".82rem",fontFamily:"'Baloo 2',cursive",transition:"color .18s",padding:0,textAlign:"left"}}
                    onMouseEnter={e=>e.target.style.color="var(--orange)"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.38)"}
                  >{l}</button></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:"1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:".75rem"}}>
          <p style={{color:"rgba(255,255,255,.25)",fontSize:".78rem"}}>© 2026 WordFly Inc. All rights reserved.</p>
          <div style={{display:"flex",gap:"1.25rem"}}>
            {["Privacy Policy","Terms of Use","Cookie Policy"].map(l=>(
              <button key={l} onClick={()=>setPage(l.toLowerCase().replace(/ /g,"-"))} style={{background:"none",border:"none",color:"rgba(255,255,255,.25)",fontSize:".75rem",cursor:"pointer",fontFamily:"'Baloo 2',cursive",transition:"color .18s"}}
                onMouseEnter={e=>e.target.style.color="var(--orange)"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.25)"}
              >{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── MISC PAGES ─────────────────────────────── */
function GetStartedPage({ setPage }) {
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"8rem 1.5rem 4rem",background:"linear-gradient(145deg,#FFFBF7,#F4EEFF)"}}>
      <div style={{textAlign:"center",maxWidth:480}}>
        <div style={{fontSize:"4.5rem",marginBottom:"1.5rem"}}>🎉</div>
        <h1 style={{fontFamily:"'Fraunces',serif",fontWeight:900,fontSize:"2.5rem",color:"var(--ink)",marginBottom:"1rem"}}>Let's get started!</h1>
        <p style={{color:"var(--ink-60)",marginBottom:"2rem",lineHeight:1.75}}>This is a demo landing page for WordFly. In the real app, you'd choose your child's grade, pick a story genre, and begin their first adventure in under 2 minutes.</p>
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
        <h1 style={{marginBottom:"1rem",fontSize:"2.2rem"}}>{title}</h1>
        <p style={{color:"var(--ink-60)",lineHeight:1.75}}>This page is under construction. <button onClick={()=>setPage("home")} style={{background:"none",border:"none",cursor:"pointer",color:"var(--orange)",fontWeight:700,fontFamily:"inherit"}}>Return home</button>.</p>
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
    if (page!=="home") return <GenericPage title={page.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase())} setPage={nav}/>;
    return <>
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
  };

  return (
    <>
      <GlobalStyles/>
      <div style={{fontFamily:"'Baloo 2',cursive"}}>
        <Navbar setPage={nav}/>
        {renderPage()}
        <Footer setPage={nav}/>
        <button className="pulse-glow" onClick={()=>nav("get-started")} title="Get started"
          style={{position:"fixed",bottom:28,right:28,zIndex:999,width:54,height:54,background:"linear-gradient(135deg,var(--orange),#FF3CAC)",border:"none",borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:"0 8px 28px rgba(255,107,44,.5)",transition:"transform .2s"}}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
        >🤖</button>
      </div>
    </>
  );
}
