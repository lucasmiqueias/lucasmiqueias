<script context="module">
  export async function preload({ params, query }) {
    return { appName: params.app };
  }
</script>

<script>
  import Posts from "./utils.svelte";
</script>

<Posts let:posts>
  {#each posts as post}
    <li>
      <a href="blog/{post.slug}">{post.title}</a>
    </li>
  {/each}
</Posts>
