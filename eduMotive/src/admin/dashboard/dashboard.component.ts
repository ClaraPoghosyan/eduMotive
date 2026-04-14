import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CoursesService } from '../../shared/services/courses.service';
import { BlogService } from '../../shared/services/blog.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    NzCardModule,
    NzStatisticModule,
    NzGridModule,
    NzIconModule,
    NzButtonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly coursesService = inject(CoursesService);
  private readonly blogService = inject(BlogService);
  private readonly destroyRef = inject(DestroyRef);

  public coursesCount = 0;
  public blogsCount = 0;
  public loading = true;

  public ngOnInit(): void {
    forkJoin({
      courses: this.coursesService.getCourses(),
      blogs: this.blogService.getBlogs(),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ courses, blogs }) => {
          this.coursesCount = courses.length;
          this.blogsCount = blogs.length;
          this.loading = false;
        },
        error: () => { this.loading = false; },
      });
  }
}
