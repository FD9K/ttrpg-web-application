<script lang="ts">
import { onMount } from "svelte";
import { getCharacter } from "$lib/fire/firestore";
import type { Character } from "../../../global";
export let characterId: string;
let character: Character;
$: character;

onMount(async () => {
  character = await getCharacter(characterId);
});

</script>

<style>
  .uk-card {
    cursor: pointer;
  }
</style>

{#if character}
<div class="uk-container">
  <div class="uk-card uk-card-default uk-card-body uk-card-hover">
    <h5>
      {#if character.name}
        {character.name}
      {:else} 
        Unnamed Character
      {/if}
    </h5>
  </div>
</div>
{/if}
