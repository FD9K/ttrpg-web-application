export type Item = {
  name: string;
  slot: string;
}


class WornEquipment {
  constructor(props) {
    const { equipment } = props; 
  }

  slots = {
    helm: null,
    chest: null,
    legs: null,
    hands: null,
    feet: null,
    belt: null,
    necklace: null,
    ring1: null,
    ring2: null,
    heldItem1: null,
    heldItem2: null,
    quiver: null,
  }

  equip(item: Item): void | Item {
    const { slot } = item;
    const inventorySlot = this.slots[slot];
    if (inventorySlot) {
      // we will by default swap out the item, so run an unequip of that slot.
      const removedItem: Item = this.unequip(slot);
      this.slots[slot] = item;
      return removedItem;
    } else {
      // if nothing is equipped, just equip the specified item. 
      this.slots[slot] = item;
    }
  }

  unequip(slotName: string): Item {
    const slot = this.slots[slotName];
    if (slot) {
      this.slots[slotName] = null;
      return slot;
    } else {
      throw new Error("No item is equipped there.");
    }
  }
}

const equipment = new WornEquipment({});

const ring = {
  name: "golden signet",
  slot: "ring1",
}

const sword = {
  name: "shortsword",
  slot: "heldItem1"
}

equipment.equip(ring);
equipment.equip(sword);

console.log(equipment.slots);