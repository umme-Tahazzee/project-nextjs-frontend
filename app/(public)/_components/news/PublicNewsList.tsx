/* eslint-disable @typescript-eslint/no-explicit-any */

import { IPost } from "@/lib/types";
import { NewsCard } from "./NewsCard";
import { cookies } from "next/headers";
import { getPublicPost } from "../../_actions/getPublicPost";

export async function PublicNewsList() {
  const result = await getPublicPost();

  if (!result?.success) {
    return (
      <p className="py-12 text-center text-muted-foreground">No news found.</p>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {result.data.map((post: IPost) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
