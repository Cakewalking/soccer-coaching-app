import { useState } from 'react'

type Goto = (v: string) => void

function GreenHeader({ subtitle, title, onBack }: { subtitle: string; title: string; onBack: () => void }) {
  return (
    <div style={{ flexShrink: 0, padding: '10px 14px 12px', background: '#2f6252', color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
      <button onClick={onBack} aria-label="Back" style={{ flexShrink: 0, width: 44, height: 44, borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 0, color: '#fff', cursor: 'pointer' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>
      </button>
      <span style={{ flexGrow: 1 }}>
        <span style={{ display: 'block', fontSize: 12, lineHeight: '16px', color: '#cfe6dc' }}>{subtitle}</span>
        <span style={{ display: 'block', fontSize: 21, lineHeight: '27px', fontWeight: 700 }}>{title}</span>
      </span>
      <span style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>LT</span>
    </div>
  )
}

function PillChip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ flexShrink: 0, minHeight: 44, padding: '0 14px', borderRadius: '999px', display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 700, border: `1px solid ${selected ? '#2f6252' : '#c5c8c4'}`, background: selected ? '#2f6252' : '#fff', color: selected ? '#fff' : '#10211f', cursor: 'pointer', fontFamily: 'inherit' }}>
      {label}
    </button>
  )
}

