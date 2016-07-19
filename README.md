# midge

Mini Injector

[![Build Status](https://travis-ci.org/platdesign/midge.svg?branch=master)](https://travis-ci.org/platdesign/midge)

# Install

`npm install --save midge`

# Usage

```javascript
const Midge = require('midge');

const cache = {
	a: 123,
	b: 321
};

const factories = {
	c: function(a, b) {
		return a + b;
	},
	d: function(b, c) {
		return b + c;
	}
};

// Create injector instance
const injector = Midge(cache, function factory(name) {
	return injector.invoke(factories[name]);
});


// Get results
let a = injector.get('a');
let b = injector.get('b');
let c = injector.get('c');
let d = injector.get('d');

expect(a).to.equal(123);
expect(b).to.equal(321);
expect(c).to.equal(a + b);
expect(d).to.equal(b + c);


// Injecting into functions
injector.invoke(function(a,b,c,d) {
	expect(a).to.equal(123);
	expect(b).to.equal(321);
	expect(c).to.equal(a + b);
	expect(d).to.equal(b + c);
});


// Injecting into constructors
injector.instantiate(function(a,b,c,d) {
	expect(this).to.be.an.object();
	expect(a).to.equal(123);
	expect(b).to.equal(321);
	expect(c).to.equal(a + b);
	expect(d).to.equal(b + c);
});

```



# API

## Injector methods

### `injector.get(name)`

Returns instance(s) from cache or creates it/them by executing the injector `factory`.

- `name` - A string or an array of strings with service-names.


### `injector.invoke(fn, [self], [locals])`

Injects the given function while executing it with `apply`.

- `fn` - Function to inject.
- `self` - Object which will be bound to `fn` as `this`.
- `locals` - Optional object containing values, which will be used before before cache and factory.


### `injector.instatntiate(ctor, [locals])`

Injects the given constructor while instantiating it with `new`

- `ctor` - Constructor to inject.
- `locals` - Optional object containing values, which will be used before before cache and factory.


#Author

Twitter: [@platdesign](https://twitter.com/platdesign)
