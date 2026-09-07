import { useEffect, useState } from 'react'

const HERO_IMAGES = ['/hero-crowd.jpg', '/hero-crowd-2.jpg', '/hero-crowd-3.jpg']
const INTERVAL = 3000

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_IMAGES.length), INTERVAL)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      <div className="absolute inset-0 bg-primary/80" />
    </div>
  )
}