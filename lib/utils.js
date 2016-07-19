'use strict';


module.exports = {
	fnToString: fnToString,
	annotate: annotate,
	functionName: functionName
};





const COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const PARAMS = /(^function\s*[^\(]*\(\s*([^\)]*)\))|^\s*\(([^\)]*)\)/m;


/**
 * Converts a function to string
 * @param  {Function} fn
 * @return {String}
 */
function fnToString (fn) {

	// remove whitespace
	let fnString = fn.toString().replace(/\s/mg, '');

	// Remove comments
	fnString = fnString.replace(COMMENTS, '');


	// Match params
	let args = fnString.match(PARAMS);

	// Sanitize signature
	if (args) {
		fnString = 'function(' + (args[2] || args[3] || '').replace(/[\s\r\n]+/, ' ') + ')';
	} else {
		fnString = 'function()';
	}

	return fnString;
}


/**
 * Converts a function into an array where the last item is the function itself
 * and the previous items the argments which the function expects as strings.
 *
 * @param  {Function|Array} fn
 * @return {Array}
 */
function annotate(fn, key) {

	key = key || '$inject';

	if(fn[key]) {
		return fn;
	} else if( Array.isArray(fn) ) {

		let _fn = fn.pop();
		_fn[key] = fn.concat();
		return _fn;
	} else {

		let fnString = fnToString(fn);

		let _args = PARAMS.exec(fnString);

		let args = _args[2] || _args[2];

		// return array of parameters
		let params = args.split(/\s*,\s*/).filter(function (param) {
			return param;
		});

		fn[key] = params;
		return fn;

	}

}



/**
 * Returns the name of a given function
 * @param  {Function} fun
 * @return {String}   name
 */
function functionName(fn) {
  var ret = fn.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}

