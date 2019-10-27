import {
  checkFunction,
  composeSort,
  negateComparator,
  selectorToComparator
} from "./utils";

/**
 * An array extension with additional features to help sort an array
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

  sortBy(selector) {
    this.__comparators = [selectorToComparator(selector)];

    return this;
  }

  sortByAscending(selector) {
    return this.sortBy(selector);
  }

  sortByDescending(selector) {
    this.__comparators = [negateComparator(selectorToComparator(selector))];

    return this;
  }

  thenBy(selector) {
    this.__comparators.push(selectorToComparator(selector));

    return this;
  }

  thenByAscending(selector) {
    return this.thenBy(selector);
  }

  thenByDescending(selector) {
    this.__comparators.push(negateComparator(selectorToComparator(selector)));

    return this;
  }

  executeCompositeSort() {
    return this.sort(composeSort(this.__comparators));
  }

  static fromArray(arr) {
    return new FluentSortArray(...arr);
  }

  static makeFluent(arr) {
    arr.__proto__ = FluentSortArray.prototype;
    arr.__comparators = [];

    return arr;
  }
}

export default FluentSortArray;
