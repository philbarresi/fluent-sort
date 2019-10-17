import {
  checkFunction,
  composeSort,
  negateComparator,
  selectorToComparator
} from "./utils";

/**
 * A wrapper around an array and a set of rules defining how the array is to be ordered
 * @class
 */
export class FluentSortArray extends Array {
  constructor(...args) {
    super(...args);

    this.__comparators = [];
  }

  sortComparing(comparator) {
    checkFunction(comparator);

    this.__comparators = [comparator];

    return this;
  }

  thenComparing(comparator) {
    checkFunction(comparator);

    this.__comparators.push(comparator);

    return this;
  }

  /**
   * Initiates a new sorting order
   * @param {callback} selector - The selector that will be run on each element to determine what field to sort the array on
   * @return {FluentSortArray} The extended array
   */
  sortBy(selector) {
    this.__comparators = [selectorToComparator(selector)];

    return this;
  }

  /**
   * Initiates the orderable with an initial sort order in ascending order.
   * @param {callback} selector - The selector that will be run on each element to determine what field to sort the array on
   * @return {FluentSortArray} The extended array
   */
  sortByAscending(selector) {
    return this.sortBy(selector);
  }

  /**
   * Initiates the orderable with an initial sort order in descending order.
   * @param {callback} selector - The selector that will be run on each element to determine what field to sort the array on
   * @return {FluentSortArray} The extended array
   */
  sortByDescending(selector) {
    this.__comparators = [negateComparator(selectorToComparator(selector))];

    return this;
  }

  /**
   * Generates a new Orderable with the next sorting rule added.
   * @param {callback} selector - The selector that will be run on each element to determine what field to sort the array on
   * @return {FluentSortArray} The extended array
   */
  thenBy(selector) {
    this.__comparators.push(selectorToComparator(selector));

    return this;
  }

  /**
   * Generates a new Orderable with the next sorting rule added to be sorted in ascending order.
   * @param {callback} selector - The selector that will be run on each element to determine what field to sort the array on
   * @return {FluentSortArray} The extended array
   */
  thenByAscending(selector) {
    return this.thenBy(selector);
  }

  /**
   * Generates a new Orderable with the next sorting rule added to be sorted in descending order.
   * @param {callback} selector - The selector that will be run on each element to determine what field to sort the array on
   * @return {FluentSortArray} The extended array
   */
  thenByDescending(selector) {
    this.__comparators.push(negateComparator(selectorToComparator(selector)));

    return this;
  }

  /**
   * Returns the sorted array
   * @return {array} The sorted array
   */
  sortedResult() {
    return this.sort(composeSort(this.__comparators));
  }
}

export default FluentSortArray;
