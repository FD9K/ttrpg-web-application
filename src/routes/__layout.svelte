<script>
  import Nav from "../components/globals/navbar.svelte"
  import { auth } from "$lib/fire/config";
  import { authStore } from "../stores";

  auth.onAuthStateChanged((user) => {
    if (user) {
      authStore.set({
        isLoggedIn: true,
        user
      });
    }
  });

</script>

<style></style>

<Nav />
<slot></slot>