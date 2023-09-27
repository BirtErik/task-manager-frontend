import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';

const userRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./user-tasks/user-tasks.module').then((m) => m.UserTasksModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(userRoutes)],
})
export class UserModule {}
