import {Component, DestroyRef, inject, Input, OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {ActivatedRoute, Router} from '@angular/router';
import {FoldableContainerComponent} from '../foldable-container/foldable-container.component';
import {JoinPartComponent} from '../../../join-part.component/join-part.component';
import {FooterComponent} from '../../../footer/footer.component';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {SafeUrlPipe} from '../../pipes/safe-url-pipe';
import {CoursesService} from '../../services/courses.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Faq} from '../../interfaces/faq.interface';
import {FaqService} from '../../services/faq.service';
import {Course} from '../../interfaces/courses.interface';

@Component({
  selector: 'app-course-page',
  imports: [
    HeaderComponent,
    NzButtonComponent,
    FoldableContainerComponent,
    JoinPartComponent,
    FooterComponent,
    NzCardComponent,
    NzColDirective,
    NzRowDirective,
    SafeUrlPipe
  ],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.scss'
})
export class CoursePageComponent implements OnInit {
  private readonly router: Router = inject(Router);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly coursesService: CoursesService = inject(CoursesService);


  public card!: Course;
  public faqs: any[] = [];
  public videos: any[] = [];

  ngOnInit() {
    this.getCourse();
  }

  public getCourse(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.coursesService.getCourseById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: Course) => {
        this.card = res;
        this.faqs = res.faqs;
        this.videos = (res.videos ?? []).map((v: any) => ({
          url: this.toEmbedUrl(v.youtubeUrl)
        }));
      });
  }

  private toEmbedUrl(url: string): string {
    const videoIdMatch = url.match(/(?:youtu\.be\/|v=)([^?&]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
  }

  public goOnAuthor(authorId: number): void {
    this.router.navigate([`/author/${authorId}`])
  }
}
