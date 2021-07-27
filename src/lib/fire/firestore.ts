
import { auth, firestore } from "./config";

type UserInformation = {
  uid: string;
  characters: string[];
  campaigns: string[];
  registrationDate: Date;
  email: string;
  displayName: string;
  photoURL: string;
}

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
  console.log("you know, it happened.");
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

// export async function getCharacter(characterId: string): Promise<Character> {

// }

// export async function getCampaign(campaignId: string): Promise<Campaign> {

// }

// export async function updateCampaign(campaignId: string): Promise<Campaign> {

// }

// export async function deleteCampaign(campaignId: string): Promise<Campaign> {

// }

// export async function createCampaign(): Promise<Campaign> {
  
// }

// export async function createCharacter(character): Promise<Character> {

// }

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