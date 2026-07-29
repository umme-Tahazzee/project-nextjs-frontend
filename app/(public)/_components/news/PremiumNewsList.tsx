
import { NewsCard } from "./NewsCard";
import { IPost } from "@/lib/types";
import { getPremiumNews } from "../../_actions/getPremiumNews";
import { Lock } from "lucide-react";
import Link from "next/link";

export async function PremiumNewsList() {
 const result = await getPremiumNews()
console.log(result, 'data')

  if (!result?.success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed py-16 text-center">
        <div className="rounded-full bg-muted p-4">
          <Lock className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <p className="text-lg font-semibold">Premium Content Locked</p>
          <p className="text-sm text-muted-foreground">
            {result?.message || "Please subscribe to access premium news."}
          </p>
        </div>
        <Link
          href="/payment"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Go to payment
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {result.data.map((post: IPost ) => (
          <NewsCard key={post.id} post={post} />
        ))}
       
      </div>
    </div>
  );
}
