import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostviewPageRoutingModule } from './postview-routing.module';

import { PostviewPage } from './postview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostviewPageRoutingModule
  ],
  declarations: [PostviewPage]
})
export class PostviewPageModule {}
