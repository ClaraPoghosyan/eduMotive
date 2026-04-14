import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, DecimalPipe } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FormsModule } from '@angular/forms';
import { CoursesService } from '../../shared/services/courses.service';
import { Course } from '../../shared/interfaces/courses.interface';

@Component({
  selector: 'app-admin-courses',
  standalone: true,
  imports: [
    NgFor,
    DecimalPipe,
    ReactiveFormsModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzInputNumberModule,
    NzPopconfirmModule,
    NzIconModule,
    NzTagModule,
  ],
  templateUrl: './admin-courses.component.html',
  styleUrl: './admin-courses.component.scss',
})
export class AdminCoursesComponent implements OnInit {
  private readonly coursesService = inject(CoursesService);
  private readonly message = inject(NzMessageService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  public courses: Course[] = [];
  public loading = false;
  public modalVisible = false;
  public modalLoading = false;
  public editingId: number | null = null;

  public readonly groups = ['Programming', 'Data', 'Design', 'Marketing'];
  public readonly languages = ['Armenian', 'Russian', 'English'];

  public form: FormGroup = this.fb.group({
    title: [null, [Validators.required]],
    slug: [null, [Validators.required]],
    language: [null, [Validators.required]],
    shortDescription: [null, [Validators.required]],
    duration: [null, [Validators.required]],
    lessonsCount: [null, [Validators.required, Validators.min(1)]],
    priceAmd: [null, [Validators.required, Validators.min(0)]],
    rating: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
    imageUrl: [null, [Validators.required]],
    groupName: [null, [Validators.required]],
    authorName: [null, [Validators.required]],
    authorId: [null, [Validators.required]],
  });

  public ngOnInit(): void {
    this.loadCourses();
  }

  public loadCourses(): void {
    this.loading = true;
    this.coursesService.getCourses()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => { this.courses = data; this.loading = false; },
        error: () => { this.message.error('Failed to load courses.'); this.loading = false; },
      });
  }

  public openAddModal(): void {
    this.editingId = null;
    this.form.reset();
    this.modalVisible = true;
  }

  public openEditModal(course: Course): void {
    this.editingId = course.id;
    this.form.patchValue({
      title: course.title,
      slug: course.slug,
      language: course.language,
      shortDescription: course.shortDescription,
      duration: course.duration,
      lessonsCount: course.lessonsCount,
      priceAmd: course.priceAmd,
      rating: course.rating,
      imageUrl: course.imageUrl,
      groupName: course.groupName,
      authorName: course.authorName,
      authorId: course.authorId,
    });
    this.modalVisible = true;
  }

  public handleModalOk(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(c => {
        c.markAsDirty();
        c.updateValueAndValidity();
      });
      return;
    }

    this.modalLoading = true;
    const payload = { ...this.form.value, isBlog: false, videos: [], faqs: [] };

    const request$ = this.editingId
      ? this.coursesService.updateCourse(this.editingId, payload)
      : this.coursesService.createCourse(payload);

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.message.success(this.editingId ? 'Course updated.' : 'Course created.');
        this.modalVisible = false;
        this.modalLoading = false;
        this.loadCourses();
      },
      error: () => {
        this.message.error('Operation failed.');
        this.modalLoading = false;
      },
    });
  }

  public handleModalCancel(): void {
    this.modalVisible = false;
  }

  public deleteCourse(id: number): void {
    this.coursesService.deleteCourse(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.message.success('Course deleted.');
          this.courses = this.courses.filter(c => c.id !== id);
        },
        error: () => this.message.error('Failed to delete course.'),
      });
  }
}
