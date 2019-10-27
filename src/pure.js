import {
  checkFunction,
  composeSort,
  negateComparator,
  selectorToComparator
} from "./utils";
import FluentSortArray from "./index";

/**
 * An array extension with additional features to help sort an array
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

  sortBy(selector) {
    const newSortable = new PureFluentSortArray(...this);
    newSortable.__comparators = [selectorToComparator(selector)];

    return newSortable;
  }

  sortByDescending(selector) {
    const newSortable = new PureFluentSortArray(...this);
    newSortable.__comparators = [
      negateComparator(selectorToComparator(selector))
    ];

    return newSortable;
  }

  thenBy(selector) {
    const newSortable = new PureFluentSortArray(...this);
    newSortable.__comparators = [
      ...this.__comparators,
      selectorToComparator(selector)
    ];

    return newSortable;
  }

  thenByDescending(selector) {
    const newSortable = new PureFluentSortArray(...this);
    newSortable.__comparators = [
      ...this.__comparators,
      negateComparator(selectorToComparator(selector))
    ];

    return newSortable;
  }

  executeCompositeSort() {
    return [...this].sort(composeSort(this.__comparators));
  }

  static fromArray(arr) {
    return new PureFluentSortArray(...arr);
  }

  static makeFluent(arr) {
    arr.__proto__ = PureFluentSortArray;
    arr.__comparators = [];

    return arr;
  }
}

export default PureFluentSortArray;
