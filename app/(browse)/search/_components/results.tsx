import {
  ResultCard,
  ResultCardSkeleton,
} from '@/app/(browse)/search/_components/result-card'
import { getSearch } from '@/lib/search-service'

interface ResultsProps {
  term?: string
}

export const Results = async ({ term }: ResultsProps) => {
  const data = await getSearch(term)

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">
        Results for term &quot;{term}&quot;
      </h2>
      {data.length > 0 ? (
        <div className="flex max-w-[41rem] flex-col gap-y-4">
          {data.map((result) => (
            <ResultCard key={result.id} data={result} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No results found. Try searching for something else.
        </p>
      )}
    </div>
  )
}

export const ResultsSkeleton = ({ term }: ResultsProps) => {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">
        Results for term &quot;{term}&quot;
      </h2>
      <div className="flex max-w-[41rem] flex-col gap-y-4">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
