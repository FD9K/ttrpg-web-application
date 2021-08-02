
<script lang="ts" context="module">
export async function load({ page, fetch }) {
  const { params } = page;
  const { campaignId } = params;
  const url: string = `/campaigns/${campaignId}.json`;
  const response: Response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    const { campaign } = data;
    return {
      props: {
        campaign
      }
    }
  }

  return {
    error: new Error(`Could not fetch ${url}.`)
  }
}
</script>
<!-- load up details about the party and manage access. -->
<script lang="ts">
import { authStore } from "../../stores";
import InviteFormModal from "../../components/campaigns/[campaignId]/inviteFormModal.svelte";

export let campaign;
let ownsCampaign: boolean = false;

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
          <button uk-toggle="target: #invite-form-modal" class="uk-button uk-button-default uk-button-small" type="button">Invite Users</button>
        </div>
        {/if}
      </div>
    </div>
  </div>
  <InviteFormModal campaign={campaign}/>
{/if}