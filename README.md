# do-runtime

This is an open source for the [minimalist machine language *Do*](https://gist.github.com/derhuerst/3e98c06d4251f7207870).

***Do* is a fictive machine language** that reads, writes and jumps on a tape, **working like a [Turing machine](http://en.wikipedia.org/wiki/Turing_machine)**. Read [more about *Do*](https://gist.github.com/derhuerst/3e98c06d4251f7207870).



## Example

Let's assume you have the following [*Do* code](https://gist.github.com/derhuerst/3e98c06d4251f7207870).

```
0 0		0 0 0 0 0 0 0 0   // read from 0
0 1		0 0 0 0 1 0 1 1   // write to 11
1 0		1 1 1 1 1 1 1 1   // jump to the end
```

To execute it, load the runtime and initialize a new instance.

```javascript
var DoRuntime = require('do-runtime');

var r = Object.create(DoRuntime);
```

You have to pass the *tape* as an array of numbers. The second parameters is an optional `options` object.

```javascript
r.init([
	0, 0,	0, 0, 0, 0, 0, 0, 0, 0,
	0, 1,	0, 0, 0, 0, 1, 0, 1, 1,
	1, 0,	1, 1, 1, 1, 1, 1, 1, 1
], {   // The following are the default values.
	commandLength: 2,
	addressLength: 8,
	commands: ['read', 'write', 'goto', 'gotoIf'],
	pointer: 0,
	storage: 0
});
```

When you call `run`, the *Do* runtime will execute the program until it jumps to the end of the *tape* (or beyond).



## Install

```shell
npm install do-runtime
```



## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/do-runtime/issues).