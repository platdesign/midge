'use strict';


const CWD = process.cwd();
const Code = require('code');
const expect = Code.expect;
const path = require('path');

const utils = require(path.join(CWD, 'lib', 'utils'));



describe('annotate(fn, key)', () => {



	describe('with given function', () => {

		let result;
		beforeEach(() => {
			let fn = function    /**/(a, b) {

			};

			result = utils.annotate(fn);
		});



		it('should return a function', () => {

			expect(result)
				.to.be.a.function();

		});



		it('should have correct $inject attribute', () => {

			expect(result.$inject)
				.to.be.an.array()
				.and.to.have.length(2)
				.and.to.equal(['a', 'b']);

		});



	});



	describe('with given arrow function', () => {

		let result;
		beforeEach(() => {
			let fn = (a, b) => {

			};

			result = utils.annotate(fn);
		});



		it('should return a function', () => {

			expect(result)
				.to.be.a.function();

		});



		it('should have correct $inject attribute', () => {

			expect(result.$inject)
				.to.be.an.array()
				.and.to.have.length(2)
				.and.to.equal(['a', 'b']);

		});

	});



	describe('with given function and custom key', () => {

		let result;
		beforeEach(() => {
			let fn = function(a, b) {

			};

			result = utils.annotate(fn, '_myInject');
		});



		it('should return a function', () => {

			expect(result)
				.to.be.a.function();

		});



		it('should have correct $inject attribute', () => {

			expect(result._myInject)
				.to.be.an.array()
				.and.to.have.length(2)
				.and.to.equal(['a', 'b']);

		});

	});



	describe('with given arrow function', () => {

		let result;
		beforeEach(() => {
			let fn = (a, b) => {

			};

			result = utils.annotate(fn, '_myInject');
		});



		it('should return a function', () => {

			expect(result)
				.to.be.a.function();

		});



		it('should have correct $inject attribute', () => {

			expect(result._myInject)
				.to.be.an.array()
				.and.to.have.length(2)
				.and.to.equal(['a', 'b']);

		});

	});


	describe('with given arrow function', () => {

		let result;
		beforeEach(() => {
			let fn = ['a', 'b', function(c, d) {

			}];

			result = utils.annotate(fn, '_myInject');
		});



		it('should return a function', () => {

			expect(result)
				.to.be.a.function();

		});



		it('should have correct $inject attribute', () => {

			expect(result._myInject)
				.to.be.an.array()
				.and.to.have.length(2)
				.and.to.equal(['a', 'b']);

		});

	});


});
