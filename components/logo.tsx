import Link from 'next/link'
import { RiMovie2Line } from 'react-icons/ri'

export function Xmdb() {
  return (
    <Link
      href="/"
      className="inline-flex items-center justify-center h-10 gap-1 px-2 text-white bg-pink-600 rounded-lg"
    >
      <span className="sr-only">Logo</span>
      <RiMovie2Line className="text-2xl" />
      <span>XMDB</span>
    </Link>
  )
}
