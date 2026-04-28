import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {AuthorService} from '../../shared/services/author.service';
import {Author} from '../../shared/interfaces/author.interface';

@Component({
  selector: 'app-admin-authors',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzPopconfirmModule,
    NzIconModule,
    NzAvatarModule,
    NzSpinModule,
  ],
  templateUrl: './admin-authors.component.html',
  styleUrl: './admin-authors.component.scss',
})
export class AdminAuthorsComponent implements OnInit {
  private readonly authorService = inject(AuthorService);
  private readonly message = inject(NzMessageService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  public authors: Author[] = [];
  public loading = false;
  public modalVisible = false;
  public modalLoading = false;
  public editingId: number | null = null;

  public form: FormGroup = this.fb.group({
    fullName:           [null, [Validators.required]],
    email:              [null, [Validators.email]],
    password:           [null],
    specialization:     [null, [Validators.required]],
    imageUrl:           [null, [Validators.required]],
    biography:          [null, [Validators.required]],
    about:              [null],
    experience:         [null],
    education:          [null],
    skills:             [null],
    teachingPhilosophy: [null],
    whatYouLearn:       [null],
  });

  public ngOnInit(): void {
    this.loadAuthors();
  }

  public loadAuthors(): void {
    this.loading = true;
    this.authorService.getAuthors()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          console.log(data)
          this.authors = data; this.loading = false; },
        error: () => { this.message.error('Failed to load authors.'); this.loading = false; },
      });
  }



  public openAddModal(): void {
    this.editingId = null;
    this.form.reset();
    this.modalVisible = true;
  }

  public openEditModal(author: Author): void {
    this.editingId = author.id;
    this.form.patchValue({
      fullName:           author.fullName,
      email:              author.email,
      specialization:     author.specialization,
      imageUrl:           author.imageUrl,
      biography:          author.biography,
      about:              author.about,
      experience:         author.experience,
      education:          author.education,
      skills:             author.skills,
      teachingPhilosophy: author.teachingPhilosophy,
      whatYouLearn:       author.whatYouLearn,
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
    const isEditing = this.editingId !== null;
    const payload = this.form.value;

    const request$ = isEditing
      ? this.authorService.updateAuthor(this.editingId!, payload)
      : this.authorService.createAuthor(payload);

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.message.success(isEditing ? 'Author updated.' : 'Author created.');
        this.modalVisible = false;
        this.modalLoading = false;
        this.editingId = null;
        this.loadAuthors();
      },
      error: () => {
        this.message.error('Operation failed.');
        this.modalLoading = false;
      },
    });
  }

  public handleModalCancel(): void {
    this.modalVisible = false;
    this.editingId = null;
  }

  public deleteAuthor(id: number): void {
    this.authorService.deleteAuthor(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.message.success('Author deleted.');
          this.authors = this.authors.filter(a => a.id !== id);
        },
        error: () => this.message.error('Failed to delete author.'),
      });
  }
}
