"use client";

import { cn } from "@/lib/utils";
import { useId } from "react";

type ThumbType =
  | "ecommerce"
  | "restaurant"
  | "crm"
  | "dental"
  | "youtube"
  | "blockchain"
  | string;

interface ProjectThumbnailProps {
  type: ThumbType;
  projectId?: string;
  className?: string;
}

/* ── Shared sub-components (ID-safe via prop) ───────────────────── */
const DotGrid = ({ id }: { id: string }) => (
  <pattern id={id} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
    <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.07)" />
  </pattern>
);

const Arrow = ({ x1, y1, x2, y2 }: { x1:number; y1:number; x2:number; y2:number }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2}
    stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3"
    markerEnd="url(#arrowhead)" />
);

/* ─── 1. E-COMMERCE AUTOMATION ──────────────────────────────────── */
function ThumbEcommerce() {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <DotGrid id={`dots-${uid}`} />
        <marker id={`arr-${uid}`} markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,255,255,0.25)" />
        </marker>
        <linearGradient id={`eg1-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="#040D1A" />
      <rect width="400" height="220" fill={`url(#dots-${uid})`} />
      <ellipse cx="200" cy="110" rx="140" ry="80" fill="rgba(37,99,235,0.06)" />

      {/* Node 1 — Cart */}
      <rect x="40" y="75" width="80" height="70" rx="10" fill="#071525" stroke="rgba(37,99,235,0.4)" strokeWidth="1.5" />
      <path d="M60 95 h8 l6 22 h30 l5-16 H66" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="75" cy="120" r="3" fill="#60A5FA" />
      <circle cx="90" cy="120" r="3" fill="#60A5FA" />
      <text x="80" y="152" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">WooCommerce</text>

      <line x1={122} y1={110} x2={158} y2={110} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd={`url(#arr-${uid})`} />

      {/* Node 2 — n8n Gear */}
      <rect x="160" y="75" width="80" height="70" rx="10" fill="#071525" stroke="rgba(37,99,235,0.5)" strokeWidth="1.5" />
      <circle cx="200" cy="107" r="18" fill="rgba(37,99,235,0.15)" stroke="#3B82F6" strokeWidth="1.5" />
      <circle cx="200" cy="107" r="8" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
      {[0,45,90,135,180,225,270,315].map(a => {
        const rad = a * Math.PI / 180;
        return <circle key={a} cx={200 + 18*Math.cos(rad)} cy={107 + 18*Math.sin(rad)} r="3" fill="#3B82F6" />;
      })}
      <text x="200" y="152" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">n8n Workflow</text>

      <line x1={242} y1={110} x2={278} y2={110} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd={`url(#arr-${uid})`} />

      {/* Node 3 — Email */}
      <rect x="280" y="75" width="80" height="70" rx="10" fill="#071525" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" />
      <rect x="295" y="93" width="50" height="34" rx="4" fill="none" stroke="#34D399" strokeWidth="1.5" />
      <path d="M295 95 l25 16 25-16" stroke="#34D399" strokeWidth="1.5" fill="none" />
      <circle cx="330" cy="138" r="8" fill="rgba(16,185,129,0.2)" stroke="#34D399" strokeWidth="1.5" />
      <path d="M325 138 l4 4 8-8" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" />
      <text x="320" y="152" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">Auto-confirmed</text>

      {/* Stats strip */}
      <rect x="40" y="170" width="320" height="28" rx="6" fill="rgba(37,99,235,0.08)" stroke="rgba(37,99,235,0.15)" strokeWidth="1" />
      <text x="80"  y="188" textAnchor="middle" fill="#60A5FA" fontSize="10" fontFamily="monospace" fontWeight="600">30+ hrs saved</text>
      <text x="200" y="188" textAnchor="middle" fill="#60A5FA" fontSize="10" fontFamily="monospace" fontWeight="600">98% fewer errors</text>
      <text x="320" y="188" textAnchor="middle" fill="#60A5FA" fontSize="10" fontFamily="monospace" fontWeight="600">+22% revenue</text>
    </svg>
  );
}

