const chalk = require("chalk");
const fs = require("fs");
const { valhallaPath } = require("./relativeVars");

function makeValhallaDir(path, successMessage, errorMessage) {
  const relativePath = `${valhallaPath}${path}`;
  fs.mkdir(relativePath, { recursive: true }, (err) => {
    console.log(
      !err
        ? chalk.blueBright(
            `${successMessage}: ${chalk.underline(relativePath)}`
          )
        : chalk.redBright(errorMessage)
    );
  });
}

module.exports = { makeValhallaDir };
