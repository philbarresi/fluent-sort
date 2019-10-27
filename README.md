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

## Installation

### From NPM

```
npm install fluent-sort
```

And in your file:

```
import FluentSortArray from "fluent-sort";

```

### In your browser

Add a script reference to the file `/dist/fluentSort.min.js` to your page, and use it as above:

```
let sortedTests = fluentSort(testCases)
    .sortBy(x => x.intelligence)
    .thenBy(y => y.agility)
    .result();
```
