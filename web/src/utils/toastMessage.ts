import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

export function toastMessage(toast: any){
    return (
      Toastify({
        text: `${toast.message}`,
        gravity: "bottom",
        position: "center",
        style: {
          background: 
            toast.type === "Success" ? "#00E054" : 
            toast.type === "Conflict" ? "#F6CB32" : "#EC2626",
          color: "#332E34",
          fontWeight: "600",
          borderRadius: "8px",
        }
      }).showToast()
    )
}