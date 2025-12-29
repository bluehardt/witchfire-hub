import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
} from "@angular/core";

import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "app-custom-popover",
  template: `
    <div
      class="custom-popover"
      *ngIf="visible; else popoverPlaceholder; animation: true"
      [ngStyle]="popoverStyle"
      [@fadeScale]
    >
      <ng-content></ng-content>
    </div>
    <ng-template #popoverPlaceholder></ng-template>
  `,
  styleUrls: ["./custom-popover.component.scss"],
  animations: [
    trigger("fadeScale", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.8)" }),
        animate(
          "120ms cubic-bezier(0,0,0.2,1)",
          style({ opacity: 1, transform: "scale(1)" })
        ),
      ]),
      transition(":leave", [
        animate(
          "100ms cubic-bezier(0.4,0,1,1)",
          style({ opacity: 0, transform: "scale(0.8)" })
        ),
      ]),
    ]),
  ],
})
export class CustomPopoverComponent implements OnDestroy {
  @Input() anchor: HTMLElement | null = null;
  @Input() offsetX = 0;
  @Input() offsetY = 8;
  visible = false;
  popoverStyle: { [key: string]: string } = {};
  private globalClickUnlisten: (() => void) | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  show() {
    if (!this.anchor) return;
    const rect = this.anchor.getBoundingClientRect();
    this.popoverStyle = {
      position: "fixed",
      top: `${rect.bottom + this.offsetY}px`,
      left: `${rect.left + this.offsetX}px`,
      zIndex: "1000",
    };
    this.visible = true;
    this.globalClickUnlisten = this.renderer.listen(
      "document",
      "mousedown",
      (event: MouseEvent) => {
        if (
          !this.el.nativeElement.contains(event.target) &&
          !this.anchor?.contains(event.target as Node)
        ) {
          this.hide();
        }
      }
    );
  }

  hide() {
    this.visible = false;
    if (this.globalClickUnlisten) {
      this.globalClickUnlisten();
      this.globalClickUnlisten = null;
    }
  }

  ngOnDestroy() {
    this.hide();
  }
}
