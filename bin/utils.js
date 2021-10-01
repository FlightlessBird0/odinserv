const chalk = require("chalk");
const fs = require("fs");
const { valhallaPath } = require("./relativeVars");

function makeValhallaDir(path, successMessage, errorMessage) {
  const relativePath = `${valhallaPath}${path}`;

  try {
    fs.mkdirSync(relativePath, { recursive: true });
    console.log(
      chalk.blueBright(`${successMessage}: ${chalk.underline(relativePath)}`)
    );
    return true;
  } catch (error) {
    console.log(error);
    console.log(chalk.redBright(errorMessage));
    return false;
  }
}

module.exports = { makeValhallaDir };