/* ─── 2. RESTAURANT WEBSITE ──────────────────────────────────────── */
function ThumbRestaurant() {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs><DotGrid id={`dots-${uid}`} /></defs>
      <rect width="400" height="220" fill="#040D1A" />
      <rect width="400" height="220" fill={`url(#dots-${uid})`} />
      <ellipse cx="200" cy="110" rx="130" ry="70" fill="rgba(139,92,246,0.06)" />

      <rect x="140" y="18" width="120" height="190" rx="14" fill="#071525" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" />
      <rect x="146" y="28" width="108" height="172" rx="8" fill="#0A1628" />
      <rect x="175" y="20" width="50" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
      <rect x="146" y="28" width="108" height="28" rx="8" fill="rgba(139,92,246,0.2)" />
      <text x="200" y="46" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9" fontFamily="sans-serif" fontWeight="600">Reserve a Table</text>
      <rect x="154" y="62" width="92" height="22" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(139,92,246,0.3)" strokeWidth="1" />
      <text x="200" y="76" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="monospace">📅 Select date...</text>
      {["18:00","19:00","20:00"].map((t, i) => (
        <g key={t}>
          <rect x={154+i*32} y="90" width="28" height="18" rx="4"
            fill={i===1 ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.04)"}
            stroke={i===1 ? "rgba(139,92,246,0.8)" : "rgba(255,255,255,0.08)"} strokeWidth="1" />
          <text x={168+i*32} y="102" textAnchor="middle" fill={i===1 ? "#C4B5FD" : "rgba(255,255,255,0.35)"} fontSize="7.5">{t}</text>
        </g>
      ))}
      <rect x="154" y="114" width="92" height="18" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <text x="200" y="126" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8">👥 2 guests</text>
      <rect x="154" y="138" width="92" height="22" rx="5" fill="rgba(139,92,246,0.7)" />
      <text x="200" y="152" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">Confirm Booking</text>
      <rect x="154" y="168" width="92" height="24" rx="5" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" strokeWidth="1" />
      <text x="200" y="183" textAnchor="middle" fill="#34D399" fontSize="8" fontWeight="500">✓ Booked! Email sent</text>

      <rect x="20" y="70" width="105" height="32" rx="6" fill="rgba(37,99,235,0.1)" stroke="rgba(37,99,235,0.25)" strokeWidth="1" />
      <text x="72" y="82" textAnchor="middle" fill="#60A5FA" fontSize="10" fontWeight="700">+40%</text>
      <text x="72" y="95" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8">Online bookings</text>
      <rect x="275" y="70" width="105" height="32" rx="6" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.25)" strokeWidth="1" />
      <text x="327" y="82" textAnchor="middle" fill="#34D399" fontSize="10" fontWeight="700">-60%</text>
      <text x="327" y="95" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8">Phone calls</text>
      <rect x="20" y="118" width="105" height="32" rx="6" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.25)" strokeWidth="1" />
      <text x="72" y="130" textAnchor="middle" fill="#FCD34D" fontSize="10" fontWeight="700">150+</text>
      <text x="72" y="143" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8">Monthly bookings</text>
      <rect x="275" y="118" width="105" height="32" rx="6" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.25)" strokeWidth="1" />
      <text x="327" y="130" textAnchor="middle" fill="#C4B5FD" fontSize="10" fontWeight="700">4</text>
      <text x="327" y="143" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8">Locations</text>
    </svg>
  );
}

