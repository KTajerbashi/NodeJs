import Swal from "sweetalert2";

class AlertService {
  success(message: string, title = "Success") {
    return Swal.fire({
      icon: "success",
      title,
      text: message,
      confirmButtonText: "OK",
    });
  }

  error(message: string, title = "Error") {
    return Swal.fire({
      icon: "error",
      title,
      text: message,
      confirmButtonText: "OK",
    });
  }

  warning(message: string, title = "Warning") {
    return Swal.fire({
      icon: "warning",
      title,
      text: message,
      confirmButtonText: "OK",
    });
  }

  info(message: string, title = "Information") {
    return Swal.fire({
      icon: "info",
      title,
      text: message,
      confirmButtonText: "OK",
    });
  }

  confirm(message: string, title = "Are you sure?") {
    return Swal.fire<IAlertParameter>({
      icon: "warning",
      title,
      text: message,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });
  }
}

export default new AlertService();
