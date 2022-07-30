export default class StatusCode {
  static isInformation(code: number) {
    return code >= 100 && code <= 199;
  }
  
  static isSuccess(code: number) {
    return code >= 200 && code <= 299;
  }
  
  static isRedirection(code: number) {
    return code >= 300 && code <= 399;
  }
  
  static isClientError(code: number) {
    return code >= 400 && code <= 499;
  }
  
  static isServerError(code: number) {
    return code >= 500 && code <= 599;
  }


  static isError(code: number) {
    return (
      StatusCode.isClientError(code) ||
      StatusCode.isServerError(code)
    );
  }
}