/* ─── 3. LEAD CRM AUTOMATION ─────────────────────────────────────── */
function ThumbCRM() {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <DotGrid id={`dots-${uid}`} />
        <linearGradient id={`funnel-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="#040D1A" />
      <rect width="400" height="220" fill={`url(#dots-${uid})`} />

      <path d="M100 30 L300 30 L240 100 L160 100 Z" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5" />
      <path d="M160 105 L240 105 L220 155 L180 155 Z" fill="rgba(99,102,241,0.15)" stroke="rgba(99,102,241,0.5)" strokeWidth="1.5" />
      <path d="M180 160 L220 160 L210 185 L190 185 Z" fill="rgba(139,92,246,0.2)" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5" />
      <text x="200" y="70"  textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">200+ Leads / mo</text>
      <text x="200" y="133" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9"  fontFamily="monospace">AI Scored</text>
      <text x="200" y="175" textAnchor="middle" fill="#C4B5FD" fontSize="9" fontFamily="monospace" fontWeight="600">Meetings</text>

      {["Web Form","LinkedIn","Paid Ads"].map((src, i) => (
        <g key={src}>
          <rect x="18" y={30+i*38} width="70" height="22" rx="5" fill="rgba(37,99,235,0.1)" stroke="rgba(37,99,235,0.3)" strokeWidth="1" />
          <text x="53" y={44+i*38} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8">{src}</text>
          <line x1="88" y1={41+i*38} x2="100" y2={50} stroke="rgba(37,99,235,0.3)" strokeWidth="1" strokeDasharray="3 2" />
        </g>
      ))}

      <circle cx="337" cy="100" r="32" fill="rgba(99,102,241,0.1)" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" />
      <text x="337" y="96"  textAnchor="middle" fill="#A78BFA" fontSize="9" fontWeight="600">OpenAI</text>
      <text x="337" y="108" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">ICP Scoring</text>
      <line x1="240" y1="100" x2="305" y2="100" stroke="rgba(99,102,241,0.3)" strokeWidth="1" strokeDasharray="3 2" />

      <rect x="30" y="170" width="340" height="28" rx="6" fill="rgba(99,102,241,0.07)" stroke="rgba(99,102,241,0.15)" strokeWidth="1" />
      <text x="85"  y="188" textAnchor="middle" fill="#A78BFA" fontSize="9" fontFamily="monospace" fontWeight="600">3× capacity</text>
      <text x="200" y="188" textAnchor="middle" fill="#A78BFA" fontSize="9" fontFamily="monospace" fontWeight="600">+45% conversion</text>
      <text x="315" y="188" textAnchor="middle" fill="#A78BFA" fontSize="9" fontFamily="monospace" fontWeight="600">0 leads dropped</text>
    </svg>
  );
}

/* ─── 4. DENTAL CLINIC AUTOMATION ───────────────────────────────── */
function ThumbDental() {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <DotGrid id={`dots-${uid}`} />
        <marker id={`arr-${uid}`} markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,255,255,0.2)" />
        </marker>
      </defs>
      <rect width="400" height="220" fill="#040D1A" />
      <rect width="400" height="220" fill={`url(#dots-${uid})`} />
      <ellipse cx="200" cy="100" rx="160" ry="80" fill="rgba(16,185,129,0.04)" />

      <rect x="22" y="68" width="76" height="64" rx="10" fill="#071525" stroke="rgba(239,68,68,0.4)" strokeWidth="1.5" />
      <text x="60" y="88" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">Patient Email</text>
      <rect x="36" y="93" width="48" height="28" rx="3" fill="none" stroke="#F87171" strokeWidth="1.5" />
      <path d="M36 95 l24 12 24-12" stroke="#F87171" strokeWidth="1.5" fill="none" />
      <text x="60" y="136" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7">Gmail</text>

      <line x1="100" y1="100" x2="128" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd={`url(#arr-${uid})`} />

      <rect x="130" y="60" width="140" height="80" rx="10" fill="#071525" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5" />
      <text x="200" y="82" textAnchor="middle" fill="#FCD34D" fontSize="9" fontWeight="600">GPT-4o-mini</text>
      <text x="200" y="96" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Analysing request...</text>
      {[{l:"tooth-extraction",c:"#F87171"},{l:"urgency: HIGH",c:"#F59E0B"}].map((b,i) => (
        <g key={b.l}>
          <rect x="143" y={103+i*18} width="114" height="14" rx="4" fill={`${b.c}22`} stroke={`${b.c}55`} strokeWidth="1" />
          <text x="200" y={113+i*18} textAnchor="middle" fill={b.c} fontSize="7.5" fontFamily="monospace">{b.l}</text>
        </g>
      ))}

      <line x1="272" y1="100" x2="300" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd={`url(#arr-${uid})`} />

      <rect x="302" y="68" width="76" height="64" rx="10" fill="#071525" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" />
      <text x="340" y="87" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Appointment</text>
      <rect x="316" y="91" width="48" height="34" rx="3" fill="none" stroke="#34D399" strokeWidth="1.2" />
      <line x1="316" y1="99" x2="364" y2="99" stroke="#34D399" strokeWidth="1" />
      <text x="340" y="112" textAnchor="middle" fill="#34D399" fontSize="10" fontWeight="700">09:00</text>
      <text x="340" y="123" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7">Next morning</text>

      <text x="200" y="162" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8">Automated emails sent:</text>
      {["Read receipt","Appointment confirm","Clinic notification"].map((e,i) => (
        <g key={e}>
          <rect x={22+i*122} y="168" width="116" height="22" rx="5"
            fill={["rgba(239,68,68,0.08)","rgba(16,185,129,0.08)","rgba(59,130,246,0.08)"][i]}
            stroke={["rgba(239,68,68,0.25)","rgba(16,185,129,0.25)","rgba(59,130,246,0.25)"][i]} strokeWidth="1" />
          <text x={80+i*122} y="182" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7.5">{e}</text>
        </g>
      ))}
    </svg>
  );
}

