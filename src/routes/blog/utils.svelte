<script>
  import { onMount } from "svelte";

  export let posts = [];

  onMount(async function() {
    const response = await fetch(`blog.json`);
    const json = await response.json();
    posts = json;
  });
</script>

<slot {posts} />
