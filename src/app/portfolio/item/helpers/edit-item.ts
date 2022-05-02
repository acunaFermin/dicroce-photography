import Swal from 'sweetalert2';
import { PortfolioItem } from '../../interfaces/portfolio-item.interfaces';
import { Image } from '../../../interfaces/interfaces';

export const changeTitle = async (
	portfolioItem: PortfolioItem,
	items: PortfolioItem[],
	title: string,
	images: Image[]
) => {
	let inputValue = 'Nueva sección';
	const value = await Swal.fire({
		title: 'Escriba el nombre de la nueva sección',
		input: 'text',
		inputLabel: 'Titulo',
		inputValue: inputValue,
		showCancelButton: true,
		inputValidator: (newTitle) => {
			if (newTitle) {
				if (!validateTitle(newTitle, items)) {
					portfolioItem.titulo = newTitle;

					changeGallery(images, title, newTitle);

					//retorna link por referencia
					portfolioItem.link = generateLink(newTitle);
					return '';
				}
				showError(newTitle).catch((err) => console.warn('el titulo ya existe!'));

				return 'Ingrese un título';
			} else {
				return 'Ingrese un título';
			}
		},
	});
};

//validar que no exitsa el titulo
const validateTitle = (title: string, portfolioItems: PortfolioItem[]) => {
	for (let item of portfolioItems) {
		if (
			item.titulo.replace(/[" "]/gi, '').toLowerCase() ===
			title.replace(/[" "]/gi, '').toLowerCase()
		) {
			return true;
		}
	}
	return false;
};

//cambiar la galleria de las fotos al cambiar el titulo
const changeGallery = (images: Image[], oldTitle: string, newTitle: string) => {
	let oldGallery = oldTitle.replace(/[" "]/gi, '').toLowerCase();
	let newGallery = newTitle.replace(/[" "]/gi, '').toLowerCase();

	for (let image of images) {
		if (image.gallery === oldGallery) {
			image.gallery = newGallery;
		}
	}
};

//generar link
const generateLink = (title: string) =>
	`/gallery/${title.replace(/[" "]/gi, '').toLowerCase()}`;

const showError = (title: string) => {
	return new Promise((resolve, reject) => {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: `La sección "${title}" ya existe. Ingresá un nombre distinto.`,
		});
	});
};
