'use strict';


const CWD = process.cwd();
const Code = require('code');
const expect = Code.expect;
const path = require('path');

const utils = require( path.join(CWD, 'lib', 'utils') );

describe('fnToString(fn)', () => {

	it('should return function string', () => {

		let fn = function() {

		};

		let res = utils.fnToString(fn);

		expect( utils.fnToString(fn) )
			.to.be.a.string()
			.and.equal('function()');

	});


	it('should remove function name', () => {

		let fn = function myFunction() {

		};

		let res = utils.fnToString(fn);

		expect( utils.fnToString(fn) )
			.to.be.a.string()
			.and.equal('function()');

	});


	it('should remove whitespace', () => {

		let fn = function 	() {

		};

		let res = utils.fnToString(fn);

		expect( utils.fnToString(fn) )
			.to.be.a.string()
			.and.equal('function()');

	});



	it('should include arguments', () => {

		let fn = function(a,b) {

		};

		let res = utils.fnToString(fn);

		expect( utils.fnToString(fn) )
			.to.be.a.string()
			.and.equal('function(a,b)');

	});


	it('should remove whitespace from arguments', () => {

		let fn = function(  a ,   b 	) {

		};

		let res = utils.fnToString(fn);

		expect( utils.fnToString(fn) )
			.to.be.a.string()
			.and.equal('function(a,b)');

	});


	it('should remove comments from arguments', () => {

		let fn = function( /* A */ a , /* B */  b 	) {

		};

		let res = utils.fnToString(fn);

		expect( utils.fnToString(fn) )
			.to.be.a.string()
			.and.equal('function(a,b)');

	});


	it('should remove linebreak', () => {

		let fn = function( /* A */ a , /* B */  b 	) {

		};

		let res = utils.fnToString(fn);
		expect( utils.fnToString(fn) )
			.to.be.a.string()
			.and.equal('function(a,b)');

	});

	it('should sanitize arrow function', () => {

		let fn = ()=> {

		};

		let res = utils.fnToString(fn);

		expect( utils.fnToString(fn) )
			.to.be.a.string()
			.and.equal('function()');

	});

	it('should remove whitespace from arrow function', () => {

		let fn =    (   	a ,	b ) =>   	{

		};

		let res = utils.fnToString(fn);

		expect( utils.fnToString(fn) )
			.to.be.a.string()
			.and.equal('function(a,b)');

	});


	it('should remove comments from arrow function', () => {

		let fn = /**/ (/**/ a, /**/ b) /**/ => /**/	{

		};

		let res = utils.fnToString(fn);

		expect( utils.fnToString(fn) )
			.to.be.a.string()
			.and.equal('function(a,b)');

	});



});
