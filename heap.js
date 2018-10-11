/** 
 * Defines performance preference for heaps.
 *
 * @readonly
 * @enum {number}
 */
var performancePref = {
	/** fast inserts */
	insert: 1,
	/** fast extracts */
	extract: 2
};
Object.freeze(performancePref);

/**
 * Represents a heap node
 */
class HeapNode {
	/**
	 * Creates a new Heap node
	 *
	 * @param {HeapNode} parent parent of this node
	 * @param {HeapNode} left left leaf of this node
	 * @param {HeapNode} right right leaf of this node
	 */
	constructor(parent,left,right) {
		this.parent = parent;
		this.left = left;
		this.right = right;
	}
}

/**
 * Heap based on :js:class:`Heap Nodes <HeapNode>`
 *
 */
class Heap {
	/**
	 * Creates a heap with min or max order and read or write preference
	 *
	 * @param {performancePref} perf The preference for fast inserts or extract. One field of :class:`performancePerf`
	 * @param {Order} order Preference for a min or max order heap. One instance class (not instance) which extends from :class:`Order`
	 */
	constructor(perf, order) {
		this.perf = perf;
		this.order = new order;
		this.root = new HeapNode(undefined, undefined, undefined);
	}
}

/**
 * Heap based on arrays
 */
/*class ArrayHeap {

}*/

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
		return null;
	}
}

/**
 * Max Heap order
 *
 * @param {Heap} heap reference to the current heap
 */
class MaxOrder extends Order {
}

exports.performancePref = performancePref;
Object.freeze(exports.performancePref);
exports.Heap = Heap;
exports.HeapNode = HeapNode;
exports.MinOrder = MinOrder;
exports.MaxOrder = MaxOrder;
exports.Order = Order;