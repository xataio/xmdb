import Link from 'next/link'
import { Titles } from '~/lib/xata.codegen'
import { Rating } from './ratings'

const MovieCard = ({ data }: { data: Titles }) => {
  const { primaryTitle, genres, coverUrl, summary, averageRating, id } = data

  return (
    <div className="flex w-full h-full max-w-sm mx-auto overflow-hidden transition duration-500 ease-in-out shadow-lg bg-slate-950 rounded-xl hover:-translate-y-2 hover:shadow-2xl relative text-white after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:via-slate-900 after:to-transparent focus-within:outline focus-within:outline-pink-600">
      <div className="relative z-10 py-10 space-y-6 cursor-pointer group">
        <Link href={`/movie/${id}`} className="block pt-32 px-6 outline-none">
          <div className="space-y-6">
            <header className="flex flex-col space-y-2 inner">
              <h2 className="text-2xl min-h-[4rem] font-bold text-white flex flex-col justify-center">
                {primaryTitle}
              </h2>

              <ul className="inline-flex gap-2 mb-0 text-sm text-white">
                {genres?.map((genre) => (
                  <li
                    key={id + genre}
                    className="px-2 py-1 text-xs border rounded-lg"
                  >
                    {genre}
                  </li>
                ))}
              </ul>
            </header>
            {averageRating ? <Rating value={averageRating} /> : null}
            {summary && (
              <p className="pt-2 pb-6 text-sm text-slate-100">
                {summary.length > 260
                  ? summary.substring(0, 250) + '…'
                  : summary}
              </p>
            )}
          </div>
        </Link>
      </div>

      {coverUrl?.startsWith('http') && !coverUrl?.endsWith('null') ? (
        <picture>
          <source srcSet={coverUrl} type="image/webp" />
          <img
            src={coverUrl}
            alt={`Poster for "${primaryTitle}"`}
            className="absolute inset-0 w-full transform -translate-y-4 grayscale-[0.7]"
          />
        </picture>
      ) : (
        <picture>
          <img
            src="/placeholder.jpg"
            alt="Placeholder image"
            className="absolute inset-0 w-full transform -translate-y-4"
          />
        </picture>
      )}
    </div>
  )
}

export const MoviesList = async ({ titles }: { titles: Titles[] }) => {
  return (
    <ul className="container grid gap-8 px-4 mx-auto xl:grid-cols-4 lg:grid-cols-3 lg:px-12 md:grid-cols-2">
      {titles.map((movie) => (
        <MovieCard key={movie.id} data={movie} />
      ))}
    </ul>
  )
}
