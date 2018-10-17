lists = require('./DoubleLinkedList.js');
const EventEmitter = require('events');
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

/** Provides a fast stack as an Array */
class ArrayStack {
	/**
	 * Creates a new stack with at most *max_size* elements
	 *
	 * @param {int} max_size maximum stack size or *Infinity* for unlimited stacks.
	 */
	constructor(max_size) {
		this.limit = Infinity;
		if(max_size != undefined) {
			this.limit = max_size;
		}
		this._size = 0;
		this._stack = Array();
	}
	/**
	 * Pushes a new value to the stack
	 *
	 * @param {any} val Value which should be pushed to the stack.
	 */
	push(val) {
		if(this._size < this.limit) {
			this._stack.push(val);
			this._size++;
			return true;
		}
		return false;
	}
	/**
	 * pops one element off the stack.
	 *
	 * @returns {any} any element
	 */
	pop() {
		if(this._size > 0) {
			this._size--;
			return this._stack.pop();
		}
		return null;
	}
	/**
	 * Returns the top most element of the stack, but does not delete it.
	 *
	 * @returns {any} any element
	 */
	peek() {
		if(this._size > 0) {
			return this._stack[this._size-1];
		}
		return null;
	}
	/**
	 * Deletes the entire stack
	 */
	flush() {
		delete this._stack;
		this._size = 0;
		this._stack = new Array();
	}
}

/**
 * Asynchronous fifo implementation
 *
 * @param {int} max_size Maximum queue size
 */
class AsyncFifo extends fifo {
	constructor(max_size) {
		super(max_size);
		this.emitter = new EventEmitter;
	}
	/**
	 * Pushes a new value to the queue and emits an *data* event
	 * or an *full* event if the maximum queue size is reached.
	 *
	 * @param {any} value Value which should be enqueued.
	 */
	push(value) {
		if(super.push(value)) {
		this.emitter.emit('data',this);
		return true;
		} else {
			this.emitter.emit('full', this);
			return false;
		}
	}
	/**
	 * Pulls a value synchronously, if the queue is empty, an *empty* event is emitted
	 */
	pull() {
		var val = super.pull();
		if(val == null) {
			this.emitter.emit('empty');
		}
		return val;
	}
	/**
	 * Adds a new event listener
	 *
	 * @param {string} ev Event name
	 * @param {callback} callback which should be attached to the queue.
	 */
	on(ev, cb) {
		this.emitter.on(ev, cb);
	}
	/**
	 * Flushes the queue and emits an *flush* event
	 */
	flush() {
		this.emitter.emit('flush');
		super.flush();
	}
}
exports.fifo = fifo;
exports.lifo = exports.stack = lifo;
exports.ArrayStack = ArrayStack;
exports.AsyncFifo = AsyncFifo;