import { useState, type FormEvent } from 'react'

const USER = 'admin'
const PASS = 'password'

type Item = { id: number; name: string; price: string; img: string; stock: number; desc: string; reviews: string; seller: string }
type CartEntry = { item: Item; qty: number }

const ITEMS: Item[] = [
  { id: 1, name: 'Sony WH-1000XM4 - Blue', price: '2 599,00 kr', img: 'https://www.proshop.se/Images/915x900/2991444_0bdb39325e57.jpg', stock: 24, desc: 'Industry-leading noise cancelling with Auto NC Optimizer. Up to 30h battery life.', reviews: '4.7 (1 203 reviews)', seller: 'Proshop' },
  { id: 2, name: 'Mechanical Keyboard', price: '1 299,00 kr', img: 'https://cdn.discordapp.com/attachments/1503731707512356967/1507058577305768137/photo-1712396901531-605f06a423aa.png?ex=6a10852c&is=6a0f33ac&hm=8ffb173130f2018b46db9c5246b4faf441a8ad3258ee80a3c828d8e2cb1f68b1&', stock: 15, desc: 'Hot-swappable switches, per-key RGB lighting, aluminum frame.', reviews: '4.5 (842 reviews)', seller: 'MechKeys AB' },
  { id: 3, name: 'USB-C Hub', price: '499,00 kr', img: 'https://plus.unsplash.com/premium_photo-1764113096548-11270b5febed?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', stock: 58, desc: '7-in-1 hub with HDMI 4K, USB 3.0, SD/TF card reader, PD 100W charging.', reviews: '4.3 (567 reviews)', seller: 'TechZone' },
  { id: 4, name: 'Webcam HD', price: '599,00 kr', img: 'https://images.unsplash.com/photo-1623949556303-b0d17d198863?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', stock: 33, desc: '1080p Full HD, auto-focus, built-in dual stereo microphones, privacy cover.', reviews: '4.4 (391 reviews)', seller: 'CamStore' },
  { id: 5, name: 'GLORIOUS Gaming Cloth Gaming Mousepad (XL)', price: '197,00 kr', img: 'https://m.media-amazon.com/images/I/51MqRpjU-5L.jpg', stock: 112, desc: '900x400mm extended surface, non-slip rubber base, stitched edges, machine washable.', reviews: '4.6 (2 105 reviews)', seller: 'Amazon.se' },
  { id: 6, name: 'Monitor Stand', price: '399,00 kr', img: 'https://plus.unsplash.com/premium_photo-1706545209829-1b082de60f15?q=80&w=723&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', stock: 41, desc: 'Bamboo wood stand with storage drawer, elevates screen to ergonomic height.', reviews: '4.2 (278 reviews)', seller: 'NordicDesk' },
]

function Login({ onLogin }: { onLogin: () => void }) {
  const [err, setErr] = useState('')
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('user') === USER && fd.get('pass') === PASS) { setErr(''); onLogin() } else { setErr('Invalid credentials') }
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

function Modal({ item, onClose, onAdd }: { item: Item; onClose: () => void; onAdd: (item: Item) => void }) {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={styles.closeBtn}>&times;</button>
        <img src={item.img} alt={item.name} style={styles.modalImg} />
        <h2 style={styles.modalName}>{item.name}</h2>
        <p style={styles.modalPrice}>{item.price}</p>
        <p style={styles.detail}><b>Stock:</b> {item.stock} units</p>
        <p style={styles.detail}><b>Description:</b> {item.desc}</p>
        <p style={styles.detail}><b>Reviews:</b> {item.reviews}</p>
        <p style={styles.detail}><b>Seller:</b> {item.seller}</p>
        <button onClick={() => onAdd(item)} style={styles.cartBtn}>Add to Cart</button>
      </div>
    </div>
  )
}

