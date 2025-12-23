import { RangedWeapon } from "./ranged-weapon.model";
import { MeleeWeapon } from "./melee-weapon.model";
import { Spell } from "./spell.model";
import { MagicalItem } from "./magical-item.model";
import { RosaryBead } from "./rosary-bead.model";
import { Prophecy } from "./prophecy.model";

export interface Build {
  firstRangedWeapon: RangedWeapon | null;
  secondRangedWeapon: RangedWeapon | null;
  demonicWeapon: RangedWeapon | null;
  meleeWeapon: MeleeWeapon | null;
  lightSpell: Spell | null;
  heavySpell: Spell | null;
  relic: MagicalItem | null;
  fetish: MagicalItem | null;
  ring: MagicalItem | null;
  rosaryBeads: (RosaryBead | null)[];
  prophecies: (Prophecy | null)[];
}
