import { useState, useEffect } from "react";
import sante from './assests/sante.webp';
import fh2 from './assests/fh2.webp';
import rsal from './assests/rsal.webp';

const ADMIN_PASSWORD = "admin1447";

const teams = [
  { id: 1, short: "المرسى", name: "فريق المركز الصحي المرسى" },
  { id: 2, short: "الأنكلوجيا", name: "فريق المركز الجهوي للأنكلوجيا" },
  { id: 3, short: "التمريض", name: "فريق المعهد العالي للمهن التمريضية وتقنيات الصحة" },
  { id: 4, short: "طرفاية", name: "فريق مندوبية طرفاية للصحة والحماية الاجتماعية" },
  { id: 5, short: "بن المهدي إدارة", name: "فريق إدارة بن المهدي" },
  { id: 6, short: "الحسن الثاني", name: "فريق مستشفى الحسن الثاني للاختصاصات" },
  { id: 7, short: "شباب بن المهدي", name: "فريق شباب بن المهدي" },
  { id: 8, short: "الشغيلة", name: "فريق الشغيلة الصحية" },
  { id: 9, short: "المساعدة الطبية", name: "فريق مصلحة المساعدة الطبية المستعجلة" },
  { id: 10, short: "المركز الإقليمي", name: "فريق المركز الاستشفائي الإقليمي طرفاية" },
];

const rounds = [
  {
    round: 1, label: "الجولة الأولى",
    matches: [
      { id: "1-1", day: "السبت 3 رمضان 1447", time: "22:00", home: 1, away: 2 },
      { id: "1-2", day: "السبت 3 رمضان 1447", time: "22:30", home: 3, away: 4 },
      { id: "1-3", day: "الأحد 4 رمضان 1447", time: "22:00", home: 5, away: 6 },
      { id: "1-4", day: "الأحد 4 رمضان 1447", time: "22:30", home: 7, away: 8 },
      { id: "1-5", day: "الأحد 4 رمضان 1447", time: "23:00", home: 9, away: 10 },
    ],
  },
  {
    round: 2, label: "الجولة الثانية",
    matches: [
      { id: "2-1", day: "الاثنين 5 رمضان 1447", time: "22:00", home: 1, away: 3 },
      { id: "2-2", day: "الاثنين 5 رمضان 1447", time: "22:30", home: 2, away: 4 },
      { id: "2-3", day: "الثلاثاء 6 رمضان 1447", time: "22:00", home: 5, away: 7 },
      { id: "2-4", day: "الثلاثاء 6 رمضان 1447", time: "22:30", home: 6, away: 9 },
      { id: "2-5", day: "الثلاثاء 6 رمضان 1447", time: "23:00", home: 8, away: 10 },
    ],
  },
  {
    round: 3, label: "الجولة الثالثة",
    matches: [
      { id: "3-1", day: "الأربعاء 7 رمضان 1447", time: "22:00", home: 2, away: 3 },
      { id: "3-2", day: "الأربعاء 7 رمضان 1447", time: "22:30", home: 1, away: 4 },
      { id: "3-3", day: "الخميس 8 رمضان 1447", time: "22:00", home: 5, away: 8 },
      { id: "3-4", day: "الخميس 8 رمضان 1447", time: "22:30", home: 6, away: 10 },
      { id: "3-5", day: "الخميس 8 رمضان 1447", time: "23:00", home: 7, away: 9 },
    ],
  },
  {
    round: 4, label: "الجولة الرابعة",
    matches: [
      { id: "4-1", day: "الجمعة 9 رمضان 1447", time: "22:00", home: 1, away: 5 },
      { id: "4-2", day: "الجمعة 9 رمضان 1447", time: "22:30", home: 2, away: 6 },
      { id: "4-3", day: "السبت 10 رمضان 1447", time: "22:00", home: 3, away: 7 },
      { id: "4-4", day: "السبت 10 رمضان 1447", time: "22:30", home: 8, away: 10 },
      { id: "4-5", day: "السبت 10 رمضان 1447", time: "23:00", home: 4, away: 9 },
    ],
  },
  {
    round: 5, label: "الجولة الخامسة",
    matches: [
      { id: "5-1", day: "الأحد 11 رمضان 1447", time: "22:00", home: 1, away: 6 },
      { id: "5-2", day: "الأحد 11 رمضان 1447", time: "22:30", home: 2, away: 5 },
      { id: "5-3", day: "الاثنين 12 رمضان 1447", time: "22:00", home: 3, away: 8 },
      { id: "5-4", day: "الاثنين 12 رمضان 1447", time: "22:30", home: 4, away: 10 },
      { id: "5-5", day: "الاثنين 12 رمضان 1447", time: "23:00", home: 7, away: 9 },
    ],
  },
  {
    round: 6, label: "الجولة السادسة",
    matches: [
      { id: "6-1", day: "الثلاثاء 13 رمضان 1447", time: "22:00", home: 1, away: 7 },
      { id: "6-2", day: "الثلاثاء 13 رمضان 1447", time: "22:30", home: 2, away: 8 },
      { id: "6-3", day: "الأربعاء 14 رمضان 1447", time: "22:00", home: 3, away: 9 },
      { id: "6-4", day: "الأربعاء 14 رمضان 1447", time: "22:30", home: 4, away: 5 },
      { id: "6-5", day: "الأربعاء 14 رمضان 1447", time: "23:00", home: 6, away: 10 },
    ],
  },
  {
    round: 7, label: "الجولة السابعة",
    matches: [
      { id: "7-1", day: "الخميس 15 رمضان 1447", time: "22:00", home: 1, away: 8 },
      { id: "7-2", day: "الخميس 15 رمضان 1447", time: "22:30", home: 2, away: 9 },
      { id: "7-3", day: "الجمعة 16 رمضان 1447", time: "22:00", home: 3, away: 10 },
      { id: "7-4", day: "الجمعة 16 رمضان 1447", time: "22:30", home: 4, away: 6 },
      { id: "7-5", day: "الجمعة 16 رمضان 1447", time: "23:00", home: 5, away: 7 },
    ],
  },
  {
    round: 8, label: "الجولة الثامنة",
    matches: [
      { id: "8-1", day: "السبت 17 رمضان 1447", time: "23:00", home: 1, away: 9 },
      { id: "8-2", day: "السبت 17 رمضان 1447", time: "23:30", home: 2, away: 10 },
      { id: "8-3", day: "الأحد 18 رمضان 1447", time: "22:00", home: 3, away: 5 },
      { id: "8-4", day: "الأحد 18 رمضان 1447", time: "22:30", home: 4, away: 7 },
      { id: "8-5", day: "الأحد 18 رمضان 1447", time: "23:00", home: 6, away: 8 },
    ],
  },
  {
    round: 9, label: "الجولة التاسعة",
    matches: [
      { id: "9-1", day: "الاثنين 19 رمضان 1447", time: "23:00", home: 1, away: 9 },
      { id: "9-2", day: "الاثنين 19 رمضان 1447", time: "23:30", home: 2, away: 10 },
      { id: "9-3", day: "الثلاثاء 20 رمضان 1447", time: "22:00", home: 3, away: 5 },
      { id: "9-4", day: "الثلاثاء 20 رمضان 1447", time: "22:30", home: 4, away: 7 },
      { id: "9-5", day: "الثلاثاء 20 رمضان 1447", time: "23:00", home: 6, away: 8 },
    ],
  },
];

