import { Component } from '@angular/core';
import { ImagesService } from './images.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'portfolio-nico';

	constructor(private imagesService: ImagesService) {
		// this.imagesService.getImagesDB();
	}
}
