import { MeleeWeapon } from "../models/melee-weapon.model";

export const MELEE_WEAPONS: MeleeWeapon[] = [
  {
    id: "buckler",
    name: "Buckler",
    description: "Basic Attack: Hold Melee to block all frontal damage.",
    specialAttack:
      "Block just before impact to Parry and fire a retaliation projectile.",
    element: [],
    image: "https://witchfire.wiki.gg/images/Buckler.png",
  },
  {
    id: "fist",
    name: "Fist",
    description: "A brutal, close-quarters straight punch.",
    specialAttack: "Attack again mid-swing to chain into a rising uppercut.",
    element: [],
    image: "https://witchfire.wiki.gg/images/Fist.png",
  },
  {
    id: "katar",
    name: "Katar",
    description: "A precise, medium-range piercing strike.",
    specialAttack:
      "Attack while sliding to perform a long-range predatory leap.",
    element: [],
    image: "https://witchfire.wiki.gg/images/Katar.png",
  },
  {
    id: "morningstar",
    name: "Morning Star",
    description: "A wide swing that knocks enemies back.",
    specialAttack: "Crouch in mid-air to execute a ground slam shckwave.",
    element: [],
    image: "https://witchfire.wiki.gg/images/Morning_Star.png",
  },
];
