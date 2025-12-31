import {
  Directive,
  Input,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  Injector,
  OnDestroy,
  HostListener,
} from "@angular/core";
import {
  Overlay,
  OverlayRef,
  OverlayPositionBuilder,
  ConnectedPosition,
} from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { CustomPopoverComponent } from "./custom-popover.component";

@Directive({
  selector: "[appPopover]",
  standalone: true,
})
export class PopoverDirective implements OnDestroy {
  @Input("appPopover") popoverContent: string | TemplateRef<any> = "";
  @Input() popoverContext: any;
  @Input() popoverTrigger: "hover" | "click" = "hover";

  private overlayRef: OverlayRef | null = null;
  private isPopoverOpen = false;

  constructor(
    private el: ElementRef,
    private vcr: ViewContainerRef,
    private overlay: Overlay,
    private positionBuilder: OverlayPositionBuilder,
    private injector: Injector
  ) {}

  @HostListener("mouseenter") onMouseEnter() {
    if (this.popoverTrigger === "hover") this.openPopover();
  }
  @HostListener("mouseleave") onMouseLeave() {
    if (this.popoverTrigger === "hover") this.closePopover();
  }
  @HostListener("click") onClick() {
    if (this.popoverTrigger === "click") {
      this.isPopoverOpen ? this.closePopover() : this.openPopover();
    }
  }
  @HostListener("document:click", ["$event"]) onDocClick(event: MouseEvent) {
    if (
      this.popoverTrigger === "click" &&
      this.isPopoverOpen &&
      this.overlayRef &&
      !this.el.nativeElement.contains(event.target) &&
      !this.overlayRef.overlayElement.contains(event.target as Node)
    ) {
      this.closePopover();
    }
  }
  @HostListener("document:keydown.escape") onEscape() {
    if (this.isPopoverOpen) this.closePopover();
  }

  openPopover() {
    if (this.overlayRef) return;
    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.el.nativeElement)
      .withPositions([
        {
          originX: "center",
          originY: "bottom",
          overlayX: "center",
          overlayY: "top",
          offsetY: 8,
        },
        {
          originX: "center",
          originY: "top",
          overlayX: "center",
          overlayY: "bottom",
          offsetY: -8,
        },
      ]);
    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      panelClass: "custom-popover-panel",
      hasBackdrop: false,
    });
    // Animate overlay panel in
    setTimeout(() => {
      if (this.overlayRef && this.overlayRef.overlayElement) {
        this.overlayRef.overlayElement.classList.add("popover-visible");
      }
    }, 10);
    const portal = new ComponentPortal(
      CustomPopoverComponent,
      this.vcr,
      this.injector
    );
    const ref = this.overlayRef.attach(portal);
    if (this.popoverContent instanceof TemplateRef) {
      ref.instance.contentTpl = this.popoverContent;
      ref.instance.contentContext = this.popoverContext || {};
      ref.instance.contentText = null;
    } else {
      ref.instance.contentTpl = null;
      ref.instance.contentContext = {};
      ref.instance.contentText =
        this.popoverContent != null ? String(this.popoverContent) : null;
    }
    this.isPopoverOpen = true;
  }

  closePopover() {
    if (this.overlayRef) {
      // Animate out
      const el = this.overlayRef.overlayElement;
      if (el) {
        el.classList.remove("popover-visible");
      }
      setTimeout(() => {
        if (this.overlayRef) {
          this.overlayRef.detach();
          this.overlayRef.dispose();
          this.overlayRef = null;
          this.isPopoverOpen = false;
        }
      }, 120); // match transition duration
    }
  }

  ngOnDestroy() {
    this.closePopover();
  }
}
