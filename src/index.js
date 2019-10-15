const {
  checkArray,
  checkFunction,
  composeSort,
  negateComparator,
  selectorToComparator
} = require("./utils");

/**
 * A wrapper around an array and a set of rules defining how the array is to be ordered
 * @class
 */
class FluentSortArray extends Array {
  /**
   * Initiates a new sorting order
   * @param {comparatorCallback} comparator - The callback that will be run first to sort the array
   * @return {FluentSortArray} The extended array
   */
  sortBy(comparator, descending = false) {
    checkFunction(comparator);

    this.__comparators = [
      descending ? negateComparator(comparator) : comparator
    ];

    return this;
  }

  /**
   * Initiates the orderable with an initial sort order in ascending order.
   * @param {comparatorCallback} comparator - The callback that will be run first to sort the array
   * @return {FluentSortArray} The extended array
   */
  sortByAscending(comparator) {
    return this.sortBy(comparator, false);
  }

  /**
   * Initiates the orderable with an initial sort order in descending order.
   * @param {comparatorCallback} comparator - The callback that will be run first to sort the array
   * @return {FluentSortArray} The extended array
   */
  sortByDescending(comparator) {
    return this.sortBy(comparator, true);
  }

  /**
   * Initiates the orderable with a sort on the supplied field.
   * @param {(selectorCallback|string)} - A selector to run on the left and right object to select a field to be sorted on, or a string to represent the field name to be sorted on.
   * @return {FluentSortArray} The extended array
   */
  sortByField(selector, descending = false) {
    return this.sortBy(selectorToComparator(selector), descending);
  }

  /**
   * Initiates the orderable with a sort on the supplied field in ascending order.
   * @param {(selectorCallback|string)} - A selector to run on the left and right object to select a field to be sorted on, or a string to represent the field name to be sorted on.
   * @return {FluentSortArray} The extended array
   */
  sortByFieldAscending(selector) {
    return this.sortByField(selector, false);
  }

  /**
   * Initiates the orderable with a sort on the supplied field in descending order.
   * @param {(selectorCallback|string)} - A selector to run on the left and right object to select a field to be sorted on, or a string to represent the field name to be sorted on.
   * @return {FluentSortArray} The extended array
   */
  sortByFieldDescending(selector) {
    return this.sortByField(selector, true);
  }

  /**
   * Generates a new Orderable with the next sorting rule added.
   * @param {comparatorCallback} comparator - The callback that will be added to the array sorting rule
   * @return {FluentSortArray} The extended array
   */
  thenBy(comparator, descending = false) {
    checkFunction(comparator);

    this.__comparators.push(
      descending ? negateComparator(comparator) : comparator
    );

    return this;
  }

  /**
   * Generates a new Orderable with the next sorting rule added to be sorted in ascending order.
   * @param {comparatorCallback} comparator - The callback that will be added to the array sorting rule
   * @return {FluentSortArray} The extended array
   */
  thenByAscending(comparator) {
    return this.thenBy(comparator, false);
  }

  /**
   * Generates a new Orderable with the next sorting rule added to be sorted in descending order.
   * @param {comparatorCallback} comparator - The callback that will be added to the array sorting rule
   * @return {FluentSortArray} The extended array
   */
  thenByDescending(comparator) {
    return this.thenBy(comparator, true);
  }

  /**
   * Generates a new Orderable with the next sorting rule added.
   * @param {(selectorCallback|string)} - A selector to run on the left and right object to select a field to be sorted on, or a string to represent the field name to be sorted on.
   * @return {FluentSortArray} The extended array
   */
  thenByField(selector, descending = false) {
    return this.thenBy(selectorToComparator(selector), descending);
  }

  /**
   * Generates a new Orderable with the next sorting rule added to be sorted in descending order.
   * @param {(selectorCallback|string)} - A selector to run on the left and right object to select a field to be sorted on, or a string to represent the field name to be sorted on.
   * @return {FluentSortArray} The extended array
   */
  thenByFieldAscending(selector) {
    return this.thenByField(selector, true);
  }

  /**
   * Generates a new Orderable with the next sorting rule added to be sorted in descending order.
   * @param {(selectorCallback|string)} - A selector to run on the left and right object to select a field to be sorted on, or a string to represent the field name to be sorted on.
   * @return {FluentSortArray} The extended array
   */
  thenByFieldDescending(selector) {
    return this.thenByField(selector, true);
  }

  /**
   * Returns the sorted array
   * @return {array} The sorted array
   */
  result() {
    this.sort(composeSort(this.__comparators));

    return this;
  }
}

function withFluentSorting(arr) {
  checkArray(arr);

  arr.__proto__ = FluentSortArray.prototype;
  arr.__comparators = [];

  return arr;
}

module.exports = withFluentSorting;