const allMatches = rounds.flatMap((r) => r.matches);
const getTeam = (id) => teams.find((t) => t.id === id);

// Champions League points: W=3, D=1, L=0 | Tiebreakers: Pts > GD > GF
function computeStandings(results) {
  const table = {};
  teams.forEach((t) => {
    table[t.id] = { id: t.id, mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 };
  });
  Object.entries(results).forEach(([matchId, score]) => {
    const match = allMatches.find((m) => m.id === matchId);
    if (!match) return;
    const hg = parseInt(score.home, 10), ag = parseInt(score.away, 10);
    if (isNaN(hg) || isNaN(ag)) return;
    const h = table[match.home], a = table[match.away];
    h.mp++; h.gf += hg; h.ga += ag; h.gd += hg - ag;
    a.mp++; a.gf += ag; a.ga += hg; a.gd += ag - hg;
    if (hg > ag)      { h.w++; h.pts += 3; a.l++; }
    else if (hg === ag){ h.d++; h.pts++; a.d++; a.pts++; }
    else               { a.w++; a.pts += 3; h.l++; }
  });
  return Object.values(table).sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
}

function getFormDots(teamId, results) {
  const played = allMatches
    .filter((m) => (m.home === teamId || m.away === teamId) && results[m.id])
    .map((m) => {
      const r = results[m.id];
      const hg = parseInt(r.home, 10), ag = parseInt(r.away, 10);
      if (isNaN(hg) || isNaN(ag)) return null;
      if (m.home === teamId) return hg > ag ? "w" : hg === ag ? "d" : "l";
      return ag > hg ? "w" : ag === hg ? "d" : "l";
    })
    .filter(Boolean)
    .slice(-5);
  while (played.length < 5) played.unshift(null);
  return played;
}

