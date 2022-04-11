import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  desplegarStatus: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  desplegar() {
    this.desplegarStatus = !this.desplegarStatus;
  }
}
