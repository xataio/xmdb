import { redirect } from 'next/navigation'

async function search(data: FormData) {
  'use server'
  const searchTerm = data.get('searchField') ?? ''

  if (searchTerm?.length > 0) {
    redirect(`/?search=${searchTerm}`)
  }
}

export const Search = ({ term }: { term?: string }) => {
  return (
    <form method="post" action={search}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>

        <input
          type="search"
          name="searchField"
          defaultValue={typeof term === 'string' ? decodeURI(term) : ''}
          autoComplete="off"
          // className="text-white bg-transparent outline-none"
          className="block w-full p-4 pl-10 text-sm text-white placeholder-gray-400 border rounded-lg border-slate-700 bg-slate-900 focus:border-pink-500"
          required
        />
        <button
          type="submit"
          // className="px-2 text-lg text-white transition-colors bg-pink-600 hover:bg-pink-400 focus:bg-pink-300 rounded-2x "
          className="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-pink-600 hover:bg-pink-700 focus:ring-pink-800"
        >
          Search
        </button>
      </div>
    </form>
  )
}
