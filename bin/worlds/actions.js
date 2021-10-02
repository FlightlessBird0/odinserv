const chalk = require("chalk");

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
function backupClientWorld(name) {
  console.log(
    chalk.blueBright(`Backing up world: ${chalk.redBright.underline(name)}`)
  );
}
function backupAllClientWorlds() {
  console.log(
    chalk.bgYellowBright.blackBright("BACW: FEATURE NOT ENABLED YET")
  );
}

module.exports = {
  backupServerWorld,
  backupAllServerWorlds,
  backupClientWorld,
  backupAllClientWorlds,
};
