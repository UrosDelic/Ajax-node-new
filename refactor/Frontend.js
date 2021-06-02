class HttpClient {
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

let passwordField = document.getElementById("password");
let emailField = document.getElementById("email");
const textArea = document.getElementById("logData");

const enableButton = () => {
  if (passwordField.value !== "" && emailField.value !== "") {
    postRequestButton.disabled = false;
  } else {
    postRequestButton.disabled = true;
  }
};

passwordField.addEventListener("change", enableButton);
emailField.addEventListener("change", enableButton);

const form = document.getElementById("form");
form.addEventListener("submit", e => {
  e.preventDefault();
});

///////////////
let httpClient = new HttpClient();

class SendData extends HttpClient {
  sendRequest(method, url, data) {
    httpClient
      .sendHttpRequest(method, url, data)
      .then(responseData => {
        this.showResponseData(responseData);
      })
      .catch(error => {
        console.log(error);
      });
  }

  showResponseData(responseData) {
    let data = responseData;
    if (data !== "") {
      data = JSON.parse(responseData);
      for (let element in data) {
        if (data[element] !== "") {
          textArea.innerHTML += data[element] + " ";
        }
      }
    } else textArea.innerHTML = "no data to display";

    console.log(responseData);
  }
}

let ajaxApp = new SendData();

const postRequestButton = document.getElementById("post-request-button");
postRequestButton.disabled = true;

postRequestButton.addEventListener("click", () => {
  textArea.innerText = "";
  const obj = {
    email: emailField.value,
    password: passwordField.value,
  };
  ajaxApp.sendRequest("POST", "http://localhost:8080/post-data", obj);
});

const getRequestButton = document.getElementById("get-request-button");

getRequestButton.addEventListener("click", () => {
  ajaxApp.sendRequest("GET", "http://localhost:8080/get-data");
});
