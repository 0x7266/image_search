<script lang="ts">
	import { type Image } from "./types/image";
	let images: Image[] = [];
	let query = "";
	async function fetchImages(e) {
		e.preventDefault();
		const response = await fetch(
			`https://api.unsplash.com/search/photos?query=${query}&per_page=3&client_id=${
				import.meta.env.VITE_API_KEY
			}`
		);
		const data = await response.json();
		images = data.results;
	}
</script>

<main>
	<form on:submit={fetchImages}>
		<input type="text" bind:value={query} />
		<button>SEARCH</button>
	</form>
	{#each images as image}
		<img src={image.urls.regular} alt={image.alt_description} />
	{/each}
</main>
