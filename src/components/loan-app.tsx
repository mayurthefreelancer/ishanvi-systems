import { useState, useEffect } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from "recharts";

const RATE = 0.007551;
const P = 4150000;
const EMI1 = 35000;
const EMI2 = 50000;

function buildSchedule() {
  let bal = P, origData = [], totIntOrig = 0;
  for (let i = 1; i <= 300; i++) {
    const int = bal * RATE;
    bal -= (EMI1 - int);
    totIntOrig += int;
    origData.push({ month: i, balOrig: Math.max(0, bal) });
  }
  bal = P;
  let actualData = [], totIntActual = 0;
  for (let i = 1; i <= 84; i++) {
    const int = bal * RATE;
    bal -= (EMI1 - int);
    totIntActual += int;
    actualData.push({ month: i, balActual: Math.max(0, bal) });
  }
  bal = 3500000;
  for (let i = 85; i <= 300; i++) {
    const int = bal * RATE;
    const prin = EMI2 - int;
    totIntActual += int;
    if (bal <= EMI2) { actualData.push({ month: i, balActual: 0 }); break; }
    bal -= prin;
    actualData.push({ month: i, balActual: Math.max(0, bal) });
  }
  const merged = [];
  for (let i = 0; i < 300; i++) {
    merged.push({
      month: i + 1,
      year: +((i + 1) / 12).toFixed(1),
      balOrig: origData[i]?.balOrig ?? 0,
      balActual: actualData[i]?.balActual ?? 0,
    });
  }
  return { merged, totIntOrig, totIntActual };
}

const { merged, totIntOrig, totIntActual } = buildSchedule();
const savedInterest = totIntOrig - totIntActual;
const savedTotal = 10500000 - 7938084;

const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const fmtL = (n) => {
  const l = n / 100000;
  return l >= 100 ? `₹${(n / 10000000).toFixed(2)}Cr` : `₹${l.toFixed(1)}L`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#111827", border: "1px solid #374151", borderRadius: 10, padding: "10px 14px", fontSize: 12, fontFamily: "'DM Mono', monospace" }}>
      <div style={{ color: "#6b7280", marginBottom: 6 }}>Month {label} · Year {(label / 12).toFixed(1)}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, marginBottom: 2 }}>{p.name}: <strong>{fmtL(p.value)}</strong></div>
      ))}
      {payload.length === 2 && payload[1].value > 0 && (
        <div style={{ color: "#10b981", borderTop: "1px solid #374151", marginTop: 6, paddingTop: 6 }}>
          Gap: {fmtL(payload[0].value - payload[1].value)}
        </div>
      )}
    </div>
  );
};

const BarTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#111827", border: "1px solid #374151", borderRadius: 10, padding: "10px 14px", fontSize: 12, fontFamily: "'DM Mono', monospace" }}>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.fill, marginBottom: 2 }}>{p.name}: <strong>{fmt(p.value)}</strong></div>
      ))}
    </div>
  );
};

const AnimatedNumber = ({ value, prefix = "", suffix = "", decimals = 0 }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseFloat(value);
    const duration = 1200;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(start);
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{prefix}{display.toFixed(decimals)}{suffix}</span>;
};

const phaseData = [
  { name: "7 Yrs @ ₹35k", interest: 2512396, principal: 427604 },
  { name: "~8.3 Yrs @ ₹50k", interest: 1498084, principal: 3500000 },
];

const compData = [
  { name: "Original 35k Plan", interest: Math.round(totIntOrig), principal: 4150000 },
  { name: "Your Actual Plan", interest: Math.round(totIntActual), principal: 4150000 },
];

