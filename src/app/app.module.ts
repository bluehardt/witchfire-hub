import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BuildDisplayComponent } from "./build-display/build-display.component";
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
} from "@angular/material/tooltip";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { CustomPopoverModule } from "./shared/custom-popover/custom-popover.module";

const tooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 200,
  hideDelay: 0,
  touchendHideDelay: 0,
  touchGestures: "off",
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BuildDisplayComponent,
    OverlayModule,
    PortalModule,
    CustomPopoverModule,
  ],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: tooltipDefaults },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
