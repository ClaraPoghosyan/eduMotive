import {Component, input, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
interface Group {
  name?: string;
  text?: string;
  img: string;
}
@Component({
  selector: 'app-scroller-form',
  imports: [],
  templateUrl: './scroller-form.component.html',
  styleUrl: './scroller-form.component.scss'
})
export class ScrollerFormComponent implements OnInit {
  groups = input<Group[]>([]);
  countArray = input<number[]>([0,1,2]);
  imgWidth = input<number>(100);
  imgHeight = input<number>(100);

  ngOnInit() {
    console.log(this.countArray());
  }
}
