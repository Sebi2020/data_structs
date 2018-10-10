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
		describe.skip('#append(elem, value)', () => {
			it('should append to elem');
			it('modify head if necessary');
			it('modify tail if necessary');
			it('preverse node links');
		});
		describe.skip('#prepend(elem, value)', () => {
			it('should prepend to elem');
			it('modify head if necessary');
			it('modify tail if necessary');
			it('preverse node links');
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
	});
	describe('#get(value)', () => {
		var list = new DoubleLinkedList();
		list.addHead(2);
		list.addTail(3);
		list.addHead(1);
		list.addTail(4);
		it('should return undefined for non existend values', () => {
			expect(list.get(0)).to.be.undefined;
		});
		it('should return true for existend values', () => {
			for(var i = 0; i < 5; i++) {
				expect(list.get(i)).to.be.not.false;
			}
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
			beforeEach(function () {
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
	});
	/*describe('#flush()', () => {
		it('should delete the entire queue', () => {
			var list = new data.DoubleLinkedList();
			list.addHead(1); list.addHead(2);
			list.flush();
			expect(list._head).to.be.undefined;
			expect(list._tail).to.be.undefined;
		});
	})*/
});
