import { Component, ViewChild, ElementRef } from "@angular/core";
import { CustomPopoverComponent } from "./custom-popover.component";

@Component({
  selector: "app-custom-popover-demo",
  templateUrl: "./custom-popover-demo.component.html",
})
export class CustomPopoverDemoComponent {
  @ViewChild("popoverRef") popoverRef!: CustomPopoverComponent;
  @ViewChild("popoverBtn", { read: ElementRef }) popoverBtn!: ElementRef;

  @ViewChild("hoverPopoverRef") hoverPopoverRef!: CustomPopoverComponent;
  @ViewChild("hoverPopoverBtn", { read: ElementRef })
  hoverPopoverBtn!: ElementRef;

  showPopover() {
    if (this.popoverRef && this.popoverBtn) {
      this.popoverRef.anchor = this.popoverBtn.nativeElement;
      this.popoverRef.show();
    }
  }

  showHoverPopover() {
    if (this.hoverPopoverRef && this.hoverPopoverBtn) {
      this.hoverPopoverRef.anchor = this.hoverPopoverBtn.nativeElement;
      this.hoverPopoverRef.show();
    }
  }

  hideHoverPopover() {
    if (this.hoverPopoverRef) {
      this.hoverPopoverRef.hide();
    }
  }
}
