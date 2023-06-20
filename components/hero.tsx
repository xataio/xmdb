import { Search } from './search'

type HeroProps = { searchTerm?: string; totalTitles?: string }

export const Hero = ({ searchTerm, totalTitles }: HeroProps) => (
  <div className="container px-4 py-8 mx-auto text-center lg:py-16 lg:px-12 ">
    <h1 className="p-4 text-3xl font-bold text-center text-transparent md:text-5xl lg:text-6xl from-pink-100 via-slate-100 to-pink-100 bg-gradient-to-r bg-clip-text">
      Your gateway to movie exploration
    </h1>

    {totalTitles ? (
      <p className="mb-8 text-lg font-normal text-gray-400 lg:text-xl sm:px-16 xl:px-48">
        Search on: {totalTitles} titles
      </p>
    ) : null}

    <Search term={searchTerm} />
  </div>
)
