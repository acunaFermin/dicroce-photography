import { PortfolioItem } from '../portfolio/interfaces/portfolio-item.interfaces';

import Swal from 'sweetalert2';
import { Image } from '../interfaces/interfaces';

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
    inputValidator: (value) => {
      if (value) {
        if (!validateTitle(value, items)) {
          portfolioItem.titulo = value;

          changeGallery(images, title, value);

          //retorna link por referencia
          portfolioItem.link = generateLink(value);
          return '';
        }
        showError(value).catch((err) => console.warn('el titulo ya existe!'));

        return 'Ingrese un título';
      } else {
        return 'Ingrese un título';
      }
    },
  });
};

const showError = (title: string) => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `La sección "${title}" ya existe. Ingresá un nombre distinto.`,
    });
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

export const confirmDelete = (
  portfolioItem: PortfolioItem
): Promise<boolean> => {
  return new Promise((resolve) => {
    Swal.fire({
      title: `Estás seguro de eliminar "${portfolioItem.titulo}"?`,
      text: 'No lo podras recuperar...',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero borrarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Borrado!',
          `"${portfolioItem.titulo}" ha sido eliminado`,
          'success'
        );
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};
