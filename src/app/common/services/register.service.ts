import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Register {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(registerData: Register) {
    return this.http.post('http://localhost:8080/auth/register', registerData, {
      observe: 'response',
    });
  }
}
