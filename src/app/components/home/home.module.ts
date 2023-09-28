import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeOutletComponent } from './home-outlet.component';

const homeRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeOutletComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [HomeComponent, HomeOutletComponent],
  imports: [CommonModule, RouterModule.forChild(homeRoutes)],
})
export class HomeModule {}
