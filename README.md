# Description
Node.js module for executing SqlTool to issue SQL to any JDBC database
or for running HyperSQL database instances under node.js
on Linux X86.

SqlTool provides a scripting/automation interface and interactive console
interface to JDBC Databases.
HyperSQL database engine is bundled, but you can access any other JDBC
database by following the instructions below.

# Installation
An RC file is a text file that encapsulates database connection details.
### install /usr/bin/sqltool:
```bash
sudo npm install -g @admc.com/sqltool-linux-x86

# Do this just one time if you have no sqltool.rc file before-hand:
sqltool -s
```

### install under your current directory
```bash
# If you don't already have a node_modules subdir or "package.json" file:
npm init -y
sudo npm install @admc.com/sqltool-linux-x86
# Do this just one time if you have no sqltool.rc file before-hand:
node_modules/.bin/sqltool -s
```

Regardless whether you did a global or local installation, to upgrade to
newer releases, just repeat the same installation command you gave for the
initial install.

The sqltool.rc file in your home directory sets up the `mem` urlid used to
connect to a personal, local in-memory HyperSQL database as described below,
and has a commented example that you can update for connecting to some
other database.

If you prefer to give connection details directly on the command-line, then
forget the the RC file and instead of the "mem" argument given  in the
Usage section below, give arguments like this:
```
...sqltool -- --InlineRc=url=jdbc:hsqldb:mem:name,user=SA,password=
```

# Usage with a HyperSQL database.
This is how to get an interactive console connection to an in-memory HyperSQL database.

To run SqlTool without connecting to any database, just skip the "mem" argument.
(From the interactive SqlTool session you can connect to databases, or play around un-connected).

You can duplicate the provided stanza in your ~/sqltool.rc file and change the
urlid and URL to connect to any HyperSQL database, local remote,
in-memory or persistent.

### For global installation:
```cmd
sqltool mem
CREATE TABLE t(i int, s varchar(20));      -- any sql
INSERT INTO t VALUES(1, 'one');
-- list available tables:
\dt
SELECT * FROM t;
-- quit:
\q
```
### For local directory installation:
Same as for global installation, except invoke SqlTool like this:
```cmd
node_modules/.bin/sqltool mem
```

# Usage with any other JDBC database (i.e. other than HyperSQL)
1. You need to acquire the JDBC driver jar file for the database.
For Java databases (such as Derby), you will have to look through the
 product docs because there may be different jar files for in-memory
 vs. local-file vs. remote databases, and there could be additional
 jar file dependencies.
For non-Java databases, just get the normal thin JDBC driver jar file.
1. Edit your `~/sqltool.rc` file, adding a stanza for the database.
The provided skeleton sqltool.rc file has a comment telling where you
can see stanza examples for many different database types.
1. Use JRE switch '-cp' to add the JDBC driver jar file to the invocation
classpath.  If you installed the sqltool module locally, change the
invocation patch accordingly.  Here's how I succesfully access the a
MariaDB server through urlid entry 'maria' in my RC file:
```
sqltool -cp /usr/local/lib/mariadb-java-client-3.0.1-beta.jar -- maria
```
The "--" (non-)switch is unnecessary here, but would be required if you
also give any switches to SqlTool.

# References
* [this section of SqlTool User Guide](http://hsqldb.org/doc/2.0/util-guide/sqltool-chapt.html#sqltool_ilauth-sect) about giving connection details on the command line rather than in an RC file.
* [SqlTool User Guide](http://hsqldb.org/doc/2.0/util-guide/sqltool-chapt.html) about how to use SqlTool.
* [HyperSQL User Guide](http://hsqldb.org/doc/2.0/guide/index.html) about how to use the HyperSQL database engine.
* node_modules/@admc.com/sqltool\*/artifacts\sqltool-samples.rc
 examples for connecting to many different databases.

