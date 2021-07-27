
<!-- one user's personal page. Contains their active campaigns, their characters, etc. -->
<script lang="ts">
import { page } from "$app/stores";
import { getUser, createCharacter } from "$lib/fire/firestore";
import { onMount } from "svelte";
import { authStore } from "../../../stores";
import CharacterCard from "../../../components/user/[userId]/character.svelte";

let currentUser;
let displayUser;
let isUser: boolean = false;
let isEditing = false;
let characterIds: string[] = [];

onMount(async () => {
  const { userId } = $page.params;
  const user = await getUser(userId);
  // display the user that has loaded from the page params. 
  displayUser = user;
  characterIds = user.characters;
  // now check to see if that's who the current user is.
  if ($authStore.user.uid === userId) {
    isUser = true;
  } 
  currentUser = $authStore.user;
});


function triggerEdit() {
  if (isEditing) {
    isEditing = false;
  } else {
    isEditing = true;
  }
}

// both of these are actually going to generate records in the DB, the actual "creation" flow is actually just gonna be a series of updates - possibly based on firebase db in the longrun to make sure the complexity of the form is complemented by an inability to  lose the data.
async function newCharacter() {
  const character = await createCharacter();
  displayUser.characters.push(character);
}

async function createCampaign() {

}

</script>

{#if displayUser} 
<div>
  <div class="uk-section uk-section-muted">
    <div class="uk-container">
      <div id="profile-data" class="uk-card uk-card-default uk-card-body uk-card-large">
        <!-- <img src="{displayUser.photoURL}" alt="Your Profile" uk-img class="uk-border-circle uk-inline" /> -->
        <h3 class="uk-card-title">{displayUser.displayName || displayUser.email}</h3>
        {#if isUser}
          <button class="uk-button uk-button-primary uk-button-small" on:click={triggerEdit}>
            {#if isEditing}
              Save
            {:else}
              Update your Profile
            {/if}
          </button>
          {#if isEditing}
            <hr />
            <ul>
              <li>Email: {displayUser.email}</li>
              <li>Date Registered: {displayUser.registrationDate}</li>
              <li>Profile Image</li>
            </ul>
          {/if}
        {/if}
      </div>
    </div>
  </div>
  <div class="uk-section uk-section-muted">
    <div class="uk-container">
      <div id="characters" class="uk-card uk-card-default uk-card-body uk-card-large">
        <h3 class="uk-card-title">Characters</h3>
        {#if isUser}
        <button class="uk-button uk-button-primary uk-button-small" on:click={newCharacter}>
          Create a Character
        </button>
        {/if}
        <hr />
        {#if displayUser.characters.length > 0}
          <div class="uk-flex uk-flex-left uk-flex-wrap uk-flex-wrap-stretch">
            {#each characterIds as characterId }
              <CharacterCard characterId={characterId} />
            {/each}
          </div>
        {:else} 
          <p>No characters yet? That's a lonely existence.</p>  
        {/if}
      </div>
    </div>
  </div>
  <div class="uk-section uk-section-muted">
    <div class="uk-container">
      <div class="uk-card uk-card-default uk-card-body uk-card-large">
        <h5 class="uk-card-title">Campaigns</h5>
        {#if isUser}
          <button class="uk-button uk-button-primary uk-button-small">Start a Campaign</button>
        {/if}
        <hr />
        {#if displayUser.campaigns.length > 0} 
          {#each displayUser.campaigns as campaign}
            { campaign }
          {/each}
        {:else}
          No campaigns yet? What are we supposed to do with our lives?
        {/if}
      </div>
    </div>
  </div>
</div>
{/if}