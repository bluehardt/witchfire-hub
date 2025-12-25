import { Component, OnInit, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router, UrlSegment } from "@angular/router";
import { MELEE_WEAPONS } from "../data/melee-weapons.data";
import { RANGED_WEAPONS } from "../data/ranged-weapons.data";
import { SPELLS } from "../data/spells.data";
import { MAGICAL_ITEMS } from "../data/magical-items.data";
import { INCENSES } from "../data/incenses.data";
import { ROSARY_BEADS } from "../data/rosary-beads.data";
import { PROPHECIES } from "../data/prophecies.data";
import { Build } from "../models/build.model";
import { NgForOf, NgIf, NgStyle } from "@angular/common";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FormsModule } from "@angular/forms";
import { ElementType } from "../enums/element-type.enum";
import { RosaryBeadRequirement } from "../models/rosary-bead.model";
import { RangedWeaponCategory } from "../enums/ranged-weapon-category.enum";
import { SpellType } from "../enums/spell-type.enum";
// Removed SlotPicker imports

@Component({
  selector: "app-build-display",
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgStyle,
    MatSidenavModule,
    FormsModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  templateUrl: "./build-display.component.html",
  styleUrl: "./build-display.component.scss",
})
export class BuildDisplayComponent implements OnInit {
  buildString: string | null = null;
  build: Build | null = null;
  // Enable tooltips only on laptop/desktop (>1024px)
  isDesktop: boolean = window.innerWidth > 1024;

  // Fixed slot counts for UI layout
  readonly beadSlots = 5;
  readonly prophecySlots = 7;

  public rangedWeapons = RANGED_WEAPONS;
  public meleeWeapons = MELEE_WEAPONS;
  public spells = SPELLS;
  public magicalItems = MAGICAL_ITEMS;
  public incenses = INCENSES;
  public rosaryBeads = ROSARY_BEADS;
  public prophecies = PROPHECIES;

  // Drawer state
  drawerOpen = false;
  drawerSlot: {
    type:
      | "firearm1"
      | "firearm2"
      | "demonic"
      | "melee"
      | "ls"
      | "hs"
      | "relic"
      | "fetish"
      | "ring"
      | "incense"
      | "bead"
      | "prophecy";
    index?: number;
  } | null = null;
  searchTerm = "";

  // Verbose title for the active drawer slot
  get drawerTitle(): string {
    if (!this.drawerSlot) return "";
    const idx = (this.drawerSlot.index ?? 0) + 1;
    switch (this.drawerSlot.type) {
      case "firearm1":
        return "Firearm 1";
      case "firearm2":
        return "Firearm 2";
      case "demonic":
        return "Demonic Weapon";
      case "melee":
        return "Melee";
      case "ls":
        return "Light Spell";
      case "hs":
        return "Heavy Spell";
      case "relic":
        return "Relic";
      case "fetish":
        return "Fetish";
      case "ring":
        return "Ring";
      case "incense":
        return "Incense";
      case "bead":
        return `Rosary Bead ${idx}`;
      case "prophecy":
        return `Prophecy ${idx}`;
      default:
        return "Select";
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // Palette and labels used in gradients and element dots
  private readonly elementColorsMap: Record<ElementType, string> = {
    [ElementType.Fire]: "#a64b2a",
    [ElementType.Earth]: "#3f4e33",
    [ElementType.Water]: "#6ea5c9",
    [ElementType.Air]: "#1f4fa8",
  };
  private readonly elementLabelsMap: Record<ElementType, string> = {
    [ElementType.Fire]: "Fire",
    [ElementType.Earth]: "Earth",
    [ElementType.Water]: "Water",
    [ElementType.Air]: "Air",
  };

  getElementColor(el: ElementType): string {
    return this.elementColorsMap[el];
  }

  getElementLabel(el: ElementType): string {
    return this.elementLabelsMap[el];
  }

  // Clear a specific top-level slot directly from a tile
  clearSlot(
    slot:
      | "firearm1"
      | "firearm2"
      | "demonic"
      | "melee"
      | "ls"
      | "hs"
      | "relic"
      | "fetish"
      | "ring"
      | "incense"
  ): void {
    if (!this.build) return;
    const b = { ...this.build } as Build;
    switch (slot) {
      case "firearm1":
        b.firstRangedWeapon = null;
        break;
      case "firearm2":
        b.secondRangedWeapon = null;
        break;
      case "demonic":
        b.demonicWeapon = null;
        break;
      case "melee":
        b.meleeWeapon = null;
        break;
      case "ls":
        b.lightSpell = null;
        break;
      case "hs":
        b.heavySpell = null;
        break;
      case "relic":
        b.relic = null;
        break;
      case "fetish":
        b.fetish = null;
        break;
      case "ring":
        b.ring = null;
        break;
      case "incense":
        b.incense = null;
        break;
    }
    this.updateQueryParams(b);
    this.build = b;
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      // Read all build slots from query params, omitting missing ones
      const build = this.parseBuildFromParams(params);
      this.build = build;
      console.log("Parsed build from query params:", this.build);
    });
  }

