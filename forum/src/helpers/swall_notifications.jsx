import Swal from 'sweetalert2'
import { commonDelete } from './commonFetch'

export const SwallError = (text) => {
	return (
		Swal.fire({
			width: 350,
			position: 'top',
			icon: 'error',
			text: text
		})
	)
}

export const SwallSuccess = (text) => {
	return (
		Swal.fire({
			width: 350,
			position: 'top',
			icon: 'success',
			text: text
		})
	)
}

export const SwallDeleteMsg = (questionTitle, cancelBtnText, confirmBtnText, confirmDeletedText, url, setParam, param, id) => {
	Swal.fire({
		title: questionTitle,
		width: 350,
		cancelButtonText: cancelBtnText,
		position: 'top',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#1aae26',
		cancelButtonColor: '#d33',
		confirmButtonText: confirmBtnText
	}).then((result) => {
		if (result.isConfirmed) {
			commonDelete(url)
			setParam(param.filter(item => item.id !== id))
			Swal.fire({
				width: 350,
				position: 'top',
				title: confirmDeletedText,
				icon: 'success'
			})
		}
	})
}