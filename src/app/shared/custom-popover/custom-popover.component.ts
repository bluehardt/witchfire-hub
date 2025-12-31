import {
  Component,
  Input,
  TemplateRef,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";

@Component({
  selector: "app-custom-popover",
  templateUrl: "./custom-popover.component.html",
  styleUrls: ["./custom-popover.component.scss"],
})
export class CustomPopoverComponent implements AfterViewInit, OnDestroy {
  @Input() contentTpl: TemplateRef<any> | null = null;
  @Input() contentText: string | null = null;
  @Input() contentContext: any = {};

  private visibleTimeout: any;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    // Animate in
    this.visibleTimeout = setTimeout(() => {
      const pop = this.el.nativeElement.querySelector(".custom-popover");
      if (pop) pop.classList.add("popover-visible");
    }, 10);
  }

  ngOnDestroy() {
    // Animate out (optional, for future if needed)
    if (this.visibleTimeout) clearTimeout(this.visibleTimeout);
  }
}
