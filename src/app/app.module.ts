import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BuildDisplayComponent } from "./build-display/build-display.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BuildDisplayComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
