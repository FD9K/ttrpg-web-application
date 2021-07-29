// get user, characters for user, invites for user, campaigns for user.
import { readOne, readMany } from "$lib/firebase/alt-firestore";

export async function get(request) {
  const { params } = request;
  const { userId } = params;

  const user = await readOne({
    collection: "users",
    id: userId
  });

  const campaigns = await readMany({
    collection: "campaigns",
    queries: [{
      field: "ownerId",
      operator: "==",
      value: userId
    }]
  });

  const characters = await readMany({
    collection: "characters",
    queries: [{
      field: "ownerId",
      operator: "==",
      value: userId
    }]
  });
  
  const invites = await readMany({
    collection: "invites",
    queries: [{
      field: "recipientId",
      operator: "==",
      value: userId
    }]
  });

  console.log({ invites });

  return {
    body: {
      user,
      campaigns,
      characters,
      invites
    }
  }
};