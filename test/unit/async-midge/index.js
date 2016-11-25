'use strict';


const CWD = process.cwd();
const Code = require('code');
const expect = Code.expect;
const path = require('path');

const Midge = require(path.join(CWD)).async;

describe('Async-Midge', () => {

	describe('loading from cache or given locals', () => {

		let injector;
		beforeEach(() => {
			const cache = {
				a: 123,
				b: 234
			};
			injector = Midge(cache, (name) => {
				throw new Error(`${name} not found`);
			});
		});



		it('get(name) should return expected value', () => {
			return injector.get('a')
				.then((res) => expect(res).to.equal(123));
		});



		it('get(array) should return expected values', () => {

			return injector.get(['a', 'b'])
				.then((res) => {
					expect(res)
						.to.be.an.array()
						.to.have.length(2)
						.to.equal([123, 234]);
				});

		});



		describe('factory scope', () => {

			it('invoke(fn) should bind undefined as this', () => {

				injector.invoke(function() {

					expect(this)
						.to.be.undefined();

				});

			});



			it('invoke(fn, null) should bind undefined as this', () => {

				injector.invoke(function() {

					expect(this)
						.to.be.undefined();

				}, null);

			});



			it('invoke(fn, obj) should bind obj as this', () => {

				injector.invoke(function() {

					expect(this)
						.to.be.an.object();

					expect(this.test)
						.to.be.a.number()
						.to.equal(123);

				}, {
					test: 123
				});

			});



		});


		describe('injecting params with invoke', () => {



			it('invoke(fn) should inject expected value into fn', () =>
				injector.invoke((a) => {
					expect(a)
						.to.equal(123);
				})
			);



			it('invoke(fn) should inject multiple expected values into fn', () => {
				injector.invoke((a, b) => {
					expect(a)
						.to.equal(123);

					expect(b)
						.to.equal(234);
				});
			});



			it('invoke(fn, self, locals) should inject local value instead of cached', () => {

				injector.invoke(function(a) {

					expect(this)
						.to.be.undefined();

					expect(a)
						.to.equal(321);

				}, null, {
					a: 321
				});

			});



			it('invoke(fn, self, locals) should inject multiple local values instead of cached', () => {

				injector.invoke(function(a, b) {

					expect(this)
						.to.be.undefined();

					expect(a)
						.to.equal(321);

					expect(b)
						.to.equal(432);

				}, null, {
					a: 321,
					b: 432
				});

			});



		});



		describe('injecting params with instantiate', () => {



			it('instantiate(fn) should create new instance of fn', () => {
				injector.instantiate(function() {

					expect(this)
						.to.be.an.object();

				});
			});



			it('instantiate(fn) should inject expected value into fn', () => {
				injector.instantiate(function(a) {

					expect(a)
						.to.equal(123);

				});
			});



			it('instantiate(fn) should inject multiple expected values into fn', () => {
				injector.instantiate(function(a, b) {

					expect(a)
						.to.equal(123);

					expect(b)
						.to.equal(234);

				});
			});



			it('instantiate(fn) should inject local value instead of cached into fn', () => {
				injector.instantiate(function(a) {

					expect(a)
						.to.equal(321);

				}, {
					a: 321
				});
			});



			it('instantiate(fn) should inject multiple local values instead of cached into fn', () => {
				injector.instantiate(function(a, b) {

					expect(a)
						.to.equal(321);

					expect(b)
						.to.equal(432);

				}, {
					a: 321,
					b: 432
				});
			});



		});

	});


	describe('loading from factory or given locals', () => {


		const constructors = {
			a: () => 123,
			b: () => 234
		};

		let injector;
		let cache;
		beforeEach(() => {
			cache = {};
			injector = Midge(cache, (name) => {
				return constructors[name]();
			});
		});



		it('get(name) should return expected value', () => {
			return injector.get('a')
				.then(res => expect(res).to.equal(123));
		});



		it('get(array) should return expected values', () => {

			return injector.get(['a', 'b'])
				.then(res => {
					expect(res)
						.to.be.an.array()
						.to.have.length(2)
						.to.equal([123, 234]);
				});

		});



		describe('factory scope', () => {

			it('invoke(fn) should bind undefined as this', () => {

				injector.invoke(function() {

					expect(this)
						.to.be.undefined();

				});

			});



			it('invoke(fn, null) should bind undefined as this', () => {

				injector.invoke(function() {

					expect(this)
						.to.be.undefined();

				}, null);

			});



			it('invoke(fn, obj) should bind obj as this', () => {

				injector.invoke(function() {

					expect(this)
						.to.be.an.object();

					expect(this.test)
						.to.be.a.number()
						.to.equal(123);

				}, {
					test: 123
				});

			});



		});


		describe('injecting params with invoke', () => {



			it('invoke(fn) should inject expected value into fn', () =>
				injector.invoke((a) => {
					expect(a)
						.to.equal(123);
				})
			);



			it('invoke(fn) should inject multiple expected values into fn', () => {
				injector.invoke((a, b) => {
					expect(a)
						.to.equal(123);

					expect(b)
						.to.equal(234);
				});
			});



			it('invoke(fn, self, locals) should inject local value instead of cached', () => {

				injector.invoke(function(a) {

					expect(this)
						.to.be.undefined();

					expect(a)
						.to.equal(321);

				}, null, {
					a: 321
				});

			});



			it('invoke(fn, self, locals) should inject multiple local values instead of cached', () => {

				injector.invoke(function(a, b) {

					expect(this)
						.to.be.undefined();

					expect(a)
						.to.equal(321);

					expect(b)
						.to.equal(432);

				}, null, {
					a: 321,
					b: 432
				});

			});



		});



		describe('injecting params with instantiate', () => {



			it('instantiate(fn) should create new instance of fn', () => {
				injector.instantiate(function() {

					expect(this)
						.to.be.an.object();

				});
			});



			it('instantiate(fn) should inject expected value into fn', () => {
				injector.instantiate(function(a) {

					expect(a)
						.to.equal(123);

				});
			});



			it('instantiate(fn) should inject multiple expected values into fn', () => {
				injector.instantiate(function(a, b) {

					expect(a)
						.to.equal(123);

					expect(b)
						.to.equal(234);

				});
			});



			it('instantiate(fn) should inject local value instead of cached into fn', () => {
				injector.instantiate(function(a) {

					expect(a)
						.to.equal(321);

				}, {
					a: 321
				});
			});



			it('instantiate(fn) should inject multiple local values instead of cached into fn', () => {
				injector.instantiate(function(a, b) {

					expect(a)
						.to.equal(321);

					expect(b)
						.to.equal(432);

				}, {
					a: 321,
					b: 432
				});
			});



		});




		describe('caching', () => {

			it('if instantiated through factory the promise should be available in cache', () => {

				return injector.get('a')
					.then(() => {

						expect(cache.a)
							.to.be.instanceOf(Promise);

					});


			});

		});


	});

});
