lists = require('./DoubleLinkedList.js');
queues = require('./queues.js');
exports.DoubleLinkedList = lists.DoubleLinkedList;
exports.fifo = queues.fifo;
exports.lifo = exports.stack = queues.lifo;
exports.ArrayStack = queues.ArrayStack;