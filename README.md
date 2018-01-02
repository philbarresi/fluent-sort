# fluent-sort

##  A fluent sorting library for JavaScript 

`fluent-sort` is a compact library (943 bytes gzipped) that provides a fluent API for sorting JavaScript arrays.

## Installation

### From NPM 
```
npm install fluent-sort
```

And in your file:

```
const fluentSort = require("./fluentSort");

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

const sortedTests = fluentSort(testCases)
    .sortByField(x => x.intelligence)
    .thenByField(y => y.agility)
    .result();

console.log(sortedTests);

```

### In your browser

Add a script reference to the file `/dist/fluentSort.min.js` to your page, and use it as above:

```
var sortedTests = fluentSort(testCases)
    .sortByField(x => x.intelligence)
    .thenByField(y => y.agility)
    .result();
```

