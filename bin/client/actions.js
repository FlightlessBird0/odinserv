const chalk = require("chalk");
const fs = require("fs");
const {
  valheimClientPath,
  valhallaPath,
  vikingExtension,
} = require("../relativeVars");

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

function backupViking(name) {
  const vikingPath = `${valheimClientPath}\\characters\\${name}${vikingExtension}`;
  const valhallaHomePath = `${valhallaPath}\\vikings\\${name}`;
  let viking;
  let valhallaHome;

  console.log(
    chalk.blueBright(`Backing up viking: ${chalk.redBright.underline(name)}`)
  );

  //Check for valhalla & create one if it is lost
  try {
    fs.statSync(valhallaPath);
  } catch (error) {
    if (error.code == "ENOENT") {
      makeValhallaDir(
        "\\worlds",
        "Odin's worlds are safe here",
        "Valhalla worlds directory could not be created!"
      );
      makeValhallaDir(
        "\\vikings",
        "Odin's vikings are safe here",
        "Valhalla vikings directory could not be created!"
      );
    } else {
      console.error(chalk.bgRed("Error finding Valhalla"), error);
    }
  }

  //Check if viking has a home in valhalla already and make one if not.
  try {
    valhallaHome = fs.statSync(valhallaHomePath);
  } catch (error) {
    if (error.code == "ENOENT") {
      makeValhallaDir(
        `\\vikings\\${name}`,
        "You find a nice clearing to make a homestead",
        `Valhalla home directory for ${chalk.redBright.underline(
          name
        )} could not be created!`
      );
    } else {
      console.error(chalk.bgRed("Error finding home"), error);
    }
  }

  //Backup viking
  try {
    viking = fs.statSync(vikingPath);

    if (viking.isFile() && valhallaHome.isDirectory()) {
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
              `Viking ${chalk.redBright.underline(name)} is safe in his home!`
            )
          );
        }
      );
    }
  } catch (error) {
    if (error.code == "ENOENT") {
      console.log(
        chalk.redBright(
          `Your viking ${chalk.redBright.underline(name)} is missing!`
        )
      );
    } else {
      console.error(chalk.bgRed("Error finding Viking:\n"), error);
    }
  }
}

function backupAllVikings() {
  console.log(
    chalk.yellow(`Backing up ${chalk.yellowBright.underline("ALL")} vikings!`)
  );
}

module.exports = { backupViking, backupAllVikings };
