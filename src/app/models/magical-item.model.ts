import { MagicalItemTypeEnum } from "../enums/magical-item-type.enum";
import { ElementTypeEnum } from "../enums/element-type.enum";

export interface MagicalItem {
  id: string;
  name: string;
  type: MagicalItemTypeEnum;
  power: string;
  element: ElementTypeEnum[];
  image: string;
}
