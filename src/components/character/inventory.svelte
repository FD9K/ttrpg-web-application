<script lang="ts">
import Inventory from "$lib/character/inventory";
import { onMount } from "svelte";

let inventory: Inventory;
let inventoryItems = [];
function createInventory(): void {
  inventory = new Inventory();
}

//   const weights = [
//     {amount: 0, name: "tiny"},
//     {amount: 1, name: "small"},
//     {amount: 2, name: "medium"},
//     {amount: 4, name: "large"},
//     {amount: 8, name: "huge"},
//     {amount: 16, name: "gargantuan"},
// ];

const testItems = [
  { size: 0, name: "A button", id: "1" },
  { size: 1, name: "A wand", id: "2" },
  { size: 2, name: "A shortsword", id: "3" },
  { size: 4, name: "A greataxe", id: "4" },
  { size: 8, name: "An injured comrade", id: "5" },
  { size: 16, name: "An anvil", id: "6" },
];

function addItem(item) {
  try {
    const { name, size, id } = item;
    inventory.addItem({
      name,
      size,
      id
    });
    inventoryItems = [...inventory.items];
    console.log(inventoryItems);
  } catch(error) {
    alert(error);
  }
}

onMount(() => {
  createInventory();
});

</script>

<style>
  #inventory-tab {
    width: 25%;
    border: 1px black solid;
    margin: 1rem;
  }

  
</style>  

{#if inventory}
<div id="inventory-tab">
  <h1>inventory</h1>
  {inventory.currentCapacity}/{inventory.maxCapacity}
  {#each inventoryItems as item}
    <p class="inventory-item">{item.name}</p>
  {/each}
</div>
{/if}

<div id="choices">
  <ul>
    {#each testItems as item} 
      <button on:click={() => { addItem(item) }}>{item.name}</button>
    {/each}
  </ul>
</div>