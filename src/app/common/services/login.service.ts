import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

interface Login {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url: string = 'http://localhost:8080';
  private loginInfo = new BehaviorSubject<any>(null);
  currentLoginInfo = this.loginInfo.asObservable();

  constructor(private http: HttpClient) {}

  loginUser(loginData: Login) {
    return this.http.post(`${this.url}/auth/login`, loginData);
  }

  updateLoginInfo(loginInfo: any) {
    this.loginInfo.next(loginInfo);
  }

  logout() {
    this.loginInfo.next(null);
    localStorage.clear();
  }
}
