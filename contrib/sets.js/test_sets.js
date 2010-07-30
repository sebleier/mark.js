


/* Begin Tests
------------*/

var A = new Set([1,2,3,4]);
var B = new Set([3,4,5,6]);
var C;

assertEqual(A.length, 4, "A has a length of 4");
assertEqual(A.length, B.length, "A and B are the same length");

// Remove an element from A
element = A.remove(1)
assertEqual(3, A.length, "The set A has length 3 after removing 1 from it");
assertEqual(1, element, "The removed element is 1");
assertListsEqual([2,3,4], A._set, "The correct elements that should exist after removing 1");

// Union A and B
C = A.union(B);
assertEqual(5, C.length, "Length of the union should be 6");
assertListsEqual([2,3,4,5,6], C._set, "The correct elements that should exist after A unions B");

// Intersection of A and B
C = A.intersection(B);
assertEqual(2, C.length, "Test the length after the intersection of A and B");
assertListsEqual([3,4], C._set, "The correct elements that should exist after A intersects B");

// Difference: A - B
C = A.difference(B);
assertEqual(1, C.length, "Test the length after A - B");
assertListsEqual([2], C._set, "The correct elements that should exist after A - B");

// Difference: B - A
C = B.difference(A);
assertEqual(2, C.length, "Test the length after B - A");
assertListsEqual([5,6], C._set, "The correct elements that should exist after B - A");

// Symmetric Difference
C = A.symmetricDifference(B);
assertEqual(3, C.length, "Test the length after computing the symmetric difference between A and B")
assertListsEqual([2,5,6], C._set, "The correct elements that should exist after computing the symmetric difference between A and B");

// Superset
A = new Set([1,2,3,4,5]);
B = new Set([1,2,3]);
assert(A.isSuperSet(B), "Test if A is a superset of B");
B = new Set([0,1,2]);
assert(!A.isSuperSet(B), "Test if A is not a superset of B");

// Subset
A = new Set([1,2]);
B = new Set([1,2,3]);
assert(A.isSubSet(B), "Test if B is a subset of A");
B = new Set([2,3,4]);
assert(!A.isSubSet(B), "Test if B is not a subset of A");


