<script lang="ts">
import type { Campaign } from "../../../global";
import { goto } from "$app/navigation";
export let campaign;

// onclick - navigate to campaign.
function openCampaign() {
  goto(`/campaigns/${campaign.id}`);
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
