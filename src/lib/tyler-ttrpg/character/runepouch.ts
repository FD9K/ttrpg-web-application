type Capacities = {
  elemental: number;
  combination: number;
  essential: number;
  minorCatalyst: number;
  majorCatalyst: number;
  legendaryCatalyst: number;
}

export type Runeslot = {
  quantity: number;
  type: string; 
  runeName: string;
}

export default class Runepouch {
  constructor(props) {
    const { runeslots } = props;
    if (runeslots) {
      this.fillSlots(runeslots);
    }
  }

  // capacities refer to the number of each type of rune the pouch is allowed to carry.
  // it is one of the two capacity metrics, the other being slots.
  maxCapacities: Capacities = {
    elemental: 1000,
    combination: 500,
    essential: 500,
    minorCatalyst: 500,
    majorCatalyst: 250,
    legendaryCatalyst: 100
  }

  // the program initializes with no capacities.
  currentCapacities: Capacities = {
    elemental: 0,
    combination: 0,
    essential: 0,
    minorCatalyst: 0,
    majorCatalyst: 0,
    legendaryCatalyst: 0
  };

  slots: Runeslot[] = [];


  // runs whenever runes are added  (be it constructor phase, during gameplay, whatever);
  fillSlots(runeslots: Runeslot[]): void {
    runeslots.forEach((runeslot) => {
      const { quantity, runeName, type } = runeslot;
      const canCarryAmount: boolean = this.amountCanBeCarried(quantity, type); 
      const canCarryRune: boolean = this.runeCanBeCarried(runeName);
      // if both the amount and slotting is met, the runes of the specified slot can be added.
      if (canCarryAmount && canCarryRune) {
        // 1. update currentCapacities
        // 2. fill slots. 
        this.slot(runeslot);
      }
    });
  }

  // somewhat straightforward. Fetch the max an current capacity for the type of rune to be added; if the incoming quantity exceeds the carrying cap for that type of rune, return false.
  amountCanBeCarried(quantity: number, type: string): boolean {
    const maxCapacity: number = this.maxCapacities[type];
    const currentCapacity: number = this.currentCapacities[type];
    const capacityAfterAddingRunes: number = currentCapacity + quantity;
    if (capacityAfterAddingRunes > maxCapacity) {
      return false;
    } else {
      return true; 
    }
  }

  // this one is a little tougher, because the rune to be added may already be slotted and so a new slot need not be taken.
  runeCanBeCarried(name): boolean {
    const slotted: number = this.slots.findIndex((slot) => slot.runeName === name);
    if (slotted !== -1) {
      // which is to say, the index and thus the entry exist
      return true;
    } else {
      // if fewer than three slots are filled
      if (this.slots.length < 3) {
        return true;
      // only in the situation where the rune is not slotted and slotting it would take the slot array over 3 entries must the function return false.
      } else {
        return false;
      }
    }
  }

  // adds some rune 
  // don't call this externally.... it lacks quantity checks. 
  slot(runeslot: Runeslot): void {
    const { runeName, quantity, type } = runeslot;
    const existingSlot: Runeslot = this.slots.find((slot: Runeslot) => slot.runeName === runeName);
    if (existingSlot) {
      existingSlot.quantity += quantity;
    } else {
      // this.slots.push(runeslot);
      this.slots = [...this.slots, runeslot];
    }
    // modify capacities after addition.
    this.currentCapacities[type] += quantity;
  }

  remove(runeslot: Runeslot) {
    const { runeName, type, quantity } = runeslot;
    const slot: Runeslot = this.slots.find((slot: Runeslot) => slot.runeName === runeName);
    if (!slot) {
      throw new Error("You can't remove runes you don't possess!");
    } else {
      const newQuantity = slot.quantity - quantity;
      if (newQuantity < 0) {
        throw new Error("You don't have enough of that kind of rune!");
      }
      // if draining the specified quantity reduces the overall quantity to 0, delete the slot altogether,
      if (slot.quantity <= 0) {
        const index = this.slots.findIndex((slot: Runeslot) => slot.runeName === runeName);
        this.slots.splice(index, 1); 
      } 
    }
    // capacity edit (presumably, an overdraw already threw an error, so there's no concern at this point of an overdraw.);
    this.currentCapacities[type] -= quantity;
  }
}