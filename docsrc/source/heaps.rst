#####
Heaps
#####
.. warning:: unreleased

	.. versionadded:: 0.2.0
.. js:autoattribute:: performancePref

	.. code-block:: javascript

	   var performancePref = {
	       insert: 1,
	       extract: 2
	   }

	.. attribute:: insert 0x1

	   The heap do fast inserts

	.. attribute:: extract 0x2

	   The heap do fast extracts

.. js:autoclass:: HeapNode
   :members:

.. js:autoclass:: Order

.. js:autoclass:: MinOrder

.. js:autoclass:: MaxOrder

.. js:autoclass:: Heap
   :members: