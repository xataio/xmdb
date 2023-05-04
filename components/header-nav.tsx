import { type FC } from 'react'
import { Xmdb } from './logo'
import { Search } from './search'

export const HeaderNav: FC<{ searchTerm?: string; totalTitles?: string }> = ({
  searchTerm,
  totalTitles,
}) => (
  <header className="grid grid-cols-[auto,1fr] gap-2 mx-auto max-w-prose py-12">
    <h1 className="self-center">
      <Xmdb />
    </h1>
    <div className="relative">
      {totalTitles ? (
        <strong className="text-center absolute -top-8 w-full">
          Search on: {totalTitles} titles
        </strong>
      ) : null}
      <Search term={searchTerm} />
    </div>
  </header>
)
