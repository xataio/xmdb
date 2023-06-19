import { FaStarHalf, FaStar } from 'react-icons/fa'

export const Rating = ({ value }: { value: number }) => {
  const ratingValue = value / 2
  const decimalPoints = Number((ratingValue % 1).toFixed(1))
  const arr = Array(Math.floor(ratingValue)).fill(undefined)

  return (
    <ul
      aria-label={`Rating is ${value}`}
      className="flex gap-1 text-sm text-pink-500"
      title={String(value)}
    >
      {arr.map((_, idx) => (
        <li>
          <FaStar key={idx} />
        </li>
      ))}

      {decimalPoints < 0.4 ? null : (
        <li>
          <FaStarHalf />{' '}
        </li>
      )}
    </ul>
  )
}