/* ─── 5. YOUTUBE SHORTS AI ──────────────────────────────────────── */
function ThumbYoutube() {
  const uid = useId().replace(/:/g, "");
  const steps = [
    { label: "Tavily\nSearch",   color: "#F59E0B", x: 30  },
    { label: "Claude\nScript",   color: "#8B5CF6", x: 110 },
    { label: "ElevenLabs\nVoice",color: "#3B82F6", x: 190 },
    { label: "Creatomate\nRender",color:"#EC4899", x: 270 },
    { label: "YouTube\nUpload",  color: "#EF4444", x: 350 },
  ];
  return (
    <svg viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <DotGrid id={`dots-${uid}`} />
        <marker id={`arr-${uid}`} markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill="rgba(255,255,255,0.18)" />
        </marker>
      </defs>
      <rect width="420" height="220" fill="#040D1A" />
      <rect width="420" height="220" fill={`url(#dots-${uid})`} />

      <rect x="140" y="14" width="140" height="24" rx="12" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.3)" strokeWidth="1" />
      <text x="210" y="29" textAnchor="middle" fill="#FCD34D" fontSize="9" fontFamily="monospace">Every Monday 9:00 AM</text>
      <line x1="210" y1="38" x2="210" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 2" />

      {steps.map((s, i) => (
        <g key={s.label}>
          <circle cx={s.x+30} cy={95} r="26" fill={`${s.color}18`} stroke={`${s.color}60`} strokeWidth="1.5" />
          <text x={s.x+30} y={91} textAnchor="middle" fill={s.color} fontSize="8.5" fontWeight="600">{s.label.split("\n")[0]}</text>
          <text x={s.x+30} y={104} textAnchor="middle" fill={s.color} fontSize="8" opacity="0.7">{s.label.split("\n")[1]}</text>
          {i < steps.length-1 && (
            <line x1={s.x+56} y1={95} x2={steps[i+1].x+4} y2={95}
              stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd={`url(#arr-${uid})`} />
          )}
        </g>
      ))}

      <rect x="100" y="135" width="220" height="30" rx="7" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.3)" strokeWidth="1" />
      <text x="210" y="148" textAnchor="middle" fill="#C4B5FD" fontSize="9">Gmail: APPROVE / REJECT preview</text>
      <text x="210" y="160" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7.5">→ 1 click resumes workflow</text>

      <rect x="20" y="178" width="380" height="28" rx="6" fill="rgba(239,68,68,0.07)" stroke="rgba(239,68,68,0.15)" strokeWidth="1" />
      <text x="70"  y="196" textAnchor="middle" fill="#FCA5A5" fontSize="9" fontFamily="monospace" fontWeight="600">4-6h→15min</text>
      <text x="175" y="196" textAnchor="middle" fill="#FCA5A5" fontSize="9" fontFamily="monospace" fontWeight="600">2 channels</text>
      <text x="270" y="196" textAnchor="middle" fill="#FCA5A5" fontSize="9" fontFamily="monospace" fontWeight="600">1-click approve</text>
      <text x="365" y="196" textAnchor="middle" fill="#FCA5A5" fontSize="9" fontFamily="monospace" fontWeight="600">100% auto</text>
    </svg>
  );
}

