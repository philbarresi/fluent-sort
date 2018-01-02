# fluent-sort

## A fluent sorting library for JavaScript

`fluent-sort` is a compact, dependency-free library (less than 1kb) that provides a fluent, pure API for sorting JavaScript arrays.

## API

The API is a mostly pure, fluent API; all methods on Sorted Iterables will return new sorted iterables (with the exception of `.sortInPlace()`).

### `const iterable = fluentSort(arr);`

Returns a new Iterable, which is an unsorted wrapper around the array provided.

### `const sortedIterable = iterable.sortBy(comparator)`

Returns a new SortedIterable; SortedIterables are not evaluated until `.result()` or `.sortInPlace()` are evaluated. The sorted iterable wraps the data and contains the rules

The `comparator` is a callback function, identical to one you would provide to the native `Array.sort` method.

### `const sortedIterable = iterable.sortByDescending(comparator)`

Performs the same logic as `.sortBy`, but negates the comparator (turns it from ascending to descending order).

The `comparator` is a callback function, identical to one you would provide to the native `Array.sort` method.

### `const sortedIterable = iterable.sortByField(selector)`

Returns a new SortedIterable. The `selector` is a callback function that selects the field to be selected as the sorting bases in ascending order.


### `const sortedIterable = iterable.sortByFieldDescending(selector)`

Performs the same logic as `.sortByField`, but negates the comparator (turns it from ascending to descending order).

The `selector` is a callback function that selects the field to be selected as the sorting bases.

### `const sortedThenBy = iterable.thenBy(comparator)`

Returns a new SortedIterable; in cases where the original `sortBy` comparator returns `0` and all other `thenBy` calls return `0`, this comparator will be run.

### `const sortedThenByDescending = iterable.thenByDescending(comparator)`

Returns a new SortedIterable; in cases where the original `sortBy` comparator returns `0` and all other `thenBy` calls return `0`, this comparator will be run. The comparator will be negated before being run.

### `const sortedThenByField = iterable.thenByField(selector)`

Returns a new SortedIterable. The `selector` is a callback function that selects the field to be selected as the sorting bases in ascending order. In cases where the original `sortBy` comparator returns `0` and all other `thenBy` calls return `0`, this comparator will be run. The comparator will be negated before being run.

### `const sortedThenByFieldDescending = iterable.thenByFieldDescending(comparator)`

Performs the same logic as `.thenByField`, but negates the comparator (turns it from ascending to descending order).

The `selector` is a callback function that selects the field to be selected as the sorting bases.

### `const result = sortedIterable.result()`

Returns a new array in the sorted order, given all sorting rules applied.

### `sortedIterable.sortInPlace()`

Sorts the original array in place and returns the sorted array. **This method is not pure**.

## Example

```
const testCases = [
    {
      id: 0,
      name: "Strong Monster",
      strength: 10,
      agility: 5,
      intelligence: 8,
      monsterdexOrder: 5
    },
    {
      id: 1,
      name: "Fast Monster",
      strength: 5,
      agility: 10,
      intelligence: 5,
      monsterdexOrder: 1
    },
    {
      id: 2,
      name: "Mediocre Monster",
      strength: 7.5,
      agility: 7.5,
      intelligence: 8,
      monsterdexOrder: 6
    },
    {
      id: 3,
      name: "Unimpressive Monster",
      strength: 2,
      agility: 2,
      intelligence: 2,
      monsterdexOrder: 4
    },
    {
      id: 4,
      name: "Slow Monster",
      strength: 7.5,
      agility: 3,
      intelligence: 8,
      monsterdexOrder: 17
    },
    {
      id: 5,
      name: "Smart Monster",
      strength: 3,
      agility: 7.5,
      intelligence: 15,
      monsterdexOrder: 75
    }
  ];

const sortedTests = fluentSort(testCases) // Returns the Iterable
    .sortByField(x => x.intelligence) // Returns a sorted
    .thenByFieldDescending(y => y.agility) // Returns the sorted iterable with the new sort applied
    .result();

console.log(sortedTests);
```

## Installation

### From NPM

```
npm install fluent-sort
```

And in your file:

```
const fluentSort = require("fluent-sort");
```

### In your browser

Add a script reference to the file `/dist/fluent-sort.min.js` to your page, and use it as above:

```
var sortedTests = fluentSort(testCases)
    .sortByField(x => x.intelligence)
    .thenByField(y => y.agility)
    .result();
```
