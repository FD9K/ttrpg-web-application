type Capacities = {
  elemental: number;
  combination: number;
  essential: number;
  minorCatalyst: number;
  majorCatalyst: number;
  legendaryCatalyst: number;
}

type Runes = {
  air: Rune;
  water: Rune;
  earth: Rune;
  fire: Rune;
  smoke: Rune;
  mist: Rune;
  dust: Rune;
  mud: Rune;
  steam: Rune;
  slag: Rune;
  shock: Rune;
  lava: Rune;
  ice: Rune;
  solar:Rune;
  impulse: Rune;
  body: Rune;
  nature: Rune;
  force: Rune;
  mind: Rune;
  law: Rune;
  power: Rune;
  soul: Rune;
  astral: Rune;
}

export type Rune = {
  quantity: number;
  type: string;
}

export default class Runepouch {
  constructor(props) {
    const { runes, capacities } = props;
    if (runes) {
      this.calculateCapacity(runes);
    }
    if (capacities) {
      this.capacities = capacities;
    }
  }

  // default here if unset. 
  capacities = {
    elemental: 1000,
    combination: 500,
    essential: 500,
    minorCatalyst: 500,
    majorCatalyst: 250,
    legendaryCatalyst: 100
  }

  calculateCapacity(runes: Runes) {
    let counts = {}
    for (let prop in runes) {
      const rune: Rune = runes[prop];
      switch (rune.type) {
        case "elemental":
          // here's the rub... how to _quickly_ find out if there's a problem...
          break;
        case "combination":
          break;
        case "essential":
          break;
        case "minorCatalyst":
          break
        case "majorCatalyst":
          break;
        case "legendaryCatalyst":
          break;
        default:
          throw new Error("Someone's trying to add a rune with a wonky type. That's not ok!")
      }
    }
  }

  isAllowed(rune, runes)

  add(rune) {
    const { name, number }
  }

}