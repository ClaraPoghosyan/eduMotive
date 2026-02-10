export interface Course {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  duration: string;
  lessonsCount: number;
  priceAmd: number;
  rating: number;
  imageUrl: string;
  groupName: string;
  isBlog: boolean;
  authorName: string;
}
