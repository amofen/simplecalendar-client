import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AgendaComponent} from './agenda/agenda.component';

const routes: Routes = [
  {path:'',redirectTo:'agenda',pathMatch:"full" },
  {path:'agenda',component:AgendaComponent},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
