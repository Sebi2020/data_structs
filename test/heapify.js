expect = require('chai').expect;


describe('Orders', () => {
	describe('minOrder.heapify', () => {
		it('should keep all references');
		it('should restore the heap order');
		it('should sort from min to max');
	});
	describe('maxOrder.heapify', () => {
		it('should keep all references');
		it('should restore the heap order');
		it('should sort from max to min');
	});
});

describe.skip('Heap', () => {
	describe('#insert', () => {
		it('shoudld add an element');
		it('should keep the heap structure');
		it('should not exceed max size');
	})
	describe('#delete', () => {
		it('shoudld remove an element');
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