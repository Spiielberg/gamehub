import {
  ResultCard,
  ResultCardSkeleton,
} from '@/app/(browse)/(home)/_components/result-card'
import { Skeleton } from '@/components/ui/skeleton'
import { getStreams } from '@/lib/feed-service'

export const Results = async () => {
  const streamList = await getStreams()

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">
        Streamers we think you&apos;ll like
      </h2>
      {streamList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {streamList.map((stream) => (
            <ResultCard key={stream.id} data={stream} />
          ))}
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">No streams found.</div>
      )}
    </div>
  )
}

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="mb-4 h-7 w-64" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
