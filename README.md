# Description
node.js module for executing SqlTool on MS Window

SqlTool provides a scripting/automation interface and interactive console
interface to JDBC Databases.
HyperSQL database engine is bundled, but you can also access any database by
just downloading the JDBC driver SQL file for the database.

# Installation
### install /usr/bin/sqltool:
```cmd
sudo npm install -g @admc.com/sqltool-mswin
```
### install under your current directory
```cmd
:: If you don't already have a node_modules subdir or "package.json" file:
npm init -y
sudo npm install @admc.com/sqltool-mswin
```

# Usage
### For global installation:
```cmd
sqltool
```
### For local directory installation:
```cmd
node_modules\.bin\sqltool
```

See http://hsqldb.org/doc/2.0/util-guide/sqltool-chapt.html about how to use
SqlTool.
See http://hsqldb.org/doc/2.0/guide/index.html about the HyperSQL database engine.
