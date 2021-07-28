// get user, characters for user, invites for user, campaigns for user.
import { readOne, readMany } from "$lib/fire/alt-firestore";

export async function get(request) {
  console.log("i did get hit.");
  const { params } = request;
  const { userId } = params;

  const user = await readOne({
    collection: "users",
    id: userId
  });
  console.log(user);

  const campaigns = await readMany({
    collection: "campaigns",
    queries: [{
      field: "ownerId",
      operator: "==",
      value: userId
    }]
  });
  console.log(campaigns)

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

  return {
    body: {
      user,
      campaigns,
      characters,
      invites
    }
  }
};