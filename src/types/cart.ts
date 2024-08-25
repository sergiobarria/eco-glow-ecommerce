export type CartItem = {
	productId: number;
	name: string;
	basePrice: number;
	totalPrice: number;
	quantity: number;
	selectedAddons: SelectedAddon[];
};

export type SelectedAddon = {
	addon: string;
	optionId: number;
	optionName: string;
	priceModifier: number;
};

export type Cart = {
	items: CartItem[];
	totalItems: number;
	totalPrice: number;
};
