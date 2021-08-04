
<script lang="ts">
  import Runepouch from "$lib/tyler-ttrpg/character/runepouch";
  const pouch = new Runepouch({});
  let slots = [];
  pouch.slot({
    runeName: "fire",
    quantity: 100,
    type: "elemental",
  });
  slots = pouch.slots;

  function addRunes() {
    pouch.fillSlots([{
      runeName: "water",
      quantity: 100,
      type: "elemental"
    }]);
    slots = pouch.slots;
  }
</script>

<div class="shadow-md m-2 rounded-lg border border-gray-600 overflow-hidden">
  <div class="bg-purple-500 p-2">
    <p class="text-lg font-bold text-gray-100 pl-2">Runepouch</p>
  </div>
  <div>
    <div class="flex justify-center items-center p-2 m-1 uppercase font-bold text-xs">
      <div class="flex-1">Rune</div>
      <div class="flex-1">Quantity</div>
      <div class="flex-1">Type</div>
    </div>
    <hr>
    {#each slots as slot}
      <div class="flex justify-center items-center p-4 m-1">
        <div class="flex-1 uppercase">{slot.runeName}</div>
        <div class="flex-1">{slot.quantity}</div>
        <div class="flex-1 uppercase">{slot.type}</div>
      </div>
      <hr />
    {/each}
  </div>
  <div>
    <button class="p-2 text-sm text-gray-600 border-gray-500 border rounded-md m-3 hover:bg-gray-100" on:click={addRunes}>Add Runes</button>
  </div>
</div>