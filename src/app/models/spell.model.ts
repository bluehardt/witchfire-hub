import { SpellTypeEnum } from "../enums/spell-type.enum";
import { ElementTypeEnum } from "../enums/element-type.enum";

export interface Spell {
  id: string;
  name: string;
  type: SpellTypeEnum;
  power: string;
  element: ElementTypeEnum[];
  image: string;
}
