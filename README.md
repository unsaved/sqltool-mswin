# Description
Node.js modules for executing SqlTool to issue SQL to any JDBC database
or for running HyperSQL database instances under node.js
on MS Windows.

SqlTool provides a scripting/automation interface and interactive console
interface to JDBC Databases.
HyperSQL database engine is bundled, but you can also access any database by
just downloading the JDBC driver SQL file for the database.

# Installation
### install /usr/bin/sqltool:
Generally, if you are going to use any Node global bin scripts, you need to
add the global bin directory`%APPDATA%\npm` into your search path.
Use any means to do this persistently, such as `sysdm.cpl` or a CMD script
that runs (automatically or explicitly) each time you get a terminal.
If done by script, this is easily done with under by: `PATH=%PATH%;%APPDATA%\npm`
```cmd
sudo npm install -g @admc.com/sqltool-mswin
:: Do this just one time if you have no sqltool.rc file before-hand:
copy %APPDATA%\npm\node_modules\@admc.com\sqltool-mswin\artifacts\sqltool.rc %HOMEDRIVE%%HOMEPATH%
```
The sqltool.rc file in your home directory sets up the `mem` urlid used to
connect to a personal, local in-memory HyperSQL database as described below.

### install under your current directory
```cmd
:: If you don't already have a node_modules subdir or "package.json" file:
npm init -y
sudo npm install @admc.com/sqltool-mswin
```

Regardless whether you did a global or local installation, to upgrade to
newer releases, just repat the same installation command you gave for the
initial install.

# Usage
This is how to get an interactive console connection to an in-memory HyperSQL database.

To run SqlTool without connecting to any database, just skip the "mem" argument.
(From the interactive SqlTool sessoin you can connect to databases, or play around un-connected).

### For global installation:
```cmd
sqltool mem
```
### For local directory installation:
```cmd
node_modules\.bin\sqltool mem
```

See [SqlTool User Guide](http://hsqldb.org/doc/2.0/util-guide/sqltool-chapt.html) about how to use SqlTool.
See [HyperSQL User Guide](http://hsqldb.org/doc/2.0/guide/index.html) about how to use the HyperSQL database engine.
