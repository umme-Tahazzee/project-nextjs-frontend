import { cookies } from "next/headers";

export const  getPublicPost = async() => {
    const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}api/posts`, {
    cache: "force-cache",
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    next: {
      revalidate: 60 * 60 * 6,
      tags: ["premium-posts"],
    },
  });

  const result = await res.json();

  return result
}