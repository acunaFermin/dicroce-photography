import { Component } from '@angular/core';
import { SaveChangesService } from './save-changes/save-changes.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	spinnerStatus = false;
	title = 'portfolio-nico';

	constructor(private saveChangesService: SaveChangesService) {
		this.saveChangesService.spinner.subscribe((status) => {
			this.spinnerStatus = status;
		});
	}
}
