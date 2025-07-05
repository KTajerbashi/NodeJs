module.exports.ApiResponse = class ApiResponse {
  constructor(data, message, statusCode) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
  }

  static Success(data, message = "Success") {
    return new ApiResponse(data, message, 200);
  }
  static Faild(data, message = "Internal Server") {
    return new ApiResponse(data, message, 500);
  }
  static NotFound(data, message = "Not Found") {
    return new ApiResponse(data, message, 404);
  }
  static Return(data, message, statusCode) {
    return new ApiResponse(data, message, statusCode);
  }
};
