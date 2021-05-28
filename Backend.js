const http = require("http");
const fs = require("fs");
const host = "localhost";
const port = 3000;

const server = http.createServer((request, response) => {
  response.writeHead(200, { "content-type": "text/html" });
  fs.createReadStream("index.html").pipe(response);

  if (request.method === "POST") {
    let data = [];
    request
      .on("data", chunk => {
        data.push(chunk);
      })
      .on("end", () => {
        data = Buffer.concat(data).toString();
        fs.writeFile("message.json", data, () => {});
      });
    // response.end();
  } else if (request.method === "GET") {
    let message = fs.readFileSync("message.json", () => {});
    message = Buffer.from(message);
    response.write(message);
    //response.end();
  }
});

server.listen(port, host, error => {
  if (error) {
    console.log("Something went wrong", error);
  } else {
    console.log(`Server is runing on http://${host}:${port}`);
  }
});
