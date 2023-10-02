import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/common/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  items!: MenuItem[];
  activeItem!: MenuItem;
  activeEditButton: boolean = false;
  enableEdit: boolean = false;

  constructor(
    private router: Router,
    private readonly loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.items = [
      { label: 'Home', routerLink: '/home' },
      { label: 'Tasks', routerLink: '/user' },
      { label: 'Logout', routerLink: '', command: () => this.onLogoutClick() },
    ];
  }

  onLogoutClick() {
    this.loginService.logout();
    this.router.navigate(['/home']);
  }
}
