import { Routes } from '@angular/router';
import {MainComponent} from './main.component/main.component';


export const routes: Routes = [
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
          import('../hom-page/home-page.component').then(c => c.HomePageComponent),
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
        path: 'course',
        loadComponent: () =>
          import('../shared/components/course-page/course-page.component')
            .then(c => c.CoursePageComponent),
      },
      {
        path: 'author',
        loadComponent: () =>
          import('../shared/components/author-page/author-page.component')
            .then(c => c.AuthorPageComponent),
      },
      {
        path: 'contact-us',
        loadComponent: () =>
          import('../contact-us/contact-us.component').then(c => c.ContactUsComponent),
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
