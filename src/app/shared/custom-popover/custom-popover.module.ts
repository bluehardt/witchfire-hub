import { NgModule } from "@angular/core";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { CustomPopoverComponent } from "./custom-popover.component";
import { PopoverDirective } from "./popover.directive";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule, OverlayModule, PortalModule, PopoverDirective],
  declarations: [CustomPopoverComponent],
  exports: [CustomPopoverComponent, PopoverDirective],
})
export class CustomPopoverModule {}
