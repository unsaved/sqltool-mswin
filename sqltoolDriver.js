#!/usr/bin/env node

"use strict";

const { appVersion } = require("@admc.com/apputil");
const path = require("path");
const fs = require("fs");

const yargs = require("yargs")(process.argv.slice(2)).
  strictOptions().
  usage(`SYNTAX:
$0 [-dqv] [-m mod/spec] [-p modpath] [-cp classpath] [--] [sqltool params...]
    The -- separator is needed ony if any sqltool param -switches are given
    (so we can distinguish switch for the JRE from switch for SqlTool program).
OR
$0 -h|-s    # show Help or generate 'sqltool.rc' file and exit`.
    replace(/ /g, "\u2009")).
  option("v", { describe: "Verbose", type: "boolean", }).
  option("d", { describe: "Debug logging", type: "boolean", }).
  option("q", {
      describe: "Quiet logging by logging only at level WARN and ERROR",
      type: "boolean",
  }).
  option("c", {
      alias: "cp",
      describe: "additional ClassPath to be added to JRE environment",
      type: "string",
      requiresArg: true,
  }).
  option("m", {
      describe: "override Module.  Replaces 'org.hsqldb.sqltool' entrypoint.",
      type: "string",
      requiresArg: true,
  }).
  option("p", {
      describe: "additional module Path to be added to JRE environment",
      type: "string",
      requiresArg: true,
  }).
  option("s", {
      describe: "install a Skeleton 'sqltool.rc file to your home directory",
      type: "boolean",
  }).
  alias("help", "h").
  version(appVersion);
const yargsDict = yargs.argv;
const progName = yargsDict.$0.replace(/^.*[\\/]/, "");

if (!yargsDict.d) console.debug = () => {};
if (yargsDict.q) console.debug = console.log = console.info = () => {};

if (yargsDict.s) {
    const personalRc = path.join(require("os").homedir(), "sqltool.rc");
    if (fs.existsSync(personalRc)) {
        console.error(`Refusing to write '${personalRc}' because `
          + " there's already one there");
        process.exit(8);
    }
    fs.copyFileSync(path.join(__dirname, "artifacts/sqltool.rc"), personalRc);
    process.exit(0);
}

const argsArray = yargsDict._;
argsArray.unshift(yargsDict.m ? yargsDict.m : "org.hsqldb.sqltool");
argsArray.unshift("-m");
if (yargsDict.p) { argsArray.unshift(yargsDict.p); argsArray.unshift("-p"); }
if (yargsDict.cp) { argsArray.unshift(yargsDict.cp); argsArray.unshift("-cp"); }

require("./jreRunner")(argsArray, yargsDict.v);