function Checkout({ onBack, onLogout }: { onBack: () => void; onLogout: () => void }) {
  const [done, setDone] = useState(false)
  if (done) return (
    <div style={styles.checkoutWrap}>
      <div style={styles.checkoutBox}>
        <p style={styles.success}>&#10003; Order was successful!</p>
        <button onClick={onBack} style={styles.btn}>Continue Shopping</button>
        <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
      </div>
    </div>
  )
  return (
    <div style={styles.shop}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>&larr; Cart</button>
        <h1 style={styles.h1}>Checkout</h1>
        <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
      </div>
      <form onSubmit={e => { e.preventDefault(); setDone(true) }} style={styles.checkoutForm}>
        <h3 style={styles.sectionTitle}>Shipping Address</h3>
        <input name="name" placeholder="Full Name" required style={styles.checkoutInput} />
        <input name="address" placeholder="Address" required style={styles.checkoutInput} />
        <input name="city" placeholder="City" required style={styles.checkoutInput} />
        <input name="zip" placeholder="Postal Code" required style={styles.checkoutInput} />
        <h3 style={styles.sectionTitle}>Payment</h3>
        <input name="card" placeholder="Card Number" required style={styles.checkoutInput} />
        <input name="expiry" placeholder="MM/YY" required style={styles.checkoutInput} />
        <input name="cvv" placeholder="CVV" required style={styles.checkoutInput} />
        <button type="submit" style={styles.payBtn}>Pay</button>
      </form>
    </div>
  )
}

