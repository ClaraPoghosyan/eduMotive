import { Routes } from '@angular/router';
import {MainComponent} from './main.component/main.component';
import {AboutUsComponent} from '../about-us/about-us.component';
import {HomePageComponent} from '../hom-page/home-page.component';
import {BlogComponent} from '../blog/blog.component';
import {CoursesComponent} from '../courses/courses.component';
import {ChatBotComponent} from '../chat-bot/chat-bot.component';

export const routes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: 'about',
        component: AboutUsComponent,
      },
      {
        path: 'blog',
        component: BlogComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
      },
      {
        path: 'chat-bot',
        component: ChatBotComponent,
      },
    ]
  },

];
