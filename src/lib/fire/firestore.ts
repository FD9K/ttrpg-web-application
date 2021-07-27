
import { auth, firestore } from "./config";
import firebase from "firebase";
import type { UserInformation, Character, Campaign } from "../../global";

// all of these require certain rules to fetch, so make sure the user is authenticated where necessary. 
// typing this is such a huge pain in the ass that I won't 
export async function getUser(uid: string): Promise<any> {
  const currentUser = auth.currentUser;
  if (currentUser) {
    // you can get private fields. Don't know exactly what that... is, yet.
  } else {
    const document = await firestore.collection('users')
      .doc(uid)
      .get();
    
    if (document.exists) {
      const user = document.data();
      return user;
    } else {
      return null;
    }
  }
}

export async function updateUser(update: { [field: string]: any }): Promise<any> {
  const { currentUser } = auth;
  const { uid } = currentUser;
  try {
    await firestore.collection("users")
      .doc(uid)
      .update(update);
    const user = await getUser(uid);
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteUser(): Promise<void> {
  const { currentUser } = auth;
  const { uid } = currentUser;
  try {
    await firestore.collection("users")
      .doc(uid)
      .delete();
  } catch (error) {
    return error;
  }
}

export async function createUser(): Promise<UserInformation> {
  // this will always trigger during registration. So, only function on an authed call. 
  const { currentUser } = auth;
  const { uid, email, displayName, photoURL } = currentUser;
  const defaultUser: UserInformation = {      // default fields for a new user document.
    uid,
    email,
    displayName,
    photoURL,
    characters: [],
    campaigns: [],
    registrationDate: new Date(),
  }

  try {
    await firestore.collection("users")
      .doc(currentUser.uid)
      .set(defaultUser);
    return defaultUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getCharacter(characterId: string): Promise<any> {
  const characterDocument = await firestore.collection("characters")
    .doc(characterId)
    .get();
  
  const character = characterDocument.data();
  return character;
}

export async function getCampaign(campaignId: string): Promise<any> {
  const campaignDocument = await firestore.collection("campaigns")
    .doc(campaignId)
    .get();
  
  const campaign = campaignDocument.data();
  console.log(campaign);
  return campaign;
}

// export async function updateCampaign(campaignId: string): Promise<Campaign> {

// }

// export async function deleteCampaign(campaignId: string): Promise<Campaign> {

// }

export async function createCampaign(): Promise<Campaign> {
  const { currentUser } = auth;
  const { uid } = currentUser;

  const boilerplateCampaign: Campaign = {
    creationDate: new Date(),
    creatorId: uid,
    playerIds: [],
    concluded: false,
  }

  const newCampaign = await firestore.collection("campaigns")
    .add(boilerplateCampaign);
  
  const { id } = newCampaign;
  await firestore.collection("users")
    .doc(uid)
    .update({
      campaigns: firebase.firestore.FieldValue.arrayUnion(id)
    });
  
  return { ...boilerplateCampaign, id };
}

export async function createCharacter(): Promise<Character> {
  const { currentUser } = auth;
  const { uid } = currentUser;
  const boilerplateCharacter: Character = {
    creationDate: new Date(),
    creatorId: uid,
    abilities: [],
    name: "",
  }
  const document = await firestore.collection("characters")
    .add(boilerplateCharacter);
  // get the firestore-generated id;
  const { id } = document;
  // now update the user with their new character. 
  await firestore.collection("users")
    .doc(uid)
    .update({
      characters: firebase.firestore.FieldValue.arrayUnion(id)
    });
  
  return { ...boilerplateCharacter, id };
}

// export async function updateCharacter(characterId: string): Promise<Character> {

// }

// export async function deleteCharacter(characterId: string): Promise<Character> {

// }

// RBAC 
// users may :
  // look at each other's profiles
  // look at any character NOT marked "private"
  // look at other campaigns NOT market "private"
  
  // receive invites for ONLY themselves

  export async function searchUsers(searchTerm: string): Promise<any[]> {
    const results = [];
    const displayNameRef = await firestore.collection("users")
      .where("displayName", "==", searchTerm)
      .get()
    displayNameRef.forEach((hit) => results.push(hit.data()));
    const emailRef = await firestore.collection("users")
      .where("email", "==", searchTerm)
      .get();
    emailRef.forEach((hit) => results.push(hit.data()));
    return results;
  }