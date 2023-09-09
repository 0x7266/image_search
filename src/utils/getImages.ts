import type { Image } from "../types/image";

type Data = {
	results: Image[];
	total: number;
	total_pages: number;
};

export async function getImages(
	query: string,
	page?: number
): Promise<Image[]> {
	const response = await fetch(
		`https://api.unsplash.com/search/photos?query=${
			query || "rio de janeiro"
		}&per_page=6&page=${page || 1}&client_id=${import.meta.env.VITE_API_KEY}`
	);
	const data: Data = await response.json();
	return data.results;
}
