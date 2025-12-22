import { MagicalItemType } from "../enums/magical-item-type.enum";
import { ElementType } from "../enums/element-type.enum";

export interface MagicalItem {
  id: string;
  name: string;
  type: MagicalItemType;
  power: string;
  element: ElementType[];
  image: string;
}
