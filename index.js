'use strict';

const Midge = require('./lib/midge');

module.exports = function(cache, factory) {
	return new Midge(cache, factory);
};
