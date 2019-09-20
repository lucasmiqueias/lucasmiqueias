<script>
  import Posts from "./../routes/blog/utils";
</script>

<style>
  .PostList {
    width: 100%;
    display: block;
  }
</style>

<section>
  <Posts let:posts>
    {#each posts as post}
      <a class="PostList" href="blog/{post.slug}">
        {post.date}
        <br />
        {post.title}
      </a>
      <br />
    {/each}
  </Posts>
</section>
