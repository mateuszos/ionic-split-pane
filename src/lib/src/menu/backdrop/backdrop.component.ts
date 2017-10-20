/* tslint:disable */
import { Component, ElementRef, Renderer } from '@angular/core';

/**
 * @private
 */
@Component({
  moduleId: module.id,
  selector: 'ion-backdrop',
  template: '',
  styleUrls: ['./backdrop.component.css'],
  host: {
    'role': 'presentation',
    'tappable': '',
    'disable-activated': ''
  },
})
export class BackdropComponent {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer
  ) { }

  getNativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  setElementClass(className: string, add: boolean) {
    this.renderer.setElementClass(this.elementRef.nativeElement, className, add);
  }

}
