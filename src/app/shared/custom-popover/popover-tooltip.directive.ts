import {
  Directive,
  Input,
  ElementRef,
  ViewContainerRef,
  ComponentRef,
  HostListener,
  Injector,
  ApplicationRef,
  ComponentFactoryResolver,
  OnDestroy,
} from "@angular/core";
import { CustomPopoverComponent } from "./custom-popover.component";

@Directive({
  selector: "[appPopoverTooltip]",
  standalone: true,
})
export class PopoverTooltipDirective implements OnDestroy {
  @Input("appPopoverTooltip") tooltipContent: string = "";
  private popoverRef: ComponentRef<CustomPopoverComponent> | null = null;

  constructor(
    private el: ElementRef,
    private vcr: ViewContainerRef,
    private injector: Injector,
    private appRef: ApplicationRef,
    private cfr: ComponentFactoryResolver
  ) {}

  @HostListener("mouseenter") onMouseEnter() {
    this.showPopover();
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.hidePopover();
  }

  @HostListener("focus") onFocus() {
    this.showPopover();
  }

  @HostListener("blur") onBlur() {
    this.hidePopover();
  }

  private showPopover() {
    if (this.popoverRef) return;
    const factory = this.cfr.resolveComponentFactory(CustomPopoverComponent);
    this.popoverRef = this.vcr.createComponent(
      factory,
      undefined,
      this.injector
    );
    this.popoverRef.instance.anchor = this.el.nativeElement;
    this.popoverRef.instance.offsetY = 8;
    this.popoverRef.changeDetectorRef.detectChanges();
    // Insert content
    const content = document.createElement("div");
    content.textContent = this.tooltipContent;
    this.popoverRef.location.nativeElement
      .querySelector(".custom-popover")
      .appendChild(content);
    this.popoverRef.instance.show();
  }

  private hidePopover() {
    if (this.popoverRef) {
      this.popoverRef.instance.hide();
      setTimeout(() => {
        this.popoverRef?.destroy();
        this.popoverRef = null;
      }, 120); // match animation duration
    }
  }

  ngOnDestroy() {
    this.hidePopover();
  }
}
