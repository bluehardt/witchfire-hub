import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "arcanaFilter",
  standalone: true,
})
export class ArcanaFilterPipe implements PipeTransform {
  transform(
    arcanaList: any[],
    arcanaAvailability: Map<string, boolean>,
    showAll: boolean
  ): any[] {
    if (showAll) return arcanaList;
    return arcanaList.filter((a) => arcanaAvailability.get(a.id));
  }
}
