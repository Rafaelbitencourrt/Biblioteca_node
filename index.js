import chalk from "chalk";
import fs from "node:fs";
import path from "node:path";

const texto =
  "São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento[<input>](https://developer.mozilla.org/pt-BR/docs/html/Element/Input) , a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API mozGetAsFile() em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.)";

function extraiLinks(texto) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;

  const arrayResultados = [];
  let temp;

  while ((temp = regex.exec(texto)) != null) {
    arrayResultados.push({ [temp[1]]: temp[2] });
  }
  return arrayResultados.length === 0 ? "Não há links" : arrayResultados;
}

function trataErro(erro) {
  throw new Error(chalk.red(erro.code));
}

async function pegarArquivo(caminho) {
  const caminhoAbsoluto = path.join("__dirname", "..", caminho);
  const encoding = "utf-8";
  try {
    const arquivos = await fs.promises.readdir(caminhoAbsoluto, { encoding });
    const result = await Promise.all(
      arquivos.map(async (arquivo) => {
        const localArquivo = `${caminhoAbsoluto}/${arquivo}`;
        const texto = await fs.promises.readFile(localArquivo, encoding);
        return extraiLinks(texto);
      })
    );
    return result;
  } catch (erro) {
    return trataErro(erro);
  }
}

export default pegarArquivo;
//pegaArquivo("./arquivos/texto1.md");

/* function pegaArquivo(caminhoDoArquivo) {
  const encoding = "utf-8";
  fs.promises
    .readFile(caminhoDoArquivo, encoding)
    .then((texto) => console.log(texto))
    .catch((erro) => trataErro(erro));
} */

/* function pegaArquivo(caminhoDoArquivo) {
  const encoding = "utf-8";
  fs.readFile(caminhoDoArquivo, encoding, (erro, data) => {
    if (erro) {
      trataErro(erro);
    } else {
      console.log(chalk.green(data));
    }
  });
} */
