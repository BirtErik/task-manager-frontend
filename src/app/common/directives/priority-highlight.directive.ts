import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  OnChanges,
} from '@angular/core';

@Directive({
  selector: '[appPriorityHighlight]',
})
export class PriorityHighlightDirective implements OnChanges {
  @Input('appPriorityHighlight') priority!: string;

  constructor(private element: ElementRef, private render: Renderer2) {}

  ngOnChanges(): void {
    this.render.removeStyle(this.element.nativeElement, 'color');
    this.render.removeStyle(this.element.nativeElement, 'font-weight');

    switch (this.priority) {
      case 'HIGH':
        this.render.setStyle(this.element.nativeElement, 'color', 'red');
        this.render.setStyle(this.element.nativeElement, 'font-weight', 'bold');
        break;
      case 'MEDIUM':
        this.render.setStyle(this.element.nativeElement, 'color', 'orange');
        break;
      case 'LOW':
        this.render.setStyle(this.element.nativeElement, 'color', 'green');
        break;
    }
  }
}
