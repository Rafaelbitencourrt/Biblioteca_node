import chalk from "chalk";
import fs from "node:fs";

function trataErro(erro) {
  throw new Error(chalk.red(erro.code));
}

function pegaArquivo(caminhoDoArquivo) {
  const encoding = "utf-8";
  fs.readFile(caminhoDoArquivo, encoding, (erro, data) => {
    if (erro) {
      trataErro(erro);
    } else {
      console.log(chalk.green(data));
    }
  });
}

pegaArquivo("./arquivos/texto1.md");
