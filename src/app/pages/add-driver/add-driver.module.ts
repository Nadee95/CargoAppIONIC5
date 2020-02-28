import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from '@ionic/angular';

import { AddDriverPageRoutingModule } from './add-driver-routing.module';

import { AddDriverPage } from './add-driver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDriverPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddDriverPage]
})
export class AddDriverPageModule { }
