
<script lang="ts">
  import Runepouch from "$lib/tyler-ttrpg/character/runepouch";
  export let rune;
  const pouch = new Runepouch({});
  let slots = [];
  pouch.slot({
    runeName: "fire",
    quantity: 100,
    type: "elemental",
  });
  slots = pouch.slots;

  function addRunes() {
    try {
      pouch.fillSlots([{
        runeName: "water",
        quantity: 100,
        type: "elemental"
      }]);
      slots = pouch.slots;
    } catch(error) {
      alert(error);
    }
  }

  $: {
    if (rune) {
      try {
        pouch.fillSlots([{
          runeName: rune.runeName,
          quantity: rune.quantity,
          type: rune.type,
        }]);
      
      slots = pouch.slots;
      rune = null;
      } catch(error) {
        alert(error);
      }
    }
  }
</script>

<div class="shadow-md m-2 rounded-lg border overflow-hidden">
  <div class="bg-gray-600 p-2 border border-gray-700">
    <p class="text-lg font-bold text-yellow-500 pl-2">Runepouch</p>
  </div>
  <div class="border border-gray-300">
    <div class="flex justify-center items-center p-2 uppercase font-bold text-xs">
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
</div>