import Image from 'next/image'
import { type ReactNode } from 'react'
import '~/styles/globals.css'
import xatafly from '~/public/xatafly.svg'
import xataflyWhite from '~/public/xatafly-white.svg'
import { SiGithub as Github, SiDiscord as Discord } from 'react-icons/si'
import { TopNav } from '~/components/top-nav'

import { type Metadata } from 'next'

const image = `${process.env.VERCEL_URL}/xmdb-og.png` as const
const title = 'XMDB: Xata Movie Database'
const description =
  'Xata Movie Database (XMDB) was built with Xata using Next.js and TypeScript to showcase Xata can be used by large databases (over 9 million records).'

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
  },
  title: title,
  description: description,
  openGraph: {
    images: [image],
    title: title,
    description: description,
    type: 'website',
  },
  twitter: {
    images: [image],
    title: title,
    description: description,
    card: 'summary_large_image',
  },
}

type RootLayoutProps = Record<'children' | 'modal', ReactNode>

function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="grid grid-rows-[auto,1fr,auto] min-h-screen bg-slate-950">
        <TopNav />

        <main className="container mx-auto">{children}</main>

        {modal}

        <footer className="flex items-center justify-center gap-2 py-12">
          <span>Powered by</span>
          <a
            className="inline-block"
            href="https://xata.io"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              src={xatafly}
              alt="Xata Logo"
              className="w-8 transition-transform hover:-translate-y-2 hover:rotate-12 hover:translate-x-2"
            />
          </a>
        </footer>
      </body>
    </html>
  )
}

export default RootLayout
