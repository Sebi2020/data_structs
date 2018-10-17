expect = require('chai').expect;
fifo = require('..').fifo;
AsyncFifo = require('..').AsyncFifo;

describe('Fifo Queue', function () {
	it('should create an empty fifo-queue with size 3', function (done) {
		var qu = new fifo(3);
		expect(qu.max).to.be.equal(3);
		expect(qu._list).to.exist;
		expect(qu._list._head).to.be.undefined;
		expect(qu._list._tail).to.be.undefined;
		done();
	});
	describe('#push(value)', function () {
		var qu;
		beforeEach(() => {
			qu = new fifo(3);
		});
		it('should increase size by one', (done) => {
			expect(() => qu.push(0)).to.increase(() => qu.current_size).by(1);
			done();
		});
		it('should add an element', function() {
			qu.push(12);
			expect(qu._list._head).to.exist;
			expect(qu._list._head.value).to.be.equal(12);
		});
		it('should add not more than 3 elements', () => {
			for(var i = 0; i < 3; i++) {
				expect(qu.push(i)).to.be.true;
			}
			expect(qu.push(4)).to.be.false;
		});
	});
	describe('#pull()', () => {
		let q;
		beforeEach(() => {
			q = new fifo(3);
			for(var i = 0; i < 3; i++) q.push(i);
		});
		it('should decrease size by one', () => {
			expect(() => q.pull()).to.decrease(() => q.current_size).by(1);
		});
		it('should extract the first element', function () {
			expect(q.pull()).to.be.equal(0);
		});
		it('should extract not more than 3 elements', () => {
			for(var i = 0; i < 3; i++) {
				expect(q.pull()).to.not.be.null;
			}
			expect(q.pull()).to.be.null;
		});
	});
	describe('#peek()', function () {
		var q;
		beforeEach(function () {
			q = new fifo(3);
			for(var i = 0; i < 3; i++) q.push(i);
		});
		it('should not change the queue size', function () {
			expect(() => q.peek()).to.not.change(() => q.current_size);
		});
		it('should return the first element', () => {
			expect(q.peek()).to.be.equal(0);
		});
	});
	describe('#flush()', function () {
		q = new fifo(3);
		beforeEach(() => {
			q.push(0);
			q.push(1);
		});
		it('should flush the entire queue', () => {
			expect(q.current_size).to.be.above(0);
			q.flush();
			expect(q.current_size).to.be.equal(0);
			expect(q._list._head).to.be.undefined;
			expect(q._list._tail).to.be.undefined;
		})
	});
});
describe('Asynchronious Fifo', () => {
	describe('#push(value)', () => {
		it('should emit \'data\' on push and add the new value to the queue', (done) => {
			a = new AsyncFifo(3);
			a.on('data', (q) => {
				expect(q.peek()).to.not.be.null;
				done();
			});
			a.push("value");
		});
		it('should emit \'full\' if maximum queue size is reached', (done) => {
			a = new AsyncFifo(3);
			a.on('full', () => done());
			a.push(1);
			a.push(1);
			a.push(1);
			expect(a.push(1)).to.be.false;
		}).timeout(1);
	});
	describe('emit \'data\' event', () => {
		it('should include a queue reference', (done) => {
			a = new AsyncFifo(3);
			a.on('data', (q) => {
				expect(q).to.not.be.undefined;
				expect(q.current_size).to.be.equal(1);
				done();
			});
			a.push(0);
		});
	});
	describe('#pull()', () => {
		var a;
		beforeEach(() => {
			a = new AsyncFifo(2);
		});
		it('should return the last element', () => {
			a.push(0);
			expect(a.pull()).to.be.equal(0);
		});
		it('should emit empty if no elemennt is available', (done) => {
			a.push(0);
			a.on('empty', done);
			a.pull();
			expect(a.pull()).to.be.null;
		}).timeout(1);
	});
	describe('#flush', () => {
		it('should flush the queue', () => {
			a = new AsyncFifo(3);
			a.push(0);
			a.push(1);
			a.flush();
			expect(a.pull()).to.be.null;
		});
		it('should emit the flush event', (done) => {
			a = new AsyncFifo(3);
			a.on('flush', done);
			a.flush();
		}).timeout(1);
	});
});