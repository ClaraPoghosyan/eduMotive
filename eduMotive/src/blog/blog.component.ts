import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {HeaderComponent} from '../shared/components/header/header.component';
import {AppFaqComponent} from '../app-faq/app-faq.component';
import {FooterComponent} from '../footer/footer.component';
import {JoinPartComponent} from '../join-part.component/join-part.component';
import {ReviewsComponent} from '../reviews.component/reviews.component';
import {CoursesConfigComponent} from '../courses-config/courses-config.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Faq} from '../shared/interfaces/faq.interface';
import {CoursesService} from '../shared/services/courses.service';
import {BlogService} from '../shared/services/blog.service';
import {Blog} from '../shared/interfaces/blog.interface';

@Component({
  selector: 'app-blog',
  imports: [
    HeaderComponent,
    FooterComponent,
    JoinPartComponent,
    CoursesConfigComponent,

  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly blogService: BlogService = inject(BlogService);

  public featuredCoursesTitle: string = 'Մտքեր, խորհուրդներ հատուկ Ձեզ համար';
  public featuredCoursesSubTitle: string = '';
  public blogs:Blog[] = [];


  ngOnInit() {
    this.getBlogs();
  }

  public getBlogs(): void {
    this.blogService.getBlogs()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: Blog[]) => {
        this.blogs = res.map(blog => ({
          ...blog,
          isBlog: true
        }));

      })
  }

}
