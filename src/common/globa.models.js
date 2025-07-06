class ApiResult {
  constructor(data, message, statusCode, isSuccess) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
    this.isSuccess = isSuccess;
  }
  static Return(data, message, statusCode, isSuccess) {
    return new ApiResult(data, message, statusCode, isSuccess);
  }
  static Success(data, message = "Successed") {
    return new ApiResult(data, message, 200, true);
  }
  static Faild(data, message = "Process Faild !!!") {
    return new ApiResult(data, message, 500, false);
  }
  static NotFound(data, message = "Not Founded !!!") {
    return new ApiResult(data, message, 404, false);
  }
  static UnAuthorized(data, message = "Invalid Token !!!") {
    return new ApiResult(data, message, 401, false);
  }
}

module.exports = {
  ApiResult,
};
