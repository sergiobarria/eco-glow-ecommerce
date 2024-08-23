import { notFound } from 'next/navigation';

import { ProductDetails } from './product-details';
import { MaxWidthContainer } from '@/components/site/max-width-container';

import products from '../../../../../data/products.json';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
	const product = products.find(product => product.slug === params.slug);
	if (!product) notFound();
	console.log('🚀 ~ product:', product);

	return (
		<>
			<ProductDetails product={product} />
			<MaxWidthContainer className="mt-12">
				<h2 className="mb-4 text-2xl font-bold">Customer Reviews</h2>
				<p className="text-gray-600">Reviews will be displayed here.</p>
			</MaxWidthContainer>

			<MaxWidthContainer className="mt-12">
				<h2 className="mb-4 text-2xl font-bold">Recommended Products</h2>
				<p className="text-gray-600">Recommended products will be displayed here.</p>
			</MaxWidthContainer>
		</>
	);
}
