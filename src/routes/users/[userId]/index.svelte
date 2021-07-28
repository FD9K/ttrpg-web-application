
<!-- one user's personal page. Contains their active campaigns, their characters, etc. -->
<script lang="ts" context="module">
export async function load({ page, fetch, session, context }) {
  const { params } = page;
  const url = `/users/${params.userId}.data`;
  const response: Response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return {
      props: {
        ...data
      }
    }
  }

  return {
    status: response.status,
    error: new Error(`Could not load ${url}.`),
  }
}
</script>

<script lang="ts">
import { createCharacter, createCampaign, acceptInvite } from "$lib/fire/firestore";
import CharacterCard from "../../../components/user/[userId]/character.svelte";
import CampaignCard from "../../../components/user/[userId]/campaign.svelte";
import { authStore } from "../../../stores";

export let user;
export let characters;
export let campaigns;
export let invites;

console.log($authStore.user);
let isUser: boolean = (user.uid === $authStore.user?.uid);
let isEditing = false;

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
  // characterIds.push(character.id);
}

async function newCampaign() {
  const campaign = await createCampaign();
  // campaignIds.push(campaign.id);
}

</script>

{#if user} 
<div>
  <div class="uk-section uk-section-muted">
    <div class="uk-container">
      <div id="profile-data" class="uk-card uk-card-default uk-card-body uk-card-large">
        <!-- <img src="{displayUser.photoURL}" alt="Your Profile" uk-img class="uk-border-circle uk-inline" /> -->
        <h3 class="uk-card-title">{user.displayName || user.email}</h3>
        {#if isUser}
          {#if invites.length > 0}
            {#each invites as invite} 
              <div class="uk-card uk-card-body uk-card-default">
                Bunch of mfing db operations... 
                <button class="uk-button uk-button-primary" on:click={() => { console.log("ayup") }}>Accept Invitation</button>
              </div>
            {/each}
          {/if}
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
              <li>Email: {user.email}</li>
              <li>Date Registered: {user.registrationDate}</li>
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
        {#if characters.length > 0}
          <div class="uk-flex uk-flex-left uk-flex-wrap uk-flex-wrap-stretch">
            {#each characters as character }
              <CharacterCard character={character} />
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
          <button class="uk-button uk-button-primary uk-button-small" on:click={newCampaign}>Start a Campaign</button>
        {/if}
        <hr />
        {#if campaigns.length > 0} 
          <div class="uk-flex uk-flex-left uk-flex-wrap uk-flex-wrap-stretch">
            {#each campaigns as campaign}
              <CampaignCard campaign={campaign} />
            {/each}
          </div>
        {:else}
          No campaigns yet? What are we supposed to do with our lives?
        {/if}
      </div>
    </div>
  </div>
</div>
{/if}