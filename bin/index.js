#! /usr/bin/env node
const yargs = require("yargs");
const chalk = require("chalk");
const { TYPES } = require("./constants.json");
const vikingActions = require("./vikings/actions");
const worldActions = require("./worlds/actions");

const usageStatement = chalk.bold(
  chalk.cyanBright(
    `Welcome, i am ${chalk.underline(
      "Odinserv"
    )}\n I can safegaurd your home and your viking. Read my commands below.`
  )
);
yargs
  .usage(usageStatement)
  .showHelpOnFail(true)
  .command({
    command: "backup",
    describe: `Backs up your world or character based on the type & name flag\nType ${chalk.greenBright(
      "odin backup --help"
    )} for a helpful list brOther.`,
    builder: {
      type: {
        describe: `Choose your desired type to backup, world or viking. \n e.g. ${chalk.greenBright(
          "--type=viking"
        )}`,
        type: "string",
        demandOption: true,
      },
      name: {
        describe: `Choose the specific instance to backup\n e.g. ${chalk.greenBright(
          "--name=MyVikingOrWorldName"
        )}`,
        type: "string",
        demandOption: true,
      },
      serverWorld: {
        describe: `Backs up your dedicated server world.\n e.g. ${chalk.greenBright(
          "-s"
        )}`,
        type: "boolean",
        alias: "s",
      },
    },
    handler: function (argv) {
      switch (argv.type) {
        case TYPES.VIKING:
          if (typeof argv.name == "string" && argv.name.length > 0) {
            vikingActions.backupViking(argv.name);
          } else {
            vikingActions.backupAllVikings();
          }
          break;
        case TYPES.WORLD:
          if (typeof argv.name == "string" && argv.name.length > 0) {
            if (argv.serverWorld) {
              worldActions.backupServerWorld(argv.name);
            } else {
              worldActions.backupClientWorld(argv.name);
            }
          } else {
            if (argv.serverWorld) {
              worldActions.backupAllServerWorlds();
            } else {
              worldActions.backupAllClientWorlds();
            }
          }
          break;
        default:
          console.log(
            chalk.redBright(
              `Invalid option: Please try ${chalk.greenBright(
                "'odin --help'"
              )} for help`
            )
          );
          break;
      }
    },
  })
  .command({
    command: "restore",
    describe: `Restores up your world or character based on the type & name flag\nType ${chalk.greenBright(
      "odin restore --help"
    )} for a helpful list brOther.`,
    builder: {
      type: {
        describe: `Choose your desired type to restore, world or viking. \n e.g. ${chalk.greenBright(
          "--type=viking"
        )}`,
        type: "string",
        demandOption: true,
      },
      name: {
        describe: `Choose the specific instance to restore\n e.g. ${chalk.greenBright(
          "--name=MyVikingOrWorldName"
        )}`,
        type: "string",
        demandOption: true,
      },
      serverWorld: {
        describe: `Restores your world to your dedicated server.\n e.g. ${chalk.greenBright(
          "--sw"
        )}`,
        type: "boolean",
        alias: "sw",
      },
    },
    handler: function (argv) {
      switch (argv.type) {
        case TYPES.VIKING:
          if (typeof argv.name == "string" && argv.name.length > 0) {
            vikingActions.restoreViking(argv.name);
          } else {
            vikingActions.restoreAllVikings();
          }
          break;
        case TYPES.WORLD:
          if (typeof argv.name == "string" && argv.name.length > 0) {
            if (argv.serverWorld) {
              worldActions.restoreServerWorld(argv.name);
            } else {
              worldActions.restoreClientWorld(argv.name);
            }
          } else {
            if (argv.serverWorld) {
              worldActions.restoreAllServerWorlds();
            } else {
              worldActions.restoreAllClientWorlds();
            }
          }
          break;
        default:
          console.log(
            chalk.redBright(
              `Invalid option: Please try ${chalk.greenBright(
                "'odin --help'"
              )} for help`
            )
          );
          break;
      }
    },
  })
  .demandCommand()
  .help()
  .version();

yargs.parse();
