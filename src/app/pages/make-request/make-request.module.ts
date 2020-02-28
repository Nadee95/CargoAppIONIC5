import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from '@ionic/angular';

import { MakeRequestPageRoutingModule } from './make-request-routing.module';

import { MakeRequestPage } from './make-request.page';
import { RequestMapComponent } from 'src/app/component/request-map/request-map.component';
import { MapComponent } from 'src/app/component/map/map.component';
import { AgmCoreModule } from '@agm/core';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MakeRequestPageRoutingModule,
    AgmCoreModule
  ],
  declarations: [MakeRequestPage, RequestMapComponent, MapComponent]
})
export class MakeRequestPageModule { }
