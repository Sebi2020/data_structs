/**
 * A iterator which iterates in forward order over a Double Linked List.
 */
exports.ForwardDListIterator = class ForwardDListIterator {
	/**
	 * Takes a Double Linked List and returns an iterator
	 * 
	 * @param {DoubleLinkedList} ref Reference to a double linked list
	 */
	constructor(ref) {
		this._list = ref;
		this._cur = ref._head;
	}

	/**
	 * Returns a new entry of the list
	 */
	next() {
		var obj_to_return;
		if(this._cur != undefined) {
			 obj_to_return = {
				value: this._cur.value,
				done: false
			};	
			this._cur = this._cur.next;
		} else {
			obj_to_return = {
				value: undefined,
				done: true
			};
		}
		return obj_to_return;
	}
}

/**
 * A iterator which iterates in reverse order over a Double Linked List.
 */
exports.ReverseDListIterator = class ReverseDListIterator {
	/**
	 * Takes the Double Linked list and creates a ReverseDListIterator
	 *
	 * @param {DoubleLinkedList} ref Reference to Double Linked List
	 */
	constructor(ref) {
		this._list = ref;
		this._cur = ref._tail;
	}

	/**
	 * Returns a new entry of the list
	 */
	next() {
		var obj_to_return;
		if(this._cur != undefined) {
			 obj_to_return = {
				value: this._cur.value,
				done: false
			};	
			this._cur = this._cur.prev;
		} else {
			obj_to_return = {
				value: undefined,
				done: true
			};
		}
		return obj_to_return;
	}
}