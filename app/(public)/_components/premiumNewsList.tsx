import { PremiumNews } from "@/lib/types/IPost";

const PremiumNewsList = () => {
  const result: { success: boolean; data: PremiumNews[] } = {
    success: true,
    data: [
      {
        id: "1",
        title: "Premium news 1",
        content: "This is the full content of the first premium news article.",
        thumbnail: "https://picsum.photos/seed/news1/400/250",
        isFeatured: true,
        status: "PUBLISHED",
        tags: ["technology", "startup"],
        views: 1250,
        isPremium: true,
        authorId: "author-1",
        createdAt: "2026-07-20T10:00:00.000Z",
        updatedAt: "2026-07-22T08:30:00.000Z",
      },
      {
        id: "2",
        title: "Premium news 2",
        content: "This is the full content of the second premium news article.",
        thumbnail: "https://picsum.photos/seed/news2/400/250",
        isFeatured: false,
        status: "PUBLISHED",
        tags: ["business", "finance"],
        views: 890,
        isPremium: true,
        authorId: "author-2",
        createdAt: "2026-07-18T14:15:00.000Z",
        updatedAt: "2026-07-18T14:15:00.000Z",
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Premium News</h1>

      {!result.success ? (
        <p className="text-red-500">Failed to load news.</p>
      ) : (
        <div className="space-y-4">
          {result.data.map((news) => (
            <div
              key={news.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-40 bg-gray-100">
                <img
                  src={news.thumbnail}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
                {news.isFeatured && (
                  <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Featured
                  </span>
                )}
                {news.isPremium && (
                  <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded">
                    Premium
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="flex flex-wrap gap-1 mb-2">
                  {news.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-lg font-semibold">{news.title}</h2>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {news.content}
                </p>

                <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                  <span>{news.status}</span>
                  <span>{news.views.toLocaleString()} views</span>
                </div>
                <div className="mt-1 text-xs text-gray-400">
                  Updated {new Date(news.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PremiumNewsList;