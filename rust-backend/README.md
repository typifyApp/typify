# Commands to run to setup database.

```
mkdir database
initdb -D database
pg_ctl -D database start
createdb typify
```