export type FeaturedProduct = {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	featured: boolean;
	artisan: {name: string};
	category: {name: string};
	artisanId: string;
	categoryId: string;
	createdAt: Date;
	updatedAt: Date;
	inStock: boolean;
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



