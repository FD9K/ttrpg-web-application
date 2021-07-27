<script lang="ts">
import { searchUsers } from "$lib/fire/firestore";
import type {Campaign} from "../../../global";
export let campaign: Campaign;

let searchResults = [];
let searchTerm: string; 
let searched = false;

async function search() {
  searched = false;
  searchResults = await searchUsers(searchTerm);
  searched = true;
}

</script>

<style>
</style>

<div id="invite-form-modal">
  <div class="uk-modal-dialog">
    <button class="uk-modal-close-default" type="button" uk-close></button>
    <div class="uk-container uk-container-default">
      <h3>Invite a User to {campaign.name || "Unnamed Campaign"}</h3>
      <div class="uk-margin">
        <input type="text" class="uk-input" placeholder="Enter a username or an email..." bind:value={searchTerm}/>
      </div>
      <button class="uk-button uk-button-default" on:click={search}>Search</button>
      {#if searched}
        {#if searchResults.length > 0}
          <ul>
            {#each searchResults as searchResult}
              <li>{searchResult.displayName || searchResult.email }</li>
            {/each}
          </ul>
        {:else}
          <p>Sorry! We didn't find what you were looking for.</p>
          {#if searchTerm.includes("@")}
            Do you want to send them an invite email?
          {/if}
        {/if}
      {/if}
    </div>
  </div>
</div>