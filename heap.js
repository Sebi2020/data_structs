
class ArrayHeap {
	/**
	 * Creates a heap with min or max order and read or write preference
	 *
	 * @param {performancePref} perf The preference for fast inserts or extract. One field of :class:`performancePerf`
	 * @param {Order} order Preference for a min or max order heap. One instance which extends from :class:`Order`
	 */
	constructor(array, order) {
		if(!(order instanceof Order)) {
			throw TypeError("Order must be an Order");
		}
		this.order = order;
		this._currentSize = size;
		this.heap = Array.slice();
	}
	_heapfiy() {
		this.order.heapify(this);
	}
	_parentKey(i) {
		return Math.floor(i/2)
	}
	_leftKey(i) {
		return 2 * i;
	}
	_rightKey(i) {
		return 2 * i + 1;
	}
	_parent(i) {
		return this.heap[parentKey(i)];
	}
	_left(i) {
		if(_leftKey(i) < this._currentSize) return this.heap[_leftKey(i)];
		return undefined;
	}
	_right(i) {
		if(_rightKey(i) < this._currentSize) return this.heap[_rightKey(i)];
		return undefined;
	}
	buildHeap(heap) {

	}
}
/**
 * Heap order abstract class
 */
class Order {
	constructor()  {
		if(this.constructor === Order) {
			throw new TypeError("Abstract class cannot be created");
		}
		if(this.heapify === undefined) {
			throw new TypeError("Classes who extend Order must implement heapify");
		}
	}
}

/**
 * Min Heap order
 *
 * @param {Heap} heap reference to the current heap
 */
class MinOrder extends Order {
	heapify(heap) {
		
	}
}

/**
 * Max Heap order
 *
 * @param {Heap} heap reference to the current heap
 */
class MaxOrder extends Order {
	heapify(heap) {
		return null;
	}
}

var createMinHeap = (size) => new ArrayHeap(size, new MinOrder());
var createMaxHeap = (size) => new ArrayHeap(size, new MaxOrder());

exports.Heap = ArrayHeap;
exports.createMinHeap = createMinHeap;
exports.createMaxHeap = createMaxHeap;
exports.MinOrder = MinOrder;
exports.MaxOrder = MaxOrder;
exports.Order = Order;