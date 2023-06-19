import Image from 'next/image'
import xataflyWhite from '~/public/xatafly-white.svg'
import { SiGithub as Github, SiDiscord as Discord } from 'react-icons/si'
import { Xmdb } from './logo'

export const TopNav = () => (
  <nav className="container flex items-center justify-between w-full px-4 py-4 mx-auto lg:px-12">
    <Xmdb />

    <ul className="flex items-center gap-4 text-sm font-medium text-white">
      <li className="hidden lg:block">
        <a href="https://xata.io" rel="noopener noreferrer">
          <Image
            src={xataflyWhite}
            alt="Xata logo"
            className="w-6 transition-transform hover:scale-125 focus:scale-125"
          />
        </a>
      </li>

      <li>
        <a href="https://github.com/xataio/xmdb/" rel="noopener noreferrer">
          <Github className="text-2xl transition-transform focus:scale-125 hover:scale-125" />
        </a>
      </li>

      <li>
        <a href="https://xata.io/discord" rel="noopener noreferrer">
          <Discord className="text-2xl transition-transform focus:scale-125 hover:scale-125" />
        </a>
      </li>
    </ul>
  </nav>
)
