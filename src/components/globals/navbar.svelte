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

<nav>
<button class="bg-gray-100 p-1 px-5 m-2 hover:bg-blue-100 rounded" on:click={handleMenuOpening}>Menu</button>
{#if !$authStore.isLoggedIn}
  <button class="bg-blue-200 p-1 px-5 m-2 hover:bg-blue-300 rounded">Create an Account</button>
  <a href="/users/login">Login</a>
{/if}
</nav>

{#if menuOpen}

<div id="menu-modal-wrapper" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div id="menu-modal" class="flex items-end justify-center min-h-screet pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-botton bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"></div>
  </div>
</div>

{/if}
