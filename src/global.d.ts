/// <reference types="@sveltejs/kit" />


export type UserInformation = {
  uid: string;
  characters: string[];
  campaigns: string[];
  registrationDate: Date;
  email: string;
  displayName: string;
  photoURL: string;
}

export type Character = {
  id?: string;
  name: string;
  creationDate: Date;
  creatorId: string;
  // this is a placeholder, it's a whole lot more complicated than that. 
  abilities: any[];
}

export type Campaign = {
  id?: string;
  name?: string;
  creationDate: Date;
  concluded: boolean;
  creatorId: string;
  playerIds: string[];
  description?: string;
}