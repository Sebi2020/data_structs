lists = require('./DoubleLinkedList.js');
queues = require('./queues.js');
heaps = require('./heap.js');

// Lists
exports.DoubleLinkedList = lists.DoubleLinkedList;

// Queues
exports.fifo = queues.fifo;
exports.lifo = exports.stack = queues.lifo;
exports.ArrayStack = queues.ArrayStack;
exports.AsyncFifo = queues.AsyncFifo;
// Heaps
exports.ArrayHeap = heaps.ArrayHeap;
exports.createMinHeap = heaps.createMinHeap;
exports.createMaxHeap = heaps.createMaxHeap;
exports.MinOrder = heaps.MinOrder;
exports.MaxOrder = heaps.MaxOrder;
exports.Order = heaps.Order;