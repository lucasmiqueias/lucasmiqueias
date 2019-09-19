<script>
  import { onMount } from "svelte";

  onMount(async function() {
    const response = await fetch(`blog.json`);
    const json = await response.json();
    posts = json;
  });

  export let posts = [];
</script>

<slot {posts} />
