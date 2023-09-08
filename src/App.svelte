<script lang="ts">
	import { onMount } from "svelte";
	import { type Image } from "./types/image";
	import { fly } from "svelte/transition";

	let images: Image[] = [];
	let query = "";
	let page = 1;

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

	async function handleMore() {
		page++;
		const response = await fetch(
			`https://api.unsplash.com/search/photos?query=${
				query || "rio de janeiro"
			}&page=${page}&per_page=6&client_id=${import.meta.env.VITE_API_KEY}`
		);
		const data = await response.json();
		images = [...images, ...data.results];
	}

	onMount(() => fetchImages());
</script>

<main>
	<form on:submit|preventDefault={handleSubmit}>
		<input type="text" bind:value={query} />
		<button>Search</button>
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
	<button on:click={handleMore}>More...</button>
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
		background-color: #4379b8;
		color: white;

		&:hover {
			background-color: #194991;
		}
	}

	.images {
		display: grid;
		grid-template-columns: 1fr;
		gap: 10px;
	}

	img {
		aspect-ratio: 1/1;
		border-radius: 15px;
		width: 400px;
		object-fit: cover;
	}

	@media (min-width: 780px) {
		.images {
			grid-template-columns: 1fr 1fr;
		}
		img {
			width: 350px;
		}
	}

	@media (min-width: 1200px) {
		.images {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
</style>
