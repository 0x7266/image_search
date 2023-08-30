<script lang="ts">
	import { onMount } from "svelte";
	import { type Image } from "./types/image";

	let images: Image[] = [];
	let query = "";

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		fetchImages();
	}

	async function fetchImages() {
		const response = await fetch(
			`https://api.unsplash.com/search/photos?query=${
				query || "nature"
			}&per_page=6&client_id=${import.meta.env.VITE_API_KEY}`
		);
		const data = await response.json();
		images = data.results;
	}

	onMount(() => fetchImages());
</script>

<main>
	<form on:submit={handleSubmit}>
		<input type="text" bind:value={query} />
		<button>SEARCH</button>
	</form>
	<div class="images">
		{#each images as image}
			<img src={image.urls.small} alt={image.alt_description} />
		{/each}
	</div>
</main>

<style>
	.images {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	img {
		aspect-ratio: 1/1;
		max-width: 400px;
		object-fit: cover;
	}
</style>
