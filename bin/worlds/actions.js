const chalk = require("chalk");
const fs = require("fs");
const {
  valheimClientPath,
  worldExtension,
  worldDbExtension,
  valhallaPath,
} = require("../relativeVars");
const { makeValhallaDir } = require("../utils");

function backupClientWorld(name) {
  const timestampedName = `${name}_backup_${new Date().getTime()}`;
  const worldPath = `${valheimClientPath}\\worlds\\${name}${worldExtension}`;
  const worldDbPath = `${valheimClientPath}\\worlds\\${name}${worldDbExtension}`;
  const valhallaHomePath = `${valhallaPath}\\worlds\\${name}\\${timestampedName}`;

  let worldExists = fs.existsSync(worldPath) && fs.existsSync(worldDbPath);
  let valhallaHomeExists = false;

  console.log(
    chalk.blueBright(`Backing up world: ${chalk.redBright.underline(name)}`)
  );

  if (worldExists) {
    valhallaHomeExists = makeValhallaDir(
      `\\worlds\\${name}\\${timestampedName}`,
      "Your find a nice clearing for your home.",
      `Valhalla home directory for ${chalk.redBright.underline(
        name
      )} could not be created!`
    );
  }

  try {
    if (worldExists && valhallaHomeExists) {
      fs.copyFileSync(
        worldPath,
        `${valhallaHomePath}\\${name}${worldExtension}`
      );
      fs.copyFileSync(
        worldDbPath,
        `${valhallaHomePath}\\${name}${worldDbExtension}`
      );
      console.log(
        chalk.cyanBright(
          `World ${chalk.redBright.underline(name)} is safe in Valhalla!`
        )
      );
    } else {
      console.log(
        chalk.bgRed(`Error finding world: ${chalk.underline(name)}\n`)
      );
    }
  } catch (err) {
    if (err) {
      console.log(
        chalk.redBright(`We couldn't save ${chalk.redBright.underline(name)}!`)
      );
      return;
    }
  }
}

function backupAllClientWorlds() {
  console.log(
    chalk.bgYellowBright.blackBright("BACW: FEATURE NOT ENABLED YET")
  );
}

function backupServerWorld(name) {
  console.log(
    chalk.bgYellowBright.blackBright(
      `BSW: FEATURE NOT ENABLED YET.\n ${name} NOT BACKED UP`
    )
  );
}
function backupAllServerWorlds() {
  console.log(
    chalk.bgYellowBright.blackBright("BASW: FEATURE NOT ENABLED YET")
  );
}

function restoreServerWorld(name) {
  console.log(
    chalk.bgYellowBright.blackBright(
      `RSW: FEATURE NOT ENABLED YET.\n ${name} NOT RESTORED`
    )
  );
}
function restoreAllServerWorlds() {
  console.log(
    chalk.bgYellowBright.blackBright("RASW: FEATURE NOT ENABLED YET")
  );
}
function restoreClientWorld(name) {
  console.log(
    chalk.blueBright(`Restoring world: ${chalk.redBright.underline(name)}`)
  );
}
function restoreAllClientWorlds() {
  console.log(
    chalk.bgYellowBright.blackBright("RACW: FEATURE NOT ENABLED YET")
  );
}

module.exports = {
  backupServerWorld,
  backupAllServerWorlds,
  backupClientWorld,
  backupAllClientWorlds,
  restoreServerWorld,
  restoreAllServerWorlds,
  restoreClientWorld,
  restoreAllClientWorlds,
};
