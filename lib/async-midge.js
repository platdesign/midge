'use strict';


const utils = require('./utils');




function MidgePrivate(cache, factory) {


	function getService(serviceName) {
		if (cache.hasOwnProperty(serviceName)) {
			return Promise.resolve(cache[serviceName]);
		} else {
			return (cache[serviceName] = Promise.resolve(factory.apply(cache.$injector, [serviceName])));
		}
	}


	this.get = function(name, locals) {
		locals = locals || {};

		if(Array.isArray(name)) {
			return Promise.all(name.map((name) => this.get(name, locals)));
		}

		return locals.hasOwnProperty(name) ? Promise.resolve(locals[name]) : getService(name);
	};


}



class AsyncMidge extends MidgePrivate {

	invoke(fn, scope, locals) {
		let annotated = utils.annotate(fn, '$inject');

		return this.get(annotated.$inject, locals)
			.then(args => {
				delete annotated.$inject;
				return annotated.apply(scope || undefined, args);
			});
	}

	instantiate(ctor, locals) {
		let annotated = utils.annotate(ctor, '$inject');

		return this.get(annotated.$inject, locals)
			.then((args) => {
				delete annotated.$inject;
				args.unshift(null);
				return new (Function.prototype.bind.apply(annotated, args))();
			});
	}

}

module.exports = AsyncMidge;
