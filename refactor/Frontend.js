const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    createXMLHttpRequest(method, url, data, resolve, reject);
  });
  return promise;
};

const getHttpRequest = () => {
  sendHttpRequest("GET", "http://localhost:8080/get-data")
    .then(responseData => {
      console.log(responseData);
    })
    .catch(error => {
      console.log(error);
    });
};

const postHttpRequest = () => {
  textArea.innerText = '';
  const obj = {
    email: emailField.value,
    password: passwordField.value,
  };
  const JSONobj = JSON.stringify(obj);

  sendHttpRequest("POST", "http://localhost:8080/post-data", JSONobj)
    .then(responseData => {
      console.log(responseData);
    })
    .catch(error => {
      console.log(error);
    });
};

function createXMLHttpRequest(method, url, data, resolve, reject) {
  const http = new XMLHttpRequest();

  http.open(method, url, data);
  http.setRequestHeader("Content-Type", "application/json");

  http.onload = () => {
    processRequestData(http);
    if (this.status >= 200 && this.status < 300) {
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

function processRequestData(http) {
  if (http.response) {
    let jsonData = JSON.parse(http.response);
    for (let element in jsonData) {
      if (jsonData[element] !== "") {
        textArea.innerHTML += jsonData[element] + " ";
      } else textArea.innerHTML = "no data to display";
    }
  }
}

let passwordField = document.getElementById("password");

let emailField = document.getElementById("email");

const textArea = document.getElementById("logData");

const postRequestButton = document.getElementById("post-request-button");
postRequestButton.addEventListener("click", postHttpRequest);

const getRequestButton = document.getElementById("get-request-button");
getRequestButton.addEventListener("click", getHttpRequest);

postRequestButton.disabled = true;

const enableButton = () => {
  if (passwordField.value !== "" && emailField.value !== "") {
    postRequestButton.disabled = false;
  }
};

passwordField.addEventListener("keydown", enableButton);
emailField.addEventListener("keydown", enableButton);

const form = document.getElementById("form");
form.addEventListener("submit", e => {
  e.preventDefault();
});
