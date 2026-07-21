'use server'

import { cookies } from "next/headers"

export const getMe = async () => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value 

    if (!accessToken) {
        return {
            success: false,
            message: "user not login in"
        }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}api/users/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    const result = await res.json()
  

    return result

}