/* ─── 6. BLOCKCHAIN NEWSLETTER ──────────────────────────────────── */
function ThumbBlockchain() {
  const uid = useId().replace(/:/g, "");
  const topics = [
    { label: "AI+Blockchain",    color: "#3B82F6", y: 20  },
    { label: "Enterprise",       color: "#10B981", y: 55  },
    { label: "Interoperability", color: "#F59E0B", y: 90  },
    { label: "Token+Funding",    color: "#8B5CF6", y: 125 },
    { label: "Smart Contracts",  color: "#EF4444", y: 160 },
  ];
  return (
    <svg viewBox="0 0 420 210" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs><DotGrid id={`dots-${uid}`} /></defs>
      <rect width="420" height="210" fill="#040D1A" />
      <rect width="420" height="210" fill={`url(#dots-${uid})`} />

      <rect x="8" y="88" width="70" height="24" rx="6" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.3)" strokeWidth="1" />
      <text x="43" y="103" textAnchor="middle" fill="#FCD34D" fontSize="8.5" fontFamily="monospace">7AM UTC</text>

      {topics.map((t) => (
        <g key={t.label}>
          <rect x="90" y={t.y} width="80" height="28" rx="6" fill={`${t.color}12`} stroke={`${t.color}45`} strokeWidth="1" />
          <text x="130" y={t.y+12} textAnchor="middle" fill={t.color} fontSize="7.5" fontWeight="500">Tavily</text>
          <text x="130" y={t.y+22} textAnchor="middle" fill={`${t.color}99`} fontSize="6.5">{t.label}</text>
          <rect x="182" y={t.y} width="76" height="28" rx="6" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.35)" strokeWidth="1" />
          <text x="220" y={t.y+12} textAnchor="middle" fill="#C4B5FD" fontSize="7.5" fontWeight="500">Claude Opus 4</text>
          <text x="220" y={t.y+22} textAnchor="middle" fill="rgba(196,181,253,0.6)" fontSize="6.5">2 stories/topic</text>
          <line x1="170" y1={t.y+14} x2="182" y2={t.y+14} stroke={`${t.color}40`} strokeWidth="1" strokeDasharray="3 2" />
          <line x1="258" y1={t.y+14} x2="282" y2={102} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </g>
      ))}

      <circle cx="295" cy="102" r="18" fill="rgba(99,102,241,0.15)" stroke="rgba(99,102,241,0.5)" strokeWidth="1.5" />
      <text x="295" y="99"  textAnchor="middle" fill="#A78BFA" fontSize="7.5" fontWeight="600">Merge</text>
      <text x="295" y="109" textAnchor="middle" fill="rgba(167,139,250,0.6)" fontSize="6.5">10 stories</text>

      <rect x="322" y="76" width="80" height="52" rx="8" fill="rgba(37,99,235,0.1)" stroke="rgba(37,99,235,0.4)" strokeWidth="1.5" />
      <text x="362" y="94"  textAnchor="middle" fill="#60A5FA" fontSize="8" fontWeight="600">Claude Haiku</text>
      <text x="362" y="106" textAnchor="middle" fill="rgba(96,165,250,0.6)" fontSize="7">HTML Newsletter</text>
      <rect x="334" y="110" width="56" height="14" rx="3" fill="rgba(37,99,235,0.2)" />
      <text x="362" y="120" textAnchor="middle" fill="#93C5FD" fontSize="7">📧 Composing...</text>
      <line x1="313" y1="102" x2="322" y2="102" stroke="rgba(99,102,241,0.3)" strokeWidth="1" strokeDasharray="3 2" />

      <rect x="90" y="183" width="310" height="22" rx="5" fill="rgba(37,99,235,0.07)" stroke="rgba(37,99,235,0.15)" strokeWidth="1" />
      <text x="245" y="197" textAnchor="middle" fill="#60A5FA" fontSize="9" fontFamily="monospace" fontWeight="500">Daily @ 7:00 UTC  •  5 topics  •  10 stories  •  0 manual effort</text>
    </svg>
  );
}

