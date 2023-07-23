import { toast } from "react-toastify";

interface Error {
  message: string;
}

export const handleErrors = (error: Error) => {
  if (error.message) {
    toast(error.message, {
      hideProgressBar: true,
      autoClose: 2000,
      type: "error",
    });
  } 
//   else {
//     toast("An unknown error occured", {
//         hideProgressBar: true,
//         autoClose: 2000,
//         type: "error",
//       });
//   }
};
