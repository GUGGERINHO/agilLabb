import { useState, type FormEvent } from 'react'

const USER = 'admin'
const PASS = 'password'

function Login({ onLogin }: { onLogin: () => void }) {
  const [err, setErr] = useState('')

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('user') === USER && fd.get('pass') === PASS) {
      setErr('')
      onLogin()
    } else {
      setErr('Invalid credentials')
    }
  }

  return (
    <form onSubmit={submit} style={styles.form}>
      <h1 style={styles.h1}>Sign In</h1>
      <input name="user" placeholder="Username" required style={styles.input} />
      <input name="pass" type="password" placeholder="Password" required style={styles.input} />
      <button type="submit" style={styles.btn}>Login</button>
      {err && <p style={styles.err}>{err}</p>}
    </form>
  )
}

const ITEMS = [
  { id: 1, name: 'Wireless Headphones', price: 79.99 },
  { id: 2, name: 'Mechanical Keyboard', price: 129.99 },
  { id: 3, name: 'USB-C Hub', price: 49.99 },
  { id: 4, name: 'Webcam HD', price: 59.99 },
  { id: 5, name: 'Mouse Pad XL', price: 24.99 },
  { id: 6, name: 'Monitor Stand', price: 39.99 },
]

function Shop({ onLogout }: { onLogout: () => void }) {
  return (
    <div style={styles.shop}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Shop</h1>
        <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
      </div>
      <div style={styles.grid}>
        {ITEMS.map(item => (
          <div key={item.id} style={styles.card}>
            <div style={styles.placeholder} />
            <h3 style={styles.name}>{item.name}</h3>
            <p style={styles.price}>${item.price}</p>
            <button style={styles.cartBtn}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [auth, setAuth] = useState(false)
  return auth
    ? <Shop onLogout={() => setAuth(false)} />
    : <Login onLogin={() => setAuth(true)} />
}

const styles: Record<string, React.CSSProperties> = {
  form: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100svh', gap: 16, fontFamily: 'system-ui, sans-serif' },
  h1: { fontSize: 28, fontWeight: 500, margin: 0 },
  input: { width: 240, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14, outline: 'none' },
  btn: { width: 264, padding: 10, background: '#111', color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, cursor: 'pointer' },
  err: { color: 'red', fontSize: 13, margin: 0 },
  shop: { padding: '40px 32px', fontFamily: 'system-ui, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logoutBtn: { padding: '8px 16px', background: '#fff', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13, cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 24, marginTop: 24 },
  card: { border: '1px solid #e5e7eb', borderRadius: 8, padding: 16, textAlign: 'center' as const },
  placeholder: { height: 140, background: '#f3f4f6', borderRadius: 6, marginBottom: 12 },
  name: { fontSize: 15, fontWeight: 500, margin: '0 0 4px' },
  price: { fontSize: 16, margin: '0 0 12px', color: '#111' },
  cartBtn: { padding: '8px 0', width: '100%', background: '#111', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, cursor: 'pointer' },
}