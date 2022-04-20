import Swal from 'sweetalert2';
import { PortfolioItem } from '../../interfaces/portfolio-item.interfaces';

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
