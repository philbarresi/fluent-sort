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
  if (typeof fieldSelector !== "string" && typeof fieldSelector !== "function")
    throw new Error("Selectors must be a string or a function");

  const selector =
    typeof fieldSelector === "string" ? x => x[fieldSelector] : fieldSelector;

  checkFunction(selector);

  return function(left, right) {
    const leftFieldValue = selector(left);
    const rightFieldValue = selector(right);

    if (leftFieldValue < rightFieldValue) return -1;
    if (leftFieldValue > rightFieldValue) return 1;

    return 0;
  };
};

module.exports = {
  checkArray,
  checkFunction,
  composeSort,
  negateComparator,
  selectorToComparator
};
