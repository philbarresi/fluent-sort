const withFluentSorting = require("./fluent-sort");

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

const baseArr = getTests();

const fluentArr = withFluentSorting(baseArr);

console.log(fluentArr);
console.log(fluentArr.foo());
