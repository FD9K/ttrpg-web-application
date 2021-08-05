<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const runes = [
    { runeName: "air",
      type: "elemental",
    },
    { runeName: "water",
      type: "elemental",
    },
    { runeName: "earth",
      type: "elemental",
    },
    { runeName: "fire",
      type: "elemental",
    },
    { runeName: "smoke",
      type: "combination",
    },
    { runeName: "mist",
      type: "combination",
    },
    { runeName: "dust",
      type: "combination",
    },
    { runeName: "mud",
      type: "combination",
    },
    { runeName: "steam",
      type: "combination",
    },
    { runeName: "slag",
      type: "combination",
    },
    { runeName: "shock",
      type: "essential",
    },
    { runeName: "lava",
      type: "essential",
    },
    { runeName: "ice",
      type: "essential",
    },
    { runeName: "solar",
      type: "essential",
    },
    { runeName: "impulse",
      type: "minorCatalyst",
    },
    { runeName: "body",
      type: "minorCatalyst",
    },
    { runeName: "nature",
      type: "minorCatalyst",
    },
    { runeName: "force",
      type: "majorCatalyst",
    },
    { runeName: "mind",
      type: "majorCatalyst",
    },
    { runeName: "law",
      type: "majorCatalyst",
    },
    { runeName: "power",
      type: "legendaryCatalyst",
    },
    { runeName: "soul",
      type: "legendaryCatalyst",
    },
    { runeName: "astral",
      type: "legendaryCatalyst",
    }
  ];

  let selectedRune = null;
  let quantity; 
  function selectRune(rune) {
    selectedRune = rune;
  }

  function emitRuneSelection() {
    dispatch('runeSelected', { ...selectedRune, quantity });
  }

</script>

<div class="shadow-md m-2 rounded-lg border border-gray-600 overflow-hidden">
  <div class="bg-purple-500 p-2">
    <p class="text-lg font-bold text-gray-100 pl-2">Add Runes</p>
  </div>
  <div>
    <div class="flex flex-wrap items-center justify-center mt-4">
      <!-- card? -->
      {#each runes as rune}
      <div class="shadow-md p-4 m-4 w-24 uppercase rounded cursor-pointer hover:shadow-xl border border-gray-200 text-center" on:click={() => { selectRune(rune) }}>
        {rune.runeName}
      </div>
      {/each}
    </div>
    {#if selectedRune}
    <hr />
    <div class="p-2 uppercase font-bold text-lg bg-purple-500 text-gray-100">
      Selection: {selectedRune.runeName}
      <input type="number" class="p-2 m-2 text-lg border border-gray-100 rounded block text-gray-800" placeholder="Quantity to Add" bind:value={quantity}/>
      <button class="p-2 m-2 text-lg border border-gray-100 rounded" on:click={emitRuneSelection}>Add Runes</button>
    </div>
    {/if}
  </div>
</div>