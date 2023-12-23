import { NgModule } from "@angular/core";
import { firstLetterCasePipe } from "./pipes/firstLetterCase,pipe";

@NgModule({
  declarations: [
    firstLetterCasePipe
  ],
  imports: [
  ],
  exports:[
    firstLetterCasePipe
  ]
})
export class SharedModule { }
