export class HttpClient {
  sendHttpRequest(method, url, data) {
    data = JSON.stringify(data);

    const promise = new Promise((resolve, reject) => {
      this.createXMLHttpRequest(method, url, data, resolve, reject);
    });
    return promise;
  }

  createXMLHttpRequest(method, url, data, resolve, reject) {
    const http = new XMLHttpRequest();

    http.open(method, url, data);
    http.setRequestHeader("Content-Type", "application/json");

    http.onload = () => {
      if (http.status >= 200 && http.status < 300) {
        resolve(http.response);
      } else {
        reject(http.statusText);
      }
    };

    http.onerror = () => {
      reject("REJECT message inside onerror");
    };
    http.send(data);
  }
}