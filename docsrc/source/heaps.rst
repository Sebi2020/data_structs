#####
Heaps
#####

.. versionadded:: 0.2.0

Orders
======
.. js:autoclass:: Order
   

	.. js:function:: heapify(heap, key)
	   
	   The heapify function, which should respect the heap order if a class inherits from this class.

	   :param ArrayHeap heap: The heap to use for the heapify operation
	   :param int key: The key of the node-triple to use for the heapify operation
	
	.. js:function:: insert(heap, k, v)
	   
	   The insert function, which should respect the heap order if a class inherits from this class.

	   :param ArrayHeap heap: The heap to use for the insert operation
	   :param int k: The key value to use for the new node
	   :param any v: The value to use for the new node

.. js:autoclass:: MinOrder

.. js:autoclass:: MaxOrder

Heap
====
.. js:autoclass:: ArrayHeap
   :members: insert, extract, buildHeap

   .. warning:: don't use internal methods if you want the heap to behave stable.

Helpers
=======
If you want to create a new heap, you can use this two helper functions, which automatically create new :js:class:`Order` instances for the new heap.

.. js:autofunction:: createMinHeap
   
   :return: a new ArrayHeap with min first order
   :rtype: :js:class:`ArrayHeap`

.. js:autofunction:: createMaxHeap
   
   :return: a new ArrayHeap with max first order
   :rtype: :js:class:`ArrayHeap`