/* ─── 7. KAYA WEBSITE ───────────────────────────────────────────── */
function ThumbKaya() {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs><DotGrid id={`dots-${uid}`} /></defs>
      <rect width="400" height="220" fill="#040D1A" />
      <rect width="400" height="220" fill={`url(#dots-${uid})`} />

      {/* Browser chrome */}
      <rect x="20" y="14" width="360" height="192" rx="8" fill="#0A0F1A" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {/* Browser top bar */}
      <rect x="20" y="14" width="360" height="22" rx="8" fill="#111827" />
      <rect x="20" y="28" width="360" height="8" fill="#111827" />
      <circle cx="35" cy="25" r="3.5" fill="#EF4444" opacity="0.7" />
      <circle cx="47" cy="25" r="3.5" fill="#F59E0B" opacity="0.7" />
      <circle cx="59" cy="25" r="3.5" fill="#10B981" opacity="0.7" />
      <rect x="75" y="19" width="200" height="12" rx="6" fill="rgba(255,255,255,0.06)" />
      <text x="175" y="28" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6.5" fontFamily="monospace">kayatelcit.com</text>

      {/* Site navbar */}
      <rect x="20" y="36" width="360" height="26" fill="#0f0f0f" />
      {/* KAYA logo K box */}
      <rect x="28" y="40" width="14" height="14" fill="white" />
      <text x="35" y="51" textAnchor="middle" fill="#0f0f0f" fontSize="9" fontWeight="900">K</text>
      <text x="50" y="51" fill="white" fontSize="9" fontWeight="900" letterSpacing="2">KAYA</text>
      <rect x="306" y="41" width="34" height="12" rx="3" fill="#e63946" />
      <text x="323" y="50" textAnchor="middle" fill="white" fontSize="7" fontWeight="700">Teklif Al</text>
      {["Hizmetler","Projeler","İletişim"].map((lbl, i) => (
        <text key={lbl} x={160 + i * 44} y="51" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="6.5">{lbl}</text>
      ))}

      {/* Hero section */}
      <rect x="20" y="62" width="360" height="72" fill="#0d1a0d" />
      {/* Fence pattern background */}
      {Array.from({length: 18}).map((_, i) => (
        <rect key={i} x={20 + i*20} y="62" width="1.5" height="72" fill="rgba(255,255,255,0.04)" />
      ))}
      {Array.from({length: 4}).map((_, i) => (
        <rect key={i} x="20" y={62 + i*18} width="360" height="1.5" fill="rgba(255,255,255,0.04)" />
      ))}
      <rect x="20" y="62" width="360" height="72" fill="rgba(0,0,0,0.45)" />

      {/* Hero badge */}
      <rect x="140" y="70" width="120" height="11" rx="5" fill="rgba(230,57,70,0.15)" stroke="rgba(230,57,70,0.4)" strokeWidth="0.8" />
      <text x="200" y="78" textAnchor="middle" fill="#e63946" fontSize="6.5" fontFamily="monospace" fontWeight="600">Mükemmellik ve Güvence</text>

      {/* Hero headline */}
      <text x="200" y="93" textAnchor="middle" fill="white" fontSize="11" fontWeight="900">Güvenlik Sınırlarınızı</text>
      <text x="200" y="107" textAnchor="middle" fill="#e63946" fontSize="11" fontWeight="900">Yeniden Tanımlayın.</text>

      {/* Stats strip */}
      <rect x="20" y="134" width="360" height="22" fill="rgba(230,57,70,0.06)" stroke="rgba(230,57,70,0.12)" strokeWidth="1" />
      {[{v:"20+",l:"Yıl"},{v:"500+",l:"Proje"},{v:"%100",l:"Garanti"}].map((s, i) => (
        <g key={s.v}>
          <text x={80 + i*120} y="143" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">{s.v}</text>
          <text x={80 + i*120} y="152" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="6.5">{s.l}</text>
        </g>
      ))}

      {/* Service cards */}
      {["Panel Çit","Galvaniz","Kapı İmalatı"].map((svc, i) => (
        <g key={svc}>
          <rect x={28 + i*116} y="162" width="108" height="36" rx="5" fill="#111827" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <rect x={28 + i*116} y="162" width="108" height="4" rx="5" fill="#e63946" opacity="0.7" />
          <text x={82 + i*116} y="180" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="600">{svc}</text>
          <text x={82 + i*116} y="191" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="6">Bilgi Al →</text>
        </g>
      ))}
    </svg>
  );
}

/* ── SVG map ─────────────────────────────────────────────────────── */
const THUMBS: Record<string, React.ComponentType> = {
  ecommerce:  ThumbEcommerce,
  restaurant: ThumbRestaurant,
  crm:        ThumbCRM,
  dental:     ThumbDental,
  youtube:    ThumbYoutube,
  blockchain: ThumbBlockchain,
  kaya:       ThumbKaya,
};

export function ProjectThumbnail({ type, className }: ProjectThumbnailProps) {
  const Thumb = THUMBS[type] ?? ThumbEcommerce;
  return (
    <div className={cn("w-full h-full overflow-hidden", className)}>
      <Thumb />
    </div>
  );
}