  // Removed temporary overlay picker helpers
  /**
   * Decodes a build from query parameters (preferred for readability).
   * Example: /build?firearm1=due&firearm2=fat&demonic=vul&melee=mos&ls=bc&hs=bs&relic=bob&fetish=bal&ring=met&beads=aab,adb,aib&prophecies=ded,des
   * Omits empty/null slots.
   */
  parseBuildFromParams(params: any): Build {
    const beadIds = (params.get("beads") || "").split(",");
    const prophecyIds = (params.get("prophecies") || "").split(",");
    const beads: ((typeof this.rosaryBeads)[number] | null)[] = Array.from(
      { length: this.beadSlots },
      (_, i) => {
        const id = beadIds[i] || "";
        return id ? this.rosaryBeads.find((b) => b.id === id) || null : null;
      }
    );
    const props: ((typeof this.prophecies)[number] | null)[] = Array.from(
      { length: this.prophecySlots },
      (_, i) => {
        const id = prophecyIds[i] || "";
        return id ? this.prophecies.find((p) => p.id === id) || null : null;
      }
    );

    // Read new keys only
    const firearm1Id = params.get("firearm1");
    const firearm2Id = params.get("firearm2");
    const demonicId = params.get("demonic");
    const incenseId = params.get("incense");

    return {
      firstRangedWeapon:
        this.rangedWeapons.find((w) => w.id === firearm1Id) || null,
      secondRangedWeapon:
        this.rangedWeapons.find((w) => w.id === firearm2Id) || null,
      demonicWeapon: this.rangedWeapons.find((w) => w.id === demonicId) || null,
      meleeWeapon:
        this.meleeWeapons.find((w) => w.id === params.get("melee")) || null,
      lightSpell: this.spells.find((s) => s.id === params.get("ls")) || null,
      heavySpell: this.spells.find((s) => s.id === params.get("hs")) || null,
      relic:
        this.magicalItems.find((m) => m.id === params.get("relic")) || null,
      fetish:
        this.magicalItems.find((m) => m.id === params.get("fetish")) || null,
      ring: this.magicalItems.find((m) => m.id === params.get("ring")) || null,
      incense: this.incenses.find((i) => i.id === incenseId) || null,
      rosaryBeads: beads,
      prophecies: props,
    };
  }

