const { wasm } = require("@rollup/plugin-wasm");
const svg = require("rollup-plugin-svg");
const image = require("@rollup/plugin-image");

module.exports = {
  plugins: [wasm(), image(), svg()],
};
