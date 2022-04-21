import { Component, OnInit } from '@angular/core';
import { SaveChangesService } from './save-changes.service';

@Component({
 selector: 'app-save-changes',
 templateUrl: './save-changes.component.html',
 styleUrls: ['./save-changes.component.css'],
})
export class SaveChangesComponent implements OnInit {
 constructor(private saveChangesService: SaveChangesService) {}

 ngOnInit(): void {}

 saveChanges() {
  console.log('images', this.saveChangesService.saveGalleryImages);
  console.log('portfolio', this.saveChangesService.savePortfolioItems);
 }
}
