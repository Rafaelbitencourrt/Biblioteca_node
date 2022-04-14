import chalk from "chalk";
const express = require("express");
console.log(chalk.blue("Imprimi"));

const paragrafo = "Texto em função";

function texto(string) {
  return string;
}

console.log(texto(paragrafo));
