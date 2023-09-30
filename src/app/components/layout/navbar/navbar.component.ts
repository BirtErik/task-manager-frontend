import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = [
      { label: 'Home', routerLink: '/home' },
      { label: 'Tasks', routerLink: '/user' },
      { label: 'Logout', routerLink: '' },
    ];

    //this.activeItem = this.items[0];
  }
}
