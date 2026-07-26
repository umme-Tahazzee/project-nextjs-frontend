"use server"

import { revalidateTag } from "next/cache"
import { redirect } from "next/dist/server/api-utils"
import { cookies } from "next/headers"



export const logout = async() =>{
  const cookieStore = await cookies()
  cookieStore.delete("acessToken")
  cookieStore.delete("refreshToken")
  revalidateTag("my-profile", 'max')


}