function groupByDay(matches) {
  const g = {};
  matches.forEach((m) => { if (!g[m.day]) g[m.day] = []; g[m.day].push(m); });
  return Object.entries(g);
}

// ─────────────────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  :root {
    --green:#00a651; --green-dark:#007a3d; --gold:#f5a623;
    --dark:#0a1628; --white:#ffffff; --gray:#8a9ab5;
    --card-bg:rgba(255,255,255,0.04); --border:rgba(255,255,255,0.08);
  }
  body { font-family:'Tajawal',sans-serif; background:var(--dark); color:var(--white); direction:rtl; min-height:100vh; overflow-x:hidden; }
  .app { min-height:100vh; background:radial-gradient(ellipse at top right,#0d2137 0%,#0a1628 50%,#050e1a 100%); }
  .app::before { content:''; position:fixed; top:-50%; right:-20%; width:700px; height:700px; background:radial-gradient(circle,rgba(0,166,81,0.08) 0%,transparent 70%); pointer-events:none; z-index:0; }

  /* HEADER */
  .header { position:relative; z-index:10; text-align:center; padding:48px 24px 36px; border-bottom:1px solid var(--border); background:linear-gradient(180deg,rgba(0,166,81,0.05) 0%,transparent 100%); }
  .header-logos { display:flex; align-items:center; justify-content:center; gap:24px; margin-bottom:28px; flex-wrap:wrap; }
  .header-logo-wrap { display:flex; align-items:center; justify-content:center; width:72px; height:72px; border-radius:16px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); padding:8px; transition:all 0.25s; backdrop-filter:blur(8px); }
  .header-logo-wrap:hover { background:rgba(0,166,81,0.12); border-color:rgba(0,166,81,0.35); transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,166,81,0.2); }
  .header-logo-img { width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 2px 6px rgba(0,0,0,0.3)); }
  .header-logo-sep { width:1px; height:40px; background:linear-gradient(180deg,transparent,var(--border),transparent); }
  .header-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(0,166,81,0.15); border:1px solid rgba(0,166,81,0.3); border-radius:100px; padding:6px 18px; font-size:13px; color:var(--green); font-weight:600; margin-bottom:20px; }
  .header h1 { font-size:clamp(28px,5vw,52px); font-weight:900; line-height:1.15; background:linear-gradient(135deg,#fff 30%,var(--green) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:10px; }
  .header-sub { font-size:16px; color:var(--gray); font-weight:500; }

  /* NAV */
  .nav { display:flex; justify-content:center; gap:8px; padding:20px 16px; position:sticky; top:0; z-index:100; background:rgba(10,22,40,0.95); backdrop-filter:blur(12px); border-bottom:1px solid var(--border); flex-wrap:wrap; }
  .nav-btn { background:var(--card-bg); border:1px solid var(--border); color:var(--gray); font-family:'Tajawal',sans-serif; font-size:14px; font-weight:600; padding:10px 20px; border-radius:100px; cursor:pointer; transition:all 0.25s; }
  .nav-btn:hover { color:var(--white); border-color:rgba(255,255,255,0.2); }
  .nav-btn.active { background:var(--green); border-color:var(--green); color:white; box-shadow:0 4px 20px rgba(0,166,81,0.4); }

  /* CONTENT */
  .content { max-width:960px; margin:0 auto; padding:40px 16px 80px; position:relative; z-index:1; }

  /* ROUND TABS */
  .round-tabs { display:flex; gap:6px; overflow-x:auto; padding-bottom:8px; margin-bottom:32px; scrollbar-width:none; }
  .round-tabs::-webkit-scrollbar { display:none; }
  .round-tab { flex-shrink:0; background:var(--card-bg); border:1px solid var(--border); color:var(--gray); font-family:'Tajawal',sans-serif; font-size:13px; font-weight:700; padding:8px 16px; border-radius:8px; cursor:pointer; transition:all 0.2s; }
  .round-tab:hover { color:white; border-color:rgba(255,255,255,0.15); }
  .round-tab.active { background:rgba(0,166,81,0.15); border-color:var(--green); color:var(--green); }

  /* DAY GROUP */
  .day-group { margin-bottom:28px; }
  .day-label { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
  .day-label-text { font-size:14px; color:var(--gold); font-weight:700; white-space:nowrap; }
  .day-label-line { flex:1; height:1px; background:linear-gradient(90deg,rgba(245,166,35,0.3),transparent); }

  /* MATCH CARD */
  .match-card { background:var(--card-bg); border:1px solid var(--border); border-radius:14px; padding:18px 20px; margin-bottom:10px; display:flex; align-items:center; gap:16px; transition:all 0.2s; position:relative; overflow:hidden; }
  .match-card::before { content:''; position:absolute; top:0; right:0; width:3px; height:100%; background:var(--green); opacity:0; transition:opacity 0.2s; }
  .match-card:hover { border-color:rgba(0,166,81,0.25); background:rgba(0,166,81,0.05); transform:translateY(-1px); }
  .match-card:hover::before { opacity:1; }
  .match-time { display:flex; flex-direction:column; align-items:center; min-width:60px; }
  .time-badge { background:rgba(0,166,81,0.15); border:1px solid rgba(0,166,81,0.25); color:var(--green); font-size:14px; font-weight:800; padding:6px 12px; border-radius:8px; letter-spacing:1px; }
  .match-teams { flex:1; display:flex; align-items:center; gap:12px; justify-content:center; }
  .team-name { font-size:14px; font-weight:700; text-align:center; color:var(--white); flex:1; line-height:1.4; }
  .team-name.away { color:rgba(255,255,255,0.75); }
  .vs-divider { display:flex; align-items:center; flex-shrink:0; }
  .vs-ball { width:32px; height:32px; background:linear-gradient(135deg,#007a3d,var(--green)); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:16px; box-shadow:0 2px 12px rgba(0,166,81,0.35); }

  /* TEAMS */
  .teams-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:14px; }
  .team-card { background:var(--card-bg); border:1px solid var(--border); border-radius:14px; padding:24px 20px; display:flex; align-items:center; gap:16px; transition:all 0.2s; }
  .team-card:hover { border-color:rgba(0,166,81,0.3); background:rgba(0,166,81,0.05); transform:translateY(-2px); }
  .team-avatar { width:52px; height:52px; border-radius:12px; background:linear-gradient(135deg,#007a3d,var(--green)); display:flex; align-items:center; justify-content:center; font-size:22px; flex-shrink:0; box-shadow:0 4px 16px rgba(0,166,81,0.3); }
  .team-info h3 { font-size:14px; font-weight:800; margin-bottom:4px; line-height:1.4; }
  .team-info span { font-size:12px; color:var(--gray); }

  /* PAGE TITLE */
  .page-title { font-size:24px; font-weight:900; margin-bottom:24px; display:flex; align-items:center; gap:10px; }
  .page-title::after { content:''; flex:1; height:2px; background:linear-gradient(90deg,var(--green),transparent); border-radius:2px; }
  .round-section { margin-bottom:40px; }
  .round-title { font-size:18px; font-weight:800; color:var(--green); margin-bottom:16px; display:flex; align-items:center; gap:10px; }
  .round-title::before { content:''; width:4px; height:20px; background:var(--green); border-radius:2px; }

  /* ── RESULTS PAGE ── */
  .results-layout { display:flex; flex-direction:column; gap:28px; }

  /* Standings */
  .standings-card { background:var(--card-bg); border:1px solid var(--border); border-radius:18px; overflow:hidden; }
  .card-header { padding:18px 24px 14px; border-bottom:1px solid var(--border); display:flex; align-items:center; gap:10px; }
  .card-header h2 { font-size:17px; font-weight:900; }
  .st-legend { display:flex; gap:20px; padding:10px 24px; border-bottom:1px solid var(--border); flex-wrap:wrap; }
  .legend-item { display:flex; align-items:center; gap:6px; font-size:11px; color:var(--gray); font-weight:600; }
  .legend-dot { width:10px; height:10px; border-radius:3px; }

  .st-table { width:100%; border-collapse:collapse; }
  .st-table th { font-size:11px; font-weight:700; color:var(--gray); text-transform:uppercase; letter-spacing:0.7px; padding:10px 12px; text-align:center; border-bottom:1px solid var(--border); }
  .st-table th.t-col { text-align:right; padding-right:16px; }
  .st-table td { padding:12px 12px; text-align:center; font-size:13px; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.04); transition:background 0.15s; }
  .st-table td.t-col { text-align:right; padding-right:16px; }
  .st-table tr:last-child td { border-bottom:none; }
  .st-table tr:hover td { background:rgba(255,255,255,0.025); }
  .rank-bar { display:inline-block; width:5px; height:28px; border-radius:3px; margin-left:10px; vertical-align:middle; }
  .rb-top { background:var(--green); }
  .rb-mid { background:rgba(255,255,255,0.12); }
  .rb-bot { background:rgba(229,62,62,0.55); }
  .pts-col { font-weight:900; font-size:15px; color:var(--green); }
  .form-row { display:flex; gap:3px; justify-content:center; }
  .fd { width:9px; height:9px; border-radius:50%; }
  .fd-w { background:#00a651; } .fd-d { background:#f5a623; }
  .fd-l { background:#e53e3e; } .fd-n { background:rgba(255,255,255,0.1); }

  /* Entry card */
  .entry-card { background:var(--card-bg); border:1px solid rgba(0,166,81,0.2); border-radius:18px; overflow:hidden; }
  .entry-tabs { display:flex; gap:6px; overflow-x:auto; padding:14px 20px; scrollbar-width:none; border-bottom:1px solid var(--border); }
  .entry-tabs::-webkit-scrollbar { display:none; }
  .day-hdr { font-size:12px; color:var(--gold); font-weight:700; padding:10px 20px 6px; background:rgba(245,166,35,0.04); border-bottom:1px solid rgba(245,166,35,0.08); }
  .match-row { display:flex; align-items:center; gap:10px; padding:13px 20px; border-bottom:1px solid rgba(255,255,255,0.04); transition:background 0.15s; flex-wrap:wrap; }
  .match-row:last-child { border-bottom:none; }
  .match-row:hover { background:rgba(0,166,81,0.04); }
  .mr-team { flex:1; font-size:13px; font-weight:700; min-width:70px; }
  .mr-team.away { text-align:left; color:rgba(255,255,255,0.7); }
  .score-group { display:flex; align-items:center; gap:7px; flex-shrink:0; }
  .sc-input { width:48px; height:42px; background:rgba(255,255,255,0.07); border:1px solid var(--border); color:var(--white); font-family:'Tajawal',sans-serif; font-size:20px; font-weight:900; text-align:center; border-radius:10px; outline:none; transition:all 0.2s; -moz-appearance:textfield; }
  .sc-input::-webkit-inner-spin-button,.sc-input::-webkit-outer-spin-button { -webkit-appearance:none; }
  .sc-input:focus { border-color:var(--green); background:rgba(0,166,81,0.08); box-shadow:0 0 0 3px rgba(0,166,81,0.15); }
  .sc-sep { font-size:18px; font-weight:900; color:var(--gray); }
  .save-btn { background:var(--green); border:none; color:white; font-family:'Tajawal',sans-serif; font-size:12px; font-weight:700; padding:8px 16px; border-radius:8px; cursor:pointer; transition:all 0.2s; flex-shrink:0; white-space:nowrap; }
  .save-btn:hover { background:var(--green-dark,#007a3d); transform:scale(1.04); }
  .save-btn.done { background:rgba(0,166,81,0.12); color:var(--green); border:1px solid rgba(0,166,81,0.3); cursor:default; transform:none; }
  .edit-btn { background:rgba(255,255,255,0.06); border:1px solid var(--border); color:var(--gray); font-family:'Tajawal',sans-serif; font-size:12px; font-weight:700; padding:8px 14px; border-radius:8px; cursor:pointer; transition:all 0.2s; flex-shrink:0; }
  .edit-btn:hover { border-color:rgba(0,166,81,0.4); color:var(--green); }
  .score-pill { background:rgba(0,166,81,0.12); border:1px solid rgba(0,166,81,0.25); border-radius:10px; padding:6px 20px; font-size:20px; font-weight:900; color:var(--green); letter-spacing:3px; }
  .no-result-tag { font-size:12px; color:var(--gray); padding:0 10px; }

  /* FOOTER */
  .footer { position:relative; z-index:1; border-top:1px solid var(--border); background:linear-gradient(0deg,rgba(0,166,81,0.03) 0%,transparent 100%); }
  .footer-logos { display:flex; align-items:center; justify-content:center; gap:32px; padding:32px 24px 24px; flex-wrap:wrap; }
  .footer-logo-divider { width:1px; height:48px; background:var(--border); flex-shrink:0; }
  .footer-logo-item { opacity:0.85; transition:transform 0.2s,opacity 0.2s; }
  .footer-logo-item:hover { transform:translateY(-3px); opacity:1; }
  .footer-logo-img { height:64px; width:auto; max-width:120px; object-fit:contain; filter:drop-shadow(0 2px 8px rgba(0,166,81,0.15)); transition:filter 0.2s; }
  .footer-logo-item:hover .footer-logo-img { filter:drop-shadow(0 4px 16px rgba(0,166,81,0.3)); }
  .footer-bottom { text-align:center; padding:16px 16px 28px; border-top:1px solid var(--border); color:var(--gray); font-size:13px; }
  .footer-bottom span { color:var(--green); }

  @media (max-width:660px) {
    .match-card { flex-direction:column; gap:12px; }
    .match-time { flex-direction:row; }
    .match-teams { flex-direction:column; gap:8px; }
    .team-name { font-size:13px; }
    .footer-logos { gap:16px; padding:20px 16px; }
    .footer-logo-divider { display:none; }
    .footer-logo-img { height:48px; }
    .header-logo-wrap { width:56px; height:56px; }
    .header-logos { gap:14px; margin-bottom:20px; }
    .header-logo-sep { display:none; }
    .st-table th,.st-table td { padding:8px 5px; font-size:11px; }
    .sc-input { width:40px; height:38px; font-size:17px; }
    .mr-team { font-size:11px; min-width:55px; }
    .match-row { gap:5px; padding:11px 12px; }
    .score-pill { font-size:16px; padding:5px 12px; }
    .pw-input { background:rgba(255,255,255,0.06); border:1px solid var(--border); color:var(--white); font-family:'Tajawal',sans-serif; font-size:13px; padding:8px 14px; border-radius:8px; outline:none; width:150px; transition:border 0.2s; }
.pw-input:focus { border-color:rgba(0,166,81,0.5); }
.btn-green { background:var(--green); border:none; color:white; font-family:'Tajawal',sans-serif; font-size:13px; font-weight:700; padding:8px 18px; border-radius:8px; cursor:pointer; }
.btn-green:hover { background:#007a3d; }
.btn-logout { background:rgba(255,255,255,0.07); border:none; color:var(--gray); font-family:'Tajawal',sans-serif; font-size:13px; font-weight:700; padding:8px 18px; border-radius:8px; cursor:pointer; }
.btn-logout:hover { background:rgba(229,62,62,0.15); color:#fc8181; }
.pw-error { font-size:12px; color:#fc8181; }
  }
`;

// ─── Shared components ────────────────────────────────────────────────────────
function MatchCard({ match }) {
  const home = getTeam(match.home), away = getTeam(match.away);
  return (
    <div className="match-card">
      <div className="match-time"><div className="time-badge">{match.time}</div></div>
      <div className="match-teams">
        <div className="team-name">{home.short}</div>
        <div className="vs-divider"><div className="vs-ball">⚽</div></div>
        <div className="team-name away">{away.short}</div>
      </div>
    </div>
  );
}

function FixturesView({ activeRound, setActiveRound }) {
  const grouped = groupByDay(rounds[activeRound].matches);
  return (
    <div>
      <div className="page-title">📅 البرنامج</div>
      <div className="round-tabs">
        {rounds.map((r, i) => (
          <button key={r.round} className={`round-tab${activeRound === i ? " active" : ""}`} onClick={() => setActiveRound(i)}>{r.label}</button>
        ))}
      </div>
      {grouped.map(([day, matches]) => (
        <div className="day-group" key={day}>
          <div className="day-label"><span className="day-label-text">📆 {day}</span><div className="day-label-line" /></div>
          {matches.map((m, i) => <MatchCard key={i} match={m} />)}
        </div>
      ))}
    </div>
  );
}

function AllRoundsView() {
  return (
    <div>
      <div className="page-title">📋 كل الجولات</div>
      {rounds.map((r) => {
        const grouped = groupByDay(r.matches);
        return (
          <div className="round-section" key={r.round}>
            <div className="round-title">{r.label}</div>
            {grouped.map(([day, matches]) => (
              <div className="day-group" key={day}>
                <div className="day-label"><span className="day-label-text">📆 {day}</span><div className="day-label-line" /></div>
                {matches.map((m, i) => <MatchCard key={i} match={m} />)}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function TeamsView() {
  const emojis = ["","","","","","","","","",""];
  return (
    <div>
      <div className="page-title">👥 الفرق</div>
      <div className="teams-grid">
        {teams.map((t, i) => (
          <div className="team-card" key={t.id}>
            <div className="team-avatar">{emojis[i]}</div>
            <div className="team-info"><h3>{t.short}</h3><span>{t.name}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Results & Standings ──────────────────────────────────────────────────────
function ResultsView() {
  const STORAGE_KEY = "ramadan_results_1447";

  const [results, setResults] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  });
  const [drafts, setDrafts]     = useState({});
  const [editing, setEditing]   = useState({}); // matchIds currently being edited
  const [roundIdx, setRoundIdx] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState("");
  const login = () => {
  if (pw === ADMIN_PASSWORD) { setIsAdmin(true); setPwErr(""); setPw(""); }
  else { setPwErr("كلمة المرور غير صحيحة ❌"); }
};

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(results)); } catch {}
  }, [results]);

  const standings = computeStandings(results);

  const getDraft = (mid, side) => {
    if (drafts[mid]?.[side] !== undefined) return drafts[mid][side];
    if (results[mid]?.[side] !== undefined) return results[mid][side];
    return "";
  };

  const onChange = (mid, side, val) => {
    setDrafts((p) => ({ ...p, [mid]: { ...p[mid], [side]: val } }));
  };

  const onSave = (mid) => {
    const d = drafts[mid] || {};
    const h = parseInt(d.home ?? results[mid]?.home, 10);
    const a = parseInt(d.away ?? results[mid]?.away, 10);
    if (isNaN(h) || isNaN(a) || h < 0 || a < 0) return;
    setResults((p) => ({ ...p, [mid]: { home: h, away: a } }));
    setDrafts((p) => { const n = { ...p }; delete n[mid]; return n; });
    setEditing((p) => { const n = { ...p }; delete n[mid]; return n; });
  };

  const onEdit = (mid) => setEditing((p) => ({ ...p, [mid]: true }));

  const curMatches = rounds[roundIdx].matches;

  return (
    <div className="results-layout">

      {/* ── STANDINGS TABLE ── */}
      <div className="standings-card">
        <div className="card-header">
          <span style={{fontSize:"22px"}}>🏆</span>
          <h2>ترتيب الدوري</h2>
        </div>
        <div className="st-legend">
          <div className="legend-item"><div className="legend-dot" style={{background:"var(--green)"}}></div>منطقة التأهل (1–4)</div>
          <div className="legend-item"><div className="legend-dot" style={{background:"rgba(229,62,62,0.55)"}}></div>منطقة الخطر (8–10)</div>
          <div className="legend-item" style={{marginRight:"auto",fontSize:"10px"}}>فوز=3نق · تعادل=1نق · خسارة=0نق</div>
        </div>
        <div style={{overflowX:"auto"}}>
          <table className="st-table">
            <thead>
              <tr>
                <th>#</th>
                <th className="t-col">الفريق</th>
                <th title="مباريات لعبها">ل</th>
                <th title="فوز" style={{color:"#68d391"}}>ف</th>
                <th title="تعادل" style={{color:"var(--gold)"}}>ت</th>
                <th title="خسارة" style={{color:"#fc8181"}}>خ</th>
                <th title="فارق الأهداف">±</th>
                <th title="نقاط" style={{color:"var(--green)"}}>نق</th>
                <th>الشكل</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row, idx) => {
                const team = getTeam(row.id);
                const form = getFormDots(row.id, results);
                const rbClass = idx < 4 ? "rb-top" : idx >= 7 ? "rb-bot" : "rb-mid";
                const rankColor = idx === 0 ? "#FFD700" : idx === 1 ? "#C0C0C0" : idx === 2 ? "#CD7F32" : "var(--gray)";
                return (
                  <tr key={row.id}>
                    <td style={{fontWeight:900, color:rankColor, fontSize:"15px"}}>{idx + 1}</td>
                    <td className="t-col">
                      <span className={`rank-bar ${rbClass}`}></span>
                      <span style={{fontWeight:700}}>{team.short}</span>
                    </td>
                    <td style={{color:"var(--gray)"}}>{row.mp}</td>
                    <td style={{color:"#68d391"}}>{row.w}</td>
                    <td style={{color:"var(--gold)"}}>{row.d}</td>
                    <td style={{color:"#fc8181"}}>{row.l}</td>
                    <td style={{color: row.gd > 0 ? "#68d391" : row.gd < 0 ? "#fc8181" : "var(--gray)"}}>
                      {row.gd > 0 ? `+${row.gd}` : row.gd}
                    </td>
                    <td className="pts-col">{row.pts}</td>
                    <td>
                      <div className="form-row">
                        {form.map((f, i) => (
                          <div key={i} className={`fd ${f==="w"?"fd-w":f==="d"?"fd-d":f==="l"?"fd-l":"fd-n"}`} />
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── RESULTS ENTRY ── */}
      <div className="entry-card">
        <div className="card-header">
          <span style={{fontSize:"22px"}}>✏️</span>
          <h2>النتائج</h2>
          {!isAdmin ? (
  <div style={{marginRight:"auto", display:"flex", flexDirection:"column", gap:"4px"}}>
    <div style={{display:"flex", gap:"8px"}}>
      <input className="pw-input" type="password" placeholder="كلمة المرور"
        value={pw} onChange={(e) => { setPw(e.target.value); setPwErr(""); }}
        onKeyDown={(e) => e.key === "Enter" && login()} />
      <button className="btn-green" onClick={login}>دخول</button>
    </div>
    {pwErr && <div className="pw-error">{pwErr}</div>}
  </div>
) : (
  <button className="btn-logout" style={{marginRight:"auto"}} onClick={() => setIsAdmin(false)}>خروج 🚪</button>
)}
        </div>

        <div className="entry-tabs">
          {rounds.map((r, i) => (
            <button key={r.round} className={`round-tab${roundIdx === i ? " active" : ""}`} onClick={() => setRoundIdx(i)}>
              {r.label}
            </button>
          ))}
        </div>

        {groupByDay(curMatches).map(([day, matches]) => (
          <div key={day}>
            <div className="day-hdr">📆 {day}</div>
            {matches.map((m) => {
              const home = getTeam(m.home), away = getTeam(m.away);
              const hasResult = !!results[m.id];
              const isEditing = !!editing[m.id];
              const showInputs = isAdmin && (!hasResult || isEditing);

              return (
                <div className="match-row" key={m.id}>
                  <div className="mr-team">{home.short}</div>

                  <div className="score-group">
                    {showInputs ? (
  <>
    <input className="sc-input" type="number" min="0" max="99"
      value={getDraft(m.id, "home")}
      onChange={(e) => onChange(m.id, "home", e.target.value)} />
    <span className="sc-sep">–</span>
    <input className="sc-input" type="number" min="0" max="99"
      value={getDraft(m.id, "away")}
      onChange={(e) => onChange(m.id, "away", e.target.value)} />
  </>
) : results[m.id] ? (
  <div className="score-pill">{results[m.id].home} – {results[m.id].away}</div>
) : (
  <div className="no-result-tag">لم تُلعب بعد</div>
)}
                  </div>

                  <div className="mr-team away">{away.short}</div>

                 {isAdmin && (showInputs ? (
  <button className="save-btn" onClick={() => onSave(m.id)}>حفظ ✓</button>
) : (
  <button className="edit-btn" onClick={() => onEdit(m.id)}>تعديل ✏️</button>
))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const owners = [
    { img: sante, alt: "وزارة الصحة" },
    { img: fh2,   alt: "مستشفى الحسن الثاني" },
    { img: rsal,  alt: "المديرية الإقليمية للصحة" },
  ];
  return (
    <footer className="footer">
      <div className="footer-logos">
        {owners.map((o, i) => (
          <div key={o.alt} style={{display:"contents"}}>
            <div className="footer-logo-item">
              <img src={o.img} alt={o.alt} className="footer-logo-img" />
            </div>
            {i < owners.length - 1 && <div className="footer-logo-divider" />}
          </div>
        ))}
      </div>
      <div className="footer-bottom">دوري رمضان <span>1447</span> · المديرية الإقليمية للصحة</div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage]           = useState("fixtures");
  const [activeRound, setActiveRound] = useState(0);

  const nav = [
    { key: "fixtures", label: "📅 الجولات" },
    { key: "all",      label: "📋 البرنامج الكامل" },
    { key: "results",  label: "🏆 النتائج والترتيب" },
    { key: "teams",    label: "👥 الفرق" },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <div className="header-logos">
            <div className="header-logo-wrap"><img src={sante} alt="وزارة الصحة" className="header-logo-img" /></div>
            <div className="header-logo-sep" />
            <div className="header-logo-wrap"><img src={fh2} alt="مستشفى الحسن الثاني" className="header-logo-img" /></div>
            <div className="header-logo-sep" />
            <div className="header-logo-wrap"><img src={rsal} alt="المديرية الإقليمية للصحة" className="header-logo-img" /></div>
          </div>
          <div className="header-badge">🌙 رمضان 1447</div>
          <h1>دوري رمضان الصحي</h1>
          <div className="header-sub">البرنامج الكامل للمباريات</div>
        </div>

        <nav className="nav">
          {nav.map((b) => (
            <button key={b.key} className={`nav-btn${page === b.key ? " active" : ""}`} onClick={() => setPage(b.key)}>
              {b.label}
            </button>
          ))}
        </nav>

        <div className="content">
          {page === "fixtures" && <FixturesView activeRound={activeRound} setActiveRound={setActiveRound} />}
          {page === "all"      && <AllRoundsView />}
          {page === "results"  && <ResultsView />}
          {page === "teams"    && <TeamsView />}
        </div>



        <Footer />
      </div>
    </>
  );
}