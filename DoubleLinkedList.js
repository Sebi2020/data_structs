iterators = require('./iterators.js');
/**
 * Represents a List-Node	
 */
class ListNode {
	/**
	 * Creates a new List Node 
	 *
	 * @param {ListNode} prev The previous node
	 * @param {ListNode} next The following node
	 * @param {any} value Value of this node
	 * @returns ListNode the new node
	 */
	constructor(prev, next, value) {
		/** Pointer to the previous element */
		this.prev = prev;
		/** Pointer to the next element */
		this.next = next;
		/** The value of this node */
		this.value = value;
	}
}

/**	
 * Represents a double linked lists with its common operations
 */
class DoubleLinkedList {
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
	 * Returns a new :js:class:`Forward Iterator <ForwardDListIterator>` for this list
	 * @returns ForwardDListIterator
	 */
	getForwardIter() {
		return new iterators.ForwardDListIterator(this);
	}

	/**
	 * Returns a new :js:class:`Reverse Iterator <ReverseDListIterator>` for this list.
	 *
	 * @returns ReverseDListIterator
	 */
	getReverseIter() {
		return new iterators.ReverseDListIterator(this);
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
		let newNode = new ListNode(elem, elem.next,newItem);
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
		let newNode = new ListNode(elem.prev, elem, newItem);
		newNode.prev.next = newNode;
		elem.prev = newNode;
		return true;
	}
}
exports.ListNode = ListNode;
exports.DoubleLinkedList = DoubleLinkedList;