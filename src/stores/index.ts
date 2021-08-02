import type auth from "firebase";
import { writable } from "svelte/store";

export const authStore = writable<{
  isLoggedIn: boolean;
  user?: auth.UserInfo;
}>({
  isLoggedIn: false,
});