  /**
   * Encodes a Build object into a query param string for sharing.
   * Omits empty/null slots for brevity.
   * Example output: firearm1=due&firearm2=fat&melee=mos&beads=aab,adb&prophecies=ded,des
   */
  encodeBuildToQueryParams(build: Build): string {
    const params: string[] = [];
    if (build.firstRangedWeapon)
      params.push(`firearm1=${build.firstRangedWeapon.id}`);
    if (build.secondRangedWeapon)
      params.push(`firearm2=${build.secondRangedWeapon.id}`);
    if (build.demonicWeapon) params.push(`demonic=${build.demonicWeapon.id}`);
    if (build.meleeWeapon) params.push(`melee=${build.meleeWeapon.id}`);
    if (build.lightSpell) params.push(`ls=${build.lightSpell.id}`);
    if (build.heavySpell) params.push(`hs=${build.heavySpell.id}`);
    if (build.relic) params.push(`relic=${build.relic.id}`);
    if (build.fetish) params.push(`fetish=${build.fetish.id}`);
    if (build.ring) params.push(`ring=${build.ring.id}`);
    if (build.incense) params.push(`incense=${build.incense.id}`);
    // Preserve slot positions for beads/prophecies using empty segments for nulls
    const beads = Array.from(
      { length: this.beadSlots },
      (_, i) => build.rosaryBeads?.[i]?.id || ""
    ).join(",");
    const props = Array.from(
      { length: this.prophecySlots },
      (_, i) => build.prophecies?.[i]?.id || ""
    ).join(",");
    params.push(`beads=${beads}`);
    params.push(`prophecies=${props}`);
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
      incense: null,
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
    // Palette used for gradients
    const elementColors = this.elementColorsMap;
    const valid = elements.filter((e) => !!elementColors[e]);
    console.log("[getElementBackground] valid:", valid);
    if (valid.length === 0) {
      console.log("[getElementBackground] No valid elements, returning #222");
      return "#222";
    }
    const neutral = "#222"; // subtle base before element mark
    if (valid.length === 1) {
      const color = elementColors[valid[0]];
      console.log(
        "[getElementBackground] Single element:",
        valid[0],
        "color:",
        color
      );
      const base = 80; // neutral covers ~4/5
      const usable = 20; // color occupies ~1/5
      const blendStart = base + Math.min(8, usable * 0.35); // small blend into color region
      const gradient = `linear-gradient(150deg, ${neutral} 0%, ${neutral} ${base}%, ${color} ${blendStart}%, ${color} 100%)`;
      return `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), ${gradient}`;
    }
    // Multi-element: neutral first ~3/4; first transition (neutral -> first color) smooth,
    // subsequent color-to-color boundaries have a small, equal blur for clarity
    const n = valid.length;
    const usable = 20; // percent span for element colors (from base to 100%)
    const base = 80; // start of color region (neutral before this)
    const segment = usable / n;
    const blendIn = Math.min(8, usable * 0.35, segment * 0.8); // smooth blend from neutral to first color
    const blur = Math.max(1.5, Math.min(3, segment * 0.25)); // small equal blur for later boundaries
    const stopsArr: string[] = [`${neutral} 0%`, `${neutral} ${base}%`];
    for (let i = 0; i < n; i++) {
      const color = elementColors[valid[i]];
      const start = base + i * segment;
      const end = base + (i + 1) * segment;
      // Start of current color: smooth in only for the first color
      if (i === 0) {
        const startIn = Math.min(100, start + blendIn);
        stopsArr.push(`${color} ${startIn}%`);
      } else {
        stopsArr.push(`${color} ${start}%`);
      }
      // Boundary handling:
      // - For later boundaries, create a small blur spanning [end - blur, end]
      // - For the last color, extend to 100%
      if (i < n - 1) {
        const cutoff = Math.max(start, end - blur);
        stopsArr.push(`${color} ${cutoff}%`);
        const nextColor = elementColors[valid[i + 1]];
        stopsArr.push(`${nextColor} ${end}%`);
      } else {
        stopsArr.push(`${color} 100%`);
      }
    }
    const gradient = `linear-gradient(150deg, ${stopsArr.join(", ")})`;
    console.log("[getElementBackground] Multi-element gradient:", gradient);
    return `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), ${gradient}`;
  }

  // Utility: create an array of a given length for skeleton ngFor
  skeletonArray(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }

  // Utility: format Rosary Bead requirements like "Blood (20) · Faith (30)"
  formatBeadRequirements(
    req: RosaryBeadRequirement | undefined | null
  ): string[] {
    if (!req) return [];
    const labels: Record<keyof RosaryBeadRequirement, string> = {
      flesh: "Flesh",
      blood: "Blood",
      mind: "Mind",
      witchery: "Witchery",
      arsenal: "Arsenal",
      faith: "Faith",
    };
    const keys = Object.keys(labels) as (keyof RosaryBeadRequirement)[];
    return keys
      .filter((k) => req[k] !== null && req[k] !== undefined)
      .map((k) => `${labels[k]} (${req[k]})`);
  }

  // Tooltip text for bead tiles: one requirement per line
  getBeadTooltip(idx: number): string | null {
    const req = this.build?.rosaryBeads?.[idx]?.requirement;
    if (!req) return null;
    const lines = this.formatBeadRequirements(req);
    return lines.length ? lines.join("\n") : null;
  }

  // Open/close drawer helpers
  openDrawer(
    type:
      | "firearm1"
      | "firearm2"
      | "demonic"
      | "melee"
      | "ls"
      | "hs"
      | "relic"
      | "fetish"
      | "ring"
      | "incense"
      | "bead"
      | "prophecy",
    index?: number
  ) {
    this.drawerSlot = { type, index };
    this.searchTerm = "";
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
  }

  @HostListener("window:resize")
  onResize() {
    this.isDesktop = window.innerWidth > 1024;
  }

