<script lang="ts">
import { searchUsers, inviteUser } from "$lib/firebase/firestore";
import type { Campaign, UserInformation } from "../../../global";
export let campaign: Campaign;

let searchResults = [];
let searchTerm: string; 
let searched = false;
let success = false;

async function search() {
  searchResults = await searchUsers(searchTerm);
  searched = true;
}

async function sendJoinRequest(searchResult: string) {
  await inviteUser(searchResult, campaign.id);
  success = true;
  // that returns void, so now we can... idk, close the module?
  // don't know how to do that, so instead, success message! 
}

</script>

<style>
</style>

<div id="invite-form-modal" uk-modal>
  <div class="uk-modal-dialog uk-padding">
    <button class="uk-modal-close-default" type="button" uk-close></button>
    <div class="uk-container uk-container-default">
      <h3>Invite a User to {campaign.name || "Unnamed Campaign"}</h3>
      <div class="uk-margin">
        <input type="text" class="uk-input" placeholder="Enter a username or an email..." bind:value={searchTerm} on:input={() => { searched=false; success=false; }}/>
      </div>
      <button class="uk-button uk-button-default" on:click={search}>Search</button>
      {#if success}
        <p>Invite Sent!</p>
      {/if} 
      {#if searched}
        {#if searchResults.length > 0}
          <ul>
            {#each searchResults as searchResult}
              <li on:click={() => sendJoinRequest(searchResult.uid)}>{searchResult.displayName || searchResult.email }</li>
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