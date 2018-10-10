/**
 * Represents a List-Node	
 */
exports.ListNode = class ListNode {
	/**
	 * Creates a new List Node 
	 *
	 * @param {ListNode} prev The previous node
	 * @param {ListNode} next The following node
	 * @param {any} value Value of this node
	 * @returns ListNode the new node
	 */
	constructor(prev, next, value) {
		/** The previous element */
		this.prev = prev;
		/** The next element */
		this.next = next;
		/** The value of this node */
		this.value = value;
	}
}

/**	
 * Represents a double linked lists with its common operations
 * 
 */
exports.DoubleLinkedList = class DoubleLinkedList {
	/**
	 * Creates a new linked list
	 */
	constructor() {
		this._head = undefined;
		this._tail = undefined;
	}

	/**
	 * Adds a new element at the list end.
	 * 
	 * @param {any} value The value you want to add to the list
	 *
	 */
	addTail(value) {
		let cur = this._tail;
		var elem = new exports.ListNode(cur,undefined,value);
		if(cur === undefined) {
			this._head = this._tail = elem;
			return true;
		}
		cur.next = elem;
		this._tail = cur.next;
		return true;
	}

	/**
	 * Adds a new element to the beginning of the list.
	 * 
	 * @param {any} value The value you want to add to the list.
	 */
	addHead(value) {
		let cur = this._head;
		var elem = new exports.ListNode(undefined, cur, value);
		if(cur === undefined) {
			this._head = this._tail = elem;
			return true;
		}
		cur.prev = elem;
		this._head = cur.prev;
		return true;
	}

	/**
	 * Do a search on the linked list for **value**
	 *
	 * @param {any} value The value you want to search for.
	 * @returns {ListNode} A Node object.
	 */

	get(value) {
		let cur = this._head;
		while(cur != undefined) {
			if(cur.value === value) {
				return cur;
			}
			cur = cur.next;
		}
		return undefined;
	}

	/**
	 * Deletes the current head element and sets the head pointer to the next element
	 */
	deleteHead() {
		if(this._head === undefined) return false;
		let newHead = this._head.next;
		let oldHead = this._head;
		oldHead.next = undefined;
		this._head = newHead;
		if(newHead === undefined) {
			this._tail = undefined;
		} else {
			newHead.prev = undefined;
		}
		return true;
	}

	/**
	 * Deletes the current tail element and sets the tail pointer to the previous element
	 */
	deleteTail() {
		if(this._tail === undefined) return false;
		let newTail = this._tail.prev;
		let oldTail = this._tail;
		oldTail.prev = undefined;
		this._tail = newTail;
		if(newTail === undefined) {
			this._head = undefined;
		} else {
			newTail.next = undefined;
		}
		return true;
	}

	/**
	 * Deletes a element from the list
     *
	 * The node must belong to the list. No checks are performend.
	 * 
	 * @param {ListNode} elem A node from the list
	 * @returns {boolean} true on success
	 */
	deleteNode(elem) {
		if(elem === undefined) return false;
		if(elem === this._head && elem === this._tail) {
			this._head = undefined;
			this._tail = undefined;
			return true;
		}
		let prev = elem.prev;
		let next = elem.next;
		if(elem === this._head) { // we delete the first element
			next.prev = undefined;
			this._head = next;
			return true;
		} else if(elem === this._tail) { // we delete the last element
			prev.next = undefined;
			this._tail = prev;
			return true;
		} else {
			prev.next = next;
			next.prev = prev;
		}
	}

	/**
	 * Searches for an element and deletes it.
	 * 
	 * @param {any} value Value of the element you want to delete
	 */
	delete(value) {
		let elem = this.get(value);
		return this.deleteNode(elem);
	}

	/**
	 * Append a new element after **elem**
	 * 
	 * @param {ListNode} elem Element after which **newItem** should be appended
	 * @param {any} newItem The item to append.
	 * @returns {boolean} true on success
	 */
	append(elem, newItem) {
		if(newItem === undefined || newItem === null || elem === null) return false;
		if(elem === this._tail) return this.addTail(newItem);
		let newNode = new Node(elem, elem.next,newItem);
		newNode.next.prev = newNode;
		elem.next = newNode;
		return true;
	}

	/**
	 * prepends a new element after **elem**
	 * 
	 * @param {ListNode} elem Element before which **newItem** should be prepended
	 * @param {any} newItem The item to append.
	 * @returns {boolean} true on success
	 */
	prepend(elem, newItem) {
		if(newItem === undefined || newItem === null || elem === null) return false;
		if(elem === this._head) return this.addHead(newItem);
		let newNode = new Node(elem.prev, elem, newItem);
		newNode.prev.next = newNode;
		elem.prev = newNode;
		return true;
	}
}

exports.fifo = class fifo {
	/**
	 * Creates a new First-In-First-Out Queue with at most **max_size** elements 
	 * @param {int} max_size Maximum queue size
	 */
	constructor(max_size) {
		this.max = max_size;
		this.current_size = 0;
		this._list = new exports.DoubleLinkedList();
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
		this._list = new exports.DoubleLinkedList();
	}
}

/**
 * Represents a LIFO - Queue (Stack)
 */
exports.lifo = exports.stack = class lifo {
	/**
	 * Creates a Last-In-First-Out Queue with at most **max_size** elements.
	 * @param {int} max_size Maximum queue size
	 */
 	constructor(max_size) {
		this.max = max_size;
		this.current_size = 0;
		this._list = new exports.DoubleLinkedList();
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
		this._list = new exports.DoubleLinkedList();
	}

    /**
     * Returns the current stack size
     */
	get size() {
		return this.current_size;
	}
}