//  Create Web Server
const port = 8000;

const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Req : ", req.url, req.method, req.headers);
  console.log("===============================================");
  console.log("Res : ", res.statusCode);

  res.setHeader("Content-Tyoe", "text/html");
  const template = `
  <h2>Hello  Node Js</h2>
  `;
  res.write(template);
  res.end();
});

server.listen(port);
