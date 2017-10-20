import { MenuComponent } from './menu.component';
import { DomController } from '../platform/dom-controller';
import { GestureController, GesturePriority, GESTURE_MENU_SWIPE } from '../gestures/gesture-controller';
import { Platform } from '../platform/platform';
import { SlideEdgeGesture } from '../gestures/slide-edge-gesture';
import { SlideData } from '../gestures/slide-gesture';

/**
 * Gesture attached to the content which the menu is assigned to
 */
export class MenuContentGesture extends SlideEdgeGesture {

  constructor(
    plt: Platform,
    public menu: MenuComponent,
    gestureCtrl: GestureController,
    domCtrl: DomController,
  ) {
    super(plt, plt.doc().body, {
      direction: 'x',
      edge: menu.side,
      threshold: 5,
      maxEdgeStart: menu.maxEdgeStart || 50,
      zone: false,
      passive: true,
      domController: domCtrl,
      gesture: gestureCtrl.createGesture({
        name: GESTURE_MENU_SWIPE,
        priority: GesturePriority.MenuSwipe,
        disableScroll: true,
      }),
    });
  }

  canStart(ev: any): boolean {
    const menu = this.menu;
    if (!menu.canSwipe()) {
      return false;
    }
    if (menu.isOpen) {
      return true;
    } else if (menu.getMenuController().getOpen()) {
      return false;
    }
    return super.canStart(ev);
  }

  // Set CSS, then wait one frame for it to apply before sliding starts
  onSlideBeforeStart(ev: any) {
    this.menu._swipeBeforeStart();
  }

  onSlideStart() {
    this.menu._swipeStart();
  }

  onSlide(slide: SlideData, ev: any) {
    const z = (this.menu.side === 'right' ? slide.min : slide.max);
    const stepValue = (slide.distance / z);

    this.menu._swipeProgress(stepValue);
  }

  onSlideEnd(slide: SlideData, ev: any) {
    let z = (this.menu.side === 'right' ? slide.min : slide.max);
    const currentStepValue = (slide.distance / z);
    const velocity = slide.velocity;
    z = Math.abs(z * 0.5);
    const shouldCompleteRight = (velocity >= 0)
      && (velocity > 0.2 || slide.delta > z);

    const shouldCompleteLeft = (velocity <= 0)
      && (velocity < -0.2 || slide.delta < -z);

    this.menu._swipeEnd(shouldCompleteLeft, shouldCompleteRight, currentStepValue, velocity);
  }

  getElementStartPos(slide: SlideData, ev: any) {
    if (this.menu.side === 'right') {
      return this.menu.isOpen ? slide.min : slide.max;
    }
    // left menu
    return this.menu.isOpen ? slide.max : slide.min;
  }

  getSlideBoundaries(): {min: number, max: number} {
    if (this.menu.side === 'right') {
      return {
        min: -this.menu.width(),
        max: 0,
      };
    }
    // left menu
    return {
      min: 0,
      max: this.menu.width(),
    };
  }
}
