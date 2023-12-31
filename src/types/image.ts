export type Image = {
	id: string;
	slug: string;
	created_at: string;
	updated_at: string;
	promoted_at: string;
	width: number;
	height: number;
	color: string;
	blur_hash: string;
	description: any;
	alt_description: string;
	breadcrumbs: any[];
	urls: Urls;
	links: Links;
	likes: number;
	liked_by_user: boolean;
	current_user_collections: any[];
	sponsorship: any;
	topic_submissions: TopicSubmissions;
	user: User;
	tags: Tag[];
};

type Urls = {
	raw: string;
	full: string;
	regular: string;
	small: string;
	thumb: string;
	small_s3: string;
};

type Links = {
	self: string;
	html: string;
	download: string;
	download_location: string;
};

type TopicSubmissions = {};

type User = {
	id: string;
	updated_at: string;
	username: string;
	name: string;
	first_name: string;
	last_name: string;
	twitter_username: string;
	portfolio_url: string;
	bio: string;
	location: string;
	links: Links2;
	profile_image: ProfileImage;
	instagram_username: string;
	total_collections: number;
	total_likes: number;
	total_photos: number;
	accepted_tos: boolean;
	for_hire: boolean;
	social: Social;
};

type Links2 = {
	self: string;
	html: string;
	photos: string;
	likes: string;
	portfolio: string;
	following: string;
	followers: string;
};

type ProfileImage = {
	small: string;
	medium: string;
	large: string;
};

type Social = {
	instagram_username: string;
	portfolio_url: string;
	twitter_username: string;
	paypal_email: any;
};

type Tag = {
	type: string;
	title: string;
};
