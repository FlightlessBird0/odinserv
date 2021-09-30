// const path = require("path");

const chalk = require("chalk");

function backupViking(name) {
  console.log(
    chalk.yellow(`Backing up viking: ${chalk.yellowBright.underline(name)}`)
  );
}

function backupAllVikings() {
  console.log(
    chalk.yellow(`Backing up ${chalk.yellowBright.underline("ALL")} vikings!`)
  );
}

module.exports = { backupViking, backupAllVikings };
