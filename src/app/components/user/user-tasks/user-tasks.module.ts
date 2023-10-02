import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTasksListComponent } from './list/user-tasks-list.component';

import { RouterModule, Routes, provideRouter } from '@angular/router';
import { UserTasksOutletComponent } from './user-tasks-outlet.component';
import { MaterialModule } from 'src/app/common/material/material.module';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { PriorityHighlightDirective } from 'src/app/common/directives/priority-highlight.directive';
import { authGuard } from '../../auth/guards/auth.guard';

const userTasksRoutes: Routes = [
  {
    path: '',
    component: UserTasksOutletComponent,
    children: [
      {
        path: '',
        component: UserTasksListComponent,
        canActivate: [authGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    UserTasksOutletComponent,
    UserTasksListComponent,
    PriorityHighlightDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userTasksRoutes),
    MaterialModule,
    TextFieldModule,
    FormsModule,
    MessagesModule,
  ],
  providers: [
    provideRouter([
      {
        path: 'user',
        component: UserTasksListComponent,
        canActivate: [authGuard],
      },
    ]),
  ],
})
export class UserTasksModule {}
