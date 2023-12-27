import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name:'replaceScape'
})
export class replaceScapePipe implements PipeTransform{
  transform(value: string): string {
    const transformedValue = value.replace(/\f/g, " ");
    return transformedValue;
  }

}
