import getFile from "./index.js";

const caminho = process.argv;
console.log(getFile(caminho[2]));
