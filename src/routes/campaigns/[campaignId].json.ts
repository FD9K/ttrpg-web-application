import { readOne } from "$lib/firebase/alt-firestoretore";

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