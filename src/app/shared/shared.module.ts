import { NgModule } from "@angular/core";
import { firstLetterCasePipe } from "./pipes/firstLetterCase.pipe";
import { replaceScapePipe } from "./pipes/replaceScape.pipe";
import { LoadingComponent } from "./loading/loading.component";

@NgModule({
  declarations: [
    firstLetterCasePipe,
    replaceScapePipe,
    LoadingComponent
  ],
  imports: [
  ],
  exports:[
    firstLetterCasePipe,
    replaceScapePipe,
    LoadingComponent
  ]
})

export class SharedModule { }
