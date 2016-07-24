'use strict';


const utils = require('./utils');


function MidgePrivate(cache, factory) {

	const INSTANTIATING = {};
	const path = [];


	function getService(serviceName) {
		if (cache.hasOwnProperty(serviceName)) {
			if (cache[serviceName] === INSTANTIATING) {
				throw new Error('Circular dep');
			}
			return cache[serviceName];
		} else {
			try {
				path.unshift(serviceName);
				cache[serviceName] = INSTANTIATING;
				return (cache[serviceName] = factory.apply(cache.$injector, [serviceName]));
			} catch (err) {
				if (cache[serviceName] === INSTANTIATING) {
					delete cache[serviceName];
				}
				throw err;
			} finally {
				path.shift();
			}
		}
	}


	this.get = function(name, locals) {
		locals = locals || {};

		if(Array.isArray(name)) {
			return name.map((name) => this.get(name, locals));
		}

		return locals.hasOwnProperty(name) ? locals[name] : getService(name);
	};


}





class Midge extends MidgePrivate {

	invoke(fn, scope, locals) {
		let annotated = utils.annotate(fn, '$inject');
		let args = this.get(annotated.$inject, locals);
		delete annotated.$inject;
		return annotated.apply(scope || undefined, args);
	}

	instantiate(ctor, locals) {
		let annotated = utils.annotate(ctor, '$inject');
		let args = this.get(annotated.$inject, locals);
		delete annotated.$inject;
		args.unshift(null);
		return new (Function.prototype.bind.apply(annotated, args))();
	}

}

module.exports = Midge;
