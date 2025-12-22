import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuildDisplayComponent } from "./build-display/build-display.component";

const routes: Routes = [
  { path: "build", component: BuildDisplayComponent },
  { path: "", redirectTo: "/build", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
