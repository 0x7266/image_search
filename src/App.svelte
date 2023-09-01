<script lang="ts">
	import { onMount } from "svelte";
	import { type Image } from "./types/image";
	import { fly } from "svelte/transition";

	let images: Image[] = [];
	let query = "";

	function handleSubmit() {
		fetchImages();
	}

	async function fetchImages() {
		const response = await fetch(
			`https://api.unsplash.com/search/photos?query=${
				query || "rio de janeiro"
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
		{#each images as image, index (image.id)}
			<img
				src={image.urls.small}
				alt={image.alt_description}
				in:fly={{ y: 200, duration: 800, delay: index * 80 }}
			/>
		{/each}
	</div>
</main>

<style>
	main {
		padding: 2%;
		align-items: center;
		background-color: #1f1e25;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		gap: 3vh;
	}

	form {
		display: flex;
		gap: 10px;
	}

	input,
	button {
		border: none;
		border-radius: 10px;
		font-size: 1.5rem;
		padding: 8px 10px;
	}

	button {
		background-color: #237ee6;
		color: white;
	}

	.images {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 10px;
	}

	img {
		aspect-ratio: 1/1;
		border-radius: 15px;
		width: 300px;
		object-fit: cover;
	}
</style>
