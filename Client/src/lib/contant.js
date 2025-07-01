import Swal from "sweetalert2";

export const ClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const handleError = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
  });
};
