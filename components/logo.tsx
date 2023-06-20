import Link from 'next/link'
import { RiMovie2Line as MovieRoll } from 'react-icons/ri'

export function Xmdb() {
  return (
    <Link
      href="/"
      className="inline-flex items-center justify-center h-10 gap-1 px-2 text-white bg-pink-600 rounded-lg hover:scale-110 transition-transform"
    >
      <h1 className="sr-only">Xata Movie Database</h1>
      <MovieRoll aria-hidden className="text-2xl" />
      <span>XMDB</span>
    </Link>
  )
}