export default function App() {
  const [tab, setTab] = useState("overview");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const tabs = ["overview", "balance", "breakdown"];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0e1a 0%, #0f1629 50%, #0a0e1a 100%)",
      color: "#e2e8f0",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      padding: "0 0 40px 0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .card { transition: transform 0.2s, box-shadow 0.2s; }
        .card:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
        .tab-btn { transition: all 0.2s; }
        .tab-btn:hover { color: #f0fdf4 !important; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(16,185,129,0.2); } 50% { box-shadow: 0 0 40px rgba(16,185,129,0.4); } }
        .glow { animation: pulse-glow 3s ease-in-out infinite; }
      `}</style>

      {/* Header Banner */}
      <div style={{
        background: "linear-gradient(90deg, #064e3b 0%, #065f46 50%, #064e3b 100%)",
        borderBottom: "1px solid #10b98133",
        padding: "28px 32px 24px",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(16,185,129,0.1) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(5,150,105,0.08) 0%, transparent 60%)" }} />
        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#6ee7b7", letterSpacing: 4, textTransform: "uppercase", marginBottom: 8 }}>Home Loan · Analysis Report</div>
              <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, color: "#f0fdf4" }}>
                ₹41.5L Loan · 9.06% p.a. · 25Y Term
              </h1>
              <p style={{ color: "#6ee7b7", fontSize: 13, marginTop: 6, fontFamily: "'DM Mono', monospace" }}>
                First EMI: 10 Jan 2019 &nbsp;·&nbsp; Step-up: Jan 2026 &nbsp;·&nbsp; ₹35k → ₹50k/month
              </p>
            </div>
            <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #10b98155", borderRadius: 12, padding: "12px 20px", textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "#6ee7b7", fontFamily: "'DM Mono', monospace", letterSpacing: 2, marginBottom: 4 }}>NET SAVING</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#10b981" }}>
                {mounted ? fmtL(savedInterest) : "—"}
              </div>
              <div style={{ fontSize: 11, color: "#6ee7b7" }}>in interest charges</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 20px 0" }}>

        {/* Hero Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
          {[
            {
              label: "Interest Saved", value: fmtL(savedInterest),
              sub: "vs original 35k for 300 months",
              color: "#10b981", bg: "linear-gradient(135deg, #064e3b22, #065f4622)",
              border: "#10b98133", icon: "📉", delay: "0s"
            },
            {
              label: "Total Saved", value: fmtL(savedTotal),
              sub: "less out of pocket overall",
              color: "#38bdf8", bg: "linear-gradient(135deg, #0c4a6e22, #075985 22)",
              border: "#38bdf833", icon: "💰", delay: "0.1s"
            },
            {
              label: "Years Saved", value: "9.7 yrs",
              sub: "Loan closes in 15.3 yrs not 25",
              color: "#f59e0b", bg: "linear-gradient(135deg, #78350f22, #92400e22)",
              border: "#f59e0b33", icon: "⏳", delay: "0.2s"
            },
          ].map((s, i) => (
            <div key={i} className="card fade-up" style={{
              background: s.bg, border: `1px solid ${s.border}`,
              borderRadius: 14, padding: "18px 20px",
              animationDelay: s.delay, opacity: 0
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ fontSize: 11, color: "#94a3b8", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>{s.label}</div>
                <span style={{ fontSize: 18 }}>{s.icon}</span>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: s.color, marginTop: 10, letterSpacing: -1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 6 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 2, marginBottom: 20, borderBottom: "1px solid #1e293b", paddingBottom: 0 }}>
          {tabs.map(t => (
            <button key={t} className="tab-btn" onClick={() => setTab(t)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: tab === t ? "#10b981" : "#64748b",
              fontSize: 13, fontFamily: "'DM Mono', monospace",
              padding: "10px 20px",
              borderBottom: tab === t ? "2px solid #10b981" : "2px solid transparent",
              textTransform: "capitalize", letterSpacing: 1, transition: "all 0.2s"
            }}>{t}</button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {tab === "overview" && (
          <div>
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
              <div style={{ padding: "14px 22px", borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
                <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#64748b", letterSpacing: 2, textTransform: "uppercase" }}>Scenario Comparison</span>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#080d18" }}>
                    {["Metric", "Original Plan (35k)", "Your Actual Plan", "You Saved"].map((h, i) => (
                      <th key={i} style={{ padding: "11px 22px", textAlign: i === 0 ? "left" : "right", fontSize: 11, fontFamily: "'DM Mono', monospace", color: i === 3 ? "#10b981" : "#475569", fontWeight: 500, letterSpacing: 1 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Loan Principal", fmt(4150000), fmt(4150000), "—"],
                    ["Total EMI Paid", fmt(10500000), fmt(7938084), fmt(2561916)],
                    ["Total Interest", fmt(Math.round(totIntOrig)), fmt(Math.round(totIntActual)), fmt(Math.round(savedInterest))],
                    ["Loan Duration", "300 months · 25 yrs", "184 months · 15.3 yrs", "116 months · 9.7 yrs"],
                    ["Interest Burden", `${((totIntOrig / 4150000) * 100).toFixed(0)}% of principal`, `${((totIntActual / 4150000) * 100).toFixed(0)}% of principal`, `${(((totIntOrig - totIntActual) / totIntOrig) * 100).toFixed(0)}% reduction`],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderTop: "1px solid #1e293b", background: i % 2 === 0 ? "transparent" : "#0a101f" }}>
                      <td style={{ padding: "13px 22px", fontSize: 13, color: "#cbd5e1" }}>{row[0]}</td>
                      <td style={{ padding: "13px 22px", textAlign: "right", fontSize: 13, fontFamily: "'DM Mono', monospace", color: "#f87171" }}>{row[1]}</td>
                      <td style={{ padding: "13px 22px", textAlign: "right", fontSize: 13, fontFamily: "'DM Mono', monospace", color: "#94a3b8" }}>{row[2]}</td>
                      <td style={{ padding: "13px 22px", textAlign: "right", fontSize: 13, fontFamily: "'DM Mono', monospace", color: "#10b981", fontWeight: 600 }}>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Warning Card */}
            <div style={{ background: "linear-gradient(135deg, #1c1004, #231508)", border: "1px solid #f59e0b33", borderRadius: 14, padding: "18px 22px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>⚠️</div>
              <div>
                <div style={{ color: "#f59e0b", fontWeight: 600, fontSize: 14, marginBottom: 6 }}>Cost of the 7-Year Delay in Stepping Up</div>
                <div style={{ color: "#78716c", fontSize: 13, lineHeight: 1.7 }}>
                  Stepping up from ₹35k to ₹50k took 7 years. During that period, monthly interest was <strong style={{ color: "#fbbf24" }}>~₹30,000–31,000</strong> — meaning only <strong style={{ color: "#fbbf24" }}>₹4,000–5,000</strong> went to principal each month. This delay cost you an extra <strong style={{ color: "#f59e0b" }}>₹16.1L</strong> in interest compared to stepping up from Day 1.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BALANCE TAB */}
        {tab === "balance" && (
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14, padding: "22px 20px" }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#f1f5f9", marginBottom: 6 }}>Outstanding Balance — Original vs Actual</div>
              <div style={{ fontSize: 12, color: "#64748b", fontFamily: "'DM Mono', monospace" }}>
                <span style={{ color: "#f87171" }}>■</span> Original plan (35k forever) &nbsp;·&nbsp;
                <span style={{ color: "#10b981" }}>■</span> Your plan (step-up at month 84) &nbsp;·&nbsp;
                <span style={{ color: "#f59e0b" }}>┄</span> Step-up point
              </div>
            </div>
            <ResponsiveContainer width="100%" height={360}>
              <AreaChart data={merged} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <defs>
                  <linearGradient id="gOrig" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gAct" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#334155" fontSize={11} fontFamily="'DM Mono', monospace"
                  tickFormatter={v => `${v}m`} ticks={[1, 60, 84, 120, 180, 240, 300]} />
                <YAxis stroke="#334155" fontSize={11} fontFamily="'DM Mono', monospace"
                  tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine x={84} stroke="#f59e0b" strokeDasharray="5 5" strokeWidth={1.5}
                  label={{ value: "Step-up →", fill: "#f59e0b", fontSize: 11, fontFamily: "'DM Mono', monospace" }} />
                <Area type="monotone" dataKey="balOrig" name="Original Plan" stroke="#f87171" fill="url(#gOrig)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="balActual" name="Your Plan" stroke="#10b981" fill="url(#gAct)" strokeWidth={2.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[
                { label: "Balance at Step-up (Month 84)", value: "₹35,00,000", color: "#38bdf8" },
                { label: "Your Loan Closes", value: "Month 184 (15.3 yrs)", color: "#10b981" },
                { label: "Original Would Close", value: "Month 300 (25 yrs)", color: "#f87171" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#080d18", borderRadius: 10, padding: "12px 14px", border: `1px solid ${s.color}22` }}>
                  <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: s.color, fontFamily: "'DM Mono', monospace" }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BREAKDOWN TAB */}
        {tab === "breakdown" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Principal vs Interest Chart */}
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9", marginBottom: 4 }}>Principal vs Interest Paid</div>
              <div style={{ fontSize: 11, color: "#64748b", fontFamily: "'DM Mono', monospace", marginBottom: 18 }}>Stacked comparison of both scenarios</div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={compData} barSize={44} margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#334155" fontSize={10} fontFamily="'DM Mono', monospace" />
                  <YAxis stroke="#334155" fontSize={10} fontFamily="'DM Mono', monospace" tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
                  <Tooltip content={<BarTooltip />} />
                  <Bar dataKey="principal" name="Principal" fill="#3b82f6" stackId="a" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="interest" name="Interest" fill="#f87171" stackId="a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", gap: 16, marginTop: 14, justifyContent: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#94a3b8", fontFamily: "'DM Mono', monospace" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: "#3b82f6" }} /> Principal
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#94a3b8", fontFamily: "'DM Mono', monospace" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: "#f87171" }} /> Interest
                </div>
              </div>
            </div>

            {/* Phase Breakdown */}
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9", marginBottom: 16 }}>Your 2-Phase Journey</div>
              {[
                {
                  phase: "Phase 1", duration: "Jan 2019 – Dec 2025", emi: "₹35,000/mo",
                  months: "84 months", totalPaid: "₹29.4L", interest: "₹25.1L", principal: "₹4.3L",
                  note: "⚠️ Only ₹4.3L principal cleared — 85% went to interest",
                  color: "#f87171", bg: "#1c0a0a"
                },
                {
                  phase: "Phase 2", duration: "Jan 2026 – Closure", emi: "₹50,000/mo",
                  months: "~100 months", totalPaid: "₹49.98L", interest: "₹14.98L", principal: "₹35L",
                  note: "✅ ₹35L principal wiped out efficiently",
                  color: "#10b981", bg: "#041a12"
                }
              ].map((p, i) => (
                <div key={i} style={{
                  background: p.bg, borderRadius: 10, padding: "14px 16px",
                  borderLeft: `3px solid ${p.color}`,
                  marginBottom: i === 0 ? 12 : 0
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: p.color }}>{p.phase}</span>
                    <span style={{ fontSize: 11, color: "#64748b", fontFamily: "'DM Mono', monospace" }}>{p.duration}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" }}>
                    {[["EMI", p.emi], ["Duration", p.months], ["Total Paid", p.totalPaid], ["Interest", p.interest], ["Principal Paid", p.principal]].map(([k, v]) => (
                      <div key={k}>
                        <div style={{ fontSize: 9, color: "#475569", textTransform: "uppercase", letterSpacing: 1, fontFamily: "'DM Mono', monospace" }}>{k}</div>
                        <div style={{ fontSize: 13, color: "#e2e8f0", fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 10, fontSize: 11, color: "#64748b", fontStyle: "italic" }}>{p.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 28, fontSize: 10, color: "#1e293b", fontFamily: "'DM Mono', monospace", letterSpacing: 2 }}>
          RATE ~9.06% P.A. · FIGURES APPROXIMATE · STEP-UP APPLIED ON GIVEN ₹35L OUTSTANDING
        </div>
      </div>
    </div>
  );
}
