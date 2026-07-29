'use server'
import { cookies } from 'next/headers'

export const getPremiumNews = async () => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value || null

     if(!accessToken){
         return {
            success : false, 
            message : 'User not logged in'
         }
     }

    const res = await fetch(`${process.env.BACKEND_API_URL}api/premium`, {
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
    console.log(result);
    
    return result
}