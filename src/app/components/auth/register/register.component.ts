import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { RegisterService } from 'src/app/common/services/register.service';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

interface Register {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  regError: boolean = false;
  registerData!: Register;
  isLoading: boolean = false;

  constructor(
    private readonly registerService: RegisterService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
    });
  }

  submit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.registerData = {
      username: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    };
    this.isLoading = true;
    this.registerService
      .register(this.registerData)
      .pipe(
        catchError((error) => {
          console.log(error.value);
          this.regError = true;
          return of(null);
        })
      )
      .subscribe((data: any) => {
        if (data !== null) {
          this.regError = false;
          console.log(data);
        }
        this.isLoading = false;
      });
  }

  onBackClick() {
    this.router.navigate(['/auth']);
  }
}
