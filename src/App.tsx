import { useState, type FormEvent } from 'react'

const USER = 'admin'
const PASS = 'password'

export default function App() {
  const [err, setErr] = useState('')

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('user') === USER && fd.get('pass') === PASS) {
      setErr('')
      alert('Welcome, admin!')
    } else {
      setErr('Invalid credentials')
    }
  }

  return (
    <form onSubmit={login} style={styles.form}>
      <h1 style={styles.h1}>Sign In</h1>
      <input name="user" placeholder="Username" required style={styles.input} />
      <input name="pass" type="password" placeholder="Password" required style={styles.input} />
      <button type="submit" style={styles.btn}>Login</button>
      {err && <p style={styles.err}>{err}</p>}
    </form>
  )
}

const styles: Record<string, React.CSSProperties> = {
  form: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100svh', gap: 16, fontFamily: 'system-ui, sans-serif' },
  h1: { fontSize: 28, fontWeight: 500, margin: 0 },
  input: { width: 240, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14, outline: 'none' },
  btn: { width: 264, padding: 10, background: '#111', color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, cursor: 'pointer' },
  err: { color: 'red', fontSize: 13, margin: 0 },
}
