import { notFound } from 'next/navigation'
import { getMovie } from '~/lib/db.server'
import { Rating } from './ratings'

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
    <div className="grid place-items-center bg-slate-900">
      <header className="mb-10">
        <h1 className="text-6xl text-white">{primaryTitle}</h1>
        {startYear && (
          <time className="block text-right" dateTime={String(startYear)}>
            ({startYear})
          </time>
        )}
        {averageRating ? (
          <>
            <Rating value={averageRating} />
            <small>({numVotes?.toLocaleString('en-Us')} votes)</small>
          </>
        ) : null}
      </header>
      <article className="grid max-w-5xl gap-5 p-5 mx-auto lg:grid lg:grid-cols-2 ">
        <section className="grid place-items-center">
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
        <section className="leading-8 ">
          {genres && genres.length > 0 && (
            <ul className="flex gap-2 mb-8">
              {genres?.map((genre) => (
                <li key={id + genre} className="px-2 py-1 border-2 rounded-lg ">
                  {genre}
                </li>
              ))}
            </ul>
          )}
          <p className="mx-auto max-w-prose">{summary}</p>
          <p className="text-right text-neutral-400">
            Duration: {runtimeMinutes} minutes.
          </p>
        </section>
      </article>
    </div>
  )
}
