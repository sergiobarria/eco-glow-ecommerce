export interface Product {
	id: number;
	slug: string;
	name: string;
	description: string;
	summary: string;
	price: number;
	discount: number | null;
	category: string;
	rating: number;
	review_count: number;
	in_stock: boolean;
}
