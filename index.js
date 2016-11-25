'use strict';

const Midge = require('./lib/midge');
const AsyncMidge = require('./lib/async-midge');


module.exports = function(cache, factory) {
	return new Midge(cache, factory);
};

module.exports.async = function(cache, factory) {
	return new AsyncMidge(cache, factory);
};
