import React, { Suspense } from 'react'
import { NewsSkeleton } from '../_components/news/NewsSkeleton'
import { PublicNewsList } from '../_components/news/PublicNewsList'

const News = () => {
  return (
    <div className='max-w-7xl mx-auto space-y-6 px-4 py-4 sm:px-6 sm:justify-between'>
       <div className='flex flex-col gap-4 '>
             <div>
              <h1>Premium News</h1>
             <p>Exculsive stories for our subscription</p>
             </div>
       </div>

       <Suspense fallback={<NewsSkeleton/>}>
              <PublicNewsList/>
       </Suspense>
    </div>
  )
}

export default News