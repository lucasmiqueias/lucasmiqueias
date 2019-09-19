<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(datas => {
        return { datas };
      });
  }
</script>

<script>
  export let datas;
</script>

<div>
  {#each datas as data}
    <li>
      <a rel="prefetch" href="blog/{data.slug}">{data.title}</a>
    </li>
  {/each}
</div>
