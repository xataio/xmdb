import { faker } from '@faker-js/faker'
import { buildClient } from '@xata.io/client'
import dotenv from 'dotenv'
import fs from 'node:fs/promises'
import path from 'node:path'

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

async function getDatabaseURL() {
  const file = await fs.readFile(
    path.resolve(process.cwd(), '.xatarc'),
    'utf-8'
  )

  return JSON.parse(file).databaseURL
}

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

const DATABASE_URL = await getDatabaseURL()

const xata = new XataClient({
  databaseURL: DATABASE_URL,
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

    titles.push({
      titleType: faker.helpers.arrayElement(['movie', 'short']),
      primaryTitle: title,
      originalTitle: title,
      startYear: null,
      endYear: +faker.date.past(10),
      isAdult: faker.datatype.boolean(),
      runtimeMinutes: faker.datatype.number({ min: 30, max: 180 }),
      genres: faker.helpers.arrayElements(MOVIE_GENRES),
      numVotes: faker.datatype.number({ min: 100, max: 10000 }),
      averageRating: faker.datatype.float({ max: 10 }),
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

export async function setup() {
  if (await isDBpopulated()) {
    console.warn('Database is not empty. Skip seeding...')
    return
  }

  const data = setMockData()

  try {
    const bulk = await xata.db.titles.create(data)

    console.log(`🎉 ${bulk} records succesffully inserted!`)

    return 'success'
  } catch (err) {
    console.error('Gone wrong: ', err)
  }
}

try {
  setup()
} catch {
  console.warn('Seeding gone wrong.')
}
