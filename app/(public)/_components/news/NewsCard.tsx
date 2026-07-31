import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPost } from "@/lib/types";
import { MessageSquareIcon, SparklesIcon } from "lucide-react";
import Image from "next/image";

type NewsCardProps = {
    post: IPost
}

export function NewsCard({ post }: NewsCardProps) {
    const commentCount = post._count?.comments ?? post.comments?.length ?? 0;

    return (
      <Card className="gap-4 rounded-sm">
        {post.thumbnail && (
          
          <Image
            src={post.thumbnail}
            unoptimized
            alt={post.title}
            width={400}
            height={100}
            
            
          />
        )}
        <CardHeader>
          <div className="flex flex-wrap items-center gap-1.5">
            {post.isPremium && (
              <Badge className="bg-red-500 rounded-full p-1">
                <SparklesIcon data-icon="inline-start" />
                Premium
              </Badge>
            )}
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-primary text-white px-2.5 py-1 rounded-full" >
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-lg">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="line-clamp-4 whitespace-pre-line text-muted-foreground">
            {post.content}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              By {post.author?.name ?? "Unknown"} ·{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquareIcon className="size-3.5" />
              {commentCount}
            </span>
          </div>
        </CardContent>
      </Card>
    );
}