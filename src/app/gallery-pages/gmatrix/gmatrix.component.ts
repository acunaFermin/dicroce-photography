import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gmatrix',
  templateUrl: './gmatrix.component.html',
  styleUrls: ['./gmatrix.component.css'],
})
export class GmatrixComponent implements OnInit {
  @Input() titulo: string = 'hola';

  constructor() {}

  ngOnInit(): void {}
}
