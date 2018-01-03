/**
 * A callback for comparing 2 objects and their associated sort order.
 * @callback comparatorCallback
 * @param {left} left - the left object
 * @param {right} right - the right object
 * @returns {number} 1, 0, or -1 to denote whether left comes before, equal to, or after right
 */

/**
 * A callback for selecting a field from an object.
 * @callback selectorCallback
 * @param {obj} obj - object - The object that the field will be selected from
 * @returns {any} the field to be sorted on
 */

const checkArray = function checkArray(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Argument is not an array");
  }
};

const checkFunction = function checkFunction(fn) {
  if (typeof fn !== "function") {
    throw new Error("Argument is not a function");
  }
};

const checkString = function checkString(str) {
  if (typeof str !== "string") {
    throw new Error("Argument is not a string");
  }
};

const composeSort = function composeSort(comparators) {
  checkArray(comparators);

  if (comparators.length === 0)
    throw new Error("Must provide at least one comparator");

  return function(left, right) {
    for (let i = 0; i < comparators.length; i++) {
      const currentComparator = comparators[i];
      const currentRound = currentComparator(left, right);
      if (currentRound !== 0) return currentRound;
    }

    return 0;
  };
};

const negateComparator = function negateComparator(comparator) {
  checkFunction(comparator);

  return function(left, right) {
    return -1 * comparator(left, right);
  };
};

const selectorToComparator = function selectorToComparator(fieldSelector) {
  let selector = fieldSelector;

  try {
    checkString(selector);
    selector = x => x[fieldSelector];
  } catch (e) {
    // no op
  }

  checkFunction(selector);

  return function(left, right) {
    const leftFieldValue = selector(left);
    const rightFieldValue = selector(right);

    if (leftFieldValue < rightFieldValue) return -1;
    if (leftFieldValue > rightFieldValue) return 1;

    return 0;
  };
};

/**
 * A wrapper around an array and a set of rules defining how the array is to be ordered
 * @class
 */
class Orderable {
  /**
   * Generates a new Orderable with the next sorting rule added.
   * @param {comparatorCallback} comparator - The callback that will be added to the array sorting rule
   * @return {Orderable} The configured orderable structure.
   */
  thenBy(comparator) {
    checkFunction(comparator);

    return new Orderable(this.data, [...this.sortComparators, comparator]);
  }

  /**
   * Generates a new Orderable with the next sorting rule added to be sorted in descending order.
   * @param {comparatorCallback} comparator - The callback that will be added to the array sorting rule
   * @return {Orderable} The configured orderable structure.
   */
  thenByDescending(comparator) {
    return this.thenBy(negateComparator(comparator));
  }

  /**
   * Generates a new Orderable with the next sorting rule added.
   * @param {(selectorCallback|string)} - A selector to run on the left and right object to select a field to be sorted on, or a string to represent the field name to be sorted on.
   * @return {Orderable} The configured orderable structure.
   */
  thenByField(selector) {
    return this.thenBy(selectorToComparator(selector));
  }

  /**
   * Generates a new Orderable with the next sorting rule added to be sorted in descending order.
   * @param {(selectorCallback|string)} - A selector to run on the left and right object to select a field to be sorted on, or a string to represent the field name to be sorted on.
   * @return {Orderable} The configured orderable structure.
   */
  thenByFieldDescending(selector) {
    return this.thenByDescending(selectorToComparator(selector));
  }

  /**
   * Generates a copy of the array, sorted.
   * @return {array} The sorted array
   */
  result() {
    const resultArr = this.data.slice(0);

    resultArr.sort(composeSort(this.sortComparators));

    return resultArr;
  }

  /**
   * Sorts the original array, in place. This method is not pure.
   * @return {array} The sorted array
   */
  sortInPlace() {
    this.data.sort(composeSort(this.sortComparators));

    return this.data;
  }

  /**
   * Create an orderable.
   * @param {array} arr - The data that will be ordered
   * @param {array} comparators - An array of callback functions that will compare the data to be sorted
   */
  constructor(arr, comparators) {
    checkArray(arr);
    checkArray(comparators);
    comparators.forEach(checkFunction);

    this.sortComparators = comparators;
    this.data = arr;

    return this;
  }
}

/**
 * A wrapper around an array, prepared to be ordered.
 * @class
 */
class OrderableInitiator {
  /**
   * Initiates the orderable with an initial sort order.
   * @param {comparatorCallback} comparator - The callback that will be run first to sort the array
   * @return {Orderable} The configured orderable structure.
   */
  sortBy(comparator) {
    return new Orderable(this.data, [comparator]);
  }

  /**
   * Initiates the orderable with an initial sort order in descending order.
   * @param {comparatorCallback} comparator - The callback that will be run first to sort the array
   * @return {Orderable} The configured orderable structure.
   */
  sortByDescending(comparator) {
    return this.sortBy(negateComparator(comparator));
  }

  /**
   * Initiates the orderable with a sort on the supplied field.
   * @param {(selectorCallback|string)} - A selector to run on the left and right object to select a field to be sorted on, or a string to represent the field name to be sorted on.
   * @return {Orderable} The configured orderable structure.
   */
  sortByField(selector) {
    return this.sortBy(selectorToComparator(selector));
  }

  /**
   * Initiates the orderable with a sort on the supplied field in descending order.
   * @param {(selectorCallback|string)} - A selector to run on the left and right object to select a field to be sorted on, or a string to represent the field name to be sorted on.
   * @return {Orderable} The configured orderable structure.
   */
  sortByFieldDescending(selector) {
    return this.sortByDescending(selectorToComparator(selector));
  }

  /**
   * Create an orderable initiator.
   * @param {array} arr - The data that will be ordered
   */
  constructor(arr) {
    checkArray(arr);

    this.data = arr;

    return this;
  }
}

const fluentSort = arr => {
  checkArray(arr);

  return new OrderableInitiator(arr);
};

module.exports = fluentSort;
