# fluent-sort

## A fluent sorting library for JavaScript

`fluent-sort` is a compact, dependency-free library (about 1.5kb gzipped) that provides a fluent API for sorting JavaScript arrays with a more sane API.

## Example

```javascript
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

const secondTest = [...testCases];
const thirdTestCase = [...testCases];

const sortedTests = new FluentSortArray(...testCases) // Spreads the array to construct a new FluentSortArray using native Array constructor syntax
  .sortBy(x => x.intelligence) // Returns the extended array
  .thenBy(y => y.agility) // Returns the same extended array
  .executeCompositeSort(); // Performs the sort and returns the extended array

const secondTestFromFluent = FluentSortArray.fromArray(secondTest); // Constructs a new FluentSortArray from the array provided
const thirdTestMakingFluent = FluentSortArray.makeFluent(thirdTestCase)
  .sortBy(x => x.monsterdexOrder)
  .executeCompositeSort(); // Mutates thirdTestCase into a FluentSortArray

console.log(sortedTests.map(x => x.name).join(", "));
console.log(secondTest.map(x => x.name).join(", "));
console.log(secondTestFromFluent.map(x => x.name).join(", "));
console.log(thirdTestCase.map(x => x.name).join(", "));
console.log(thirdTestMakingFluent.map(x => x.name).join(", "));
/*
Unimpressive Monster, Fast Monster, Slow Monster, Strong Monster, Mediocre Monster, Smart Monster
Strong Monster, Fast Monster, Mediocre Monster, Unimpressive Monster, Slow Monster, Smart Monster
Strong Monster, Fast Monster, Mediocre Monster, Unimpressive Monster, Slow Monster, Smart Monster
Fast Monster, Unimpressive Monster, Strong Monster, Mediocre Monster, Slow Monster, Smart Monster
Fast Monster, Unimpressive Monster, Strong Monster, Mediocre Monster, Slow Monster, Smart Monster
*/
```

## Classes

<dl>
<dt><a href="#Orderable">Orderable</a></dt>
<dd><p>A wrapper around an array and a set of rules defining how the array is to be ordered</p>
</dd>
<dt><a href="#OrderableInitiator">OrderableInitiator</a></dt>
<dd><p>A wrapper around an array, prepared to be ordered.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#comparatorCallback">comparatorCallback</a> ⇒ <code>number</code></dt>
<dd><p>A callback for comparing 2 objects and their associated sort order.</p>
</dd>
<dt><a href="#selectorCallback">selectorCallback</a> ⇒ <code>any</code></dt>
<dd><p>A callback for selecting a field from an object.</p>
</dd>
</dl>

<a name="Orderable"></a>

## Orderable

A wrapper around an array and a set of rules defining how the array is to be ordered

**Kind**: global class

