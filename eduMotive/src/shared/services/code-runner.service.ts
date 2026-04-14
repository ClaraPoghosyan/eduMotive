import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Language {
  label: string;
  /** Language key sent to Piston (e.g. "python", "c++") */
  value: string;
  /** Resolved at runtime from /runtimes; fallback provided below */
  version: string;
  extension: string;
  /** Filename sent to Piston (important for Java which requires Main.java) */
  filename: string;
  template: string;
}

export interface PistonRuntime {
  language: string;
  version: string;
  aliases: string[];
}

export interface ExecuteResponse {
  run: {
    stdout: string;
    stderr: string;
    code: number;
    output: string;
  };
}

/** Fallback versions (from live /runtimes as of 2026-04) */
export const LANGUAGES: Language[] = [
  {
    label: 'Python',
    value: 'python',
    version: '3.10.0',
    extension: 'py',
    filename: 'main.py',
    template: 'print("Hello, World!")',
  },
  {
    label: 'JavaScript',
    value: 'javascript',
    version: '18.15.0',
    extension: 'js',
    filename: 'main.js',
    template: 'console.log("Hello, World!");',
  },
  {
    label: 'TypeScript',
    value: 'typescript',
    version: '5.0.3',
    extension: 'ts',
    filename: 'main.ts',
    template: 'const msg: string = "Hello, World!";\nconsole.log(msg);',
  },
  {
    label: 'Java',
    value: 'java',
    version: '15.0.2',
    extension: 'java',
    filename: 'Main.java',   // must match public class name
    template:
      'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}',
  },
  {
    label: 'C++',
    value: 'c++',
    version: '10.2.0',
    extension: 'cpp',
    filename: 'main.cpp',
    template:
      '#include <iostream>\nint main() {\n  std::cout << "Hello, World!" << std::endl;\n  return 0;\n}',
  },
  {
    label: 'C',
    value: 'c',
    version: '10.2.0',
    extension: 'c',
    filename: 'main.c',
    template:
      '#include <stdio.h>\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}',
  },
  {
    label: 'Go',
    value: 'go',
    version: '1.16.2',
    extension: 'go',
    filename: 'main.go',
    template:
      'package main\n\nimport "fmt"\n\nfunc main() {\n  fmt.Println("Hello, World!")\n}',
  },
  {
    label: 'Rust',
    value: 'rust',
    version: '1.68.2',   // ← was 1.50.0 (does not exist on Piston)
    extension: 'rs',
    filename: 'main.rs',
    template: 'fn main() {\n  println!("Hello, World!");\n}',
  },
  {
    label: 'PHP',
    value: 'php',
    version: '8.2.3',
    extension: 'php',
    filename: 'main.php',
    template: '<?php\necho "Hello, World!\\n";',
  },
  {
    label: 'Ruby',
    value: 'ruby',
    version: '3.0.1',
    extension: 'rb',
    filename: 'main.rb',
    template: 'puts "Hello, World!"',
  },
  {
    label: 'C#',
    value: 'csharp',
    version: '6.12.0',
    extension: 'cs',
    filename: 'main.cs',
    template:
      'using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine("Hello, World!");\n  }\n}',
  },
  {
    label: 'Kotlin',
    value: 'kotlin',
    version: '1.8.20',
    extension: 'kt',
    filename: 'main.kt',
    template: 'fun main() {\n  println("Hello, World!")\n}',
  },
];

const PISTON_BASE = 'https://emkc.org/api/v2/piston';

@Injectable({ providedIn: 'root' })
export class CodeRunnerService {
  private readonly http = inject(HttpClient);

  /** Fetch available runtimes so we can pin the correct versions at startup */
  public getRuntimes(): Observable<PistonRuntime[]> {
    return this.http.get<PistonRuntime[]>(`${PISTON_BASE}/runtimes`);
  }

  public execute(language: Language, code: string): Observable<ExecuteResponse> {
    return this.http.post<ExecuteResponse>(`${PISTON_BASE}/execute`, {
      language: language.value,
      version: language.version,
      files: [{ name: language.filename, content: code }],
    });
  }
}
