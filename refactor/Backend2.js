const http = require("http");
const fs = require("fs");
const { Console } = require("console");
port = 8080;
host = "localhost";

const server = http.createServer((request, response) => {

    if (request.url === "/") {
        response.setHeader("Access-Control-Allow-Methods", "POST, GET");
        response.setHeader('content-type', 'text/html');
        fs.createReadStream('index.html').pipe(response)

    }
    // GET DATA FROM AJAX
    if (request.url === "/get-data" && request.method === "GET") {
        response.setHeader("content-type", "application/json");
        let message = fs.readFile("message.json", (error, file) => {
            if (error) {
                throw error;
            } else {
                message = Buffer.from(file);
                response.write(file);
                response.end();
            };
        });
    }
    // POST DATA FROM AJAX
    if (request.method === "POST" && request.url === "/") {
        response.setHeader("content-type", "application/json");
        let data = [];
        request
            .on("data", (chunk) => {
                data.push(chunk);
            })
            .on("end", () => {
                data = Buffer.concat(data).toString();
                fs.writeFile("message.json", data, () => { });
                response.write(data);
                response.end();
            });
    }
});

server.listen(port, host, (error) => {
    if (error) {
        console.log("Something went wrong", error);
    } else {
        console.log(`Server is runing on http://${host}:${port}`);
    }
});
