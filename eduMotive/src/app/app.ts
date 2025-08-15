import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from '../header/header';
import {NzLayoutComponent} from 'ng-zorro-antd/layout';
import {Footer} from '../footer/footer';
import {HomePage} from '../hom-page/home-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, NzLayoutComponent, Footer, HomePage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('eduMotive');
}
