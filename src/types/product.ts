export interface Category {
	id: number;
	created: string;
	modified: string;
	name: string;
	slug: string;
	description?: string | null;
}

export interface Product {
	id: number;
	created: string;
	modified: string;
	name: string;
	slug: string;
	summary?: string | null;
	description?: string | null;
	price: number;
	discount: number;
	category: Category;
	rating: number;
	review_count: number;
	in_stock: boolean;
	is_featured: boolean;
	images: ProductImage[];
}

export interface ProductAddon {
	id: number;
	created: string;
	modified: string;
	name: string;
	options: AddonOption[];
}

export interface AddonOption {
	id: number;
	created: string;
	modified: string;
	option_name: string;
	price_modifier: number;
	is_default: boolean;
	order: number;
	variant: ProductAddon;
}

export interface ProductImage {
	id: number;
	created: string;
	modified: string;
	image: string;
	product: Product;
	alt_text?: string | null;
}

export type ProductListResponse = {
	items: Product[];
	count: number;
};

export type ProductDetailResponse = {
	product: Product;
	addons?: Omit<ProductAddon, 'created' | 'modified'>[];
};
