export interface TestTopic {
  id: number;
  title: string;
  topic: string;
  description: string;
  questionsCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface TestQuestion {
  id: number;
  text: string;
  options: string[];
  correctIndex?: number;
}

export interface TestDetail {
  id: number;
  title: string;
  questions: TestQuestion[];
}

export interface TestResult {
  score: number;
  total: number;
  percentage: number;
  level: string;
  feedback: string;
}