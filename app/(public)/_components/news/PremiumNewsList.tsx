
import { NewsCard } from "./NewsCard";
import { IPost } from "@/lib/types";
import { getPremiumNews } from "../../_actions/getPremiumNews";

export async function PremiumNewsList() {
 const result = await getPremiumNews()

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
