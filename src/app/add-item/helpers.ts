import Swal from 'sweetalert2';

export const selectVH = async () => {
  let position = '';

  const { value: fruit } = await Swal.fire({
    title: 'Elegi como visualizar esta imagen',
    input: 'select',
    inputOptions: {
      Position: {
        vertical: 'Vertical',
        horizontal: 'Horizontal',
      },
    },
    inputPlaceholder: 'Selecciona un modo',
    showCancelButton: true,
    inputValidator: (value) => {
      if (value) {
        position = value;
        return '';
      } else {
        return '';
      }
    },
  });

  return position;
};