function Cart({ items, onBack, onRemove, onLogout, onCheckout }: {
  items: CartEntry[]; onBack: () => void; onRemove: (id: number) => void; onLogout: () => void; onCheckout: () => void
}) {
  const totalQty = items.reduce((s, e) => s + e.qty, 0)
  const parsePrice = (p: string) => parseFloat(p.replace('kr', '').trim().replace(/\s/g, '').replace(',', '.'))
  const totalPrice = items.reduce((s, e) => s + parsePrice(e.item.price) * e.qty, 0)
  return (
    <div style={styles.shop}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>&larr; Shop</button>
        <h1 style={styles.h1}>Cart ({totalQty})</h1>
        <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
      </div>
      {items.length === 0 && <p style={styles.empty}>Your cart is empty</p>}
      {items.map(({ item, qty }) => (
        <div key={item.id} style={styles.cartItem}>
          <img src={item.img} alt={item.name} style={styles.cartImg} />
          <div style={styles.cartInfo}>
            <h3 style={styles.cartName}>{item.name}</h3>
            <p style={styles.cartPrice}>{item.price} &times; {qty}</p>
          </div>
          <button onClick={() => onRemove(item.id)} style={styles.removeBtn}>Remove</button>
        </div>
      ))}
      {items.length > 0 && (
        <div style={styles.cartTotal}>
          <span style={styles.cartTotalLabel}>Total</span>
          <span style={styles.cartTotalValue}>{totalPrice.toLocaleString('sv-SE', { minimumFractionDigits: 2 })} kr</span>
          <button onClick={onCheckout} style={styles.payBtn}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  )
}

function Shop({ onLogout }: { onLogout: () => void }) {
  const [selected, setSelected] = useState<Item | null>(null)
  const [cart, setCart] = useState<CartEntry[]>([])
  const [view, setView] = useState<'shop' | 'cart' | 'checkout'>('shop')

  const addToCart = (item: Item) => setCart(prev => { const e = prev.find(c => c.item.id === item.id); return e ? prev.map(c => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c) : [...prev, { item, qty: 1 }] })
  const removeFromCart = (id: number) => setCart(prev => { const e = prev.find(c => c.item.id === id); return e && e.qty > 1 ? prev.map(c => c.item.id === id ? { ...c, qty: c.qty - 1 } : c) : prev.filter(c => c.item.id !== id) })

  if (view === 'checkout') return <Checkout onBack={() => setView('cart')} onLogout={onLogout} />
  if (view === 'cart') return <Cart items={cart} onBack={() => setView('shop')} onRemove={removeFromCart} onLogout={onLogout} onCheckout={() => setView('checkout')} />

  return (
    <div style={styles.shop}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Shop</h1>
        <div style={styles.headerRight}>
          <button onClick={() => setView('cart')} style={styles.cartBtnHeader}>Cart ({cart.reduce((s, e) => s + e.qty, 0)})</button>
          <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>
      <div style={styles.grid}>
        {ITEMS.map(item => (
          <div key={item.id} style={styles.card} onClick={() => setSelected(item)}>
            <img src={item.img} alt={item.name} style={styles.img} />
            <h3 style={styles.name}>{item.name}</h3>
            <p style={styles.price}>{item.price}</p>
            <button onClick={e => { e.stopPropagation(); addToCart(item) }} style={styles.cartBtn}>Add to Cart</button>
          </div>
        ))}
      </div>
      {selected && <Modal item={selected} onClose={() => setSelected(null)} onAdd={item => { addToCart(item); setSelected(null) }} />}
    </div>
  )
}

export default function App() {
  const [auth, setAuth] = useState(false)
  return auth ? <Shop onLogout={() => setAuth(false)} /> : <Login onLogin={() => setAuth(true)} />
}

const s: Record<string, React.CSSProperties> = {
  form: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100svh', gap: 16, fontFamily: 'system-ui, sans-serif' },
  h1: { fontSize: 28, fontWeight: 500, margin: 0 },
  input: { width: 240, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14, outline: 'none' },
  btn: { width: 264, padding: 10, background: '#111', color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, cursor: 'pointer' },
  err: { color: 'red', fontSize: 13, margin: 0 },
  shop: { padding: '40px 32px', fontFamily: 'system-ui, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  headerRight: { display: 'flex', gap: 8 },
  logoutBtn: { padding: '8px 16px', background: '#fff', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13, cursor: 'pointer' },
  backBtn: { padding: '8px 16px', background: '#fff', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13, cursor: 'pointer' },
  cartBtnHeader: { padding: '8px 16px', background: '#111', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 28, marginTop: 24 },
  card: { border: '1px solid #e5e7eb', borderRadius: 8, padding: 20, textAlign: 'center' as const, cursor: 'pointer' },
  img: { height: 200, width: '100%', objectFit: 'cover' as const, borderRadius: 6, marginBottom: 14 },
  name: { fontSize: 16, fontWeight: 500, margin: '0 0 6px' },
  price: { fontSize: 18, margin: '0 0 14px', color: '#111' },
  cartBtn: { padding: '10px 0', width: '100%', background: '#111', color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, cursor: 'pointer', marginTop: 12 },
  overlay: { position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 },
  modal: { background: '#fff', borderRadius: 12, padding: 28, maxWidth: 440, width: '90%', maxHeight: '90vh', overflow: 'auto', position: 'relative' as const },
  closeBtn: { position: 'absolute' as const, top: 12, right: 16, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer' },
  modalImg: { width: '100%', borderRadius: 8, marginBottom: 16 },
  modalName: { fontSize: 20, fontWeight: 600, margin: '0 0 4px' },
  modalPrice: { fontSize: 22, fontWeight: 700, color: '#111', margin: '0 0 16px' },
  detail: { fontSize: 14, margin: '0 0 8px', lineHeight: 1.5 },
  empty: { textAlign: 'center' as const, color: '#9ca3af', marginTop: 48 },
  cartItem: { display: 'flex', alignItems: 'center', gap: 16, padding: 16, borderBottom: '1px solid #e5e7eb' },
  cartImg: { height: 64, width: 64, objectFit: 'cover' as const, borderRadius: 6 },
  cartInfo: { flex: 1 },
  cartName: { fontSize: 15, fontWeight: 500, margin: '0 0 4px' },
  cartPrice: { fontSize: 16, margin: 0, color: '#111' },
  removeBtn: { padding: '6px 12px', background: '#fff', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13, cursor: 'pointer' },
  cartTotal: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, padding: '20px 16px', borderTop: '2px solid #111' },
  cartTotalLabel: { fontSize: 18, fontWeight: 600 },
  cartTotalValue: { fontSize: 22, fontWeight: 700, color: '#111' },
  checkoutForm: { maxWidth: 480, display: 'flex', flexDirection: 'column' as const, gap: 12, marginTop: 24 },
  sectionTitle: { fontSize: 16, fontWeight: 600, margin: '8px 0 0' },
  checkoutInput: { padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14, outline: 'none' },
  payBtn: { padding: '12px', background: '#111', color: '#fff', border: 'none', borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: 'pointer' },
  checkoutWrap: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100svh', fontFamily: 'system-ui, sans-serif' },
  checkoutBox: { textAlign: 'center' as const, display: 'flex', flexDirection: 'column' as const, gap: 16, alignItems: 'center' },
  success: { fontSize: 24, fontWeight: 600, color: '#16a34a' },
}

const styles = s