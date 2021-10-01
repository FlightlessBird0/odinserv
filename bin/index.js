#! /usr/bin/env node
const yargs = require("yargs");
const chalk = require("chalk");
const { TYPES } = require("./constants.json");
const client = require("./vikings/actions");

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
        describe:
          "Choose your desired type to backup, either 'world, 'viking', or 'both'.",
        type: "string",
        demandOption: true,
      },
      name: {
        describe:
          "Choose the specific instance to backup, this should be the name of your world, viking, or 'all'. Defaults to all",
        type: "string",
        demandOption: false,
      },
    },
    handler: function (argv) {
      switch (argv.type) {
        case TYPES.VIKING:
          if (typeof argv.name == "string" && argv.name.length > 0) {
            client.backupViking(argv.name);
          } else {
            client.backupAllVikings();
          }
          break;
        case TYPES.WORLD:
          console.log("World selected!");
          break;
        default:
          console.log(
            chalk.redBright(
              `Invalid type: Please try ${chalk.greenBright(
                "'odin --help'"
              )} for help`
            )
          );
          break;
      }
    },
  })
  .demandCommand()
  .help();

yargs.parse();
