const obj = {
    email: "test backend HEADERS test2",
    password: "test backed HEADERS test2",
};

const JSONobj = JSON.stringify(obj);

const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();

        http.open(method, url, data);
        http.setRequestHeader("Content-Type", "application/json");

        http.onload = () => {
            if (http.response) {
                let jsonData = JSON.parse(http.response);
                console.log("test onload res", jsonData);
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
    sendHttpRequest("GET", "https://reqres.in/api/users?page=2")
        .then((responseData) => {
            console.log(responseData);
        })
        .catch((error) => {
            console.log(error);
        });
};

const postHttpRequest = () => {
    sendHttpRequest("POST", "http://localhost:8080", JSONobj)
        .then((responseData) => {
            console.log(responseData);
        })
        .catch((error) => {
            console.log(error);
        });
};

const postRequestButton = document.getElementById("post-request-button");
postRequestButton.addEventListener("click", postHttpRequest);

const getRequestButton = document.getElementById("get-request-button");
getRequestButton.addEventListener("click", getHttpRequest);