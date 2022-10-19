import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignupComponent } from './signup.component';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', title: 'Sign Up', component: SignupComponent }])],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
