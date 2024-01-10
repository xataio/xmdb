//@ts-check
import { exec } from 'node:child_process'
import dotenv from 'dotenv'

dotenv.config({
  path: '.env.local',
})

try {
  console.log(`❯ Link and Setup database at ${process.env.XATA_DATABASE_URL}`)

  exec(
    `pnpm -s dlx @xata.io/cli@latest init --schema=schema.json --codegen=lib/xata.codegen.ts --db=${process.env.XATA_DATABASE_URL} --yes --force`,
    (_error, stdout, stderr) => {
      console.log('❯ Running pnpm dlx')

      if (stderr) {
        console.error(`Finished with issues: \n${stderr}`)
        return
      }
      console.log(stdout)
    }
  )
} catch {
  console.warn('Setup gone wrong.')
}
