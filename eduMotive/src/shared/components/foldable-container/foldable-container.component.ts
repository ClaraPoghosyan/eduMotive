import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-foldable-container',
  imports: [],
  templateUrl: './foldable-container.component.html',
  styleUrl: './foldable-container.component.scss'
})
export class FoldableContainerComponent {
  @Input() faqs: any;



  public toggleFaq(faq: any) {
    faq.open = !faq.open;
  }
}