- [Orderable](#Orderable)
  - [new Orderable(arr, comparators)](#new_Orderable_new)
  - [.thenBy(comparator)](#Orderable+thenBy) ⇒ [<code>Orderable</code>](#Orderable)
  - [.thenByDescending(comparator)](#Orderable+thenByDescending) ⇒ [<code>Orderable</code>](#Orderable)
  - [.thenByField(selector)](#Orderable+thenByField) ⇒ [<code>Orderable</code>](#Orderable)
  - [.thenByFieldDescending(selector)](#Orderable+thenByFieldDescending) ⇒ [<code>Orderable</code>](#Orderable)
  - [.result()](#Orderable+result) ⇒ <code>array</code>
  - [.sortInPlace()](#Orderable+sortInPlace) ⇒ <code>array</code>

<a name="new_Orderable_new"></a>

### new Orderable(arr, comparators)

Create an orderable.

| Param       | Type               | Description                                                            |
| ----------- | ------------------ | ---------------------------------------------------------------------- |
| arr         | <code>array</code> | The data that will be ordered                                          |
| comparators | <code>array</code> | An array of callback functions that will compare the data to be sorted |

<a name="Orderable+thenBy"></a>

### orderable.thenBy(comparator) ⇒ [<code>Orderable</code>](#Orderable)

Generates a new Orderable with the next sorting rule added.

**Kind**: instance method of [<code>Orderable</code>](#Orderable)
**Returns**: [<code>Orderable</code>](#Orderable) - The configured orderable structure.

| Param      | Type                                                   | Description                                               |
| ---------- | ------------------------------------------------------ | --------------------------------------------------------- |
| comparator | [<code>comparatorCallback</code>](#comparatorCallback) | The callback that will be added to the array sorting rule |

<a name="Orderable+thenByDescending"></a>

### orderable.thenByDescending(comparator) ⇒ [<code>Orderable</code>](#Orderable)

Generates a new Orderable with the next sorting rule added to be sorted in descending order.

**Kind**: instance method of [<code>Orderable</code>](#Orderable)
**Returns**: [<code>Orderable</code>](#Orderable) - The configured orderable structure.

| Param      | Type                                                   | Description                                               |
| ---------- | ------------------------------------------------------ | --------------------------------------------------------- |
| comparator | [<code>comparatorCallback</code>](#comparatorCallback) | The callback that will be added to the array sorting rule |

<a name="Orderable+thenByField"></a>

### orderable.thenByField(selector) ⇒ [<code>Orderable</code>](#Orderable)

Generates a new Orderable with the next sorting rule added.

**Kind**: instance method of [<code>Orderable</code>](#Orderable)
**Returns**: [<code>Orderable</code>](#Orderable) - The configured orderable structure.

| Param    | Type                                                                      | Description                                                                                                                                |
| -------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| selector | [<code>selectorCallback</code>](#selectorCallback) \| <code>string</code> | A selector to run on the left and right object to select a field to be sorted on, or a string to represent the field name to be sorted on. |

<a name="Orderable+thenByFieldDescending"></a>

### orderable.thenByFieldDescending(selector) ⇒ [<code>Orderable</code>](#Orderable)

Generates a new Orderable with the next sorting rule added to be sorted in descending order.

**Kind**: instance method of [<code>Orderable</code>](#Orderable)
**Returns**: [<code>Orderable</code>](#Orderable) - The configured orderable structure.

| Param    | Type                                                                      | Description                                                                                                                                |
| -------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| selector | [<code>selectorCallback</code>](#selectorCallback) \| <code>string</code> | A selector to run on the left and right object to select a field to be sorted on, or a string to represent the field name to be sorted on. |

<a name="Orderable+result"></a>

### orderable.result() ⇒ <code>array</code>

Generates a copy of the array, sorted.

**Kind**: instance method of [<code>Orderable</code>](#Orderable)
**Returns**: <code>array</code> - The sorted array
<a name="Orderable+sortInPlace"></a>

### orderable.sortInPlace() ⇒ <code>array</code>

Sorts the original array, in place. This method is not pure.

**Kind**: instance method of [<code>Orderable</code>](#Orderable)
**Returns**: <code>array</code> - The sorted array
<a name="OrderableInitiator"></a>

## OrderableInitiator

A wrapper around an array, prepared to be ordered.

**Kind**: global class

- [OrderableInitiator](#OrderableInitiator)
  - [new OrderableInitiator(arr)](#new_OrderableInitiator_new)
  - [.sortBy(comparator)](#OrderableInitiator+sortBy) ⇒ [<code>Orderable</code>](#Orderable)
  - [.sortByDescending(comparator)](#OrderableInitiator+sortByDescending) ⇒ [<code>Orderable</code>](#Orderable)
  - [.sortByField(selector)](#OrderableInitiator+sortByField) ⇒ [<code>Orderable</code>](#Orderable)
  - [.sortByFieldDescending(selector)](#OrderableInitiator+sortByFieldDescending) ⇒ [<code>Orderable</code>](#Orderable)

<a name="new_OrderableInitiator_new"></a>

### new OrderableInitiator(arr)

Create an orderable initiator.

| Param | Type               | Description                   |
| ----- | ------------------ | ----------------------------- |
| arr   | <code>array</code> | The data that will be ordered |

<a name="OrderableInitiator+sortBy"></a>

### orderableInitiator.sortBy(comparator) ⇒ [<code>Orderable</code>](#Orderable)

Initiates the orderable with an initial sort order.

**Kind**: instance method of [<code>OrderableInitiator</code>](#OrderableInitiator)
**Returns**: [<code>Orderable</code>](#Orderable) - The configured orderable structure.

| Param      | Type                                                   | Description                                           |
| ---------- | ------------------------------------------------------ | ----------------------------------------------------- |
| comparator | [<code>comparatorCallback</code>](#comparatorCallback) | The callback that will be run first to sort the array |

<a name="OrderableInitiator+sortByDescending"></a>

### orderableInitiator.sortByDescending(comparator) ⇒ [<code>Orderable</code>](#Orderable)

Initiates the orderable with an initial sort order in descending order.

**Kind**: instance method of [<code>OrderableInitiator</code>](#OrderableInitiator)
**Returns**: [<code>Orderable</code>](#Orderable) - The configured orderable structure.

| Param      | Type                                                   | Description                                           |
| ---------- | ------------------------------------------------------ | ----------------------------------------------------- |
| comparator | [<code>comparatorCallback</code>](#comparatorCallback) | The callback that will be run first to sort the array |

<a name="OrderableInitiator+sortByField"></a>

### orderableInitiator.sortByField(selector) ⇒ [<code>Orderable</code>](#Orderable)

Initiates the orderable with a sort on the supplied field.

**Kind**: instance method of [<code>OrderableInitiator</code>](#OrderableInitiator)
**Returns**: [<code>Orderable</code>](#Orderable) - The configured orderable structure.

| Param    | Type                                                                      | Description                                                                                                                                |
| -------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| selector | [<code>selectorCallback</code>](#selectorCallback) \| <code>string</code> | A selector to run on the left and right object to select a field to be sorted on, or a string to represent the field name to be sorted on. |

<a name="OrderableInitiator+sortByFieldDescending"></a>

### orderableInitiator.sortByFieldDescending(selector) ⇒ [<code>Orderable</code>](#Orderable)

Initiates the orderable with a sort on the supplied field in descending order.

**Kind**: instance method of [<code>OrderableInitiator</code>](#OrderableInitiator)
**Returns**: [<code>Orderable</code>](#Orderable) - The configured orderable structure.

| Param    | Type                                                                      | Description                                                                                                                                |
| -------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| selector | [<code>selectorCallback</code>](#selectorCallback) \| <code>string</code> | A selector to run on the left and right object to select a field to be sorted on, or a string to represent the field name to be sorted on. |

<a name="comparatorCallback"></a>

## comparatorCallback ⇒ <code>number</code>

A callback for comparing 2 objects and their associated sort order.

**Kind**: global typedef
**Returns**: <code>number</code> - 1, 0, or -1 to denote whether left comes before, equal to, or after right

| Param | Type               | Description      |
| ----- | ------------------ | ---------------- |
| left  | <code>left</code>  | the left object  |
| right | <code>right</code> | the right object |

<a name="selectorCallback"></a>

## selectorCallback ⇒ <code>any</code>

A callback for selecting a field from an object.

**Kind**: global typedef
**Returns**: <code>any</code> - the field to be sorted on

| Param | Type             | Description                                              |
| ----- | ---------------- | -------------------------------------------------------- |
| obj   | <code>obj</code> | object - The object that the field will be selected from |

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
let sortedTests = fluentSort(testCases)
    .sortByField(x => x.intelligence)
    .thenByField(y => y.agility)
    .result();
```
