import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

import { SignupRoutingModule } from './signup-routing.module';

@NgModule({
  imports: [CommonModule, SignupRoutingModule, ReactiveFormsModule, CardModule, InputTextModule],
})
export class SignupModule {}
