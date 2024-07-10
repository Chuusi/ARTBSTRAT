import Swal from "sweetalert2";
import './alerts.css'

const Success = Swal.mixin({
    toast: true,
    position: "top",
    animation: true,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    customClass: {
        timerProgressBar: 'tpb-sa-sucess',
        title: 'title-sa',
        popup: 'popup-sa'
    },
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

const SomethingWrong = Swal.mixin({
    toast: true,
    position: "top",
    animation: true,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    customClass: {
        timerProgressBar: "tpb-sa-error",
        title: "title-sa",
        popup: "popup-sa",
    },
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

export const alertaSuccess = (text, time) => {
    Success.fire({
        title: text,
        timer: time,
    });
};

export const alertaError = (text, time) => {
    SomethingWrong.fire({
        title: text,
        timer: time,
    })
}