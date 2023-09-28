import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTasksListComponent } from './list/user-tasks-list.component';
import { UserTasksCreateComponent } from './create/user-tasks-create.component';
import { RouterModule, Routes } from '@angular/router';
import { UserTasksOutletComponent } from './user-tasks-outlet.component';

const userTasksRoutes: Routes = [
  {
    path: '',
    component: UserTasksOutletComponent,
    children: [
      {
        path: '',
        component: UserTasksListComponent,
      },
      {
        path: 'create',
        component: UserTasksCreateComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    UserTasksOutletComponent,
    UserTasksListComponent,
    UserTasksCreateComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(userTasksRoutes)],
  providers: [],
})
export class UserTasksModule {}
