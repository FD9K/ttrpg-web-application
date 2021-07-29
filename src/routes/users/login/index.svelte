<script lang="ts">
  import { goto } from "$app/navigation";
  import { authStore } from "../../../stores";
  import { login } from "$lib/firebase/auth";

  let password: string = "";
  let email: string = "";
  
  authStore.subscribe((user) => {
    if (user.isLoggedIn) {
      goto("/");
    }
  });

  async function loginUser() {
    const user = await login("email", {
      email,
      password,
    });
    goto("/");
  }

</script>

<style>
</style>

<div id="login-background">
  <div class="uk-card uk-card-large uk-width-1-2 uk-card-body">
    <fieldset class="uk-fieldset">
      <legend class="uk-legend">Log In to TTRPG</legend>
    </fieldset>
    <div class="uk-margin">
      <input type="text" class="uk-input" placeholder="Email" id="email" name="email" bind:value={email} />
    </div>
    <div class="uk-margin">
      <input type="password" name="password" id="password" class="uk-input" placeholder="Password" bind:value={password} />
    </div>
    <button class="uk-button uk-button-default" on:click={loginUser}>Log In</button>
  </div>
</div>
