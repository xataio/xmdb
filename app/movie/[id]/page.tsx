import { HeaderNav } from '~/components/header-nav'
import { fetchDefaultTitles, getMovie } from '~/lib/db.server'
import { Metadata } from 'next'
import { MovieDetails } from '~/components/movie-details'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const { id } = params
  const movie = await getMovie(id)
  const title = `${movie?.primaryTitle} - XMDB`
  const description =
    movie?.summary || `Page for title: ${movie?.primaryTitle} on XMDB`

  const image = `${process.env.VERCEL_URL}/api/og?title=${encodeURI(
    title
  )}&image=${movie?.coverUrl && encodeURI(movie?.coverUrl)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
    },
    twitter: {
      title,
      description,
      images: [image],
    },
  }
}

export default async function Movie({ params }: { params: { id: string } }) {
  return (
    <main>
      <HeaderNav searchTerm={''} />
      {/** @ts-expect-error Async Server Component */}
      <MovieDetails id={params.id} />
    </main>
  )
}

// Pre-Render the default 20 homepage results' pages
export async function generateStaticParams() {
  const { titles } = await fetchDefaultTitles()

  return titles.map((title) => ({
    id: title.id,
  }))
}
