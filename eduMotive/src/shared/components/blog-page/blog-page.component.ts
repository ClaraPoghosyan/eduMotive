import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';
import { JoinPartComponent } from '../../../join-part.component/join-part.component';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../interfaces/blog.interface';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [NgIf, DatePipe, NzSpinModule, HeaderComponent, FooterComponent, JoinPartComponent],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss',
})
export class BlogPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly blogService = inject(BlogService);
  private readonly destroyRef = inject(DestroyRef);

  public blog: Blog | null = null;

  public ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getBlogById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => { this.blog = data; },
        error: () => { this.router.navigate(['/blog']); },
      });
  }

  public goBack(): void {
    this.router.navigate(['/blog']);
  }
}
