# Calkin-Wilf
This package implements the the Calkin-Wilf bijection between integers and rationals, as well as some convenience functions for working with rationals.

The package exports the following functions:

* `function fusc(n: number): number` Produces elements of Stern's Diatomic Series. This is done with a linear cache, so requests for large indices may end up consuming a lot of memory. The first request for a given index will run in linear time, after whcih requests for any lesser or equal indices will run in constant time. The first 16 elements are hard-coded to initialize the cache, and will always be retrieved in constant time.

* `function Q(i: number): [number, number]` Using the `fusc` function, produces the `i`th rational number in the Calkin-Wilf sequence as a `[numerator, denominator]` pair. Negative indices are valid, with `Q(-i) = -Q(i)`.

* `function F(i: number): [number, number]` Using tree traversal, produces the `i`th rational number in the Calkin-Wilf sequence as a `[numerator, denominator]` pair. Negative indices are valid, with `F(-i) = -F(i)`.

If you need to generate many sequential elements of the Calkin-Wilk sequence, `Q` will run in constant time per element, though it may eventually result in the cache consuming a lot of memory. Generating a single rational number at a high index will, however, require linear time. In contrast, `F` will generate any element of the sequence in logarithmic time in the size of the index. This is sub-optimal for generating long strings o sequential elements, but is asymptotically considerably faster for generating single elements at large indices, and does not cause the `fusc` cache to consume memory.

* `function N(n: number, d: number): number` Given a rational number `n/d`, return its integer position in the Calkin-Wilf sequence. Negative inputs are valid, with `N(-n, d) = N(n, -d) = -N(n, d)`. This function runs in logarithmic time in the size of the returned index.

* `function reduce(n: number, d: number): [number, number]` Returns an ordered pair representing the rational number `n/d` in simplest form.

* `function left(n: number, d: number): [number, number]` Given a positive rational number `n/d`, returns its left child in the Calkin-Wilf tree.

* `function right(n: number, d: number): [number, number]` Given a positive rational number `n/d`, returns its right child in the Calkin-Wilf tree.

* `function parent(n: number, d: number): [number, number]` Given a positive rational number `n/d`, returns its parent in the Calkin-Wilf tree.

* `function S(n: number, d: number): [number, number]` Given a non-negative rational number `n/d`, returns its successor in the Calkin-Wilf sequence.

* `function Sd(n: number, d: number): number` Given a non-negative rational number `n/d`, return the denominator of its successor in the Calkin-Wilf sequence. The numerator of the successor of `n/d` is trivially equal to `d`, so this function may be useful to avoid allocating memory for returning the full pair.

* `function P(n: number, d: number): [number, number]` Given a positive rational number `n/d`, return its predecessor in the Calkin-Wilf sequence.

* `function Pn(n: number, d: number): number` Given a positive rational number `n/d`, returns the numerator of its predecessor in the Calkin-Wilf sequence. The denominator of the predecessor of `n/d` is trivially equal to `n`, so this function may be useful to avoid allocating memory for returning the full pair.

* `function add(a: number, b: number, c: number, d: number): [number, number]` Returns the sum `a/b + c/d` in simplest terms.

* `function sub(a: number, b: number, c: number, d: number): [number, number]` Returns the difference `a/b - c/d` in simplest terms.

* `function mul(a: number, b: number, c: number, d: number): [number, number]` Returns the product `(a/b)(c/d)` in simplest terms.

* `function div(a: number, b: number, c: number, d: number): [number, number]` Returns the quotient `(a/b)/(c/d)` in simplest terms.

* `function cmp(a: number, b: number, c: number, d: number): -1|0|1` Compares the rational numbers `a/b` and `c/d`. This is more efficient than performing a full subtraction.