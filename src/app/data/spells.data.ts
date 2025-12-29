import { SpellTypeEnum } from "../enums/spell-type.enum";
import { Spell } from "../models/spell.model";
import { ElementTypeEnum } from "../enums/element-type.enum";

export const SPELLS: Spell[] = [
  {
    id: "blightcyst",
    name: "Blight Cyst",
    type: SpellTypeEnum.Light,
    power:
      "A cyst that attaches to the environment or enemies. Explodes after a while but can be shot for a more powerful explosion.",
    element: [ElementTypeEnum.Earth],
    image: "https://witchfire.wiki.gg/images/Blight_Cyst.png",
  },
  {
    id: "burningstake",
    name: "Burning Stake",
    type: SpellTypeEnum.Heavy,
    power:
      "Spawns a burning stake that ignites enemies. Damaging them charges the stake. Fully charged, the stake releases a fiery explosion.",
    element: [ElementTypeEnum.Fire],
    image: "https://witchfire.wiki.gg/images/Burning_Stake.png",
  },
  {
    id: "cornucopia",
    name: "Cornucopia",
    type: SpellTypeEnum.Heavy,
    power:
      "The last bullet regenerates right after firing. Manual reload can still be executed. Does not work with Demonic Weapons.",
    element: [],
    image: "https://witchfire.wiki.gg/images/Cornucopia.png",
  },
  {
    id: "cursedbell",
    name: "Cursed Bell",
    type: SpellTypeEnum.Heavy,
    power:
      "Spawns a cursed bell. Firing at the bell tolls it, stunning all nearby Minor enemies.",
    element: [],
    image: "https://witchfire.wiki.gg/images/Cursed_Bell.png",
  },
  {
    id: "fireballs",
    name: "Fireballs",
    type: SpellTypeEnum.Light,
    power: "Three Fireballs homing in onto multiple enemies.",
    element: [ElementTypeEnum.Fire],
    image: "https://witchfire.wiki.gg/images/Fireballs.png",
  },
  {
    id: "firebreath",
    name: "Firebreath",
    type: SpellTypeEnum.Light,
    power:
      "A fire breather's trick turned deadly, damaging enemies and recharging melee",
    element: [ElementTypeEnum.Fire],
    image: "https://witchfire.wiki.gg/images/Firebreath.png",
  },
  {
    id: "frostcone",
    name: "Frost Cone",
    type: SpellTypeEnum.Light,
    power: "An icy cloud that freezes any enemies on its path.",
    element: [ElementTypeEnum.Water],
    image: "https://witchfire.wiki.gg/images/Frost_Cone.png",
  },
  {
    id: "icesphere",
    name: "Ice Sphere",
    type: SpellTypeEnum.Heavy,
    power:
      "Spawns an icy sphere that protects the caster from damage and freezes any enemy that gets inside it.",
    element: [ElementTypeEnum.Water],
    image: "https://witchfire.wiki.gg/images/Ice_Sphere.png",
  },
  {
    id: "icestiletto",
    name: "Ice Stiletto",
    type: SpellTypeEnum.Light,
    power: "An icy stiletto that freezes the targeted enemy.",
    element: [ElementTypeEnum.Water],
    image: "https://witchfire.wiki.gg/images/Ice_Stiletto.png",
  },
  {
    id: "ironcross",
    name: "Iron Cross",
    type: SpellTypeEnum.Heavy,
    power:
      "Spawns an iron cross with lightning bolts that bind all nearby enemies to it.",
    element: [ElementTypeEnum.Air],
    image: "https://witchfire.wiki.gg/images/Iron_Cross.png",
  },
  {
    id: "lightningbolt",
    name: "Lightning Bolt",
    type: SpellTypeEnum.Light,
    power: "A lightning bolt that knocks back and shocks enemies.",
    element: [ElementTypeEnum.Air],
    image: "https://witchfire.wiki.gg/images/Lightning_Bolt.png",
  },
  {
    id: "miasma",
    name: "Miasma",
    type: SpellTypeEnum.Heavy,
    power:
      "Summons a swinging incense burner that decays nearby enemies. Shooting the burner before it stops prolongs its duration.",
    element: [ElementTypeEnum.Earth],
    image: "https://witchfire.wiki.gg/images/Miasma.png",
  },
  {
    id: "rottenfiend",
    name: "Rotten Fiend",
    type: SpellTypeEnum.Heavy,
    power:
      "Resurrects a Grenadier who now attacks his former allies with incredible ferocity.",
    element: [ElementTypeEnum.Earth],
    image: "https://witchfire.wiki.gg/images/Rotten_Fiend.png",
  },
  {
    id: "shockwave",
    name: "Shockwave",
    type: SpellTypeEnum.Light,
    power:
      "A shockwave that stuns nearby Minor enemies and exhausted Major ones.",
    element: [],
    image: "https://witchfire.wiki.gg/images/Shockwave.png",
  },
  {
    id: "stigmaticdiabolicum",
    name: "Stigma Diabolicum",
    type: SpellTypeEnum.Light,
    power:
      "A cyst that attaches to enemies, becoming their additional weak spot.",
    element: [ElementTypeEnum.Earth],
    image: "https://witchfire.wiki.gg/images/Stigma_Diabolicum.png",
  },
  {
    id: "stormball",
    name: "Stormball",
    type: SpellTypeEnum.Light,
    power: "A ball lightning that shocks any enemy near its path.",
    element: [ElementTypeEnum.Air],
    image: "https://witchfire.wiki.gg/images/Stormball.png",
  },
  {
    id: "twinshade",
    name: "Twinshade",
    type: SpellTypeEnum.Light,
    power:
      "Strikes with a spectral sword or hammer, changing weapons based on enemy health.",
    element: [],
    image: "https://witchfire.wiki.gg/images/Twinshade.png",
  },
];
