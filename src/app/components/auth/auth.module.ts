import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/common/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthOutletComponent } from './auth-outlet.component';
import { LoginService } from 'src/app/common/services/login.service';
import { RegisterService } from 'src/app/common/services/register.service';

const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthOutletComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthOutletComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [LoginService, RegisterService],
})
export class AuthModule {}
