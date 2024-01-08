import { NgModule } from "@angular/core";
import { firstLetterCasePipe } from "./pipes/firstLetterCase.pipe";
import { replaceScapePipe } from "./pipes/replaceScape.pipe";
import { LoadingComponent } from "./loading/loading.component";
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    firstLetterCasePipe,
    replaceScapePipe,
    LoadingComponent,
    SearchComponent
  ],
  imports: [
  ],
  exports:[
    firstLetterCasePipe,
    replaceScapePipe,
    LoadingComponent,
    SearchComponent
  ]
})

export class SharedModule { }
