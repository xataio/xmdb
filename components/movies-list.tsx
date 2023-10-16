import Link from 'next/link'
import { Titles } from '~/lib/xata.codegen'

const MovieCard = ({ data }: { data: Titles }) => {
  const { primaryTitle, genres, coverUrl, summary, averageRating, id } = data

  return (
    <Link href={`/movie/${id}`} className="block outline-none">
      <li className="flex w-full h-full max-w-sm mx-auto overflow-hidden transition duration-500 ease-in-out shadow-lg bg-slate-950 rounded-xl hover:-translate-y-2 hover:shadow-2xl relative text-white after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:via-slate-900 after:to-transparent focus-within:outline focus-within:outline-pink-600">
        <div className="relative z-10 px-6 pb-10 group">
          <header className="flex flex-col inner pb-6">
            <h2 className="text-2xl min-h-[4rem] font-bold text-white flex flex-col justify-center pt-40 pb-4">
              {primaryTitle}
            </h2>

            <ul className="inline-flex gap-2 pt-3 mb-0 text-sm text-white">
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
          {summary && (
            <p className="pt-2 pb-6 text-sm text-slate-100">
              {summary.length > 260 ? summary.substring(0, 250) + '…' : summary}
            </p>
          )}
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
      </li>
    </Link>
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
