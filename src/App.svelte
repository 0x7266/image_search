<script lang="ts">
	import { onMount } from "svelte";
	import { type Image } from "./types/image";
	import { fly } from "svelte/transition";
	import Icon from "@iconify/svelte";
	import "@fontsource/poppins";
	import { getImages } from "./utils/getImages";

	let images: Image[] = [];
	let query = "";
	let page = 1;

	function handleSubmit() {
		fetchImages();
	}

	async function fetchImages() {
		images = await getImages(query);
	}

	async function handleMore() {
		page++;
		images = [...images, ...(await getImages(query, page))];
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
			<div class="card" in:fly={{ y: 200, duration: 800, delay: index * 80 }}>
				<img src={image.urls.small} alt={image.alt_description} />
				<div class="user">
					<a href={`https://unsplash.com/@${image.user.username}`}
						>{image.user.first_name} {image.user.last_name}</a
					>
					<div class="social">
						<a href={`https://twitter.com/${image.user.twitter_username}`}>
							<Icon icon="ion:logo-twitter" width="25" />
						</a>
						<a href={`https://instagram.com/${image.user.instagram_username}`}
							><Icon icon="ion:logo-instagram" width="25" /></a
						>
						<a href={`${image.user.portfolio_url}`}
							><Icon icon="ion:globe-outline" width="25" /></a
						>
					</div>
				</div>
			</div>
		{/each}
	</div>
	<button on:click={handleMore}>More...</button>
</main>

<style>
	main {
		padding: 2%;
		align-items: center;
		background-color: #070913;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		font-family: "Poppins", sans-serif;
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

	.card {
		align-items: center;
		background-color: #ececec;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	img {
		aspect-ratio: 1/1;
		width: 400px;
		object-fit: cover;
	}

	.user {
		align-items: center;
		display: flex;
		font-size: 1.1rem;
		font-weight: bold;
		justify-content: space-between;
		padding: 10px;
		width: 100%;
	}

	a {
		text-decoration: none;
		color: inherit;
		display: grid;
		place-content: center;

		&:visited {
			color: #313238;
		}
	}

	.social {
		display: flex;
		gap: 5px;
		justify-content: end;
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
