# do-runtime

**Deprecated.**

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)
[![npm version](https://img.shields.io/npm/v/do-runtime.svg)](https://www.npmjs.com/package/do-runtime)
[![bower version](https://img.shields.io/bower/v/do-runtime.svg)](bower.json)
![MIT-licensed](https://img.shields.io/github/license/derhuerst/do-runtimesvg)

This is an open source runtime for the [minimalist machine language *Do*](https://gist.github.com/derhuerst/3e98c06d4251f7207870).

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
