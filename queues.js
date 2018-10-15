lists = require('./DoubleLinkedList.js');
/**
 * Fifo class
 */
class fifo {
	/**
	 * Creates a new First-In-First-Out Queue with at most **max_size** elements 
	 * @param {int} max_size Maximum queue size
	 */
	constructor(max_size) {
		this.max = max_size;
		this.current_size = 0;
		this._list = new lists.DoubleLinkedList();
	}

	/**
     * Extracts one element of the queue. The element will be removed from the queue.
     * @returns {any} The element or null on failure.
	 */
	pull() {
		if(this.current_size <= 0) return null;
		let node = this._list._head;
		this._list.deleteHead();
		this.current_size--;
		return node.value;
	}

	/**
	 * Returns one element of the queue without removing the element.
	 * @returns {any} The element or null on failure
	 */
	peek() {
		if(this.current_size <= 0) return null;
		return this._list._head.value;
	}

	/**
	 * Adds a new element to the queue. If **max_size** is reached no element will be added.
	 * @param {any} value The value to add
	 * @returns {boolean} true if current queue size isn't greater than **max_size**. Otherwise false.
	 */
	push(value) {
		if(this.current_size < this.max) {
			this._list.addTail(value);
			this.current_size++;
			return true;
		}
		return false;
	}

	/**
	 * Deletes the entire queue removing all elements.
	 */
	flush() {
		this.current_size = 0;
		delete this._list;
		this._list = new lists.DoubleLinkedList();
	}
}

/**
 * Represents a LIFO - Queue (Stack)
 */
class lifo {
	/**
	 * Creates a Last-In-First-Out Queue with at most **max_size** elements.
	 * @param {int} max_size Maximum queue size
	 */
 	constructor(max_size) {
		this.max = max_size;
		this.current_size = 0;
		this._list = new lists.DoubleLinkedList();
	}


	/**
	 * Pops one element from the stack
	 * @returns {any} the value.
	 */
	pop() {
		if(this.current_size <= 0) return null;
		let node = this._list._tail;
		this._list.deleteTail();
		this.current_size--;
		return node.value;
	}
	/**
	 * Returns the last element, but does not delete it from the stack.
	 * @returns {any} the value.
	 */
	peek() {
		if(this.current_size <= 0) return null;
		return this._list._tail.value;
	}

	/**
	 * Pushes on element ot the stack. 
	 * @param {any} value The value you want to push to the stack.
	 * @returns {boolean} true if the current stack size doesn't exceed the maximum stack size.
	 */
	push(value) {
		if(this.current_size < this.max) {
			this._list.addTail(value);
			this.current_size++;
			return true;
		}
		return false;
	}

	/**
	 * Flushes the entire stack
	 */
	flush() {
		this.current_size = 0;
		delete this._list;
		this._list = new lists.DoubleLinkedList();
	}

    /**
     * Returns the current stack size
     */
	get size() {
		return this.current_size;
	}
}

exports.fifo = fifo;
exports.lifo = exports.stack = lifo;