import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  @Input() item: string = 'no hay item';

  constructor() {}

  ngOnInit(): void {}

  addItem() {
    console.log(this.item);
  }
}
