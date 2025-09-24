import { Routes } from '@angular/router';
import {MainComponent} from './main.component/main.component';
import {AboutUsComponent} from '../about-us.component/about-us.component';
import {HomePageComponent} from '../hom-page/home-page.component';

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
      }
    ]
  },

];
