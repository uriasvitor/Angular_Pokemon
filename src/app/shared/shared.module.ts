import { NgModule } from "@angular/core";
import { firstLetterCasePipe } from "./pipes/firstLetterCase.pipe";
import { replaceScapePipe } from "./pipes/replaceScape.pipe";

@NgModule({
  declarations: [
    firstLetterCasePipe,
    replaceScapePipe
  ],
  imports: [
  ],
  exports:[
    firstLetterCasePipe,
    replaceScapePipe
  ]
})

export class SharedModule { }
