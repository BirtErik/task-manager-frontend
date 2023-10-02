import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { LoginService } from 'src/app/common/services/login.service';
import { TasksService } from 'src/app/common/services/tasks.service';

interface Task {
  userId: number;
  id: number | null;
  name: string;
  description: string;
  priority: string;
  status: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './user-tasks-list.component.html',
  styleUrls: ['./user-tasks-list.component.css'],
})
export class UserTasksListComponent implements OnInit {
  isPanelOpen: boolean = false;
  selectedPriority: string = 'medium';
  navigation!: any;
  tasks: any;
  editingTask: any = null;
  message!: Message[];
  deleteMessage!: Message[];
  showSuccessMessage: boolean = false;
  showDeleteMessage: boolean = false;
  userId!: number;

  constructor(
    private readonly tasksService: TasksService,
    private readonly loginService: LoginService,
    private router: Router
  ) {
    this.loginService.currentLoginInfo.subscribe((loginInfo) => {
      this.tasks = loginInfo.data.tasks;
    });
  }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    if (this.userId) {
      this.loadTasks(this.userId);
    }

    this.message = [
      {
        severity: 'success',
        summary: 'Success',
        detail: 'Task saved successfully',
      },
    ];
    this.deleteMessage = [
      {
        severity: 'success',
        summary: 'Deleted',
        detail: 'Task was successfully deleted',
      },
    ];
  }

  toggleEdit(task: any) {
    this.editingTask = this.editingTask === task ? null : task;
  }

  createTask() {
    const newTask: Task = {
      userId: this.userId,
      id: null,
      name: '',
      description: '',
      priority: 'LOW',
      status: 'TODO',
    };

    this.tasks.push(newTask);
    this.editingTask = newTask;
  }

  saveTask(task: Task) {
    task.userId = this.userId;
    this.tasksService.saveTask(task).subscribe((data: any) => {
      if (data !== null && data.status === 201) {
        this.showSuccessMessage = true;
        this.hideMessage();
      }
    });
  }

  deleteTask(task: Task) {
    this.tasksService.deleteTask(task.id).subscribe((data: any) => {
      if (data.status === 202) {
        const index = this.tasks.indexOf(task);
        if (index !== -1) {
          this.tasks.splice(index, 1);
        }

        this.showDeleteMessage = true;
        this.hideMessage();
      }
    });
  }

  loadTasks(userId: number) {
    this.tasksService.getTasks(userId).subscribe((tasks) => {
      this.tasks = tasks.body;
    });
  }

  private hideMessage() {
    setTimeout(() => {
      this.showSuccessMessage = false;
      this.showDeleteMessage = false;
    }, 2500);
  }
}
