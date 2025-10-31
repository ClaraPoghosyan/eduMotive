import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from '../shared/components/header/header.component';
import {NzLayoutComponent} from 'ng-zorro-antd/layout';
import {FooterComponent} from '../footer/footer.component';
import {HomePageComponent} from '../hom-page/home-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NzLayoutComponent, FooterComponent, HomePageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('eduMotive');
}
