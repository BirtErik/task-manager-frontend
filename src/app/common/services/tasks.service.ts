import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from 'src/app/common/services/login.service';
interface Task {
  userId: number;
  id: number | null;
  name: string;
  description: string;
  priority: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  userId!: number;
  url: string = 'http://localhost:8080';
  jwtToken: any;
  headers: any;

  constructor(
    private http: HttpClient,
    private readonly loginService: LoginService
  ) {
    this.loginService.currentLoginInfo.subscribe((loginInfo) => {
      this.userId = loginInfo.data.id;
    });
    this.jwtToken = localStorage.getItem('token');
    this.headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.jwtToken}`
    );
  }

  saveTask(taskData: Task) {
    return this.http.post(`${this.url}/task/create`, taskData, {
      headers: this.headers,
      observe: 'response',
    });
  }

  deleteTask(taskId: number | null) {
    return this.http.delete(`${this.url}/task/${taskId}`, {
      headers: this.headers,
      observe: 'response',
    });
  }

  getTasks(userId: number) {
    return this.http.get(`${this.url}/task/${userId}`, {
      headers: this.headers,
      observe: 'response',
    });
  }
}