  // Copy current build URL to clipboard
  async copyShareUrl(ev?: Event) {
    if (ev) ev.preventDefault();
    try {
      const base = `${location.origin}${location.pathname}#/build`;
      const params = this.build
        ? this.encodeBuildToQueryParams(this.build)
        : "";
      const url = params ? `${base}?${params}` : base;
      await navigator.clipboard.writeText(url);
      console.log("Copied URL:", url);
      this.snackBar.open("URL copied to clipboard", undefined, {
        duration: 2000,
        verticalPosition: "bottom",
        horizontalPosition: "center",
        panelClass: ["snackbar-dark"],
      });
    } catch (e) {
      // Fallback for environments without clipboard API
      const base = `${location.origin}${location.pathname}#/build`;
      const params = this.build
        ? this.encodeBuildToQueryParams(this.build)
        : "";
      const url = params ? `${base}?${params}` : base;
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      console.log("Copied URL (fallback):", url);
      this.snackBar.open("URL copied to clipboard", undefined, {
        duration: 2000,
        verticalPosition: "bottom",
        horizontalPosition: "center",
        panelClass: ["snackbar-dark"],
      });
    }
  }

  // Clear specific bead slot from tile button
  clearBead(index: number): void {
    if (!this.build) return;
    const b = { ...this.build } as Build;
    const arr = Array.from(
      { length: this.beadSlots },
      (_, i) => (b.rosaryBeads?.[i] ?? null) as any
    );
    arr[index] = null as any;
    b.rosaryBeads = arr as any;
    this.updateQueryParams(b);
    this.build = b;
  }

  // Clear specific prophecy slot from tile button
  clearProphecy(index: number): void {
    if (!this.build) return;
    const b = { ...this.build } as Build;
    const arr = Array.from(
      { length: this.prophecySlots },
      (_, i) => (b.prophecies?.[i] ?? null) as any
    );
    arr[index] = null as any;
    b.prophecies = arr as any;
    this.updateQueryParams(b);
    this.build = b;
  }

  // Items for current slot with basic filtering + search
  get currentItems(): any[] {
    if (!this.drawerSlot) return [];
    const term = this.searchTerm.trim().toLowerCase();
    let items: any[] = [];
    switch (this.drawerSlot.type) {
      case "firearm1":
      case "firearm2":
        items = this.rangedWeapons.filter(
          (w) => w.category !== RangedWeaponCategory.Demonic
        );
        break;
      case "demonic":
        items = this.rangedWeapons.filter(
          (w) => w.category === RangedWeaponCategory.Demonic
        );
        break;
      case "melee":
        items = this.meleeWeapons;
        break;
      case "ls":
        items = this.spells.filter((s) => s.type === SpellType.Light);
        break;
      case "hs":
        items = this.spells.filter((s) => s.type === SpellType.Heavy);
        break;
      case "relic":
        items = this.magicalItems.filter((m) => m.type === "relic");
        break;
      case "fetish":
        items = this.magicalItems.filter((m) => m.type === "fetish");
        break;
      case "ring":
        items = this.magicalItems.filter((m) => m.type === "ring");
        break;
      case "incense":
        items = this.incenses;
        break;
      case "bead":
        items = this.rosaryBeads;
        break;
      case "prophecy":
        items = this.prophecies;
        break;
    }
    if (!term) return items;
    return items.filter((i) => i.name.toLowerCase().includes(term));
  }

  // Current selection name for the active drawer slot (for clear button label)
  get currentSelectionName(): string | null {
    if (!this.build || !this.drawerSlot) return null;
    switch (this.drawerSlot.type) {
      case "firearm1":
        return this.build.firstRangedWeapon?.name ?? null;
      case "firearm2":
        return this.build.secondRangedWeapon?.name ?? null;
      case "demonic":
        return this.build.demonicWeapon?.name ?? null;
      case "melee":
        return this.build.meleeWeapon?.name ?? null;
      case "ls":
        return this.build.lightSpell?.name ?? null;
      case "hs":
        return this.build.heavySpell?.name ?? null;
      case "relic":
        return this.build.relic?.name ?? null;
      case "fetish":
        return this.build.fetish?.name ?? null;
      case "ring":
        return this.build.ring?.name ?? null;
      case "incense":
        return this.build.incense?.name ?? null;
      case "bead":
        if (this.drawerSlot.index !== undefined) {
          return this.build.rosaryBeads?.[this.drawerSlot.index]?.name ?? null;
        }
        return null;
      case "prophecy":
        if (this.drawerSlot.index !== undefined) {
          return this.build.prophecies?.[this.drawerSlot.index]?.name ?? null;
        }
        return null;
      default:
        return null;
    }
  }

