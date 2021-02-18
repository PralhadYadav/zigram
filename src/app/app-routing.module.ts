import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CocktailsComponent } from './components/cocktails/cocktails.component';

const routes: Routes = [
  {
    path:'',
    component:CocktailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
