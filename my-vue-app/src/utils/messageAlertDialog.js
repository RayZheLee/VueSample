import Swal from 'sweetalert2'

export function showAlertMessage(
    message,
    type = 'info',
    title = ''
) {
    return Swal.fire({
        title: title,
        text: message,
        icon: type,
        confirmButtonText: '確定',
        confirmButtonColor: '#86754d'
    })
}