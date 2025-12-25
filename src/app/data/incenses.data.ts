import { Incense } from "../models/incense.model";

function incenseImage(name: string) {
  return `https://witchfire.wiki.gg/images/${name.replace(/ /g, "_")}.png`;
}

export const INCENSES: Incense[] = [
  {
    id: "bloodthirstincense",
    name: "Bloodthirst Incense",
    description:
      "Headshots may restore health. Weapons with smaller magazines have higher healing chances.",
    image: incenseImage("Bloodthirst Incense"),
  },
  {
    id: "bulwarkincense",
    name: "Bulwark Incense",
    description: "Shields have a 30% chance to withstand hits.",
    image: incenseImage("Bulwark Incense"),
  },
  {
    id: "conjurerincense",
    name: "Conjurer Incense",
    description: "Spellcasting restores minor health.",
    image: incenseImage("Conjurer Incense"),
  },
  {
    id: "patienceincense",
    name: "Patience Incense",
    description: "Elixirs heal slower but restore more health.",
    image: incenseImage("Patience Incense"),
  },
  {
    id: "potencyincense",
    name: "Potency Incense",
    description: "Healing effects restore an additional 5 HP.",
    image: incenseImage("Potency Incense"),
  },
  {
    id: "resilienceincense",
    name: "Resilience Incense",
    description: "Elixirs heal slower but reduce damage by 70% while active.",
    image: incenseImage("Resilience Incense"),
  },
  {
    id: "restorationincense",
    name: "Restoration Incense",
    description: "Slowly regenerates health when below 40%",
    image: incenseImage("Restoration Incense"),
  },
  {
    id: "transmutationincense",
    name: "Transmutation Incense",
    description: "Elixirs restore less health but Manifestations restore more.",
    image: incenseImage("Transmutation Incense"),
  },
  {
    id: "wellspringincense",
    name: "Wellspring Incense",
    description: "Absorbing Manifestations increases maximum health.",
    image: incenseImage("Wellspring Incense"),
  },
];
