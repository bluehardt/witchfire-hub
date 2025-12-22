import {
  RangedWeaponCategory,
  RangedWeaponType,
} from "../enums/ranged-weapon-category.enum";
import { ElementType } from "../enums/element-type.enum";

export interface RangedWeapon {
  id: string;
  name: string;
  type: RangedWeaponType;
  category: RangedWeaponCategory;
  element: ElementType[];
  image: string;
}
