const chalk = require("chalk");
const fs = require("fs");
const {
  valheimClientPath,
  valhallaPath,
  vikingExtension,
} = require("../relativeVars");
const { makeValhallaDir } = require("../utils");

function backupViking(name) {
  const vikingPath = `${valheimClientPath}\\characters\\${name}${vikingExtension}`;
  const valhallaHomePath = `${valhallaPath}\\vikings\\${name}`;
  let vikingExists = fs.existsSync(vikingPath);
  let valhallaHomeExists = fs.existsSync(valhallaHomePath);

  console.log(
    chalk.blueBright(`Backing up viking: ${chalk.redBright.underline(name)}`)
  );

  if (vikingExists && !valhallaHomeExists) {
    valhallaHomeExists = makeValhallaDir(
      `\\vikings\\${name}`,
      "You find a nice clearing to make a homestead",
      `Valhalla home directory for ${chalk.redBright.underline(
        name
      )} could not be created!`
    );
  }

  if (vikingExists && valhallaHomeExists) {
    fs.copyFile(
      vikingPath,
      `${valhallaHomePath}\\${name}_backup_${new Date().getTime()}${vikingExtension}`,
      (err) => {
        if (err) {
          console.log(
            chalk.redBright(
              `We couldn't save ${chalk.redBright.underline(name)}!`
            )
          );
          return;
        }

        console.log(
          chalk.cyanBright(
            `Viking ${chalk.redBright.underline(name)} is safe in Valhalla!`
          )
        );
      }
    );
  } else {
    console.error(
      chalk.bgRed(`Error finding Viking: ${chalk.underline(name)}\n`)
    );
  }
}

function backupAllVikings() {
  console.log(chalk.bgYellowBright.blackBright("BAV: FEATURE NOT ENABLED YET"));
}

function restoreViking(name) {
  console.log(
    chalk.blueBright(`Restoring Viking: ${chalk.redBright.underline(name)}`)
  );
}
function restoreAllVikings() {
  console.log(chalk.bgYellowBright.blackBright("RAV: FEATURE NOT ENABLED YET"));
}

module.exports = {
  backupViking,
  backupAllVikings,
  restoreAllVikings,
  restoreViking,
};
