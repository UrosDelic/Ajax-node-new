const http = require('http');
const fs = require('fs');
port = 8080;
host = 'localhost';

const server = http.createServer((request, response) => {

    // response.setHeader("Access-Control-Allow-Origin", "*");
    // response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");

    if (request.url === '/') {
        response.statusCode = 200;
        response.setHeader("Access-Control-Allow-Methods", "POST, GET");

        fs.readFile("../index.html", (error, html) => {
            if (error) {
                throw error;
            } else {
                response.write(html);
                response.end();
            }
        });
        //fs.createReadStream('../index.html').pipe(response);
        //response.write('server works, go to /get-data for json');
        // response.end();

    } else if (request.url === '/get-data') {
        response.setHeader('content-type', 'application/json');
        let message = fs.readFileSync("message.json", () => { });
        message = Buffer.from(message);
        response.write(message);
        response.end();
    }
    if (request.method === "POST" && request.url === '/') {
        response.setHeader('content-type', 'application/json');
        let data = [];
        request
            .on("data", chunk => {
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


server.listen(port, host, error => {
    if (error) {
        console.log("Something went wrong", error);
    } else {
        console.log(`Server is runing on http://${host}:${port}`);
    }
});
