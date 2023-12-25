import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name:'replaceScape'
})
export class replaceScapePipe implements PipeTransform{
  transform(value: string) {
    const transformedValue = value
    return transformedValue.replaceAll("\f"," ")
  }

}