export function RaiseConcernView({ onBack, onSent }: { onBack: () => void; onSent: () => void }) {
  const [about, setAbout] = useState<string | null>('My child')
  const [help, setHelp] = useState<string | null>('Call me')
  const [toast, setToast] = useState('')
  const aboutOpts = ['My child', 'Another child', 'A coach or volunteer', 'Another parent', 'Something else']
  const helpOpts = ['Call me', 'Message me', 'Just letting you know']

  function sendToChair() {
    setToast('Sent to Greg Lawson, club chair. Helen can\'t see it.')
    setTimeout(() => setToast(''), 3200)
  }

  return (
    <div style={{ width: 390, margin: '0 auto', background: '#f7f8f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <GreenHeader subtitle="Wattle Creek FC · private" title="Tell the club" onBack={onBack} />
      <div style={{ flexGrow: 1, overflow: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: '#fff', border: '2px solid #c39797', borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>Is a child in danger right now?</span>
          <span style={{ fontSize: 14, lineHeight: '20px' }}>Call 000 first. Then tell us here.</span>
        </div>
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4a5a57' }}>What is it about</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {aboutOpts.map(o => <PillChip key={o} label={o} selected={about === o} onClick={() => setAbout(o)} />)}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4a5a57' }}>What's worrying you</span>
            <textarea rows={4} defaultValue="Mia has come home upset after training twice this fortnight. She says she's left out when they pick passing groups." style={{ border: '1px solid #c5c8c4', borderRadius: 10, padding: '10px 12px', fontSize: 15, lineHeight: '21px', resize: 'none', fontFamily: 'inherit', outline: 'none' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4a5a57' }}>What would help</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {helpOpts.map(o => <PillChip key={o} label={o} selected={help === o} onClick={() => setHelp(o)} />)}
            </div>
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '4px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56 }}>
            <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>HP</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Only Helen Park sees this</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Welfare officer · not Mia's coach or manager</span>
            </span>
          </div>
        </div>
        <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57', padding: '0 2px' }}>About Helen herself? Use the second button.</span>
      </div>
      <div style={{ flexShrink: 0, padding: '10px 14px 12px', background: '#fff', borderTop: '1px solid #e9eae8', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button onClick={onSent} style={{ height: 50, borderRadius: 10, border: '1px solid #2f6252', background: '#2f6252', color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Send to Helen</button>
        <button onClick={sendToChair} style={{ height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', color: '#10211f', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Send to the club chair instead</button>
      </div>
      {toast && (
        <div role="status" style={{ position: 'absolute', left: 16, right: 16, bottom: 92, zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>
          {toast}
        </div>
      )}
    </div>
  )
}

export function ConcernSentView({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ width: 390, margin: '0 auto', background: '#f7f8f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
      <GreenHeader subtitle="Wattle Creek FC · private" title="Sent to Helen" onBack={onBack} />
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12, padding: '28px 12px 8px' }}>
          <span style={{ width: 72, height: 72, borderRadius: '999px', background: '#2f6252', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>
          </span>
          <span style={{ fontSize: 24, lineHeight: '30px', fontWeight: 700, letterSpacing: '-0.02em' }}>Thank you for telling us</span>
          <span style={{ fontSize: 16, lineHeight: '24px', color: '#2d3d3a' }}>Helen will call you within 2 days.</span>
        </div>
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '4px 14px' }}>
          {[
            { n: '1', title: 'Helen reads it', sub: 'Today or tomorrow' },
            { n: '2', title: 'She calls you', sub: "Nothing happens before you've talked" },
            { n: '3', title: 'You agree the next step together', sub: 'You can ask her to stop at any time' },
          ].map(s => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, borderTop: '1px solid #e9eae8' }}>
              <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '999px', background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{s.n}</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{s.title}</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{s.sub}</span>
              </span>
            </div>
          ))}
        </div>
        <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57', padding: '0 2px' }}>Sam and Rob can't see that you sent this. The director sees only that a concern is open, not who it's about.</span>
      </div>
      <div style={{ flexShrink: 0, padding: '10px 14px 12px', background: '#fff', borderTop: '1px solid #e9eae8' }}>
        <button onClick={onBack} style={{ width: '100%', height: 50, borderRadius: 10, border: '1px solid #2f6252', background: '#2f6252', color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Back to Mia's week</button>
      </div>
    </div>
  )
}

export function TellSomeoneView({ onBack, onTellHelen }: { onBack: () => void; onTellHelen: () => void }) {
  const [toast, setToast] = useState('')
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3200) }

  return (
    <div style={{ width: 390, margin: '0 auto', background: '#f7f8f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <GreenHeader subtitle="Just for you" title="You can tell someone" onBack={onBack} />
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ fontSize: 16, lineHeight: '24px', padding: '0 2px' }}>If something feels wrong, at football, at school or at home, it's OK to tell. You won't be in trouble.</span>
        {[
          { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5h16v11H8l-4 4z"/></svg>, iconBg: '#eef5f2', title: 'Write to Helen at the club', sub: "She looks after kids at Wattle Creek. She isn't your coach.", onClick: onTellHelen },
          { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>, iconBg: '#cbbeb5', title: 'Kids Helpline · 1800 55 1800', sub: 'Free, any time. Call or chat online. They\'re not part of the club.', onClick: () => showToast("Kids Helpline is 1800 55 1800. It's free and open all day and night.") },
          { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 8v5M12 16h.01M12 3l9 16H3z"/></svg>, iconBg: '#c39797', title: 'In danger right now? Call 000', sub: 'Police or ambulance, straight away.', onClick: () => showToast('Call 000 for police or an ambulance.') },
        ].map((item, i) => (
          <button key={i} onClick={item.onClick} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 16, border: '1px solid #c5c8c4', background: '#fff', color: '#10211f', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', minHeight: 76, boxSizing: 'border-box' }}>
            <span style={{ flexShrink: 0, width: 48, height: 48, borderRadius: 14, background: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 17, lineHeight: '23px', fontWeight: 700 }}>{item.title}</span>
              <span style={{ display: 'block', fontSize: 14, lineHeight: '20px', color: '#4a5a57' }}>{item.sub}</span>
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        ))}
        <span style={{ fontSize: 13, lineHeight: '19px', color: '#4a5a57', padding: '0 2px', marginTop: 'auto' }}>What you write to Helen goes only to Helen. It doesn't show in your mum or dad's app.</span>
      </div>
      {toast && (
        <div role="status" style={{ position: 'absolute', left: 16, right: 16, bottom: 16, zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>
          {toast}
        </div>
      )}
    </div>
  )
}

export function TellHelenView({ onBack }: { onBack: () => void }) {
  const [about, setAbout] = useState<string | null>('Me')
  const [toast, setToast] = useState('')
  const aboutOpts = ['Me', 'A friend', 'A grown-up', 'Not sure']
  function send() { setToast('Sent. Helen will find you at training, or you can find her at the clubrooms.'); setTimeout(() => setToast(''), 3200) }

  return (
    <div style={{ width: 390, margin: '0 auto', background: '#f7f8f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <GreenHeader subtitle="Just for you" title="Write to Helen" onBack={onBack} />
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ flexShrink: 0, width: 44, height: 44, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>HP</span>
          <span>
            <span style={{ display: 'block', fontSize: 16, fontWeight: 700 }}>Helen Park</span>
            <span style={{ display: 'block', fontSize: 14, lineHeight: '20px', color: '#4a5a57' }}>Her job is to make sure kids feel safe here.</span>
          </span>
        </div>
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4a5a57' }}>Who is it about?</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {aboutOpts.map(o => <PillChip key={o} label={o} selected={about === o} onClick={() => setAbout(o)} />)}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4a5a57' }}>What happened?</span>
            <textarea rows={6} placeholder="Write as much or as little as you like" style={{ border: '1px solid #c5c8c4', borderRadius: 10, padding: '10px 12px', fontSize: 16, lineHeight: '23px', resize: 'none', fontFamily: 'inherit', outline: 'none', color: '#10211f' }} />
          </div>
        </div>
        <span style={{ fontSize: 14, lineHeight: '21px', color: '#4a5a57', padding: '0 2px' }}>Helen will find a quiet time to talk with you. If she's worried you're not safe, she has to tell people whose job is to help. She'll tell you first.</span>
      </div>
      <div style={{ flexShrink: 0, padding: '10px 14px 12px', background: '#fff', borderTop: '1px solid #e9eae8' }}>
        <button onClick={send} style={{ width: '100%', height: 50, borderRadius: 10, border: '1px solid #2f6252', background: '#2f6252', color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Send to Helen</button>
      </div>
      {toast && (
        <div role="status" style={{ position: 'absolute', left: 16, right: 16, bottom: 92, zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>
          {toast}
        </div>
      )}
    </div>
  )
}

export function useGoto(initial: string): [string, Goto] {
  const [view, setView] = useState(initial)
  return [view, setView]
}
