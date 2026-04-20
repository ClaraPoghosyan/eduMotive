export interface Blog {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  isBlog?: boolean;
}
