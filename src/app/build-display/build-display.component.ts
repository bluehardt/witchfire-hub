import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router, UrlSegment } from "@angular/router";
import { MELEE_WEAPONS } from "../data/melee-weapons.data";
import { RANGED_WEAPONS } from "../data/ranged-weapons.data";
import { SPELLS } from "../data/spells.data";
import { MAGICAL_ITEMS } from "../data/magical-items.data";
import { ROSARY_BEADS } from "../data/rosary-beads.data";
import { PROPHECIES } from "../data/prophecies.data";
import { Build } from "../models/build.model";
import { JsonPipe, NgForOf, NgIf, NgStyle } from "@angular/common";
import { ElementType } from "../enums/element-type.enum";

@Component({
  selector: "app-build-display",
  standalone: true,
  imports: [JsonPipe, NgForOf, NgIf, NgStyle],
  templateUrl: "./build-display.component.html",
  styleUrl: "./build-display.component.scss",
})
export class BuildDisplayComponent implements OnInit {
  buildString: string | null = null;
  build: Build | null = null;

  public rangedWeapons = RANGED_WEAPONS;
  public meleeWeapons = MELEE_WEAPONS;
  public spells = SPELLS;
  public magicalItems = MAGICAL_ITEMS;
  public rosaryBeads = ROSARY_BEADS;
  public prophecies = PROPHECIES;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      // Read all build slots from query params, omitting missing ones
      const build = this.parseBuildFromParams(params);
      this.build = build;
      console.log("Parsed build from query params:", this.build);
    });
  }

  /**
   * Decodes a build from query parameters (preferred for readability).
   * Example: /build?r1=due&r2=fat&rd=vul&melee=mos&ls=bc&hs=bs&relic=bob&fetish=bal&ring=met&beads=aab,adb,aib&prophecies=ded,des
   * Omits empty/null slots.
   */
  parseBuildFromParams(params: any): Build {
    return {
      firstRangedWeapon:
        this.rangedWeapons.find((w) => w.id === params.get("r1")) || null,
      secondRangedWeapon:
        this.rangedWeapons.find((w) => w.id === params.get("r2")) || null,
      demonicWeapon:
        this.rangedWeapons.find((w) => w.id === params.get("rd")) || null,
      meleeWeapon:
        this.meleeWeapons.find((w) => w.id === params.get("melee")) || null,
      lightSpell: this.spells.find((s) => s.id === params.get("ls")) || null,
      heavySpell: this.spells.find((s) => s.id === params.get("hs")) || null,
      relic:
        this.magicalItems.find((m) => m.id === params.get("relic")) || null,
      fetish:
        this.magicalItems.find((m) => m.id === params.get("fetish")) || null,
      ring: this.magicalItems.find((m) => m.id === params.get("ring")) || null,
      rosaryBeads: (params.get("beads") || "")
        .split(",")
        .filter((id) => !!id)
        .map((id) => this.rosaryBeads.find((b) => b.id === id))
        .filter(Boolean) as any,
      prophecies: (params.get("prophecies") || "")
        .split(",")
        .filter((id) => !!id)
        .map((id) => this.prophecies.find((p) => p.id === id))
        .filter(Boolean) as any,
    };
  }

  /**
   * Encodes a Build object into a query param string for sharing.
   * Omits empty/null slots for brevity.
   * Example output: r1=due&r2=fat&melee=mos&beads=aab,adb&prophecies=ded,des
   */
  encodeBuildToQueryParams(build: Build): string {
    const params: string[] = [];
    if (build.firstRangedWeapon)
      params.push(`r1=${build.firstRangedWeapon.id}`);
    if (build.secondRangedWeapon)
      params.push(`r2=${build.secondRangedWeapon.id}`);
    if (build.demonicWeapon) params.push(`rd=${build.demonicWeapon.id}`);
    if (build.meleeWeapon) params.push(`melee=${build.meleeWeapon.id}`);
    if (build.lightSpell) params.push(`ls=${build.lightSpell.id}`);
    if (build.heavySpell) params.push(`hs=${build.heavySpell.id}`);
    if (build.relic) params.push(`relic=${build.relic.id}`);
    if (build.fetish) params.push(`fetish=${build.fetish.id}`);
    if (build.ring) params.push(`ring=${build.ring.id}`);
    if (build.rosaryBeads && build.rosaryBeads.length)
      params.push(`beads=${build.rosaryBeads.map((b) => b.id).join(",")}`);
    if (build.prophecies && build.prophecies.length)
      params.push(`prophecies=${build.prophecies.map((p) => p.id).join(",")}`);
    return params.join("&");
  }

  /**
   * Decodes a build string from the new routing structure using tildes for sections and dots for items:
   * /build/ase.fat.vul.mos.bc.bs.bob.bal.met~aab.adb.aib.ap1.apb.air~ded.des.ear.fir.far.gun
   * [firstRanged].[secondRanged].[demonic].[melee].[lightSpell].[heavySpell].[relic].[fetish].[ring]~[rosaryBead1].[rosaryBead2]...~[prophecy1].[prophecy2]...
   * Use '0' for null/empty slots.
   */
  parseBuildString(str: string): Build {
    // Split into main, beads, prophecies using '~'
    const [main, beads, prophecies] = str.split("~");
    const [
      firstRangedId,
      secondRangedId,
      demonicId,
      meleeId,
      lightSpellId,
      heavySpellId,
      relicId,
      fetishId,
      ringId,
    ] = main.split(".");
    const rosaryBeadIds = beads
      ? beads.split(".").filter((id) => id !== "0")
      : [];
    const prophecyIds = prophecies
      ? prophecies.split(".").filter((id) => id !== "0")
      : [];

    const build: Build = {
      meleeWeapon: MELEE_WEAPONS.find((w) => w.id === meleeId) || null,
      firstRangedWeapon:
        RANGED_WEAPONS.find((w) => w.id === firstRangedId) || null,
      secondRangedWeapon:
        RANGED_WEAPONS.find((w) => w.id === secondRangedId) || null,
      demonicWeapon: RANGED_WEAPONS.find((w) => w.id === demonicId) || null,
      lightSpell: SPELLS.find((s) => s.id === lightSpellId) || null,
      heavySpell: SPELLS.find((s) => s.id === heavySpellId) || null,
      relic: MAGICAL_ITEMS.find((m) => m.id === relicId) || null,
      fetish: MAGICAL_ITEMS.find((m) => m.id === fetishId) || null,
      ring: MAGICAL_ITEMS.find((m) => m.id === ringId) || null,
      rosaryBeads: rosaryBeadIds
        .map((id) => ROSARY_BEADS.find((b) => b.id === id))
        .filter(Boolean) as any,
      prophecies: prophecyIds
        .map((id) => PROPHECIES.find((p) => p.id === id))
        .filter(Boolean) as any,
    };
    return build;
  }

  // Utility: get background for element(s)
  getElementBackground(elements: ElementType[] | undefined | null): string {
    console.log("[getElementBackground] input:", elements);
    if (!elements || elements.length === 0) {
      console.log("[getElementBackground] No elements, returning #222");
      return "#222";
    }
    const elementColors: Record<ElementType, string> = {
      [ElementType.Fire]: "#ff9800",
      [ElementType.Earth]: "rgb(96 180 1)",
      [ElementType.Water]: "#4fc3f7",
      [ElementType.Air]: "#ffe082",
    };
    const valid = elements.filter((e) => !!elementColors[e]);
    console.log("[getElementBackground] valid:", valid);
    if (valid.length === 0) {
      console.log("[getElementBackground] No valid elements, returning #222");
      return "#222";
    }
    if (valid.length === 1) {
      console.log(
        "[getElementBackground] Single element:",
        valid[0],
        "color:",
        elementColors[valid[0]]
      );
      return elementColors[valid[0]];
    }
    // Multi-element: gradient
    const gradient = `linear-gradient(-45deg, ${valid
      .map(
        (e, i) =>
          `${elementColors[e]} ${(i * 100) / valid.length}% ${
            ((i + 1) * 100) / valid.length
          }%`
      )
      .join(", ")})`;
    console.log("[getElementBackground] Multi-element gradient:", gradient);
    return gradient;
  }
}
