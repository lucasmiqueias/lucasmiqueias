<script>
  import { onMount } from "svelte";
  import Posts from "./blog/utils.svelte";

  onMount(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
  });
</script>

<svelte:head>
  <title>Sapper project template</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js">

  </script>
</svelte:head>

<span>Lucas Miqueias</span>
<Posts let:posts>
  {#each posts as post}
    <li>
      <a href="blog/{post.slug}">{post.title}</a>
    </li>
  {/each}
</Posts>
