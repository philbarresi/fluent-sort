import {
  checkFunction,
  composeSort,
  negateComparator,
  selectorToComparator
} from "./utils";
import FluentSortArray from "./index";

/**
 * A wrapper around an array and a set of rules defining how the array is to be ordered
 * @class
 */
export class PureFluentSortArray extends FluentSortArray {
  sortComparing(comparator) {
    checkFunction(comparator);

    const newSortable = new PureFluentSortArray(...this);
    newSortable.__comparators = [comparator];

    return newSortable;
  }

  thenComparing(comparator) {
    checkFunction(comparator);

    const newSortable = new PureFluentSortArray(...this);
    newSortable.__comparators = [...this.__comparators, comparator];

    return newSortable;
  }

  /**
   * Initiates a new sorting order
   * @param {callback} selector - The selector that will be run on each element to determine what field to sort the array on
   * @return {PureFluentSortArray} The extended array
   */
  sortBy(selector) {
    const newSortable = new PureFluentSortArray(...this);
    newSortable.__comparators = [selectorToComparator(selector)];

    return newSortable;
  }

  /**
   * Initiates the orderable with an initial sort order in descending order.
   * @param {callback} selector - The selector that will be run on each element to determine what field to sort the array on
   * @return {PureFluentSortArray} The extended array
   */
  sortByDescending(selector) {
    const newSortable = new PureFluentSortArray(...this);
    newSortable.__comparators = [
      negateComparator(selectorToComparator(selector))
    ];

    return newSortable;
  }

  /**
   * Generates a new Orderable with the next sorting rule added.
   * @param {callback} selector - The selector that will be run on each element to determine what field to sort the array on
   * @return {PureFluentSortArray} The extended array
   */
  thenBy(selector) {
    const newSortable = new PureFluentSortArray(...this);
    newSortable.__comparators = [
      ...this.__comparators,
      selectorToComparator(selector)
    ];

    return newSortable;
  }

  /**
   * Generates a new Orderable with the next sorting rule added to be sorted in descending order.
   * @param {callback} selector - The selector that will be run on each element to determine what field to sort the array on
   * @return {PureFluentSortArray} The extended array
   */
  thenByDescending(selector) {
    const newSortable = new PureFluentSortArray(...this);
    newSortable.__comparators = [
      ...this.__comparators,
      negateComparator(selectorToComparator(selector))
    ];

    return newSortable;
  }

  /**
   * Returns the sorted array
   * @return {array} The sorted array
   */
  sortedResult() {
    return [...this].sort(composeSort(this.__comparators));
  }
}

export default PureFluentSortArray;
