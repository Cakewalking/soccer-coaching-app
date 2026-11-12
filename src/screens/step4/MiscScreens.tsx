import React, { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2', BG = '#f5f6f4'

function PhoneWrap({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
      <div style={{ width: 390, background: '#fff', borderRadius: 24, border: `1px solid ${LN}`, overflow: 'hidden', fontFamily: 'var(--font-sans)' }}>
        {children}
      </div>
    </div>
  )
}

// ─── B1 Coach And Fitness ──────────────────────────────────────────────────────

export function B1CoachAndFitness() {
  const homeNav = ['Overview', 'Inbox', 'Calendar', 'Fixtures and results', 'Our style', 'Team staff', 'Coach and fitness']
  const alerts = [
    { time: '7:30 am', title: 'Ella has felt low two days running', type: 'Wellness check-ins', warn: true },
    { time: '7:12 am', title: "3 GPS vests didn't sync", type: 'Data', warn: true },
    { time: 'Yesterday', title: 'Noah and Zoe are growing fast: sprint caps suggested', type: 'Clean Sheet · Growth', warn: false },
  ]
  const stats = [
    { label: 'Winning the ball back', value: '7 s', status: 'Needs work' },
    { label: 'Pressing wins in their half', value: '13', status: 'Getting better' },
  ]
  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Home' ? 700 : 500, color: t === 'Home' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>U12 Sam · Wattle Creek</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: 200, background: '#fff', borderRight: `1px solid ${LN}`, flexShrink: 0, padding: '12px 0' }}>
          {homeNav.map(item => (
            <div key={item} style={{ padding: '10px 20px', fontSize: 14, fontWeight: item === 'Coach and fitness' ? 700 : 500, color: item === 'Coach and fitness' ? G : MUT, background: item === 'Coach and fitness' ? PALE : 'transparent', borderLeft: item === 'Coach and fitness' ? `3px solid ${G}` : '3px solid transparent', cursor: 'pointer', position: 'relative' as const }}>
              {item}
              {item === 'Inbox' && <span style={{ position: 'absolute' as const, right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 20, background: '#dc2626', color: '#fff' }}>3</span>}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 4 }}>Coach and fitness</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Where we're at, on the ball and growing</div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, marginBottom: 20, overflow: 'hidden' }}>
            <div style={{ padding: '12px 20px', borderBottom: `1px solid ${LN}`, display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Needs you · 3 new</div>
              <div style={{ fontSize: 12, color: G, cursor: 'pointer' }}>All messages · 3 more</div>
            </div>
            {alerts.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 20px', borderTop: i === 0 ? 'none' : `1px solid ${LN}` }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.warn ? '#dc2626' : G, flexShrink: 0, marginTop: 5 }} />
                <div>
                  <div style={{ fontSize: 12, color: MUT, marginBottom: 2 }}>{a.type} · {a.time}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{a.title}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>All 4 · where we're at</div>
            {stats.map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${LN}` }}>
                <div style={{ fontSize: 13, color: INK }}>{s.label}</div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: INK }}>{s.value}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: s.status === 'Getting better' ? '#f0fdf4' : '#fef2f2', color: s.status === 'Getting better' ? '#16a34a' : '#dc2626' }}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Today · 5:45 pm · Wattle Creek Reserve</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Training tonight</div>
            <div style={{ fontSize: 13, color: MUT }}>90 minutes · warm-up, 4 drills and sprint caps built in</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── PO1 Older Player Home ─────────────────────────────────────────────────────

export function PO1OlderHome() {
  return (
    <PhoneWrap>
      <div style={{ background: GD, padding: '16px 20px' }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Wattle Creek U16 · your own account</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>Hi Cal</div>
      </div>

      {/* Availability prompt */}
      <div style={{ background: PALE, borderBottom: `1px solid ${LN}`, padding: '12px 20px', display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ textAlign: 'center' as const, flexShrink: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: G }}>SAT</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: G, lineHeight: 1 }}>6</div>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>at Harbour Rovers · 3:30</div>
          <div style={{ fontSize: 13, color: G, fontWeight: 600 }}>You haven't said if you're in. Tap to answer.</div>
        </div>
      </div>

      {/* Load alert */}
      <div style={{ background: '#fffbeb', borderBottom: `1px solid ${LN}`, padding: '12px 20px', display: 'flex', gap: 10 }}>
        <div style={{ fontSize: 16, flexShrink: 0 }}>⚠</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#d97706' }}>Big week for your legs</div>
          <div style={{ fontSize: 12, color: MUT }}>Club, school footy and a test. Priya's made Wednesday a rest day for you.</div>
        </div>
      </div>

      {/* This week */}
      <div style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>This week</div>
          <div style={{ fontSize: 13, color: G, cursor: 'pointer' }}>All</div>
        </div>
        {[
          { day: 'Fri 5', event: 'Team meeting 6:00 pm' },
          { day: 'Sat 6', event: 'Harbour Rovers 3:30, away' },
          { day: 'Mon 8', event: 'Training 7:00 pm' },
        ].map((e, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, padding: '8px 0', borderTop: i === 0 ? 'none' : `1px solid ${LN}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: MUT, width: 36, flexShrink: 0 }}>{e.day}</div>
            <div style={{ fontSize: 13, color: INK }}>{e.event}</div>
          </div>
        ))}
      </div>

      {/* My goal */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ background: BG, borderRadius: 12, padding: '14px 16px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>My goal · set with Ollie</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Play forward on my first touch</div>
          <div style={{ fontSize: 13, color: G }}>3 of the last 5 games</div>
        </div>
      </div>

      <div style={{ padding: '0 20px 12px', fontSize: 12, color: MUT }}>Your account is yours. A parent is copied on messages with coaches until you're 18.</div>

      {/* Bottom nav */}
      <div style={{ borderTop: `1px solid ${LN}`, display: 'flex' }}>
        {['Home', 'Clips', 'Body', 'Messages'].map(t => (
          <div key={t} style={{ flex: 1, padding: '10px 0', textAlign: 'center' as const, fontSize: 12, fontWeight: t === 'Home' ? 700 : 500, color: t === 'Home' ? G : MUT, cursor: 'pointer' }}>{t}</div>
        ))}
      </div>
    </PhoneWrap>
  )
}

// ─── CH8 Chat Info ─────────────────────────────────────────────────────────────

export function CH8ChatInfo() {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  const participants = [
    { init: 'RO', name: 'Rob Owusu', role: 'Team manager · owner', badge: 'Owner' },
    { init: 'SK', name: 'Sam K (you)', role: 'Head coach', badge: 'Can manage' },
    { init: 'JW', name: 'Jane Walsh', role: 'Parent' },
    { init: 'LT', name: 'Linh Tran', role: 'Parent' },
  ]
  const homeNav = ['Overview', 'Inbox', 'Calendar', 'Fixtures and results', 'Our style', 'Team staff']
  return (
    <div style={{ width: 1180, background: BG, fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Home' ? 700 : 500, color: t === 'Home' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>U12 Sam · Wattle Creek</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: 200, background: '#fff', borderRight: `1px solid ${LN}`, flexShrink: 0, padding: '12px 0' }}>
          {homeNav.map(item => (
            <div key={item} style={{ padding: '10px 20px', fontSize: 14, fontWeight: 500, color: MUT, cursor: 'pointer' }}>{item}</div>
          ))}
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 28, maxWidth: 640 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 4 }}>Chat details</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>U12 Sam team chat · set up by Rob on 2 March</div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <button onClick={() => st('Going back to chat.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: G, cursor: 'pointer' }}>Back to chat</button>
            <button onClick={() => st('Opening chat settings.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: G, cursor: 'pointer' }}>Change settings</button>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '12px 20px', borderBottom: `1px solid ${LN}`, display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>In this chat · 20 adults</div>
              <div style={{ fontSize: 12, color: G, cursor: 'pointer' }}>See all</div>
            </div>
            {participants.map((p, i) => (
              <div key={p.init} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderTop: i === 0 ? 'none' : `1px solid ${LN}` }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{p.init}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.role}</div>
                </div>
                {p.badge && <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: PALE, color: G }}>{p.badge}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}

// ─── PS1–PS4 Parent Settings ───────────────────────────────────────────────────

function PSShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <PhoneWrap>
      <div style={{ background: GD, padding: '16px 20px' }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>Wattle Creek FC · parent</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Settings</div>
      </div>
      <div style={{ display: 'flex', borderBottom: `1px solid ${LN}`, padding: '0 16px' }}>
        {['Account', 'Notifications', 'Privacy', 'Mia'].map(t => (
          <div key={t} style={{ flex: 1, padding: '10px 0', textAlign: 'center' as const, fontSize: 13, fontWeight: t === title ? 700 : 500, color: t === title ? G : MUT, borderBottom: t === title ? `2px solid ${G}` : '2px solid transparent', cursor: 'pointer' }}>{t}</div>
        ))}
      </div>
      <div style={{ padding: '16px 20px' }}>{children}</div>
    </PhoneWrap>
  )
}

function RowItem({ label, value, toggle }: { label: string; value?: string; toggle?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${LN}` }}>
      <div style={{ fontSize: 14, color: INK }}>{label}</div>
      {toggle !== undefined && (
        <div style={{ width: 44, height: 26, borderRadius: 13, background: toggle ? G : '#d1d5db', position: 'relative' as const }}>
          <div style={{ position: 'absolute' as const, top: 2, left: toggle ? 20 : 2, width: 22, height: 22, borderRadius: '50%', background: '#fff' }} />
        </div>
      )}
      {value && <div style={{ fontSize: 14, color: MUT }}>{value}</div>}
    </div>
  )
}

export function PS1ParentSettings() {
  return (
    <PSShell title="Account">
      <div style={{ background: BG, borderRadius: 10, padding: '12px 14px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>LT</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Linh Tran</div>
            <div style={{ fontSize: 12, color: MUT }}>linh.tran@example.com · 0412 345 678</div>
          </div>
        </div>
      </div>
      <RowItem label="Your children" value="Mia, U12 Sam · Bao, U8 Hannah" />
      <RowItem label="Another parent or carer" value="Add someone" />
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>The app</div>
        <RowItem label="Add games to my calendar" value="Google, Apple or Outlook" />
        <RowItem label="Text size" value="Standard" />
      </div>
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Your data</div>
        <RowItem label="Download or delete" value="›" />
        <RowItem label="Help and privacy policy" value="›" />
      </div>
      <div style={{ marginTop: 20, textAlign: 'center' as const }}>
        <div style={{ fontSize: 14, color: '#dc2626', cursor: 'pointer' }}>Sign out</div>
      </div>
    </PSShell>
  )
}

export function PS2ParentNotifications() {
  return (
    <PSShell title="Notifications">
      {[
        { label: 'Meet time or venue changes', note: 'Always on, so you never miss one', on: true, always: true },
        { label: "Can they make it?", note: 'One question per game or session', on: true, always: false },
        { label: 'Your duty this week', note: 'Canteen, oranges, linesman', on: true, always: false },
        { label: 'A clip or note from the coach', note: 'When Sam sends Mia something', on: true, always: false },
        { label: "Mia's check-in reminder", note: "On her phone, and yours if she hasn't answered", on: true, always: false },
        { label: 'Club news', note: 'About once a month', on: false, always: false },
      ].map((n, i) => (
        <div key={i} style={{ padding: '12px 0', borderBottom: `1px solid ${LN}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{n.label}</div>
            {n.always ? (
              <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: PALE, color: G }}>Always</span>
            ) : (
              <div style={{ width: 44, height: 26, borderRadius: 13, background: n.on ? G : '#d1d5db', position: 'relative' as const }}>
                <div style={{ position: 'absolute' as const, top: 2, left: n.on ? 20 : 2, width: 22, height: 22, borderRadius: '50%', background: '#fff' }} />
              </div>
            )}
          </div>
          <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{n.note}</div>
        </div>
      ))}
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 4 }}>Quiet hours</div>
        <RowItem label="" value="9 pm to 7 am" />
        <RowItem label="Also text me" toggle={true} />
        <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>For changes on the day of a game. A head knock or a cancelled game always reaches you, whatever you choose here.</div>
      </div>
    </PSShell>
  )
}

