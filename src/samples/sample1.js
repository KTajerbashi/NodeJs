const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Product Title : ", (parameter) => {
  console.log("~> ", parameter);
  fs.writeFileSync("product.txt", parameter);
  rl.close();
});
