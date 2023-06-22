'use server'

import { voteRating } from './db.server'

export async function rate(form: FormData) {
  const { title, vote } = Object.fromEntries(form.entries())
  await voteRating(Number(vote), title as string)
}
