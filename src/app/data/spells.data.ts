import { SpellType } from "../enums/spell-type.enum";
import { Spell } from "../models/spell.model";
import { ElementType } from "../enums/element-type.enum";

export const SPELLS: Spell[] = [
  {
    id: "blightcyst",
    name: "Blight Cyst",
    type: SpellType.Light,
    power:
      "A cyst that attaches to the environment or enemies. Explodes after a while but can be shot for a more powerful explosion.",
    element: [ElementType.Earth],
    image: "https://witchfire.wiki.gg/images/Blight_Cyst.png",
  },
  {
    id: "burningstake",
    name: "Burning Stake",
    type: SpellType.Heavy,
    power:
      "Spawns a burning stake that ignites enemies. Damaging them charges the stake. Fully charged, the stake releases a fiery explosion.",
    element: [ElementType.Fire],
    image: "https://witchfire.wiki.gg/images/Burning_Stake.png",
  },
  {
    id: "cornucopia",
    name: "Cornucopia",
    type: SpellType.Heavy,
    power:
      "The last bullet regenerates right after firing. Manual reload can still be executed. Does not work with Demonic Weapons.",
    element: [],
    image: "https://witchfire.wiki.gg/images/Cornucopia.png",
  },
  {
    id: "cursedbell",
    name: "Cursed Bell",
    type: SpellType.Heavy,
    power:
      "Spawns a cursed bell. Firing at the bell tolls it, stunning all nearby Minor enemies.",
    element: [],
    image: "https://witchfire.wiki.gg/images/Cursed_Bell.png",
  },
  {
    id: "fireballs",
    name: "Fireballs",
    type: SpellType.Light,
    power: "Three Fireballs homing in onto multiple enemies.",
    element: [ElementType.Fire],
    image: "https://witchfire.wiki.gg/images/Fireballs.png",
  },
  {
    id: "firebreath",
    name: "Firebreath",
    type: SpellType.Light,
    power:
      "A fire breather's trick turned deadly, damaging enemies and recharging melee",
    element: [ElementType.Fire],
    image: "https://witchfire.wiki.gg/images/Firebreath.png",
  },
  {
    id: "frostcone",
    name: "Frost Cone",
    type: SpellType.Light,
    power: "An icy cloud that freezes any enemies on its path.",
    element: [ElementType.Water],
    image: "https://witchfire.wiki.gg/images/Frost_Cone.png",
  },
  {
    id: "icesphere",
    name: "Ice Sphere",
    type: SpellType.Heavy,
    power:
      "Spawns an icy sphere that protects the caster from damage and freezes any enemy that gets inside it.",
    element: [ElementType.Water],
    image: "https://witchfire.wiki.gg/images/Ice_Sphere.png",
  },
  {
    id: "icestiletto",
    name: "Ice Stiletto",
    type: SpellType.Light,
    power: "An icy stiletto that freezes the targeted enemy.",
    element: [ElementType.Water],
    image: "https://witchfire.wiki.gg/images/Ice_Stiletto.png",
  },
  {
    id: "ironcross",
    name: "Iron Cross",
    type: SpellType.Heavy,
    power:
      "Spawns an iron cross with lightning bolts that bind all nearby enemies to it.",
    element: [ElementType.Air],
    image: "https://witchfire.wiki.gg/images/Iron_Cross.png",
  },
  {
    id: "lightningbolt",
    name: "Lightning Bolt",
    type: SpellType.Light,
    power: "A lightning bolt that knocks back and shocks enemies.",
    element: [ElementType.Air],
    image: "https://witchfire.wiki.gg/images/Lightning_Bolt.png",
  },
  {
    id: "miasma",
    name: "Miasma",
    type: SpellType.Heavy,
    power:
      "Summons a swinging incense burner that decays nearby enemies. Shooting the burner before it stops prolongs its duration.",
    element: [ElementType.Earth],
    image: "https://witchfire.wiki.gg/images/Miasma.png",
  },
  {
    id: "rottenfiend",
    name: "Rotten Fiend",
    type: SpellType.Heavy,
    power:
      "Resurrects a Grenadier who now attacks his former allies with incredible ferocity.",
    element: [ElementType.Earth],
    image: "https://witchfire.wiki.gg/images/Rotten_Fiend.png",
  },
  {
    id: "shockwave",
    name: "Shockwave",
    type: SpellType.Light,
    power:
      "A shockwave that stuns nearby Minor enemies and exhausted Major ones.",
    element: [],
    image: "https://witchfire.wiki.gg/images/Shockwave.png",
  },
  {
    id: "stigmaticdiabolicum",
    name: "Stigma Diabolicum",
    type: SpellType.Light,
    power:
      "A cyst that attaches to enemies, becoming their additional weak spot.",
    element: [ElementType.Earth],
    image: "https://witchfire.wiki.gg/images/Stigma_Diabolicum.png",
  },
  {
    id: "stormball",
    name: "Stormball",
    type: SpellType.Light,
    power: "A ball lightning that shocks any enemy near its path.",
    element: [ElementType.Air],
    image: "https://witchfire.wiki.gg/images/Stormball.png",
  },
  {
    id: "twinshade",
    name: "Twinshade",
    type: SpellType.Light,
    power:
      "Strikes with a spectral sword or hammer, changing weapons based on enemy health.",
    element: [],
    image: "https://witchfire.wiki.gg/images/Twinshade.png",
  },
];
