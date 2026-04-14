export interface Author {
  id: number;
  fullName: string;
  specialization: string;
  biography: string;
  imageUrl: string;
  courses: AuthorCourse[];
}

export interface AuthorCourse {
  id: number;
  title: string;
  slug: string;
}
