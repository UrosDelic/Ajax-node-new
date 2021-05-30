const obj = {
    ime: "test2",
    prezime: "test2",
    godine: 2,
};

const JSONobj = JSON.stringify(obj);

const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {

    })
    const http = new XMLHttpRequest();
    http.open(method, url, data);
    http.send(data);
}

const getHttpRequest = () => {
    sendHttpRequest('GET', 'http://localhost:3000/');
}

const postHttpRequest = () => {
    sendHttpRequest('POST', 'http://localhost:3000/', JSONobj)

}

const postRequestButton = document.getElementById('post-request-button');
postRequestButton.addEventListener('click', postHttpRequest);

const getRequestButton = document.getElementById('get-request-button');
getRequestButton.addEventListener('click', getHttpRequest);
