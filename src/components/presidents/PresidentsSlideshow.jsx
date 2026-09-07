import { useEffect, useState } from 'react'
import { PRESIDENTS, imgFor } from '../../data/presidents'

export default function PresidentsSlideshow() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % PRESIDENTS.length), 3500)
    return () => clearInterval(id)
  }, [])

  const p = PRESIDENTS[index]

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="font-serif text-sm uppercase tracking-[0.2em] text-white/70">Leaders of Nigeria, then and now</h2>
      <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center">
        <button
          type="button"
          onClick={() => setIndex((index - 1 + PRESIDENTS.length) % PRESIDENTS.length)}
          aria-label="Previous president"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/10"
        >
          ‹
        </button>

        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-5 sm:gap-6">
          <img
            src={imgFor(p.slug)}
            alt={`Portrait of ${p.name}`}
            className="h-44 w-36 flex-shrink-0 rounded-2xl object-cover object-top shadow-lg ring-1 ring-white/20"
          />
          <div className="text-center sm:text-left text-white">
            <p className="font-serif text-lg text-white/80 italic">{p.title}</p>
            <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-bold leading-tight">{p.name}</h3>
            <p className="mt-1 text-sm font-semibold text-[#F3E5C4]">{p.tenure}</p>
            <p className="mt-2 max-w-sm text-sm text-white/75 leading-relaxed">{p.note}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIndex((index + 1) % PRESIDENTS.length)}
          aria-label="Next president"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/10"
        >
          ›
        </button>
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-1.5">
        {PRESIDENTS.map((n, i) => (
          <button
            key={n.slug}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show ${n.name}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-[#C9962E]' : 'w-2 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </div>
  )
}