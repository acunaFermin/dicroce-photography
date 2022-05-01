import Swal from 'sweetalert2';

export const callInputFile = async () => {
	const file = await Swal.fire({
		title: 'Select image',
		input: 'file',
		inputAttributes: {
			accept: 'image/*',
			'aria-label': 'Upload your profile picture',
		},
	});

	return file;
};

export const extension = (nombre = '') => {
	let nombreCortado = nombre.split('.');
	return nombreCortado[nombreCortado.length - 1];
};
