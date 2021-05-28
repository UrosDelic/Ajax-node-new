const http = require("http");
const fs = require("fs");
const host = "localhost";
const port = 3000;

const server = http.createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.writeHead(200);
  fs.createReadStream("index.html").pipe(response);
});

server.listen(port, host, error => {
  if (error) {
    console.log("Something went wrong", error);
  } else {
    console.log(`Server is runing on http://${host}:${port}`);
  }
});
