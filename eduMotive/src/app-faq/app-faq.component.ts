import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FoldableContainerComponent} from '../shared/components/foldable-container/foldable-container.component';
import {Faq} from '../shared/interfaces/faq.interface';

@Component({
  selector: 'app-app-faq',
  imports: [
    FoldableContainerComponent
  ],
  templateUrl: './app-faq.component.html',
  styleUrl: './app-faq.component.scss'
})
export class AppFaqComponent {
  @Input() showTitle: boolean = true;
  @Input() faqs: Faq[] = [];

}
