<script lang="ts">
import { goto } from "$app/navigation";

import type { Character } from "../../../global";
export let character;

function openCharacter() {
  goto(`/users/${character.ownerId}/characters/${character.id}`);
}
</script>

<style>
  .uk-card {
    cursor: pointer;
  }
</style>

{#if character}
<div class="uk-container uk-margin" on:click={openCharacter}>
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
