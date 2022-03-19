#!/usr/bin/env node

"use strict";

/**
 * child_process.exec*|spawn*|fork* all allow option stdio="inherit".
 * This allows for unbuffered input right from user's console.
 */

const { execFileSync } = require("child_process");
const { validate } = require("@admc.com/bycontract-plus");
const { conciseCatcher, AppErr } = require("@admc.com/apputil");
const fs = require("fs");
const path = require("path");

const osToJre = {
    linux: "hfulljre.lin86",
    win32: "hfulljre.ms",
};

module.exports = conciseCatcher(function(jreArgs, verbose=false) {
    validate(arguments, ["string[]", "boolean="]);
    const jreDirName = osToJre[process.platform];
    if (jreDirName === undefined)
        throw new AppErr(`When this version of ${path.basename(module.path)} `
          + `was published, OS ${process.platform} was not supported`);
    const jreDir = path.join(__dirname, jreDirName);
    if (!fs.existsSync(jreDir) || !fs.statSync(jreDir).isDirectory())
        throw new AppErr(`It appears that this module is not the variant for `
          + `OS ${process.platform} since directory ${jreDir} is not present.`);
    const jreBin = path.join(path.join(jreDir, "bin"),
      (process.platform === "win32" ? "java.exe" : "java"));
    if (!fs.existsSync(jreBin) || !fs.statSync(jreBin).isFile())
        throw new AppErr(`JRE binary '${jreBin}' missing from distribution`);

    if (verbose) console.info(`Executing '${jreArgs}' with '${jreBin}'`);
    // With stdio inherit option, the *Sync commands just return null:
    execFileSync(jreBin, jreArgs, {
        // windowsHide: true,
        stdio: "inherit",
    });
});
