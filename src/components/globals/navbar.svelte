<script lang="ts">
  import { logout } from "$lib/firebase/auth";
  // we actually need to work with the app state here to figure things out...
  import { authStore } from "../../stores";
  let menuOpen: boolean = false;
  // pretty simple, huh.
  async function logOut() {
    await logout();
    // need to have a flag here eventually to figure out if the current page is auth guarded and redirect / rerender if so. 
  }

  function handleMenuOpening() {
    if (menuOpen) {
      menuOpen = false;
    } else {
      menuOpen = true;
    }
  }

</script>

<style></style>

<nav class="p-3 bg-gray-600 text-gray-200 flex shadow-xl border-b border-gray-700">
  <p class="text-md uppercase font-bold p-3">TTRPG</p>
  <a href="/users/{$authStore?.user?.uid || ''}" class="p-3 font-bold uppercase text-md text-yellow-500 hover:bg-gray-500 rounded-xl">Profile</a>
  <a href="/characters" class="p-3 font-bold uppercase text-md text-yellow-500 hover:bg-gray-500 rounded-xl">Characters</a>
  <a href="/campaigns" class="p-3 font-bold uppercase text-md text-yellow-500 hover:bg-gray-500 rounded-xl">Campaigns</a>
  {#if !$authStore.isLoggedIn}
    <button class="p-3 font-bold uppercase text-md text-yellow-500 hover:bg-gray-500 rounded-xl">Create an Account</button>
    <a href="/users/login" class="p-3 font-bold uppercase text-md text-yellow-500 hover:bg-gray-500 rounded-xl">Login</a>
  {:else}
    <button class="p-3 font-bold uppercase text-md text-yellow-500 hover:bg-gray-500 rounded-xl" on:click={logOut}>Log Out</button>
  {/if}
</nav>