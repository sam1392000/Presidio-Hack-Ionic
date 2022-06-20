import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostviewPage } from './postview.page';

const routes: Routes = [
  {
    path: '',
    component: PostviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostviewPageRoutingModule {}
