import { DetailsComponent } from './details/details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './channel/channel.component';
import { HomeComponent } from './home/home.component';
import { LibraryComponent } from './library/library.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'tv',
    component:ChannelComponent
  },
  {
    path:'library',
    component:LibraryComponent,
  },
  {
    path:'details/:id',
    component:DetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
