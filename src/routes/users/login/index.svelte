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

<div class="m-12 flex justify-center">
  <div class="m-12 shadow border boder-gray-50 rounded overflow-hidden w-3/4">
    <div class="p-3 bg-gray-600 text-yellow-500">
      <p class="text-lg uppercase text-center font-bold">Log In To TTRPG</p>
    </div>
    <div class="p-4 bg-gray-50 flex justify-center items-center flex-wrap">
      <input type="text" class="block m-4 p-4 w-3/4 text-gray-700 border border-gray-100 outline-none" placeholder="Email" id="email" name="email" bind:value={email} />
      <input type="password" class="block m-4 p-4 w-3/4 text-gray-700 border border-gray-100 outline-none" name="password" id="password" placeholder="Password" bind:value={password} />
      <button class="m-4 p-4 px-6 bg-gray-600 text-yellow-500 rounded hover:bg-gray-500" on:click={loginUser}>Log In</button>
    </div>
  </div>
</div>
