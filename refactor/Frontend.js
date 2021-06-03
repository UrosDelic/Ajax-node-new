import { HttpClient } from "./HttpClient.js";

let passwordField = document.getElementById("password");
let emailField = document.getElementById("email");
const textArea = document.getElementById("logData");

const postRequestButton = document.getElementById("post-request-button");
postRequestButton.disabled = true;

postRequestButton.addEventListener("click", () => {
  textArea.innerText = "";
  const obj = {
    email: emailField.value,
    password: passwordField.value,
  };
  sendRequest("POST", "http://localhost:8080/post-data", obj);
});

const getRequestButton = document.getElementById("get-request-button");

getRequestButton.addEventListener("click", () => {
  sendRequest("GET", "http://localhost:8080/get-data");
});

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

const sendRequest = (method, url, data) => {
  httpClient
    .sendHttpRequest(method, url, data)
    .then(responseData => {
      showResponseData(responseData);
    })
    .catch(error => {
      console.log(error);
    });
};

const showResponseData = displayData => {
  if (displayData !== "") {
    displayData = JSON.parse(displayData);

    for (let element in displayData) {
      if (displayData[element] !== "") {
        textArea.innerHTML = `email: ${displayData.email}
                              password: ${displayData.password}`;
      }
    }
  } else textArea.innerHTML = "no data to display";
};
