import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BlogService } from '../../shared/services/blog.service';
import { Blog } from '../../shared/interfaces/blog.interface';

@Component({
  selector: 'app-admin-blogs',
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzPopconfirmModule,
    NzIconModule,
  ],
  templateUrl: './admin-blogs.component.html',
  styleUrl: './admin-blogs.component.scss',
})
export class AdminBlogsComponent implements OnInit {
  private readonly blogService = inject(BlogService);
  private readonly message = inject(NzMessageService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  public blogs: Blog[] = [];
  public loading = false;
  public modalVisible = false;
  public modalLoading = false;
  public editingId: number | null = null;

  public form: FormGroup = this.fb.group({
    title: [null, [Validators.required]],
    content: [null, [Validators.required]],
    imageUrl: [null, [Validators.required]],
  });

  public ngOnInit(): void {
    this.loadBlogs();
  }

  public loadBlogs(): void {
    this.loading = true;
    this.blogService.getBlogs()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => { this.blogs = data; this.loading = false; },
        error: () => { this.message.error('Failed to load blogs.'); this.loading = false; },
      });
  }

  public openAddModal(): void {
    this.editingId = null;
    this.form.reset();
    this.modalVisible = true;
  }

  public openEditModal(blog: Blog): void {
    this.editingId = blog.id;
    this.form.patchValue({
      title: blog.title,
      content: blog.content,
      imageUrl: blog.imageUrl,
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
    const payload = { ...this.form.value, isBlog: true };

    const request$ = this.editingId
      ? this.blogService.updateBlog(this.editingId, payload)
      : this.blogService.createBlog(payload);

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.message.success(this.editingId ? 'Blog updated.' : 'Blog created.');
        this.modalVisible = false;
        this.modalLoading = false;
        this.loadBlogs();
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

  public deleteBlog(id: number): void {
    this.blogService.deleteBlog(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.message.success('Blog deleted.');
          this.blogs = this.blogs.filter(b => b.id !== id);
        },
        error: () => this.message.error('Failed to delete blog.'),
      });
  }
}
