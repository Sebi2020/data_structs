var expect = require('chai').expect;
var DoubleLinkedList = require('..').DoubleLinkedList;
describe('DoubleLinkedList', function() {
	it('Create a list', function(done) {
		var list = new DoubleLinkedList();
		expect(list._head).to.be.undefined;
		expect(list._tail).to.be.undefined;
		done();
	});
	describe('Add Functions', function () {
		describe('#addHead(value)', function () {
			it('should return true', function (done) {
				var list = new DoubleLinkedList();
				expect(list.addHead(1)).to.be.true;
				expect(list.addHead(2)).to.be.true;
				done();
			});
			it('should have set the right pointers', (done) => {
				var list = new DoubleLinkedList();
				list.addHead(1);
				list.addHead(2);
				expect(list._head.next.value).to.be.equal(1);
				expect(list._head.prev).to.be.undefined;
				expect(list._tail.next).to.be.undefined;
				expect(list._tail.prev.value).to.be.equal(2);
				done();
			});
		});
		describe('#addTail(value)', () => {
			it('should return true', function (done) {
				var list = new DoubleLinkedList();
				expect(list.addTail(1)).to.be.true;
				expect(list.addTail(2)).to.be.true;
				done();
			});
			it('should have set the right pointers', () => {
				var list = new DoubleLinkedList();
				list.addTail(1);
				list.addTail(2);
				expect(list._head.next.value).to.be.equal(2);
				expect(list._head.prev).to.be.undefined;
				expect(list._tail.next).to.be.undefined;
				expect(list._tail.prev.value).to.be.equal(1);
			});
		});
		describe('#append(elem, value)', () => {
			it('should append to elem', () => {
				var list = new DoubleLinkedList;
				list.addTail(1);
				list.addTail(2);
				list.addTail(3);
				var elem = list.get(2);
				var next_after_new = list.get(3);
				list.append(elem, 4);
				var newelem = list. get(4);

				expect(elem.next.value).to.be.equal(4);
				expect(newelem.prev.value).to.be.equal(2);
				expect(newelem.next.value).to.be.equal(3);
				expect(next_after_new.prev.value).to.be.equal(4);

			});
			it('modify head if necessary', () => {
				var list = new DoubleLinkedList();
				list.append(undefined, 1);
				expect(list._head.value).to.be.equal(1);
			});
			it('modify tail if necessary', () => {
				var list = new DoubleLinkedList();
				list.append(undefined, 1);
				expect(list._tail.value).to.be.equal(1);
			});
			it('preserve node links', () => {
				var list = new DoubleLinkedList;
				list.addTail(1);
				list.addTail(2);
				list.addTail(3);
				list.addTail(5);
				var elem = list.get(2);
				var next_after_new = list.get(3);
				list.append(elem, 4);
				expect(elem.prev.value).to.be.equal(1);
				expect(next_after_new.next.value).to.be.equal(5);
			});
		});
		describe('#prepend(elem, value)', () => {
			it('should prepend to elem', () => {
				var list = new DoubleLinkedList;
				list.addTail(1);
				list.addTail(2);
				list.addTail(3);
				list.addTail(4);
				var elem = list.get(3);
				var prev_before_new = list.get(2);
				list.prepend(elem, 4);
				var newelem = list. get(4);
				expect(elem.prev.value).to.be.equal(4);
				expect(newelem.prev.value).to.be.equal(2);
				expect(newelem.next.value).to.be.equal(3);
				expect(prev_before_new.next.value).to.be.equal(4);
			});
			it('modify head if necessary', () => {
				var list = new DoubleLinkedList();
				list.prepend(undefined, 1);
				expect(list._head.value).to.be.equal(1);
			});
			it('modify tail if necessary', () => {
		    	var list = new DoubleLinkedList();
				list.prepend(undefined, 1);
				expect(list._tail.value).to.be.equal(1);
			});
			it('preserve node links', () =>  {
				var list = new DoubleLinkedList;
				list.addTail(1);
				list.addTail(2);
				list.addTail(3);
				list.addTail(5);
				var elem = list.get(3);
				var prev_before_new = list.get(2);
				list.prepend(elem, 4);
				expect(elem.next.value).to.be.equal(5);
				expect(prev_before_new.prev.value).to.be.equal(1);
			});
		});
	});
	describe('Get functions', () => {
		var list;
		beforeEach((done) => {
			list = new DoubleLinkedList();
			list.addHead(2);
			list.addTail(3);
			list.addHead(1);
			list.addTail(4);
			done();
		});
		describe('#get(value)', () => {
			it('should return undefined for non existend values', () => {
				expect(list.get(0)).to.be.undefined;
			});
			it('should return true for existend values', () => {
				for(var i = 0; i < 5; i++) {
					expect(list.get(i)).to.be.not.false;
				}	
			});
		});
		describe('#getForwardIter()', () => {
			var iter;
			beforeEach(() => {
				iter = list.getForwardIter();
			});
			it('should return {value: *, done: false) object on next call', () => {
				var first = iter.next();
				expect(first.done).to.be.false;
				expect(first.value).to.exist;
			});
			it('shoudl return first element on first #next() call', () => {
				expect(iter.next()).to.be.eql({value:1, done:false});
			});
			it('should return done false until all items are processed', () => {
				var res;
				for(var i = 0; i<4; i++) {
					expect(iter.next().done).to.be.false; 
				}
				expect(iter.next().done).to.be.true;
			});
		});
		describe('#getReverseIter()', () => {
			var iter;
			beforeEach(() => {
				iter = list.getReverseIter();
			});
			it('should return {value: "val", done: false) object on next call', () => {
				var first = iter.next();
				expect(first.done).to.be.false;
				expect(first.value).to.exist;
			});
			it('shoudl return last element on first #next() call', () => {
				expect(iter.next()).to.be.eql({value:4, done:false});
			});
			it('should return done false until all items are processed', () => {
				var res;
				for(var i = 0; i<4; i++) {
					expect(iter.next().done).to.be.false; 
				}
				expect(iter.next().done).to.be.true;
			});
		});
	});
	describe('Delete Functions', () => {
		describe('#delete(value)', () => {
			it('should return false when empty', () => {
				var list = new DoubleLinkedList();
				expect(list.delete()).to.be.false;
			});
			it('should return false on non existing values', () => {
				var list = new DoubleLinkedList();
				for(var i = 0; i < 5; i++) {
					list.addTail(i);
				}
				expect(list.delete(5)).to.be.false;
			});	
			it('should return true on existing values', () => {
				var list = new DoubleLinkedList();
				for(var i = 0; i< 5; i++) {
					list.addTail(i);
				}
				expect(list.delete(4)).to.be.true;
			});
		});
		describe('#deleteHead()', function () {
			var list = new DoubleLinkedList();
			before(function () {
				for(var i = 0; i < 5; i++) {
					list.addTail(i);
				}
			});
			it('should remove the head element', () => {
				list.deleteHead();
				for(var i = 1; i < 5; i++) {
					expect(list.get(i)).to.not.be.undefined;
				}
				expect(list.get(0)).to.be.undefined;
			});
		});
		describe('#deleteTail()', function () {
			var list = new DoubleLinkedList();
			before(function () {
				for(var i = 0; i < 5; i++) {
					list.addTail(i);
				}
			});
			it('should remove the tail element', () => {
				list.deleteTail();
				for(var i = 1; i < 4; i++) {
					expect(list.get(i)).to.not.be.undefined;
				}
				expect(list.get(4)).to.be.undefined;
			});
		});
	});
});
