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
  { id: 1, name: 'Sony WH-1000XM4 - Blue', price: '2 599,00 kr', img: 'https://www.proshop.se/Images/915x900/2991444_0bdb39325e57.jpg' },
  { id: 2, name: 'Mechanical Keyboard', price: '1 299,00 kr', img: 'https://cdn.discordapp.com/attachments/1503731707512356967/1507058577305768137/photo-1712396901531-605f06a423aa.png?ex=6a10852c&is=6a0f33ac&hm=8ffb173130f2018b46db9c5246b4faf441a8ad3258ee80a3c828d8e2cb1f68b1&' },
  { id: 3, name: 'USB-C Hub', price: '499,00 kr', img: 'https://plus.unsplash.com/premium_photo-1764113096548-11270b5febed?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 4, name: 'Webcam HD', price: '599,00 kr', img: 'https://images.unsplash.com/photo-1623949556303-b0d17d198863?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 5, name: 'GLORIOUS Gaming Cloth Gaming Mousepad (XL)', price: '197,00 kr', img: 'https://m.media-amazon.com/images/I/51MqRpjU-5L.jpg' },
  { id: 6, name: 'Monitor Stand', price: '399,00 kr', img: 'https://plus.unsplash.com/premium_photo-1706545209829-1b082de60f15?q=80&w=723&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
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
            <img src={item.img} alt={item.name} style={styles.img} />
            <h3 style={styles.name}>{item.name}</h3>
            <p style={styles.price}>{item.price}</p>
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
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 28, marginTop: 24 },
  card: { border: '1px solid #e5e7eb', borderRadius: 8, padding: 20, textAlign: 'center' as const },
  img: { height: 200, width: '100%', objectFit: 'cover' as const, borderRadius: 6, marginBottom: 14 },
  name: { fontSize: 16, fontWeight: 500, margin: '0 0 6px' },
  price: { fontSize: 18, margin: '0 0 14px', color: '#111' },
  cartBtn: { padding: '10px 0', width: '100%', background: '#111', color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, cursor: 'pointer' },
}