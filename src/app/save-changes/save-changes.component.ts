import { Component, OnInit } from '@angular/core';
import { SaveChangesService } from './save-changes.service';

@Component({
	selector: 'app-save-changes',
	templateUrl: './save-changes.component.html',
	styleUrls: ['./save-changes.component.css'],
})
export class SaveChangesComponent implements OnInit {
	constructor(public saveChangesService: SaveChangesService) {}

	ngOnInit(): void {}

	saveChanges() {
		this.saveChangesService.callSavedItems();
		console.log('images', this.saveChangesService.saveGalleryImages);
		console.log('portfolio', this.saveChangesService.savePortfolioItems);
	}

	discardChanges() {
		this.saveChangesService.clearSendedItems();
	}
}
