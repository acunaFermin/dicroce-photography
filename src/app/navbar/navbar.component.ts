import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  desplegarStatus: boolean = false;

  constructor() {}
  //cerrar el menu si se clickea fuera
  @HostListener('touchstart', ['$event.target.id'])
  onClick(id: string) {
    if (id !== 'lateral-bar' && id !== 'btn-close') {
      setTimeout(() => {
        this.close();
      }, 50);
    }
  }
  ngOnInit(): void {}

  desplegar() {
    this.desplegarStatus = !this.desplegarStatus;
  }

  close() {
    this.desplegarStatus = false;
  }
}
