<script lang="ts">
import { onMount } from "svelte";
import { getCampaign } from "$lib/fire/firestore";
import type { Campaign } from "../../../global";
import { goto } from "$app/navigation";
export let campaignId: string;
let campaign: Campaign;
$: campaign;

onMount(async () => {
  campaign = await getCampaign(campaignId);
});

// onclick - navigate to campaign.
function openCampaign() {
  goto(`/campaigns/${campaignId}`);
}

</script>

<style>
  .uk-card {
    cursor: pointer;
  }
</style>

{#if campaign}
<div class="uk-container">
  <div class="uk-card uk-card-default uk-card-body uk-card-hover" on:click={openCampaign}>
    <h5>
      {#if campaign.name}
        {campaign.name}
      {:else} 
        Unnamed Campaign
      {/if}
    </h5>
  </div>
</div>
{/if}
