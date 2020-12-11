import Swal from "sweetalert2"

export function Loading() {
    Swal.fire({
        title: `جاري التحميل`,
        timerProgressBar: true,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading()
        },
      })
}

export function Seccess() {
    Swal.fire({
        icon: 'success',
        title: 'تمت العملية بنجاح',
        showConfirmButton: false,
        timer: 1500
      })
}

export function Oops() {
    Swal.fire({
        icon: 'error',
        title: 'أوووبس ......',
        text: 'حدث خطأ أثناء العملية'
    })
}