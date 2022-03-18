# Description
node.js module for executing SqlTool on Linux x86

SqlTool provides a scripting/automation interface and interactive console
interface to JDBC Databases.
HyperSQL database engine is bundled, but you can also access any database by
just downloading the JDBC driver SQL file for the database.

# Installation
## install /usr/bin/sqltool:
```javascript
sudo npm install -g @admc.com/sqltool-linux-x86
```
## install under your current directory
```javascript
npm init -y   # If you don't already have a node_modules subdir or "package.json" file.
sudo npm install @admc.com/sqltool-linux-x86
```

# Usage
## For global installation:
```javascript
sqltool
```
## For local directory installation:
```javascript
node_modules/.bin/sqltool
```

See http://hsqldb.org/doc/2.0/util-guide/sqltool-chapt.html about how to use
SqlTool.
See http://hsqldb.org/doc/2.0/guide/index.html about the HyperSQL database engine.
