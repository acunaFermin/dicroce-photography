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
        //retorna titulo por referencia
        portfolioItem.titulo = value;

        //retorna link por referencia
        portfolioItem.link = generateLink(value);

        return '';
      } else {
        return 'Ingrese un título';
      }
    },
  });
};

//generar link
const generateLink = (title: string) =>
  `gallery/${title.replace(/[" "]/gi, '').toLowerCase()}`;
