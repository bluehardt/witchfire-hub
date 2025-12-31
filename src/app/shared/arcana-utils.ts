import { ARCANA, Arcanum } from "../data/arcana.data";
import { ProphecyEnum } from "../enums/prophecy.enum";

export function getArcanaForProphecy(prophecyId: string): Arcanum[] {
  // Find the ProphecyEnum key for the given id
  const enumKey = Object.keys(ProphecyEnum).find(
    (k) => ProphecyEnum[k as keyof typeof ProphecyEnum] === prophecyId
  );
  if (!enumKey) return [];
  const prophecyEnumValue = ProphecyEnum[enumKey as keyof typeof ProphecyEnum];
  return ARCANA.filter((arcana) => arcana.prophecy.includes(prophecyEnumValue));
}
