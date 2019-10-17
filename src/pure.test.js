import PureFluentSortArray from "./pure";

function getTests() {
  return [
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
}

let fluentTestCases;

beforeEach(() => {
  fluentTestCases = getTests();
});

describe("basic tests", () => {
  test("sorting by id results in the correct order", () => {
    const sortedTests = new PureFluentSortArray(...fluentTestCases)
      .sortBy(x => x.id)
      .sortedResult();

    expect(sortedTests[0].name).toBe("Strong Monster");
    expect(sortedTests[1].name).toBe("Fast Monster");
    expect(sortedTests[2].name).toBe("Mediocre Monster");
    expect(sortedTests[3].name).toBe("Unimpressive Monster");
    expect(sortedTests[4].name).toBe("Slow Monster");
    expect(sortedTests[5].name).toBe("Smart Monster");
  });

  test("sorting by id manually by descending results in the correct order", () => {
    const sortedTests = new PureFluentSortArray(...fluentTestCases)
      .sortComparing((left, right) => {
        if (left.id > right.id) return -1;
        if (left.id < right.id) return 1;

        return 0;
      })
      .sortedResult();

    expect(sortedTests[5].name).toBe("Strong Monster");
    expect(sortedTests[4].name).toBe("Fast Monster");
    expect(sortedTests[3].name).toBe("Mediocre Monster");
    expect(sortedTests[2].name).toBe("Unimpressive Monster");
    expect(sortedTests[1].name).toBe("Slow Monster");
    expect(sortedTests[0].name).toBe("Smart Monster");
  });

  test("sortByAscending results in the correct order", () => {
    const sortedTests = new PureFluentSortArray(...fluentTestCases)
      .sortByAscending(x => x.id)
      .sortedResult();

    expect(sortedTests[0].name).toBe("Strong Monster");
    expect(sortedTests[1].name).toBe("Fast Monster");
    expect(sortedTests[2].name).toBe("Mediocre Monster");
    expect(sortedTests[3].name).toBe("Unimpressive Monster");
    expect(sortedTests[4].name).toBe("Slow Monster");
    expect(sortedTests[5].name).toBe("Smart Monster");
  });

  test("sorting by 1 field sets comparator pool to length of 1", () => {
    const sortedTests = new PureFluentSortArray(...fluentTestCases).sortBy(
      (left, right) => {
        if (left.id > right.id) return -1;
        if (left.id < right.id) return 1;

        return 0;
      }
    );

    expect(sortedTests.__comparators).toHaveLength(1);
  });

  test("sorting by 1 field gives same order as native sort (by monsterdexOrder)", () => {
    const comparator = (left, right) => {
      if (left.monsterdexOrder < right.monsterdexOrder) return -1;
      if (left.monsterdexOrder > right.monsterdexOrder) return 1;

      return 0;
    };

    const nativeTestCases = getTests();

    const fluentResults = new PureFluentSortArray(...fluentTestCases)
      .sortComparing(comparator)
      .sortedResult();

    nativeTestCases.sort(comparator);

    nativeTestCases.forEach((value, index) => {
      expect(fluentResults[index]).toEqual(value);
    });
  });
});

describe("thenBy tests", () => {
  test("sorting by intelligence ascending (by string) then by agility ascending (by string) results in the correct order", () => {
    const sortedTests = new PureFluentSortArray(...fluentTestCases)
      .sortBy("intelligence")
      .thenBy("agility")
      .sortedResult();

    expect(sortedTests[0].name).toBe("Unimpressive Monster");
    expect(sortedTests[1].name).toBe("Fast Monster");
    expect(sortedTests[2].name).toBe("Slow Monster");
    expect(sortedTests[3].name).toBe("Strong Monster");
    expect(sortedTests[4].name).toBe("Mediocre Monster");
    expect(sortedTests[5].name).toBe("Smart Monster");
  });

  test("sorting by intelligence then by comparator", () => {
    const comparator = (left, right) => {
      if (left.agility > right.agility) return 1;
      if (left.agility < right.agility) return -1;

      return 0;
    };

    const sortedTests = new PureFluentSortArray(...fluentTestCases)
      .sortBy(x => x.intelligence)
      .thenComparing(comparator)
      .sortedResult();

    expect(sortedTests[0].name).toBe("Unimpressive Monster");
    expect(sortedTests[1].name).toBe("Fast Monster");
    expect(sortedTests[2].name).toBe("Slow Monster");
    expect(sortedTests[3].name).toBe("Strong Monster");
    expect(sortedTests[4].name).toBe("Mediocre Monster");
    expect(sortedTests[5].name).toBe("Smart Monster");
  });

  test("sorting by intelligence ascending then by agility ascending results in the correct order", () => {
    const sortedTests = new PureFluentSortArray(...fluentTestCases)
      .sortByAscending(x => x.intelligence)
      .thenByAscending(y => y.agility)
      .sortedResult();

    expect(sortedTests[0].name).toBe("Unimpressive Monster");
    expect(sortedTests[1].name).toBe("Fast Monster");
    expect(sortedTests[2].name).toBe("Slow Monster");
    expect(sortedTests[3].name).toBe("Strong Monster");
    expect(sortedTests[4].name).toBe("Mediocre Monster");
    expect(sortedTests[5].name).toBe("Smart Monster");
  });

  test("sorting by intelligence ascending then by agility ascending results in the correct order", () => {
    const sortedTests = new PureFluentSortArray(...fluentTestCases)
      .sortBy(x => x.intelligence)
      .thenBy(y => y.agility)
      .sortedResult();

    expect(sortedTests[0].name).toBe("Unimpressive Monster");
    expect(sortedTests[1].name).toBe("Fast Monster");
    expect(sortedTests[2].name).toBe("Slow Monster");
    expect(sortedTests[3].name).toBe("Strong Monster");
    expect(sortedTests[4].name).toBe("Mediocre Monster");
    expect(sortedTests[5].name).toBe("Smart Monster");
  });

  test("sorting by intelligence descending then by agility descending results in the correct order", () => {
    const sortedTests = new PureFluentSortArray(...fluentTestCases)
      .sortByDescending(x => x.intelligence)
      .thenByDescending(y => y.agility)
      .sortedResult();

    expect(sortedTests[0].name).toBe("Smart Monster");
    expect(sortedTests[1].name).toBe("Mediocre Monster");
    expect(sortedTests[2].name).toBe("Strong Monster");
    expect(sortedTests[3].name).toBe("Slow Monster");
    expect(sortedTests[4].name).toBe("Fast Monster");
    expect(sortedTests[5].name).toBe("Unimpressive Monster");
  });

  test("sorting by intelligence ascending then by agility descending results in the correct order", () => {
    const comparator = (left, right) => {
      if (left.agility > right.agility) return -1;
      if (left.agility < right.agility) return 1;

      return 0;
    };

    const sortedTests = new PureFluentSortArray(...fluentTestCases)
      .sortBy(x => x.intelligence)
      .thenComparing(comparator)
      .sortedResult();

    expect(sortedTests[0].name).toBe("Unimpressive Monster");
    expect(sortedTests[1].name).toBe("Fast Monster");
    expect(sortedTests[2].name).toBe("Mediocre Monster");
    expect(sortedTests[3].name).toBe("Strong Monster");
    expect(sortedTests[4].name).toBe("Slow Monster");
    expect(sortedTests[5].name).toBe("Smart Monster");
  });
});

describe("error handling", () => {
  test("throws when sortComparing not given a function", () => {
    expect(() => {
      const sortedTests = new PureFluentSortArray(
        ...fluentTestCases
      ).sortComparing(true);
    }).toThrow();
  });

  test("throws when sortComparing not given an argument", () => {
    expect(() => {
      const sortedTests = new PureFluentSortArray(
        ...fluentTestCases
      ).sortComparing();
    }).toThrow();
  });

  test("throws when sortByDescending not given a comparator", () => {
    expect(() => {
      const sortedTests = new PureFluentSortArray(
        ...fluentTestCases
      ).sortByDescending();
    }).toThrow();
  });

  test("throws when sortByDescending not given a comparator", () => {
    expect(() => {
      const sortedTests = new PureFluentSortArray(
        ...fluentTestCases
      ).sortByDescending();
    }).toThrow();
  });

  test("throws when thenBy not given a comparator", () => {
    const sortedTests = new PureFluentSortArray(
      ...fluentTestCases
    ).sortByDescending(x => x.intelligence);

    expect(() => {
      const thenBy = sortedTests.thenBy(false);
    }).toThrow();
  });

  test("throws when thenByDescending not given a comparator", () => {
    const sortedTests = new PureFluentSortArray(
      ...fluentTestCases
    ).sortByDescending(x => x.intelligence);

    expect(() => {
      const thenBy = sortedTests.thenByDescending();
    }).toThrow();
  });

  test("throws when thenByDescending not given a comparator", () => {
    const sortedTests = new PureFluentSortArray(
      ...fluentTestCases
    ).sortByDescending(x => x.intelligence);

    expect(() => {
      const thenBy = sortedTests.thenByDescending();
    }).toThrow();
  });

  test("throws when thenBy not given a comparator", () => {
    const sortedTests = new PureFluentSortArray(
      ...fluentTestCases
    ).sortByDescending(x => x.intelligence);

    expect(() => {
      const thenBy = sortedTests.thenBy();
    }).toThrow();
  });

  test("throws when adding a thenBy when sortComparators is not an array", () => {
    const sortedTests = new PureFluentSortArray(...fluentTestCases).sortBy(
      (left, right) => {
        if (left.id > right.id) return -1;
        if (left.id < right.id) return 1;

        return 0;
      }
    );

    sortedTests.__comparators = undefined;

    expect(() => {
      const sortedTestsThenBy = sortedTests.thenBy(x => x.agility);
    }).toThrow();
  });

  test("throws when generating a result when sortComparators is not an array", () => {
    const sortedTests = new PureFluentSortArray(...fluentTestCases).sortBy(
      (left, right) => {
        if (left.id > right.id) return -1;
        if (left.id < right.id) return 1;

        return 0;
      }
    );

    sortedTests.__comparators = undefined;

    expect(() => {
      sortedTests.sortedResult();
    }).toThrow();
  });

  test("throws when generating result when sortComparators is empty", () => {
    expect(() => {
      const sortedTests = new PureFluentSortArray(...fluentTestCases).sortBy(
        (left, right) => {
          if (left.id > right.id) return -1;
          if (left.id < right.id) return 1;

          return 0;
        }
      );

      sortedTests.__comparators = [];

      sortedTests.sortedResult();
    }).toThrow();
  });
});

describe("field tests", () => {
  test("sortBy with function places Unimpressive Monster first", () => {
    const sortedTests = new PureFluentSortArray(...fluentTestCases)
      .sortBy(x => x.intelligence)
      .sortedResult();
    const firstResult = sortedTests[0];

    expect(firstResult.name).toBe("Unimpressive Monster");
  });

  test("sortBy with string places Unimpressive Monster first", () => {
    const sortedTests = new PureFluentSortArray(...fluentTestCases)
      .sortBy("intelligence")
      .sortedResult();
    const firstResult = sortedTests[0];

    expect(firstResult.name).toBe("Unimpressive Monster");
  });

  test("sortBy with function places Smart Monster last", () => {
    const sortedTests = new PureFluentSortArray(...fluentTestCases)
      .sortBy(x => x.intelligence)
      .sortedResult();
    const lastResult = sortedTests.pop();

    expect(lastResult.name).toBe("Smart Monster");
  });

  test("sortBy with string places Smart Monster last", () => {
    const sortedTests = new PureFluentSortArray(...fluentTestCases)
      .sortBy("intelligence")
      .sortedResult();
    const lastResult = sortedTests.pop();

    expect(lastResult.name).toBe("Smart Monster");
  });

  test("sortBy descending places Smart Monster first", () => {
    const sortedTests = new PureFluentSortArray(...fluentTestCases)
      .sortByDescending(x => x.intelligence)
      .sortedResult();
    const firstResult = sortedTests[0];

    expect(firstResult.name).toBe("Smart Monster");
  });

  test("sortByDescending places Unimpressive Monster last", () => {
    const sortedTests = new PureFluentSortArray(...fluentTestCases)
      .sortByDescending(x => x.intelligence)
      .sortedResult();
    const lastResult = sortedTests.pop();

    expect(lastResult.name).toBe("Unimpressive Monster");
  });

  test("sortByAscending places Unimpressive Monster last", () => {
    const sortedTests = new PureFluentSortArray(...fluentTestCases)
      .sortByAscending(x => x.intelligence)
      .sortedResult();
    const firstResult = sortedTests.shift();

    expect(firstResult.name).toBe("Unimpressive Monster");
  });

  test("sortByAscending with string places Unimpressive Monster last", () => {
    const sortedTests = new PureFluentSortArray(...fluentTestCases)
      .sortByAscending("intelligence")
      .sortedResult();
    const firstResult = sortedTests.shift();

    expect(firstResult.name).toBe("Unimpressive Monster");
  });
});
