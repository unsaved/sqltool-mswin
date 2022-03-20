#!/usr/bin/env node

"use strict";

const { appVersion } = require("@admc.com/apputil");

const yargs = require("yargs")(process.argv.slice(2)).
  strictOptions().
  usage(`SYNTAX:
$0 [-dhqv] [-m mod/spec] [-p modpath] [-cp classpath] [sqltool params...]
OR
$0 [-dhqv] [-m mod/spec] [-p modpath] [-cp classpath] -- [sqltool params...]
The -- separator is needed (2nd form) if any sqltool param -switches are given.`.
    replaceAll(/ /g, "\u2009")).
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
      describe: "override Module.  Replaces 'org.hsqldb.sqltool' entrypoint",
      type: "string",
      requiresArg: true,
  }).
  option("p", {
      describe: "additional module Path to be added to JRE environment",
      type: "string",
      requiresArg: true,
  }).
  alias("help", "h").
  version(appVersion);
const yargsDict = yargs.argv;
const progName = yargsDict.$0.replace(/^.*[\\/]/, "");

if (!yargsDict.d) console.debug = () => {};
if (yargsDict.q) console.debug = console.log = console.info = () => {};

const argsArray = yargsDict._;
argsArray.unshift(yargsDict.m ? yargsDict.m : "org.hsqldb.sqltool");
argsArray.unshift("-m");
if (yargsDict.p) { argsArray.unshift(yargsDict.p); argsArray.unshift("-p"); }
if (yargsDict.cp) { argsArray.unshift(yargsDict.cp); argsArray.unshift("-cp"); }

console.log(argsArray);
require("./jreRunner")(argsArray, yargsDict.v);
