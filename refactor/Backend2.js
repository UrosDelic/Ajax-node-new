import { createServer } from "http";
import { createReadStream, readFile, writeFile } from "fs";
let port = 8080;
let host = "localhost";

const server = createServer((request, response) => {
  //
  if (request.url === "/") {
    response.setHeader("Access-Control-Allow-Methods", "POST, GET");
    response.setHeader("content-type", "text/html");
    createReadStream("index.html").pipe(response);
  } //
  else if (request.url === "/Frontend.js") {
    response.setHeader("content-type", "application/javascript");
    createReadStream("Frontend.js").pipe(response);
  } //
  else if (request.url === "/HttpClient.js") {
    response.setHeader("content-type", "text/javascript");
    createReadStream("HttpClient.js").pipe(response);
  } //
  else if (request.url === "/ajax-node.css") {
    response.setHeader("content-type", "text/css");
    createReadStream("ajax-node.css").pipe(response);
  } //
  else if (request.url === "/quantox-logo-bkg.png") {
    response.setHeader("content-type", "image/png");
    createReadStream("quantox-logo-bkg.png").pipe(response);
  }
  // GET DATA FROM AJAX
  else if (request.url === "/get-data" && request.method === "GET") {
    response.setHeader("content-type", "application/json");
    let message = readFile("message.json", (error, file) => {
      if (error) {
        throw error;
      } else {
        message = Buffer.from(file);
        response.write(file);
        response.end();
      }
    });
  }
  // POST DATA FROM AJAX
  else if (request.method === "POST" && request.url === "/post-data") {
    response.setHeader("content-type", "application/json");
    let data = [];
    request
      .on("data", chunk => {
        data.push(chunk);
      })
      .on("end", () => {
        data = Buffer.concat(data);
        writeFile("message.json", data, () => {});
        response.write(data);
        response.end();
      });
  } else {
    response.statusMessage = "bad method";
    response.write('{"message": "error"}');
    response.end();
  }
});
server.listen(port, host, error => {
  if (error) {
    console.log("Something went wrong", error);
  } else {
    console.log(`Server is runing on http://${host}:${port}`);
  }
});
