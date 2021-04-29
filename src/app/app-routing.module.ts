import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {HomeComponent} from './home/home.component'
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {path:'signup',component: SignupComponent},
  {path:'login',component:LoginComponent},
  {path:' ',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
