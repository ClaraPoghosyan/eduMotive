import { Routes } from '@angular/router';
import {MainComponent} from './main.component/main.component';
import {AboutUsComponent} from '../about-us/about-us.component';
import {HomePageComponent} from '../hom-page/home-page.component';
import {BlogComponent} from '../blog/blog.component';
import {CoursesComponent} from '../courses/courses.component';
import {ChatBotComponent} from '../chat-bot/chat-bot.component';
import {LogInComponent} from '../log-in/log-in.component';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';

export const routes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('../hom-page/home-page.component').then(c=> c.HomePageComponent) ,

      },
      {
        path: 'about',
        loadComponent: () => import('../about-us/about-us.component').then(c=> c.AboutUsComponent) ,
      },
      {
        path: 'blog',
        loadComponent: () => import('../blog/blog.component').then(c=> c.BlogComponent) ,
      },
      {
        path: 'courses',
        loadComponent: () => import('../courses/courses.component').then(c=> c.CoursesComponent) ,
      },
      {
        path: 'chat-bot',
        loadComponent: () => import('../chat-bot/chat-bot.component').then(c=> c.ChatBotComponent) ,
      },
      {
        path: 'log-in',
        loadComponent: () => import('../log-in/log-in.component').then(c=> c.LogInComponent) ,
      },
      {
        path: '**',
        loadComponent: () =>
          import('../page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent),
      }
    ]
  },

];
