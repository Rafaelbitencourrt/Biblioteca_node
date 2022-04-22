import pegarArquivo from "./index.js";
import chalk from "chalk";

const caminho = process.argv;

async function processaTexto(caminhoDeArquivo) {
  const resultado = await pegarArquivo(caminhoDeArquivo[2]);
  console.log(chalk.yellow("Lista de links"), resultado);
}

processaTexto(caminho);
