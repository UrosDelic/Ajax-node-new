class SendHttpRequest extends CreateXMLHttpRequest {
  constructor(method, url, data) {
    this.method = method;
    this.url = url;
    this.data = data;
  }
}
