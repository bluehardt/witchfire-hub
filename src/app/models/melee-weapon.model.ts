import { ElementType } from "../enums/element-type.enum";

export interface MeleeWeapon {
  id: string;
  name: string;
  description: string;
  specialAttack: string;
  element: ElementType[];
  image: string;
}
