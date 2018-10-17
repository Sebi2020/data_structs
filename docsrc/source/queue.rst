######
Queues
######


FIFO
====
.. js:autoclass:: fifo
   :members:

Asynchronous Fifo
=================
.. js:autoclass:: AsyncFifo
   :members:

Fifo Events
-----------
The queue emits the following events:

data
	The data event is emitted if a new item is available to be processed
	If multiple listeners are attached to this event, only one listener can pull the same item. The callback gets a reference to the fifo queue. You can call pull on the reference to retrieve the last enqueued item.
full
	This emit is emitted if the queue's maximum size is reached.
empty
	This event is emitted if pull is called and there are no items available.
flush
	This event is emitted if someone flushes the queue.

LIFO (Stack)
============

.. js:autoclass:: lifo
   :members:

.. js:autoclass:: ArrayStack
   :members: