import { ARCANAS, Arcana } from "../data/arcanas.data";
import { ProphecyEnum } from "../enums/prophecy.enum";

export function getArcanasForProphecy(prophecyId: string): Arcana[] {
  // Find the ProphecyEnum key for the given id
  const enumKey = Object.keys(ProphecyEnum).find(
    (k) => ProphecyEnum[k as keyof typeof ProphecyEnum] === prophecyId
  );
  if (!enumKey) return [];
  const prophecyEnumValue = ProphecyEnum[enumKey as keyof typeof ProphecyEnum];
  return ARCANAS.filter((arcana) =>
    arcana.prophecy.includes(prophecyEnumValue)
  );
}
