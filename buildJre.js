#!/usr/bin/env node

"use strict";
const fs = require("fs");
const { conciseCatcher, JsShell } = require("@admc.com/apputil");
const { validate } = require("bycontract-plus");

const yargs = require("yargs")(process.argv.slice(2)).
  strictOptions().
  usage(`SYNTAX: $0 [-dEhOqv] /src/jre/root hsqldb/root newjre.name cmd.json
Command files are JSON of lists of objects with these elements:
    label:       string      OPTIONAL
    cmd:         [An argv list]  REQUIRED
    cwd:         directory       OPTIONAL
    require0:    boolean     OPTIONAL  (require 0 exit values)
    stdOut:      boolean     OPTIONAL  (display stdout)
    stdErr:      boolean     OPTIONAL  (display stderr)
    interactive: boolean     OPTIONAL  (allow interactive input)`.
      replace(/ /g, "\u2009")).
  option("v", { describe: "Verbose", type: "boolean", }).
  option("d", { describe: "Debug logging", type: "boolean", }).
  option("q", {
      describe: "Quiet logging by logging only at level WARN and ERROR",
      type: "boolean",
  }).
  option("E", {
      describe: "hide standard Error from commands (default true)",
      type: "boolean",
  }).
  option("O", {
      describe: "hide standard Output from commands (default true)",
      type: "boolean",
  }).
  alias("help", "h").
  demandCommand(4,4).
  version("1.0.0");
const yargsDict = yargs.argv;
const progName = yargsDict.$0.replace(/^.*[\\/]/, "");

if (!yargsDict.d) console.debug = () => {};
if (yargsDict.q) console.debug = console.log = console.info = () => {};
const cmdFilePath = yargsDict._.shift();

conciseCatcher(function(cmdFile, srcJrePath, hsqldbPath, newJreName, out, err) {
    validate(arguments, ["string[]",
      "string", "string", "string", "string", "boolean=", "boolean="]);
    const jsShell =
      new JsShell(cmdFile, JSON.parse(fs.readFileSync(cmdFile, "utf8")),
        undefined, undefined, undefined, {
            HSQLDB_ROOT: hsqldbPath,
            TARGET_JRE_NAME: newJreName,
            SRC_JRE_HOME: srcJrePath
        });
    console.debug(jsShell.id + " command file validated successfully");
    console.info("%s took %s s.", jsShell.id,
      (jsShell.run(true, out, err).lastExecDuration/1000).toFixed(3));
})(cmdFilePath, yargsDict._.shift(), yargsDict._.shift(), yargsDict._.shift(),
  !yargsDict.O, !yargsDict.E);
