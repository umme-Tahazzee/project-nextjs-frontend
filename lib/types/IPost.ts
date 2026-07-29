export type PremiumNews = {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  isFeatured: boolean;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  tags: string[];
  views: number;
  isPremium: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};
