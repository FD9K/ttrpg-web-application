<script lang="ts">
  import Inventory from "$lib/character/inventory";

  let itemName;
  let itemWeight;

  let inventory: Inventory;
  function createInventory(): void {
    inventory = new Inventory();
  }

  const weights = [
    {amount: 0, name: "tiny"},
    {amount: 1, name: "small"},
    {amount: 2, name: "medium"},
    {amount: 4, name: "large"},
    {amount: 8, name: "huge"},
    {amount: 16, name: "gargantuan"},
];

function createItem() {
  try {
    const addItem: any = inventory.addItem({
      name: itemName,
      size: itemWeight,
      id: "12345"
    });
  } catch(error) {
    alert(error);
  }
}

</script>

<button on:click={createInventory} class="uk-button uk-margin">Create Inventory</button>

<div class="uk-card uk-card-body uk-card-default uk-margin uk-padding">
  <h3 class="uk-card-title">Inventory</h3>
  <!-- backpack ux to follow later. -->
</div>

<div class="uk-card uk-card-body uk-card-default uk-margin uk-padding">
  <h3 class="uk-card-title">Item Adder</h3>
  <!-- backpack ux to follow later. -->
  <div class="uk-margin">
    <input type="text" name="item name" id="item-name" class="uk-input" bind:value={itemName}/>
  </div>

  <div class="uk-margin">
    <select name="weight" id="item-weight" class="uk-select" bind:value={itemWeight}>
      {#each weights as weight}
      <option value="{weight.amount}">{weight.name}</option>
      {/each}
    </select>
  </div>
  <button on:click={createItem}>Create Item</button>
</div>