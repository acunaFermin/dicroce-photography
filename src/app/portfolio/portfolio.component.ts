import { Component, OnInit } from '@angular/core';
import { generateUUID } from '../helpers/uuid';
import { PortfolioItem } from './interfaces/portfolio-item.interfaces';
import { PortfolioService } from './portfolio.service';

@Component({
	selector: 'app-portfolio',
	templateUrl: './portfolio.component.html',
	styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
	items: PortfolioItem[] = [];
	constructor(private portfolioService: PortfolioService) {
		this.items = [...this.portfolioService.items];
	}

	ngOnInit(): void {}

	newPortfolioItem(newPortfolioItem: PortfolioItem) {
		this.generateID(newPortfolioItem);
		this.portfolioService.items.unshift({ ...newPortfolioItem });
		this.items = [...this.portfolioService.items];

		//guardo los datos para enviar  la db
		this.portfolioService.saveItem({
			id: newPortfolioItem.id,
			titulo: newPortfolioItem.titulo,
			link: newPortfolioItem.link,
			imagen1: { ...newPortfolioItem.imagen1 },
			imagen2: { ...newPortfolioItem.imagen2 },
			imagen3: { ...newPortfolioItem.imagen3 },
		});
	}

	deletePortfolioItem(portfolioItem: PortfolioItem) {
		this.portfolioService.items = this.portfolioService.items.filter(
			(item) => item.id !== portfolioItem.id
		);
		this.items = [...this.portfolioService.items];

		//guardo los datos para enviar  la db
		this.portfolioService.eliminateItem(portfolioItem);
	}

	generateID(newPortfolioItem: PortfolioItem) {
		newPortfolioItem.id = generateUUID();
		newPortfolioItem.imagen1.id = generateUUID();
		newPortfolioItem.imagen2.id = generateUUID();
		newPortfolioItem.imagen3.id = generateUUID();

		//envio por valor las imagenes

		newPortfolioItem.imagen1 = { ...newPortfolioItem.imagen1 };
		newPortfolioItem.imagen2 = { ...newPortfolioItem.imagen2 };
		newPortfolioItem.imagen3 = { ...newPortfolioItem.imagen3 };
	}
}
