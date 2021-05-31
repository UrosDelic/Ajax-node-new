const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();

    http.open(method, url, data);
    http.setRequestHeader("Content-Type", "application/json");

    http.onload = () => {
      if (http.response) {
        let jsonData = JSON.parse(http.response);
        console.log("test onload res", jsonData);
        for (let element in jsonData) {
          textArea.innerHTML += jsonData[element] + " ";
        }
      }
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

let passwordField = document.getElementById("password");

let emailField = document.getElementById("email");

const textArea = document.getElementById("logData");

const postRequestButton = document.getElementById("post-request-button");
postRequestButton.addEventListener("click", postHttpRequest);

const getRequestButton = document.getElementById("get-request-button");
getRequestButton.addEventListener("click", getHttpRequest);
