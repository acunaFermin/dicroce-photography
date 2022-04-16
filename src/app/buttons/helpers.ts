import { PortfolioItem } from '../portfolio/interfaces/portfolio-item.interfaces';

import Swal from 'sweetalert2';

export const changeTitle = async (portfolioItem: PortfolioItem) => {
  let inputValue = 'Nueva sección';
  const value = await Swal.fire({
    title: 'Escriba el nombre de la nueva sección',
    input: 'text',
    inputLabel: 'Titulo',
    inputValue: inputValue,
    showCancelButton: true,
    inputValidator: (value) => {
      if (value) {
        portfolioItem.titulo = value;
        return '';
      } else {
        return 'Ingrese un título';
      }
    },
  });
};