export function PS3ParentData() {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <PSShell title="Privacy">
      {[
        { label: 'What is recorded about Mia', value: '5 of 6 on', note: 'GPS vest, clips, wellness, goals, photos · no biometrics' },
        { label: 'What is recorded about Bao', value: '2 of 2 on', note: 'Clips and wellness only (MiniRoos)' },
        { label: 'Who can see Mia\'s clips', value: 'Team only', note: 'No clips are shared with other clubs or the public' },
        { label: 'Your data location', value: 'Australia', note: 'All data is stored in Sydney' },
      ].map((r, i) => (
        <div key={i} style={{ padding: '12px 0', borderBottom: `1px solid ${LN}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{r.label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: G }}>{r.value}</div>
          </div>
          <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{r.note}</div>
        </div>
      ))}
      <div style={{ marginTop: 16 }}>
        <button onClick={() => st('Downloading a copy of all data.')} style={{ width: '100%', height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: G, cursor: 'pointer' }}>Download a copy of all data</button>
        {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
      </div>
    </PSShell>
  )
}

export function PS4PlayerMe() {
  return (
    <PSShell title="Mia">
      <div style={{ background: BG, borderRadius: 10, padding: '12px 14px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>MT</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Mia Tran</div>
          <div style={{ fontSize: 12, color: MUT }}>U12 Sam · Wattle Creek FC</div>
        </div>
      </div>
      {[
        { label: "Mia's check-ins", value: 'On · both phones' },
        { label: 'Mia can see her own clips', toggle: true },
        { label: "Mia's wellness history is private", toggle: true },
        { label: 'Allow photos shared in team chat', toggle: true },
        { label: 'Allow coach contact after U15', toggle: false },
      ].map((r, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${LN}` }}>
          <div style={{ fontSize: 14, color: INK }}>{r.label}</div>
          {r.value && <div style={{ fontSize: 13, color: MUT }}>{r.value}</div>}
          {r.toggle !== undefined && (
            <div style={{ width: 44, height: 26, borderRadius: 13, background: r.toggle ? G : '#d1d5db', position: 'relative' as const }}>
              <div style={{ position: 'absolute' as const, top: 2, left: r.toggle ? 20 : 2, width: 22, height: 22, borderRadius: '50%', background: '#fff' }} />
            </div>
          )}
        </div>
      ))}
    </PSShell>
  )
}
