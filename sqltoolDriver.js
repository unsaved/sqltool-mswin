#!/usr/bin/env node

"use strict";

const yargs = require("yargs")(process.argv.slice(2)).
  strictOptions().
  usage("SYNTAX: $0 [-dhqv] -- [sqltool params...]").
  option("v", { describe: "Verbose", type: "boolean", }).
  option("d", { describe: "Debug logging", type: "boolean", }).
  option("q", {
      describe: "Quiet logging by logging only at level WARN and ERROR",
      type: "boolean",
  }).
  alias("help", "h").
  version("1.0.0");
const yargsDict = yargs.argv;
const progName = yargsDict.$0.replace(/^.*[\\/]/, "");

if (!yargsDict.d) console.debug = () => {};
if (yargsDict.q) console.debug = console.log = console.info = () => {};

require("./jreRunner")(["-m", "org.hsqldb.sqltool", ...yargsDict._], yargsDict.v);
