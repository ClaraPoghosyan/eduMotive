import { Routes } from '@angular/router';
import {MainComponent} from './main.component/main.component';
import { adminGuard } from '../admin/admin.guard';
import { userGuard } from '../shared/guards/user.guard';


export const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: '',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('../admin/admin-layout/admin-layout.component').then(c => c.AdminLayoutComponent),
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'dashboard',
          },
          {
            path: 'dashboard',
            loadComponent: () =>
              import('../admin/dashboard/dashboard.component').then(c => c.DashboardComponent),
          },
          {
            path: 'courses',
            loadComponent: () =>
              import('../admin/admin-courses/admin-courses.component').then(c => c.AdminCoursesComponent),
          },
          {
            path: 'blogs',
            loadComponent: () =>
              import('../admin/admin-blogs/admin-blogs.component').then(c => c.AdminBlogsComponent),
          },
          {
            path: 'questions',
            loadComponent: () =>
              import('../admin/admin-questions/admin-questions.component').then(c => c.AdminQuestionsComponent),
          },
          {
            path: 'authors',
            loadComponent: () =>
              import('../admin/admin-authors/admin-authors.component').then(c => c.AdminAuthorsComponent),
          },
          {
            path: 'tests',
            loadComponent: () =>
              import('../admin/admin-tests/admin-tests.component').then(c => c.AdminTestsComponent),
          },
        ],
      },
    ],
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        loadComponent: () =>
          import('../home-page/home-page.component').then(c => c.HomePageComponent),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('../about-us/about-us.component').then(c => c.AboutUsComponent),
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('../blog/blog.component').then(c => c.BlogComponent),
      },
      {
        path: 'courses',
        loadComponent: () =>
          import('../courses/courses.component').then(c => c.CoursesComponent),
      },
      {
        path: 'log-in',
        loadComponent: () =>
          import('../log-in/log-in.component').then(c => c.LogInComponent),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('../reset-password/reset-password.component').then(c => c.ResetPasswordComponent),
      },
      {
        path: 'code-lab',
        canActivate: [userGuard],
        loadComponent: () =>
          import('../coding-platform/coding-platform.component').then(c => c.CodingPlatformComponent),
      },
      {
        path: 'user',
        canActivate: [userGuard],
        loadComponent: () =>
          import('../user-page/user-page.component').then(c => c.UserPageComponent),
      },
      {
        path: 'course/:id',
        canActivate: [userGuard],
        loadComponent: () =>
          import('../shared/components/course-page/course-page.component')
            .then(c => c.CoursePageComponent),
      },
      {
        path: 'blog/:id',
        canActivate: [userGuard],
        loadComponent: () =>
          import('../shared/components/blog-page/blog-page.component')
            .then(c => c.BlogPageComponent),
      },
      {
        path: 'author/:id',
        canActivate: [userGuard],
        loadComponent: () =>
          import('../shared/components/author-page/author-page.component')
            .then(c => c.AuthorPageComponent),
      },
      {
        path: 'test',
        loadComponent: () =>
          import('../test-page/test-page.component').then(c => c.TestPageComponent),
      },
      {
        path: 'contact-us',
        loadComponent: () =>
          import('../contact-us/contact-us.component').then(c => c.ContactUsComponent),
      },
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import('../privacy-policy/privacy-policy.component').then(c => c.PrivacyPolicyComponent),
      },
      {
        path: 'faq',
        loadComponent: () =>
          import('../faq-page/faq-page.component').then(c => c.FaqPageComponent),
      },
      {
        path: '**',
        loadComponent: () =>
          import('../page-not-found/page-not-found.component')
            .then(c => c.PageNotFoundComponent),
      }
    ]
  }
];
