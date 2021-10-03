require("dotenv").config();
const path = require("path");

const vikingExtension = ".fch";
const worldExtension = ".fwl";
const worldDbExtension = ".db";

const valhallaPath = path.normalize(
  `${process.env.APPDATA}\\..\\Local\\odinserv_valhalla`
);
const valheimClientPath = path.normalize(
  `${process.env.APPDATA}\\..\\LocalLow\\IronGate\\Valheim`
);

module.exports = {
  valhallaPath,
  valheimClientPath,
  vikingExtension,
  worldExtension,
  worldDbExtension,
};
