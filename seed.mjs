// ts-check
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

class XataClient extends buildClient() {
  constructor(options) {
    super({
      ...options,
      databaseURL: process.env.XATA_DATABASE_URL,
    })
  }
}

const xata = new XataClient({
  databaseURL: process.env.XATA_DATABASE_URL,
  apiKey: process.env.XATA_API_KEY,
  branch: process.env.XATA_BRANCH || 'main',
})

export async function setup() {
  const { aggs } = await xata.db.titles.aggregate({
    totalCount: {
      count: '*',
    },
  })
  if (aggs.totalCount > 0) {
    console.warn('Database is not empty. Skip seeding...')
    return
  }

  const titles = []

  for (let i = 0; i < 100; i++) {
    const title = faker.music.songName()

    titles.push({
      titleType: faker.helpers.arrayElement(['movie', 'short']),
      primaryTitle: title,
      originalTitle: title,
      startYear: null,
      endYear: faker.date.past(10),
      isAdult: faker.datatype.boolean(),
      runtimeMinutes: faker.datatype.number({ min: 30, max: 180 }),
      genres: faker.helpers.arrayElements(MOVIE_GENRES),
      numVotes: faker.datatype.number({ min: 100, max: 10000 }),
      averageRating: faker.datatype.float({ max: 10 }),
      coverUrl: faker.image.imageUrl(),
      summary: faker.lorem.paragraph(),
    })
  }

  // @TODO
  // wip
  // await xata.db.titles.create(titles)
}

try {
  setup()
} catch {
  console.warn('Seeding gone wrong.')
}
