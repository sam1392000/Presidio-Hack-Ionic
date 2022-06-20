import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
          path:'home',
          loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path:'explore',
        loadChildren:() => import('../explore/explore.module').then(m => m.ExplorePageModule)
      },
      {
        path:'add',
        loadChildren:() => import('../add-post/add-post.module').then(m => m.AddPostPageModule)
      },
      {
        path:'suggestion',
        loadChildren:() => import('../suggestion/suggestion.module').then(m => m.SuggestionPageModule)
      },
      {
        path:'profile',
        loadChildren:() => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path:'',
        redirectTo:'/tabs/home',
        pathMatch:'full'
      }
    ]
  },
  {
    path:'',
    redirectTo:'/tabs/home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
