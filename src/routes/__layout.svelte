
<script lang="ts" context="module">
  import { auth } from "$lib/firebase/config";
  import { authStore } from "../stores";
  
  auth.onAuthStateChanged((user) => {
    console.log("HEY! Auth state changed: server.");
    if (user) {
      console.log(user);
      authStore.set({
        isLoggedIn: true,
        user
      });
    } else {
      console.log("no user: server");
    }
  });
</script>
<script lang="ts">
  import Nav from "../components/globals/navbar.svelte";
  // might be stupid but I've got a theory...
  auth.onAuthStateChanged((user) => {
    console.log("HEY! Auth state changed: client.");
    if (user) {
      console.log(user);
      authStore.set({
        isLoggedIn: true,
        user
      });
    } else {
      console.log("no user: client");
    }
  });
</script>

<style></style>

<Nav />
<slot></slot>