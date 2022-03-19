# Description
Node.js modules for executing SqlTool to issue SQL to any JDBC database
or for running HyperSQL database instances under node.js
on Linux X86.

SqlTool provides a scripting/automation interface and interactive console
interface to JDBC Databases.
HyperSQL database engine is bundled, but you can access any other JDBC
database by just downloading the JDBC driver SQL file for the database.

# Installation
### install /usr/bin/sqltool:
```bash
sudo npm install -g @admc.com/sqltool-linux-x86
# Do this just one time if you have no sqltool.rc file before-hand:
cp /usr/lib/node_modules/@admc.com/sqltool-linux-x86/arifacts/sqltool ~
```

### install under your current directory
```bash
# If you don't already have a node_modules subdir or "package.json" file:
npm init -y
sudo npm install @admc.com/sqltool-linux-x86
# Do this just one time if you have no sqltool.rc file before-hand:
cp node_modules/@admc.com/sqltool-linux-x86/arifacts/sqltool ~
```

Regardless whether you did a global or local installation, to upgrade to
newer releases, just repeat the same installation command you gave for the
initial install.

The sqltool.rc file in your home directory sets up the `mem` urlid used to
connect to a personal, local in-memory HyperSQL database as described below.

# Usage
This is how to get an interactive console connection to an in-memory HyperSQL database.

To run SqlTool without connecting to any database, just skip the "mem" argument.
(From the interactive SqlTool session you can connect to databases, or play around un-connected).

### For global installation:
```cmd
sqltool mem
```
### For local directory installation:
```cmd
node_modules/.bin/sqltool mem
```

See [SqlTool User Guide](http://hsqldb.org/doc/2.0/util-guide/sqltool-chapt.html) about how to use SqlTool.
See [HyperSQL User Guide](http://hsqldb.org/doc/2.0/guide/index.html) about how to use the HyperSQL database engine.
