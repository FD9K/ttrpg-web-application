type Item = {
  name: string;
  size: number;
  id: string;
}

export default class Inventory {
  constuctor(props: { items: Item[] }) {
    if (props.items) {
      const capacity: number = this.calculateCapacity(props.items);
      if (capacity > this.maxCapacity) {
        throw new Error("Cannot create initialize inventory with more carrying capacity than the default max inventory size.")
      } else {
        this.items = props.items;
        this.currentCapacity = this.calculateCapacity(props.items);
      }
    }
  }

  items: Item[] = [];
  maxCapacity = 16;
  currentCapacity;
  
  addItem(item: Item): void {
    const currentCapacity = this.calculateCapacity(this.items);
    const { size } = item;
    if ((currentCapacity + size) > this.maxCapacity) {
      throw new Error("Cannot add item without exceeding inventory capacity.");
    } else {
      this.items.push(item);
    }
  };

  removeItem(itemId: string): void | { error } {
    const inventoryIndex: number = this.items.findIndex((item) => item.id = itemId);
    // meaning, not found.
    if (inventoryIndex === -1) {
      return {
        error: "Inventory item not found!"
      }
    } else {
      this.items.splice(inventoryIndex, 1);
    }
  };

  calculateCapacity(items: Item[]): number {
    const capacity: number = items.reduce((runningTotal, item) => runningTotal + item.size, 0);
    return capacity;
  }
}