  clearSelection() {
    if (!this.build || !this.drawerSlot) return;
    const b = { ...this.build } as Build;
    switch (this.drawerSlot.type) {
      case "firearm1":
        b.firstRangedWeapon = null;
        break;
      case "firearm2":
        b.secondRangedWeapon = null;
        break;
      case "demonic":
        b.demonicWeapon = null;
        break;
      case "melee":
        b.meleeWeapon = null;
        break;
      case "ls":
        b.lightSpell = null;
        break;
      case "hs":
        b.heavySpell = null;
        break;
      case "relic":
        b.relic = null;
        break;
      case "fetish":
        b.fetish = null;
        break;
      case "ring":
        b.ring = null;
        break;
      case "incense":
        b.incense = null;
        break;
      case "bead":
        if (this.drawerSlot.index !== undefined) {
          const arr = Array.from(
            { length: this.beadSlots },
            (_, i) => (b.rosaryBeads?.[i] ?? null) as any
          );
          arr[this.drawerSlot.index] = null as any;
          b.rosaryBeads = arr as any;
        }
        break;
      case "prophecy":
        if (this.drawerSlot.index !== undefined) {
          const arr = Array.from(
            { length: this.prophecySlots },
            (_, i) => (b.prophecies?.[i] ?? null) as any
          );
          arr[this.drawerSlot.index] = null as any;
          b.prophecies = arr as any;
        }
        break;
    }
    this.updateQueryParams(b);
    this.build = b;
    this.closeDrawer();
  }

  selectItem(item: any) {
    if (!this.build || !this.drawerSlot) return;
    const b = { ...this.build } as Build;
    switch (this.drawerSlot.type) {
      case "firearm1":
        b.firstRangedWeapon = item;
        break;
      case "firearm2":
        b.secondRangedWeapon = item;
        break;
      case "demonic":
        b.demonicWeapon = item;
        break;
      case "melee":
        b.meleeWeapon = item;
        break;
      case "ls":
        b.lightSpell = item;
        break;
      case "hs":
        b.heavySpell = item;
        break;
      case "relic":
        b.relic = item;
        break;
      case "fetish":
        b.fetish = item;
        break;
      case "ring":
        b.ring = item;
        break;
      case "incense":
        b.incense = item;
        break;
      case "bead":
        if (this.drawerSlot.index !== undefined) {
          const arr = Array.from(
            { length: this.beadSlots },
            (_, i) => (b.rosaryBeads?.[i] ?? null) as any
          );
          arr[this.drawerSlot.index] = item;
          b.rosaryBeads = arr as any;
        }
        break;
      case "prophecy":
        if (this.drawerSlot.index !== undefined) {
          const arr = Array.from(
            { length: this.prophecySlots },
            (_, i) => (b.prophecies?.[i] ?? null) as any
          );
          arr[this.drawerSlot.index] = item;
          b.prophecies = arr as any;
        }
        break;
    }
    this.updateQueryParams(b);
    this.build = b;
    this.closeDrawer();
  }

  private updateQueryParams(build: Build) {
    const qp: any = {};
    if (build.firstRangedWeapon) qp["firearm1"] = build.firstRangedWeapon.id;
    if (build.secondRangedWeapon) qp["firearm2"] = build.secondRangedWeapon.id;
    if (build.demonicWeapon) qp["demonic"] = build.demonicWeapon.id;
    if (build.meleeWeapon) qp["melee"] = build.meleeWeapon.id;
    if (build.lightSpell) qp["ls"] = build.lightSpell.id;
    if (build.heavySpell) qp["hs"] = build.heavySpell.id;
    if (build.relic) qp["relic"] = build.relic.id;
    if (build.fetish) qp["fetish"] = build.fetish.id;
    if (build.ring) qp["ring"] = build.ring.id;
    if (build.incense) qp["incense"] = build.incense.id;

    // Always encode beads/prophecies with fixed positions using empty segments for nulls
    qp["beads"] = Array.from(
      { length: this.beadSlots },
      (_, i) => build.rosaryBeads?.[i]?.id || ""
    ).join(",");
    qp["prophecies"] = Array.from(
      { length: this.prophecySlots },
      (_, i) => build.prophecies?.[i]?.id || ""
    ).join(",");
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: qp,
      replaceUrl: true,
    });
  }
}
