<script>
  import { register } from "$lib/fire/auth";
  let password;
  let email;
  let confirmPassword;

  async function registerUser() {
    if (password !== confirmPassword) {
      alert('passwords do not match.');
    } else {
      const user = await register("email", {
        password,
        email
      });
      console.log(user);
    }
  }
</script>

<style></style>

<h1>Sign Up For TTRPG</h1>
<div id="sign-in-form">
  <label for="email">Email</label>
  <input type="text" name="email" id="email" bind:value={email}/>
  <label for="password">Password</label>
  <input type="password" name="password" id="password" bind:value={password}/>
  <label for="confirm-password">Confirm Password</label>
  <input type="password" name="confirm-password" id="confirm-password" bind:value={confirmPassword} />
  <button on:click={registerUser}>Sign Me Up</button>
</div>