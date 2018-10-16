util = require('util');

/**
 * Heap class backed by an array
 *
 */

 class ArrayHeap {
    /**
	 * Creates a heap with min or max order and read or write preference
	 *
	 * @param {Array} array Array to use for heap creation, should consists of \{key\: \*, value\: \* \} objects
	 * @param {Order} order Preference for a min or max order heap. One instance which extends from :class:`Order`
	 */
	constructor(array, order) {
		if(!(order instanceof Order)) {
			throw TypeError("Order must be an Order");
		}
		this.order = order;
		this._currentSize = 0;
		this.buildHeap(array == undefined ? Array() : array);
	}
	/**
	 * **INTERNAL**: Rebuild heap structure of a node triple in a recursive manner
	 *
	 * @param {key} key the key of the node-triple.
	 */
	_heapify(key) {
		this.order.heapify(this, key);
	}
	/**
	 * **INTERNAL**: returns the parent key of i (int key).
	 *
	 * @param {int} key child key of the parent, which should be returned
	 * @returns {int} parent key value.
	 */
	_parentKey(i) {
		return Math.ceil((i+1)/2)-1;
	}
	/**
	 * **INTERNAL**: returns the left key of i (int key)
	 *
	 * @param {int} key parent key of the left child node, which should be returned
	 * @returns left child key value
	 */
	_leftKey(i) {
		return 2 * i +1;
	}
	/**
	 * **INTERNAL**: returns the right key of i (int key)
	 *
	 * @param {int} key parent key of the right child node, which should be returned
	 * @returns right child key value
	 */
	_rightKey(i) {
		return 2 * i+2;
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
	/**
	 * builds a new heap with the given \{key\: \*, value\: \*\} array.
	 *
	 * @param {Array} array The \{key\: \*, value\: \*} array
	 */
	buildHeap(array) {
		this.heap = array;
		this._currentSize = array.length;
		for(var i = Math.floor((this._currentSize)/2-1); i >= 0; i--) {
			this._heapify(i);
		}
	}
	/**
	 * Extracts the greatest or smallest element of the heap depending on :js:class:`Order`
	 *
	 * @returns {node} The corrospending \{key\: \*, value\: \*\} node
	 * @see ArrayHeap
	 */
	extract() {
		if(this._currentSize < 1) return null;
		var element_to_extract = this.heap[0];
		this.heap[0] = this.heap[this._currentSize-1];
		this.heap.pop();
		this._currentSize--;
		this._heapify(0);
		return element_to_extract;
	}
	/**
	 * Insert a new node
	 *
	 * @param {int} key key of the new node
	 * @param {any} value value of the new node
	 */
	insert(k,v) {
		return this.order.insert(this,k,v);
	}
}
/**
 * **Abstract class**: Classes who implement a heap order must inherit from this class.
 */
class Order {
	constructor()  {
		if(this.constructor === Order) {
			throw new TypeError("Abstract class cannot be created");
		}
		if(this.heapify === undefined) {
			throw new TypeError("Classes who extend Order must implement heapify(heap,key)");
		}
		if(this.insert === undefined) {
			throw new TypeError("Classes who extend Order must implement insert(heap,key,value)");
		}
	}
}

/**
 * Min Heap order
 */
class MinOrder extends Order {
	heapify(heap,i) {
		var l = heap._leftKey(i);
		var r = heap._rightKey(i);
		var smallest;
		if(l<heap._currentSize && heap.heap[l].key < heap.heap[i].key) smallest = l;
		else smallest = i;
		if(r<heap._currentSize && heap.heap[r].key < heap.heap[smallest].key) smallest = r;
		if(smallest!=i) {
			var smaller = heap.heap[i];
			heap.heap[i] = heap.heap[smallest];
			heap.heap[smallest] = smaller;
			this.heapify(heap,smallest);
		}
	}
	insert(heap,k, v) {
		var i = ++heap._currentSize-1;
		// console.log(i);
		// console.log(heap._parentKey(i));
		while (i > 0 && heap.heap[heap._parentKey(i)].key > k) {
			heap.heap[i] = heap.heap[heap._parentKey(i)];
			i = heap._parentKey(i);
		}
		heap.heap[i] = {key: k, value: v};
		return true;
	}
}

/**
 * Max Heap order
 */
class MaxOrder extends Order {
	heapify(heap,i) {
		var l = heap._leftKey(i);
		var r = heap._rightKey(i);
		var largest;
		if(l<heap._currentSize && heap.heap[l].key > heap.heap[i].key) largest = l;
		else largest = i;
		if(r<heap._currentSize && heap.heap[r].key > heap.heap[largest].key) largest = r;
		if(largest!=i) {
			var smaller = heap.heap[i];
			heap.heap[i] = heap.heap[largest];
			heap.heap[largest] = smaller;
			this.heapify(heap,largest);
		}
	}
	insert(heap,k, v) {
		var i = ++heap._currentSize-1;
		// console.log(i);
		// console.log(heap._parentKey(i));
		while (i > 0 && heap.heap[heap._parentKey(i)].key < k) {
			heap.heap[i] = heap.heap[heap._parentKey(i)];
			i = heap._parentKey(i);
		}
		heap.heap[i] = {key: k, value: v};
		return true;
	}
}

/** Creates a new minHeap */
var createMinHeap = (array) => new ArrayHeap(array, new MinOrder());
/** Creates a new maxHeap */
var createMaxHeap = (array) => new ArrayHeap(array, new MaxOrder());

exports.Heap = ArrayHeap;
exports.createMinHeap = createMinHeap;
exports.createMaxHeap = createMaxHeap;
exports.MinOrder = MinOrder;
exports.MaxOrder = MaxOrder;
exports.Order = Order;

/*function print_heap(array, key) {
	function print_space(times) {
		for(var i = 0; i < times; i++) process.stdout.write(" ");
	}
	var max_width = array.length + 2;
	var initial_space = 1;
	var current_line_length = Math.floor(array.length/2)+1;
	var index = array.length-1;
	var current_line_end = index-current_line_length;
	while(index >= 0) {
		print_space(initial_space);
		initial_space+=1;
		for(var i = index; i > current_line_end; i--) {
			process.stdout.write(util.format("%d", array[i]));
			print_space(initial_space);
		//	if(i === key) process.stdout.write("k");
		}
		process.stdout.write("\n");
		index -= current_line_length;
		current_line_length = Math.floor(current_line_length/2);
		current_line_end -= current_line_length;
		initial_space = initial_space+1;
	}
}*/