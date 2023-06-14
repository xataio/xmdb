export const Rating = ({ value }: { value: number }) => {
  const ratingValue = value / 2
  const decimalPoints = Number((ratingValue % 1).toFixed(1))
  const arr = Array(Math.floor(ratingValue)).fill(undefined)

  return (
    <ul
      aria-label={`Rating is ${value}`}
      className="flex justify-start cursor-default"
      title={String(value)}
    >
      <li className="inline-block pr-2 text-sm self-baseline">
        {arr.map((_, idx) => (
          <div key={value + idx} className="inline-block overflow-x-hidden">
            <span className="inline-block rating-star" role="image" aria-hidden>
              ⭐️
            </span>
          </div>
        ))}
        {decimalPoints < 0.4 ? null : (
          <div
            className="inline-block overflow-x-hidden"
            style={{
              width: decimalPoints + 'em',
            }}
          >
            <span
              key={decimalPoints + value}
              className="rating-star"
              role="image"
              aria-hidden
            >
              ⭐️
            </span>
          </div>
        )}
      </li>
    </ul>
  )
}
