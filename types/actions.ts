export type FeaturedProduct = {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	artisan: string;
	category: string | null;
};

export type CategoryItem = {
	name: string;
	image?: string | null;
};

export type EventItem = {
	id: string;
	title: string;
	description: string;
	date: string | Date;
	location: string;
	image?: string | null;
};



