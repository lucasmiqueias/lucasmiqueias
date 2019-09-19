<script context="module">
  export function preload({ params, query }) {}
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
