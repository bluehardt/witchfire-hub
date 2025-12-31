import { FormsModule } from "@angular/forms";
import { ArcanaFilterPipe } from "./arcana-filter.pipe";
import { NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";
import { ARCANA } from "../data/arcana.data";
import { ELEMENT_COLORS_MAP } from "../shared/element-colors.map";
import { ProphecyEnum } from "../enums/prophecy.enum";
import { Component, Inject } from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Build } from "../models/build.model";
import { CustomPopoverModule } from "../shared/custom-popover/custom-popover.module";
import { DialogModule } from "@angular/cdk/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { PROPHECIES } from "../data/prophecies.data";

@Component({
  selector: "app-arcana-modal",
  styleUrls: ["./arcana-modal.component.scss"],
  templateUrl: "./arcana-modal.component.html",
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgStyle,
    NgClass,
    CustomPopoverModule,
    DialogModule,
    MatDividerModule,
    FormsModule,
    ArcanaFilterPipe,
  ],
  animations: [
    trigger("itemGrowFade", [
      transition(":enter", [
        style({
          opacity: 0,
          transform: "translateX(-40px) scaleX(0)",
          width: "0",
          overflow: "hidden",
          display: "inline-block",
        }),
        animate(
          "100ms cubic-bezier(0.50, 0.00, 0.50, 1.00)",
          style({
            opacity: 1,
            transform: "translateX(0) scaleX(1)",
            width: "*",
            overflow: "hidden",
            display: "inline-block",
          })
        ),
      ]),
      transition(":leave", [
        animate(
          "100ms cubic-bezier(0.50, 0.00, 0.50, 1.00)",
          style({
            opacity: 0,
            transform: "translateX(-40px) scaleX(0)",
            width: "0",
            overflow: "hidden",
            display: "inline-block",
          })
        ),
      ]),
    ]),
    trigger("placeholderFade", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("150ms ease", style({ opacity: 1 })),
      ]),
      transition(":leave", [animate("200ms ease", style({ opacity: 0 }))]),
    ]),
  ],
})
export class ArcanaModalComponent {
  arcana = ARCANA;

  showAllArcana = false;

  get popoverTrigger(): "hover" | "click" {
    // Use a media query to detect touch devices (mobile/tablet)
    return window.matchMedia("(hover: none) and (pointer: coarse)").matches
      ? "click"
      : "hover";
  }

  get activeProphecies() {
    // Only show prophecies that are actually set in the build data
    return (this.data?.prophecies || []).filter((p) => !!p);
  }

  /**
   * Returns a Map of arcana id to availability (true = available)
   */
  get arcanaAvailability(): Map<string, boolean> {
    const map = new Map<string, boolean>();
    for (const arcana of this.arcana) {
      map.set(arcana.id, !this.isArcanaUnavailable(arcana));
    }
    return map;
  }

  constructor(
    public dialogRef: MatDialogRef<ArcanaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Build
  ) {}

  getArcanaForProphecy(prophecyId: string) {
    // ProphecyEnum values are used in Arcana.prophecy array
    return this.arcana.filter((a) =>
      a.prophecy.includes(prophecyId as ProphecyEnum)
    );
  }

  /**
   * Returns a CSS color string for background or an RGB string for overlay use.
   * If rgbOnly is true, returns e.g. '191,170,255' for use in rgba().
   */
  getElementColor(arcana: any, rgbOnly = false): string | null {
    if (!arcana.element) return null;
    const hex = ELEMENT_COLORS_MAP[arcana.element];
    if (!rgbOnly) return hex;
    // Convert hex to rgb string
    const hexVal = hex.replace("#", "");
    const bigint = parseInt(hexVal, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
  }

  close(): void {
    this.dialogRef.close();
  }

  getOtherProphecyNames(
    prophecyIds: string[],
    currentProphecyId: string
  ): string[] {
    return PROPHECIES.filter(
      (p) => prophecyIds.includes(p.id) && p.id !== currentProphecyId
    ).map((p) => p.name || p.id);
  }

  /**
   * Returns a Set of all elements present in the selected equipment (firearms, melee, spells, magical items).
   */
  getEquippedElements(): Set<string> {
    const build = this.data;
    const elements: (string | null | undefined)[] = [];
    // Firearms
    [build.firearm1, build.firearm2, build.demonicWeapon].forEach((w) => {
      if (w && Array.isArray(w.element)) elements.push(...w.element);
    });
    // Melee
    if (build.meleeWeapon && Array.isArray(build.meleeWeapon.element))
      elements.push(...build.meleeWeapon.element);
    // Spells
    if (build.lightSpell && Array.isArray(build.lightSpell.element))
      elements.push(...build.lightSpell.element);
    if (build.heavySpell && Array.isArray(build.heavySpell.element))
      elements.push(...build.heavySpell.element);
    // Magical items
    [build.relic, build.fetish, build.ring].forEach((item) => {
      if (item && Array.isArray(item.element)) elements.push(...item.element);
    });
    return new Set(elements.filter((e) => !!e));
  }

  /**
   * Returns true if the arcana is unavailable (has an element not present in equipped elements)
   */
  isArcanaUnavailable(arcana: any): boolean {
    if (!arcana.element) return false;
    const equipped = this.getEquippedElements();
    return !equipped.has(arcana.element);
  }

  getArcanaChance(prophecyId: string): number {
    // Only count available arcana
    const arcanaList = this.getArcanaForProphecy(prophecyId).filter((a) =>
      this.arcanaAvailability.get(a.id)
    );
    const arcanaCount = arcanaList.length;
    if (arcanaCount === 0) return 0;
    const slots = 3;
    if (arcanaCount <= slots) return 100;
    return Math.round((slots / arcanaCount) * 100);
  }

  /**
   * Returns the filtered arcana for a prophecy, based on availability and showAllArcana.
   */
  getFilteredArcanaForProphecy(prophecyId: string): any[] {
    const arcanaList = this.getArcanaForProphecy(prophecyId);
    if (this.showAllArcana) return arcanaList;
    return arcanaList.filter((a) => this.arcanaAvailability.get(a.id));
  }
}
