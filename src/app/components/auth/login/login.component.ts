import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { LoginService } from 'src/app/common/services/login.service';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

interface Login {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginData!: Login;
  authError: boolean = false;
  isLoading: boolean = false;

  constructor(
    private readonly loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginData = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.isLoading = true;
    this.loginService
      .loginUser(this.loginData)
      .pipe(
        // Used for chaining operations. Type observable. Executed when subscribed
        catchError((error) => {
          if (error.status === 401) {
            this.authError = true;
          }
          return of(null); // returns an Observable of null so the program can continue
        })
      )
      .subscribe((data: any) => {
        if (data !== null) {
          this.authError = false;
          this.loginService.updateLoginInfo(data);

          const jwtToken = data.jwt;
          const role = data.data.authorities[0].authority;
          const userId = data.data.id;

          localStorage.setItem('role', role);
          localStorage.setItem('token', jwtToken);
          localStorage.setItem('userId', userId);

          this.router.navigate(['/user']);
        }
        this.isLoading = false;
      });
  }

  onRegisterClick() {
    this.router.navigate(['/auth/register']);
  }
}
