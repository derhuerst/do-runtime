'use strict';



function binToDec (bits) {
	var result = 0;
	var length = bits.length;
	var i;
	for (i = 0; i < length; i++) {
		result += bits[i] * Math.pow(2, length - i - 1);
	}
	return result;
}



var Runtime = module.exports = {



	init: function (tape, options) {
		var i;

		options = options || {};
		this.commandLength = options.commandLength || 2;
		this.addressLength = options.addressLength || 8;
		this.commands = options.commands || [
			'read',
			'write',
			'goto',
			'gotoIf'
		];
		// reverse lookup table
		for (i = 0; i < this.commands.length; i++) {
			this.commands[this.commands[i]] = i;
		}

		if (tape && tape.length > 0)
			this.tape = tape;
		else
			this.tape = [];
		if (this.tape.length % (this.commandLength + this.addressLength) != 0)
			throw new Error('The tape length is not a multiple of a but length.');
		this.pointer = options.pointer || 0;
		this.storage = options.storage || 0;

		return this;
	},



	tick: function () {
		var n = this.pointer + this.commandLength;

		var command = binToDec(this.tape.slice(this.pointer, n));
		var address = binToDec(this.tape.slice(n, n + this.addressLength));
		switch (command) {

			case this.commands.read:
				this.storage = this.tape[address];
				this.pointer = n + this.addressLength;
				break;

			case this.commands.write:
				this.tape[address] = this.storage;
				this.pointer = n + this.addressLength;
				break;

			case this.commands.goto:
				this.pointer = address;
				break;

			case this.commands.gotoIf:
				if (this.storage === 1)
					this.pointer = address;
				break;

			default:
				throw new Error('Unknown command `' + this.commands[command] + '`.');
		}
	},



	run: function () {
		var length = this.tape.length - this.commandLength - this.addressLength;
		while (this.pointer <= length) {
			this.tick();
		}
	}



};