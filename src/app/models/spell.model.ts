import { SpellType } from "../enums/spell-type.enum";
import { ElementType } from "../enums/element-type.enum";

export interface Spell {
  id: string;
  name: string;
  type: SpellType;
  power: string;
  element: ElementType[];
  image: string;
}
