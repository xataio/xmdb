'use client'

import { useEffect, useState, useTransition } from 'react'
import { FaStarHalf, FaStar } from 'react-icons/fa'
import { rate } from '~/lib/rating-action'
import { Tooltip } from './tooltip'

function getRemainingValue(evaluation: number, dec: number = 0) {
  if (evaluation >= 5) return 0

  if (dec >= 0.4) {
    // first star is a half star
    return 4 - evaluation
  }

  return 5 - evaluation
}

function getVoteValue(
  currentRating: number,
  hasHalf: boolean,
  remainingIndex: number
) {
  if (hasHalf) {
    // remaining index is base 0
    // + 1 for the half point
    return currentRating + remainingIndex + 2
  } else {
    return currentRating + remainingIndex + 1
  }
}

export const Rating = ({ value, title }: { value: number; title: string }) => {
  const ratingValue = value / 2
  const decimalPoints = Number((ratingValue % 1).toFixed(1))
  const shouldShowDecimal = decimalPoints >= 0.4
  const evaluation = Array(Math.floor(ratingValue)).fill(undefined)
  const remaining = Array(
    getRemainingValue(evaluation.length, decimalPoints)
  ).fill(undefined)

  const [isPending, startTransition] = useTransition()
  const [isVoting, toggleIsVoting] = useState(false)
  const [votedRate, setVotedRate] = useState<number>()

  useEffect(() => {
    if (isPending) {
      toggleIsVoting(true)
    }

    setTimeout(() => {
      toggleIsVoting(false)
    }, 4000)
  }, [isPending])

  return (
    <form
      className="relative"
      action={(data) =>
        startTransition(() => {
          const userRate = Number(data.get('vote') ?? 0)
          setVotedRate(userRate)
          rate(data)
        })
      }
    >
      {isVoting && votedRate && <Tooltip votedRate={votedRate} />}
      <input type="hidden" name="title" value={title} />
      <ul
        aria-label={`Rating is ${ratingValue}`}
        className={`flex gap-1 text-sm text-pink-500 ${
          isVoting ? 'animate-pulse' : ''
        }`}
        title={String(ratingValue)}
      >
        {evaluation.map((_, idx) => (
          <li key={idx + 'rating'} className="cursor-pointer">
            <button
              type="submit"
              name="vote"
              value={idx + 1}
              disabled={isVoting}
            >
              <FaStar />
            </button>
          </li>
        ))}

        {shouldShowDecimal ? (
          <li key="decimal-rating">
            <button
              type="submit"
              name="vote"
              value={evaluation.length + 1}
              disabled={isVoting}
            >
              <FaStarHalf />{' '}
            </button>
          </li>
        ) : null}
        {Array.isArray(remaining) &&
          remaining.map((_, idx) => {
            return (
              <li key={idx + 'remaining'}>
                <button
                  type="submit"
                  name="vote"
                  value={getVoteValue(
                    evaluation.length,
                    shouldShowDecimal,
                    idx
                  )}
                  disabled={isVoting}
                >
                  <FaStar
                    className="text-transparent hover:text-pink-200"
                    strokeWidth="5"
                    stroke="white"
                    strokeOpacity={1}
                  />
                </button>
              </li>
            )
          })}
      </ul>
    </form>
  )
}
