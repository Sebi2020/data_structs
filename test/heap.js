heap = require('../heap.js');
expect = require('chai').expect;


describe('Orders', () => {
	var keys = [
		{key: 5, value:"string"},
		{key: 1, value:"string"},
		{key: 2, value:"string"},
		{key: 6, value:"string"}
	];
	describe('minOrder.heapify', () => {
		var initMinHeap;
		beforeEach(() => {
			initMinHeap = heap.createMinHeap(keys);
		});
		it('should restore the heap order', () => {
			expect(initMinHeap.heap[0].key).to.be.equal(1);
			expect(initMinHeap.heap[1].key).to.be.equal(5);
			expect(initMinHeap.heap[2].key).to.be.equal(2);
			expect(initMinHeap.heap[3].key).to.be.equal(6);
		});
	});
	describe('maxOrder.heapify', () => {
		var initMaxHeap;
		beforeEach(() =>{
		initMaxHeap = heap.createMaxHeap(keys);
		});
		it('should restore the heap order', () => {
			for(var i = 0; i < initMaxHeap._currentSize-1; i++) {
				expect(initMaxHeap.heap[i].key-initMaxHeap.heap[i+1].key).to.be.above(0);
			}
		});	
	});
});

describe('Heap', () => {
	describe('#insert', () => {
		var h;
		beforeEach(() => {
			h = heap.createMinHeap();
		});
		it('shoudld add an element', () => {
			h.insert(1,2);
			expect(h.heap[0]).to.be.eql({key:1, value:2});
		});
		it('should keep the heap structure', () => {
			h.insert(6,2);
			h.insert(3,3);
			h.insert(4,4);
			h.insert(1,3);
			expect(h.heap[0].key).to.be.equal(1);
			expect(h.heap[1].key).to.be.equal(3);
			expect(h.heap[2].key).to.be.equal(6);
			expect(h.heap[3].key).to.be.equal(4);
		});
	})
	describe('#delete', () => {
		it('should remove an element');
		it('should keep the heap structure');
	});
	describe('extract', () => {
		describe('minHeap', () => {
			it('should extract min');
			it('should keep the heap structure');
		});
		describe('maxHeap', () =>  {
			it('should extract max');
			it('should keep the heap structure');
		});
	});
});