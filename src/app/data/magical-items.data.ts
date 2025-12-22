import { MagicalItem } from "../models/magical-item.model";
import { ElementType } from "../enums/element-type.enum";
import { MagicalItemType } from "../enums/magical-item-type.enum";

function magicalItemImage(name: string) {
  return `https://witchfire.wiki.gg/images/${name.replace(/ /g, "_")}.png`;
}

export const MAGICAL_ITEMS: MagicalItem[] = [
  {
    id: "balewort",
    name: "Balewort",
    type: MagicalItemType.Fetish,
    power:
      "When below half health, killing enemies can turn their witchfire into a healing essence that regenerates a bit of health when picked up.",
    element: [],
    image: magicalItemImage("Balewort"),
  },
  {
    id: "belladonna",
    name: "Belladonna",
    type: MagicalItemType.Fetish,
    power:
      "A regenerating aura that fully shields against minor damage but allows any stronger attack to penetrate.",
    element: [],
    image: magicalItemImage("Belladonna"),
  },
  {
    id: "bitingtongue",
    name: "Biting Tongue",
    type: MagicalItemType.Relic,
    power: "Barrier breaks release a freezing shockwave.",
    element: [ElementType.Water],
    image: magicalItemImage("Biting Tongue"),
  },
  {
    id: "bittersweetnightshade",
    name: "Bittersweet Nightshade",
    type: MagicalItemType.Fetish,
    power:
      "When low on health, any damage taken makes the fetish release a powerful shockwave.",
    element: [],
    image: magicalItemImage("Bittersweet Nightshade"),
  },
  {
    id: "bloodofabanshee",
    name: "Blood of a Banshee",
    type: MagicalItemType.Relic,
    power:
      "Bloods spilled by a banshee burned on the stake. Overkill causes the victim to explode, igniting nearby enemies.",
    element: [ElementType.Fire],
    image: magicalItemImage("Blood of a Banshee"),
  },
  {
    id: "bookofserpents",
    name: "Book of Serpents",
    type: MagicalItemType.Relic,
    power:
      "A powerful amulet disguised as a grimoire. Anyone who hurts its owner is cursed with Decay.",
    element: [ElementType.Earth],
    image: magicalItemImage("Book of Serpents"),
  },
  {
    id: "braidofaseductress",
    name: "Braid of a Seductress",
    type: MagicalItemType.Relic,
    power:
      "Radiates an Aura that freezes any Minor enemy who wounds the owner of the relic with a melee attack.",
    element: [ElementType.Water],
    image: magicalItemImage("Braid of a Seductress"),
  },
  {
    id: "crownoffire",
    name: "Crown of Fire",
    type: MagicalItemType.Ring,
    power: "Dash applies the Fire elemental to a weapon for a short time.",
    element: [ElementType.Fire],
    image: magicalItemImage("Crown of Fire"),
  },
  {
    id: "dynamoring",
    name: "Dynamo Ring",
    type: MagicalItemType.Ring,
    power: "Dashing electrocutes the last enemy damaged by firearms.",
    element: [ElementType.Air],
    image: magicalItemImage("Dynamo Ring"),
  },
  {
    id: "eyeofthemadwoman",
    name: "Eye of the Madwoman",
    type: MagicalItemType.Relic,
    power:
      "An eye inked with the infant blood. The relic mercifully strikes any near-death enemy with heavenly lightning.",
    element: [ElementType.Air],
    image: magicalItemImage("Eye of the Madwoman"),
  },
  {
    id: "henbane",
    name: "Henbane",
    type: MagicalItemType.Fetish,
    power: "Significantly increases the effectiveness of healing elixirs.",
    element: [],
    image: magicalItemImage("Henbane"),
  },
  {
    id: "kirfane",
    name: "Kirfane",
    type: MagicalItemType.Relic,
    power:
      "After landing multiple shots, a bolt of lightning arcs between nearby enemies.",
    element: [ElementType.Air],
    image: magicalItemImage("Kirfane"),
  },
  {
    id: "mandrake",
    name: "Mandrake",
    type: MagicalItemType.Fetish,
    power:
      "Prevents fatal damage once per expedition. Activated, restores some health, fully recharges spells, and grants a few seconds of immunity to any incoming damage.",
    element: [],
    image: magicalItemImage("Mandrake"),
  },
  {
    id: "meteorring",
    name: "Meteor Ring",
    type: MagicalItemType.Ring,
    power:
      "Slides are longer and create a damaging fire trail that burns enemies.",
    element: [ElementType.Fire],
    image: magicalItemImage("Meteor Ring"),
  },
  {
    id: "monkshood",
    name: "Monkshood",
    type: MagicalItemType.Fetish,
    power:
      "Absorbing a Manifestation crystal adds a magical shield that neutralizes any damage once and then dissipates.",
    element: [],
    image: magicalItemImage("Monkshood"),
  },
  {
    id: "paintedtooth",
    name: "Painted Tooth",
    type: MagicalItemType.Relic,
    power:
      "A tooth found among witch's ashes. Critical shots on full health enemies ignite them.",
    element: [ElementType.Fire],
    image: magicalItemImage("Painted Tooth"),
  },
  {
    id: "parasite",
    name: "Parasite",
    type: MagicalItemType.Relic,
    power: "Curses the nearest enemy with Decay.",
    element: [ElementType.Earth],
    image: magicalItemImage("Parasite"),
  },
  {
    id: "ringofexcreta",
    name: "Ring of Excreta",
    type: MagicalItemType.Ring,
    power:
      "Dash leaves behind a delayed bomb that damages and knocks back enemies.",
    element: [ElementType.Earth],
    image: magicalItemImage("Ring of Excreta"),
  },
  {
    id: "ringofobedience",
    name: "Ring of Obedience",
    type: MagicalItemType.Ring,
    power:
      "Dashing while looking at the last wounded enemy pushes them in the direction of the Dash.",
    element: [],
    image: magicalItemImage("Ring of Obedience"),
  },
  {
    id: "ringofthorns",
    name: "Ring of Thorns",
    type: MagicalItemType.Ring,
    power:
      "Dodging a melee attack with Dash freezes the attacker. Killing them before they thaw might create an ammo-replenishing orb.",
    element: [ElementType.Water],
    image: magicalItemImage("Ring of Thorns"),
  },
  {
    id: "ringofwings",
    name: "Ring of Wings",
    type: MagicalItemType.Ring,
    power: "Allows to Dash mid-air.",
    element: [],
    image: magicalItemImage("Ring of Wings"),
  },
  {
    id: "scourge",
    name: "Scourge",
    type: MagicalItemType.Relic,
    power:
      "Prevents a fatal hit, removing bonus Stamina instead. Refreshes on regaining Focus.",
    element: [],
    image: magicalItemImage("Scourge"),
  },
  {
    id: "severedear",
    name: "Severed Ear",
    type: MagicalItemType.Relic,
    power: "Reloading releases a shockwave that knocks back nearby enemies.",
    element: [],
    image: magicalItemImage("Severed Ear"),
  },
  {
    id: "shadowmistring",
    name: "Shadowmist Ring",
    type: MagicalItemType.Ring,
    power:
      "Dashing turns the ring bearer into a shadow mist that can pass through enemies.",
    element: [ElementType.Water],
    image: magicalItemImage("Shadowmist Ring"),
  },
  {
    id: "staticring",
    name: "Static Ring",
    type: MagicalItemType.Ring,
    power: "Sliding leaves behind a lightning mote that shocks nearby enemies.",
    element: [ElementType.Air],
    image: magicalItemImage("Static Ring"),
  },
  {
    id: "yew",
    name: "Yew",
    type: MagicalItemType.Fetish,
    power:
      "Collecting shield orbs sometimes dropped by enemies grants a temporary shield.",
    element: [],
    image: magicalItemImage("Yew"),
  },
];
