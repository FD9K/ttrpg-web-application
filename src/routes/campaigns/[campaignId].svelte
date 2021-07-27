

<!-- load up details about the party and manage access. -->
<script lang="ts">
import { page } from "$app/stores";
import type { Campaign } from "../../global";
import { getCampaign } from "$lib/fire/firestore";
import { onMount } from "svelte";
import { authStore } from "../../stores";
import InviteFormModal from "../../components/campaigns/[campaignId]/inviteFormModal.svelte";

let campaign: Campaign;
let campaignId: string;
let currentUser;
let ownsCampaign: boolean = false;
let inviteFormDeployed: boolean = false;
  
onMount(async () => {
  campaignId = $page.params.campaignId;
  campaign = await getCampaign(campaignId);
  currentUser = $authStore.user;
  if (campaign.creatorId === currentUser.uid) {
    ownsCampaign = true;
  }
});

function deployInviteForm() {
  inviteFormDeployed = true;
}

</script>

{#if campaign}
  <div class="uk-section uk-section-default">
    <div class="uk-container uk-container-large">
      <div class="uk-card uk-card-default uk-card-body">
        <h3 class="uk-card-title">{campaign.name || "Unnamed Campaign" }</h3>
        <hr />
        {#if ownsCampaign} 
        <!-- invite other players here! -->
        <!-- either via email... or in app.. -->
        <!-- one requires an email implementation. The other requires that we be able to fuzzy search a user... damn. -->
        <div id="invite-users">
          <button class="uk-button uk-button-default uk-button-small" on:click={deployInviteForm}>Invite Users</button>
        </div>
        {/if}
      </div>
    </div>
  </div>
  {#if inviteFormDeployed}
    <InviteFormModal campaign={campaign}/>
  {/if}
{/if}