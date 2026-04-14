import {Faq} from './faq.interface';

export interface Course {
  id: number;
  slug: string;
  title: string;
  language: string;
  shortDescription: string;
  duration: string;
  lessonsCount: number;
  priceAmd: number;
  rating: number;
  imageUrl: string;
  groupName: string;
  isBlog: boolean;
  authorName: string;
  authorId: number;
  videos: any[],
  faqs: Faq[]

}
