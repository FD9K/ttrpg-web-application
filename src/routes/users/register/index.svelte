<script>
  import { goto } from "$app/navigation";
  import { register } from "$lib/fire/auth";
  import { createUser } from "$lib/fire/firestore";
  import { authStore } from "../../../stores";

  let password;
  let email;
  let confirmPassword;

  authStore.subscribe(async (user) => {
    if (user.isLoggedIn) {
      goto("/");
    }
  });

  async function registerUser() {
    if (password !== confirmPassword) {
      alert('passwords do not match.');
    } else {
      const user = await register("email", {
        password,
        email
      });
      // add the user to firebase.
      await createUser();
      // redirect to user profile page instead of homepage.
      goto(`/users/${user.uid}`);
    }
  }
</script>

<style></style>

<div id="login-background">
  <div class="uk-card uk-card-large uk-width-1-2 uk-card-body">
      <fieldset class="uk-fieldset">
        <legend class="uk-legend">Sign Up for TTRPG</legend>
      </fieldset>
      <div class="uk-margin">
        <input type="text" class="uk-input" placeholder="Email" id="email" name="email" bind:value={email} />
      </div>
      <div class="uk-margin">
        <input type="password" name="password" id="password" class="uk-input" placeholder="Password" bind:value={password} />
      </div>
      <div class="uk-margin">
        <input type="password" name="confirm-password" id="confirm-password" class="uk-input" placeholder="Confirm Password" bind:value={confirmPassword} />
      </div>
      <button class="uk-button uk-button-default" on:click={registerUser}>Sign Up</button>
  </div>
</div>