'use server'
import { cookies } from 'next/headers'

type SearchParams = {
    [key: string]: string | string[] | undefined;
};

export const getPremiumNews = async ({
    query,
}: {
    query?: SearchParams;
}) => {


    //  const searchTerm = search?.searchTerm ? `?searchTerm=${search.searchTerm}` : "";
    
     const params = new URLSearchParams()

     if(query && query.searchTerm ){
        params.set("searchTerm", query.searchTerm as string)
     }

   
    
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value || null

    if (!accessToken) {
        return {
            success: false,
            message: 'User not logged in'
        }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}api/premium?${params.toString()}`, {
        cache: 'force-cache',
        headers: {
            Cookie: `accessToken=${accessToken}`
        },
        next: {
            revalidate: 60 * 60 * 6,
            tags: ['premium-posts']
        }
    })



    const result = await res.json()


    return result
}