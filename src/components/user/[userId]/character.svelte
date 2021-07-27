<script lang="ts">
import { onMount } from "svelte";
import { getCharacter } from "$lib/fire/firestore";
import type { Character } from "../../../global";
export let characterId: string;
let character: Character;
$: character;
onMount(async () => {
  console.log("character, comin' right up", characterId);
  character = await getCharacter(characterId);
  console.log(character);
});

</script>

<style>

</style>

{#if character}
<div class="uk-container">
  <div class="uk-card uk-card-default uk-card-body">
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
