expect = require('chai').expect;
dutil = require('..');
describe('Lifo Queues', () => {
	describe('Stack', () => {
		var limited;
		beforeEach(() => {
			limited = new dutil.lifo(3);
		});
		it('should create an empty stack with size 3', () => {
			expect(limited.current_size).to.be.equal(0);
			expect(limited.max).to.be.equal(3);
		});
		describe('#push', () => {
			it('should increase size by one', () => {
				expect(() => limited.push(3)).to.increase(() => limited.current_size).by(1);
			});
			it('should add the element', () => {
				limited.push(3);
				expect(limited._list._head.value).to.be.equal(3);
			});
			it('should not add more than 3 elements if limited by 3', () =>  {
				for(var i = 0; i < 3; i++) {
					expect(limited.push(i)).to.be.true;
				} 
				expect(limited.push(4)).to.be.false;
				expect(limited._list._tail.value).to.be.equal(2);
			});
		});
		describe('#pop', () => {
			it('should decrease size by one', () => {
				limited.push(3);
				limited.push(3);
				expect(() => limited.pop(3)).to.decrease(() => limited.current_size).by(1);
				expect(() => limited.pop(3)).to.decrease(() => limited.current_size).by(1);
			});
			it('should return null if there is no element', () => {
				expect(limited.pop()).to.be.null;
			});
			it('should remove one element', () => {
				limited.push(3);
				expect(limited.pop()).to.be.not.null;
				expect(limited._list._head).to.be.undefined;
			});
		});
		describe('#peek', () => {
			it('should return null if there is no element', () => {
				expect(limited.peek()).to.be.null;
			});
			it('should return the last element after pop', () => {
				limited.push(3);
				limited.push(4);
				limited.pop();
				expect(limited.peek()).to.be.equal(3);
			});
			it('should return last element after push', () => {
				limited.push(3);
				limited.push(4);
				limited.pop();
				limited.push(5);
				expect(limited.peek()).to.be.equal(5);
			});
		});
		describe('#flush', () => {
			it('should delete the entire stack', () => {
				limited.push(3);
				limited.flush();
				expect(limited._list).to.not.be.undefined;
				expect(limited._list._head).to.be.undefined;
				expect(limited._list._tail).to.be.undefined;
			});
			it('should set size to 0', () => {
				limited.push(3);
				limited.flush();
				expect(limited.current_size).to.be.equal(0);	
			});
		});
	});
	describe('ArrayStack', () => {
		var ulimited;
		var limited;
		beforeEach(() => {
			ulimited = new dutil.ArrayStack();
			limited = new dutil.ArrayStack(3);
		});
		it('should create an empty stack with size 3', () => {
			expect(limited._size).to.be.equal(0);
			expect(limited.limit).to.be.equal(3);
		});
		it('should create an empty stack with unlimited size', () => {
			expect(ulimited._size).to.be.equal(0);
			expect(ulimited.limit).to.be.equal(Infinity);
		});
		describe('#push', () => {
			it('should increase size by one', () => {
				expect(() => ulimited.push(3)).to.increase(() => ulimited._size).by(1);
				expect(() => limited.push(3)).to.increase(() => limited._size).by(1);
			});
			it('should add the element', () => {
				ulimited.push(3);
				limited.push(3);
				expect(ulimited._stack[0]).to.be.equal(3);
				expect(limited._stack[0]).to.be.equal(3);
			});
			it('should not add more than 3 elements if limited by 3', () =>  {
				for(var i = 0; i < 3; i++) {
					expect(limited.push(i)).to.be.true;
				} 
				expect(limited.push(4)).to.be.false;
				expect(limited._stack[2]).to.be.equal(2);
			});
			it('should add more than 3 elements if unlimited (test with 100)', () => {
				for(var i = 0; i < 100; i++) {
					expect(ulimited.push(i)).to.be.true;
				}
				expect(ulimited._stack[99]).to.be.equal(99);
			});
		});
		describe('#pop', () => {
			it('should decrease size by one', () => {
				ulimited.push(3);
				limited.push(3);
				expect(() => ulimited.pop(3)).to.decrease(() => ulimited._size).by(1);
				expect(() => limited.pop(3)).to.decrease(() => limited._size).by(1);
			});
			it('should return null if there is no element', () => {
				expect(ulimited.pop()).to.be.null;
			});
			it('should remove one element', () => {
				ulimited.push(3);
				expect(ulimited.pop()).to.be.not.null;
				expect(ulimited._stack[0]).to.be.undefined;
			});
		});
		describe('#peek', () => {
			it('should return null if there is no element', () => {
				expect(ulimited.peek()).to.be.null;
			});
			it('should return the last element after pop', () => {
				ulimited.push(3);
				ulimited.push(4);
				ulimited.pop();
				expect(ulimited.peek()).to.be.equal(3);
			});
			it('should return last element after push', () => {
				ulimited.push(3);
				ulimited.push(4);
				ulimited.pop();
				ulimited.push(5);
				expect(ulimited.peek()).to.be.equal(5);
			});
		});
		describe('#flush', () => {
			it('should delete the entire stack', () => {
				ulimited.push(3);
				ulimited.flush();
				expect(ulimited._stack).to.not.be.undefined;
				expect(ulimited._stack[0]).to.be.undefined;
			});
			it('should set size to 0', () => {
				ulimited.push(3);
				ulimited.flush();
				expect(ulimited._size).to.be.equal(0);
			});
		});
	});
});