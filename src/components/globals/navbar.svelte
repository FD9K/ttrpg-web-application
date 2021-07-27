<script>
  import { logout } from "$lib/fire/auth";
  // we actually need to work with the app state here to figure things out...
  import { authStore } from "../../stores";
  // pretty simple, huh.
  async function logOut() {
    await logout();
    // need to have a flag here eventually to figure out if the current page is auth guarded and redirect / rerender if so. 
  }
</script>

<style></style>

<nav class="uk-navbar-container" uk-navbar>
  <div class="uk-navbar-right">
    {#if $authStore.isLoggedIn}
      <ul class="uk-navbar-nav">
        <li><a href="/">Tools</a></li>
        <div class="uk-navbar-dropdown">
          <ul class="uk-nav uk-navbar-dropdown-nav">
            <li><a href="/users/{$authStore.user.uid}">My Profile</a></li>
            <li><a href="/users/{$authStore.user.uid}/characters">My Characters</a></li>
            <li><a href="/campaigns">My Campaigns</a></li>
            <li><a href="/" on:click={logOut}>Log Out</a></li>
          </ul>
        </div>
        <div class="uk-navbar-item">
          <a href="/battle-app">
            <button class="uk-button uk-button-default">
              Open BattleApp
            </button>
          </a>
        </div>
      </ul>
    {:else}
      <ul class="uk-navbar-nav">
        <div class="uk-navbar-item">
          <a href="/users/register">
            <button class="uk-button uk-button-default">Sign Up</button>
          </a>
        </div>
        <div class="uk-navbar-item">
          <a href="/users/login">Log In</a>
        </div>
      </ul>
    {/if}
  </div>
</nav>