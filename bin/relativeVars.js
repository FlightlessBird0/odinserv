require("dotenv").config();
const path = require("path");

const valhallaPath = path.normalize(
  `${process.env.APPDATA}\\..\\Local\\odinserv_valhalla`
);
const valheimClientPath = path.normalize(
  `${process.env.APPDATA}\\..\\LocalLow\\IronGate\\Valheim`
);
const vikingExtension = ".fch";

module.exports = { valhallaPath, valheimClientPath, vikingExtension };
