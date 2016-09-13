We've been working with solely SQL without connecting it to an Express server. Today, that changes! Remember the diagram we took a look at previously:

```
┌─── Chrome ──┐               ┌── Node.js ──┐               ┌── database system ──┐
│             │─── request ──▶│             │──── write ───▶│                     │
│             │               │             │               │                     │
│             │               │             │               │                     │
│             │               │             │               │                     │
│             │               │             │               │                     │
│             │◀── response ──│             │◀─── read ─────│                     │
└─────────────┘               └─────────────┘               └─────────────────────┘
```

To connect our Node.js server, we'll be using [pg-promise](https://github.com/vitaly-t/pg-promise).

<hr style="margin: 5rem 0;"/>

## Get Started

To get started, follow along with [this blog post](http://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/#.V8b09ZMrJE5).

<br>
### Additional Resources

* [Express with pg](https://github.com/gSchool/node-curriculum/blob/master/Express/PG.md)

* [Node with PostgreSQL](https://github.com/brianc/node-postgres)
