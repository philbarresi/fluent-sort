function checkArray(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Argument is not an array");
  }
}

function checkFunction(fn) {
  if (typeof fn !== "function") {
    throw new Error("Argument is not a function");
  }
}

function composeSort(comparators) {
  checkArray(comparators);

  if (comparators.length === 0)
    throw new Error("Must provide at least one comparator");

  return function(left, right) {
    return comparators.reduce((currentResult, currentComparator) => {
      if (currentResult !== 0) return currentResult;
      return currentComparator(left, right);
    }, 0);
  };
}

function negateComparator(comparator) {
  checkFunction(comparator);

  return function(left, right) {
    return -1 * comparator(left, right);
  };
}

function selectorToComparator(fieldSelector) {
  checkFunction(fieldSelector);

  return function(left, right) {
    const leftFieldValue = fieldSelector(left);
    const rightFieldValue = fieldSelector(right);

    if (leftFieldValue === rightFieldValue) return 0;
    if (leftFieldValue < rightFieldValue) return -1;

    return 1;
  };
}

class SortedIterable {
  thenBy(comparator) {
    checkFunction(comparator);

    return new SortedIterable(this.data, [...this.sortComparators, comparator]);
  }

  thenByDescending(comparator) {
    checkFunction(comparator);

    return this.thenBy(negateComparator(comparator));
  }

  thenByField(selector) {
    checkFunction(selector);

    return this.thenBy(selectorToComparator(selector));
  }

  thenByFieldDescending(selector) {
    checkFunction(selector);

    return this.thenByDescending(selectorToComparator(selector));
  }

  result() {
    const resultArr = this.data.slice(0);

    resultArr.sort(composeSort(this.sortComparators));

    return resultArr;
  }

  sortInPlace() {
    this.data.sort(composeSort(this.sortComparators));

    return this.data;
  }

  constructor(arr, comparators) {
    checkArray(arr);
    checkArray(comparators);
    comparators.forEach(checkFunction);

    this.sortComparators = comparators;
    this.data = arr;

    return this;
  }
}

class Iterable {
  sortBy(comparator) {
    return new SortedIterable(this.data, [comparator]);
  }

  sortByDescending(comparator) {
    return this.sortBy(negateComparator(comparator));
  }

  sortByField(selector) {
    return this.sortBy(selectorToComparator(selector));
  }

  sortByFieldDescending(selector) {
    return this.sortByDescending(selectorToComparator(selector));
  }

  constructor(arr) {
    checkArray(arr);

    this.data = arr;

    return this;
  }
}

const fluentSort = arr => {
  checkArray(arr);

  return new Iterable(arr);
};

module.exports = fluentSort;
