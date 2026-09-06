import { useState } from 'react'
import { Card } from '../../components/ui'

const products = [
  { id: 1, name: 'Yard Sign — "Common Ground"', price: 15, category: 'Yard Signs', img: '🪧', desc: 'Corrugated 18×24 sign with metal stand (stand separate). Made in-district.' },
  { id: 2, name: 'Yard Sign Stand', price: 8, category: 'Yard Signs', img: '🗂', desc: 'Wire H-frame stand that holds a single yard sign securely.' },
  { id: 3, name: 'Union-made T-Shirt', price: 25, category: 'Apparel', img: '👕', desc: 'Soft cotton tee with the party seal. Sizes S–3XL.' },
  { id: 4, name: 'Canvas Tote', price: 20, category: 'Apparel', img: '👜', desc: 'Heavy canvas tote for farmers markets and rally days.' },
  { id: 5, name: 'Bumper Sticker (5-pack)', price: 12, category: 'Stickers', img: '🚗', desc: 'Weatherproof bumper stickers. Five to a pack, share the rest.' },
  { id: 6, name: 'Button / Pin Set', price: 10, category: 'Stickers', img: '🔘', desc: 'Three enamel pins — party seal, ballot-box, and "Neighbor" editions.' },
  { id: 7, name: 'Coffee Mug', price: 18, category: 'Apparel', img: '☕', desc: 'Ceramic 14oz mug for the long organizing days.' },
  { id: 8, name: 'Postcard Pack (12)', price: 22, category: 'Yard Signs', img: '✉️', desc: 'Write-your-own postcards for your street or your team.' },
]

export default function StorePage() {
  const [cart, setCart] = useState({})
  const [checkout, setCheckout] = useState(null)

  const add = (p) => setCart((c) => ({ ...c, [p.id]: (c[p.id] || 0) + 1 }))
  const total = Object.entries(cart).reduce((s, [id, q]) => s + products.find((p) => p.id === Number(id)).price * q, 0)

  return (
    <div>
      <section className="border-b border-border bg-primary text-white">
        <div className="container-site py-12">
          <p className="font-serif text-lg text-white/70 italic">Store</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-white">Show your support</h1>
          <p className="mt-3 max-w-2xl text-white/75">
            Yard signs, shirts, and stickers — all union-made where possible and priced to help, not to profit.
          </p>
        </div>
      </section>

      <section className="container-site py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <Card key={p.id} className="flex flex-col p-4">
              <div className="flex h-28 items-center justify-center rounded-sm border border-border bg-surface-2 text-5xl" aria-hidden="true">{p.img}</div>
              <p className="mt-3 text-xs text-ink-muted">{p.category}</p>
              <h2 className="mt-1 font-serif text-base font-bold text-primary">{p.name}</h2>
              <p className="mt-1 text-sm text-ink-muted flex-1">{p.desc}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-serif text-lg font-bold text-primary">${p.price}</span>
                <button type="button" onClick={() => add(p)} className="rounded-sm bg-primary px-3 py-1.5 text-sm font-semibold text-white hover:bg-primary-hov">Add to cart</button>
              </div>
            </Card>
          ))}
        </div>

        {Object.keys(cart).length > 0 && (
          <div className="sticky bottom-4 mt-8 rounded border border-border bg-surface shadow-lg p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-lg font-bold text-primary">Your cart</h2>
                <p className="text-sm text-ink-muted">{Object.values(cart).reduce((a, b) => a + b, 0)} items · <strong className="text-ink">${total}</strong></p>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setCart({})} className="text-sm text-ink-muted hover:text-primary">Clear</button>
                {checkout ? (
                  <p className="text-sm text-community font-semibold">Checkout is a demo — thanks for looking!</p>
                ) : (
                  <button type="button" onClick={() => setCheckout(true)} className="rounded-sm bg-accent px-5 py-2.5 text-sm font-semibold text-[#1C2430] hover:bg-accent/90">Checkout</button>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
