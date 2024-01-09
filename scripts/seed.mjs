// @ts-check
import { faker } from '@faker-js/faker'
import { buildClient } from '@xata.io/client'
import dotenv from 'dotenv'

const MOVIE_GENRES = [
  'action',
  'sci-fi',
  'fantasy',
  'comedy',
  'drama',
  'animation',
]

dotenv.config({
  path: '.env.local',
})

dotenv.config() // Load the default .env file

class XataClient extends buildClient() {
  /**
   *
   * @param {{}} options
   */
  constructor(options) {
    super({
      ...options,
    })
  }
}

const xata = new XataClient({
  databaseURL: process.env.XATA_DATABASE_URL,
  apiKey: process.env.XATA_API_KEY,
  branch: process.env.XATA_BRANCH || 'main',
})

/**
 *
 * @param {number} rows
 */
function setMockData(rows = 100) {
  const titles = []

  for (let i = 0; i < rows; i++) {
    const title = faker.music.songName()
    const year = faker.date.past(10).getFullYear()

    titles.push({
      titleType: faker.helpers.arrayElement(['movie', 'short']),
      primaryTitle: title,
      originalTitle: title,
      startYear: year,
      endYear: year + 1,
      isAdult: faker.datatype.boolean(),
      runtimeMinutes: faker.datatype.number({ min: 30, max: 180 }),
      genres: faker.helpers.arrayElements(MOVIE_GENRES),
      numVotes: faker.datatype.number({ min: 19000, max: 2000000 }),
      averageRating: faker.datatype.number({ min: 6, max: 10 }),
      coverUrl: faker.image.imageUrl(),
      summary: faker.lorem.paragraph(),
    })
  }

  return titles
}

async function isDBpopulated() {
  const { aggs } = await xata.db.titles.aggregate({
    totalCount: {
      count: '*',
    },
  })

  if (aggs.totalCount > 0) {
    return true
  }

  return false
}

export async function seed() {
  if (await isDBpopulated()) {
    console.warn('Database is not empty. Skip seeding...')
    return
  }

  const data = setMockData()

  try {
    await xata.db.titles.create(data)

    console.log(`🎉 100 records successfully inserted!`)

    return 'success'
  } catch (err) {
    console.error('Gone wrong: ', err)
  }
}

try {
  console.log(`❯ Pushing sample data to: ${process.env.XATA_DATABASE_URL}`)

  seed()
} catch {
  console.warn('Seeding gone wrong.')
}
