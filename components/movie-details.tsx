import { notFound } from 'next/navigation'
import { getMovie } from '~/lib/db.server'
import { Rating } from './ratings'
import { RiCloseLine } from 'react-icons/ri'

export async function MovieDetails({ id }: { id: string }) {
  const movie = await getMovie(id)

  if (movie === null) return notFound()

  const {
    coverUrl = '',
    primaryTitle,
    summary,
    startYear,
    genres,
    runtimeMinutes,
    averageRating,
    numVotes,
  } = movie

  return (
    <div className="relative grid max-w-4xl rounded-lg bg-slate-900">
      <article className="grid max-w-5xl gap-8 p-8 mx-auto lg:grid lg:grid-cols-2">
        <section className="grid pt-4 place-items-center">
          {coverUrl?.startsWith('http') && !coverUrl?.endsWith('null') && (
            <picture>
              <source srcSet={coverUrl} type="image/webp" />
              <img
                src={coverUrl}
                alt={`Poster for "${primaryTitle}"`}
                className="rounded-lg "
              />
            </picture>
          )}
        </section>
        <section>
          <h1 className="pt-4 mb-4 text-3xl text-white ">{primaryTitle}</h1>

          {genres && genres.length > 0 && (
            <ul className="flex gap-2 mb-4">
              {genres?.map((genre) => (
                <li
                  key={id + genre}
                  className="px-2 py-1 text-xs border rounded-lg"
                >
                  {genre}
                </li>
              ))}
            </ul>
          )}

          <div>{averageRating ? <Rating value={averageRating} /> : null}</div>

          <div>
            {startYear && (
              <time className="block " dateTime={String(startYear)}>
                ({startYear})
              </time>
            )}
          </div>

          <p className="mx-auto max-w-prose">{summary}</p>
          <p className="text-gray-400">Duration: {runtimeMinutes} minutes.</p>
        </section>
      </article>

      <RiCloseLine className="absolute text-2xl text-white cursor-pointer top-4 left-4" />
    </div>
  )
}
