<script>
  import { onMount } from "svelte";

  onMount(async function() {
    await fetch(`blog.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  });

  export let posts = [];
</script>

<slot {posts} />
