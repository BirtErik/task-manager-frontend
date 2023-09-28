import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Login {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  loginUser(loginData: Login) {
    return this.http.post('http://localhost:8080/auth/login', loginData);
  }
}
