import { ElementTypeEnum } from "../enums/element-type.enum";

export interface MeleeWeapon {
  id: string;
  name: string;
  description: string;
  specialAttack: string;
  element: ElementTypeEnum[];
  image: string;
}
