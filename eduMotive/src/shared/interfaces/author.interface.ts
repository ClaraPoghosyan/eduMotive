export interface Author {
  id: number;
  fullName: string;
  email: string;
  specialization: string;
  biography: string;
  imageUrl: string;
  experience: string;
  education: string;
  skills: string;
  about: string;
  teachingPhilosophy: string;
  whatYouLearn: string;
  courses: AuthorCourse[];
}

export interface AuthorCourse {
  id: number;
  title: string;
  slug: string;
}
