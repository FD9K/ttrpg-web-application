<script lang="ts">
  import Inventory from "../../../../components/tyler-ttrpg/inventory.svelte";
  import Runepouch from "../../../../components/tyler-ttrpg/runepouch.svelte";
  import RuneAdder from "../../../../components/tyler-ttrpg/rune-addition.svelte";
  // import WornEquipment from "../../../../components/tyler-ttrpg/"

  let selectedRune; 

  function passRune(event) {
    selectedRune = event.detail;
  }
</script>

<Runepouch rune={selectedRune}/>
<RuneAdder on:runeSelected={passRune}/>
