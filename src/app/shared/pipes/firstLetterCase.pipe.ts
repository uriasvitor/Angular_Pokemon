import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name:'firstLetterUp'
})
export class firstLetterCasePipe implements PipeTransform{
  transform(value: string) {

    if(!value){
      return value;
    }

    const firstLetter = value[0].toUpperCase()
    const restWord = value.slice(1)
    return  firstLetter + restWord;
  }

}
