export type CartItem = {
	candleId: string;
	name: string;
	basePrice: number;
	totalPrice: number;
	quantity: number;
	selectedAddons: SelectedAddon[];
};

export type SelectedAddon = {
	addon: string;
	optionId: string;
	optionName: string;
	priceModifier: number;
};

export type Cart = {
	items: CartItem[];
	totalItems: number;
	totalPrice: number;
};
