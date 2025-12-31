import {
  RangedWeaponCategoryEnum,
  RangedWeaponTypeEnum,
} from "../enums/ranged-weapon-category.enum";
import { ElementTypeEnum } from "../enums/element-type.enum";

export interface RangedWeapon {
  id: string;
  name: string;
  type: RangedWeaponTypeEnum;
  category: RangedWeaponCategoryEnum;
  element: ElementTypeEnum[];
  image: string;
}
