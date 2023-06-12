import { notFound } from 'next/navigation'
import Modal from '~/components/modal'
import { MovieDetails } from '~/components/movie-details'

type MovieDetailsProps = {
  params: {
    id: string
  }
}

export default function Details({
  params: { id: movieId },
}: MovieDetailsProps) {
  if (!movieId) return notFound()
  return (
    <Modal>
      {/** @ts-expect-error Async Server Component */}
      <MovieDetails id={movieId} />
    </Modal>
  )
}
