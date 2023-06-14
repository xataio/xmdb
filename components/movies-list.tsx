import Link from 'next/link'
import { Titles } from '~/lib/xata.codegen'
import { Rating } from './ratings'

const MovieCard = ({ data }: { data: Titles }) => {
  const { primaryTitle, genres, coverUrl, summary, averageRating, id } = data

  return (
    <Link href={`/movie/${id}`}>
      <div className="flex w-full h-full max-w-sm mx-auto overflow-hidden transition duration-500 ease-in-out shadow-md shadow-lg bg-slate-950 rounded-xl hover:-translate-y-2 hover:shadow-2xl">
        <div className="relative text-white transform movie-item movie-card">
          <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-slate-900 to-transparent"></div>
          <div
            className="relative z-10 px-10 pt-10 space-y-6 cursor-pointer group movie_info"
            data-lity=""
          >
            <div className="w-full poster__info align-self-end">
              <div className="h-32"></div>
              <div className="space-y-6 detail_info">
                <div className="flex flex-col space-y-2 inner">
                  <h3
                    className="text-2xl font-bold text-white"
                    data-unsp-sanitized="clean"
                  >
                    {primaryTitle}
                  </h3>

                  <div className="inline-flex gap-1 mb-0 text-sm text-white">
                    {genres?.map((genre) => (
                      <span
                        key={id + genre}
                        className="px-2 py-1 text-xs border rounded-lg"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-row justify-between datos">
                  <div className="flex flex-col datos_col">
                    {averageRating ? <Rating value={averageRating} /> : null}
                  </div>
                </div>
                <div className="flex flex-col overview">
                  <div className="flex flex-col"></div>
                  <div className="mb-2 text-xs text-slate-400">Overview:</div>
                  {summary && (
                    <p className="mb-6 text-sm text-slate-100">
                      {summary.length > 260
                        ? summary.substring(0, 250) + '…'
                        : summary}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {coverUrl?.startsWith('http') && !coverUrl?.endsWith('null') && (
            <picture>
              <source srcSet={coverUrl} type="image/webp" />
              <img
                src={coverUrl}
                alt={`Poster for "${primaryTitle}"`}
                className="absolute inset-0 w-full transform -translate-y-4"
                style={{ filter: 'grayscale(0.7)' }}
              />
            </picture>
          )}
        </div>
      </div>
    </Link>
  )
}

export const MoviesList = async ({ titles }: { titles: Titles[] }) => {
  return (
    <ul className="container grid gap-8 px-4 mx-auto xl:grid-cols-4 lg:grid-cols-3 lg:px-12">
      {titles.map((movie) => (
        <MovieCard key={movie.id} data={movie} />
      ))}
    </ul>
  )
}
