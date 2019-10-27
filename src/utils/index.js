const TOKENIZER_REGEX = /\w+/g;

export const checkArray = function checkArray(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Argument is not an array");
  }
};

export const checkFunction = function checkFunction(fn) {
  if (typeof fn !== "function") {
    throw new Error("Argument is not a function");
  }
};

export const composeSort = function composeSort(comparators) {
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

export const negateComparator = function negateComparator(comparator) {
  checkFunction(comparator);

  return function(left, right) {
    return -1 * comparator(left, right);
  };
};

export const stringToSelector = function stringToSelector(selectorString) {
  const tokens = selectorString.match(TOKENIZER_REGEX);

  return obj => {
    return tokens.reduce((currentObj, currentToken) => {
      return currentObj[currentToken];
    }, obj);
  };
};

export const selectorToComparator = function selectorToComparator(
  fieldSelector
) {
  if (typeof fieldSelector !== "string" && typeof fieldSelector !== "function")
    throw new Error("Selectors must be a string or a function");

  const selector =
    typeof fieldSelector === "string"
      ? stringToSelector(fieldSelector)
      : fieldSelector;

  return function(left, right) {
    const leftFieldValue = selector(left);
    const rightFieldValue = selector(right);

    if (leftFieldValue < rightFieldValue) return -1;
    if (leftFieldValue > rightFieldValue) return 1;

    return 0;
  };
};
