'use server'

import { cookies } from "next/headers"

export const getMyPosts = async() => {
    const cookieStore = await cookies()
        const accessToken = cookieStore.get('accessToken')?.value 
        if (!accessToken) {
            return {
                success: false,
                message: "user not login in"
            }
        }
        const res = await fetch(`${process.env.BACKEND_API_URL}api/posts/my-posts`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            cache : 'force-cache',
            next: {
                     revalidate: 60*60*24,
                     tags: ['my-post']
                 }
        })
        const result = await res.json()

        return result
        
}