import { readOne } from "$lib/firebase/alt-firestore";

export async function get({ params }) {
  const { campaignId } = params;
  const campaign: any = await readOne({
    collection: "campaigns",
    id: campaignId,
  });
  console.log({ campaign });

  return {
    body: {
      campaign
    }
  }
};