import { HeartIcon, LeafIcon, RecycleIcon } from 'lucide-react';

export function EnvironmentalBenefits() {
	return (
		<section id="environmental benefits" className="bg-white py-20">
			<div className="container px-4 md:px-6">
				<h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
					Environmental Benefits
				</h2>
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					<div className="flex flex-col items-center text-center">
						<LeafIcon className="mb-4 h-12 w-12 text-green-500" />
						<h3 className="mb-2 text-xl font-semibold">Biodegradable</h3>
						<p className="text-gray-500">
							Our candles and packaging are fully biodegradable, minimizing
							environmental impact.
						</p>
					</div>
					<div className="flex flex-col items-center text-center">
						<RecycleIcon className="mb-4 h-12 w-12 text-green-500" />
						<h3 className="mb-2 text-xl font-semibold">Recyclable Containers</h3>
						<p className="text-gray-500">
							All our containers are made from recycled materials and are fully
							recyclable.
						</p>
					</div>
					<div className="flex flex-col items-center text-center">
						<HeartIcon className="mb-4 h-12 w-12 text-green-500" />
						<h3 className="mb-2 text-xl font-semibold">Clean Air</h3>
						<p className="text-gray-500">
							Our natural ingredients promote cleaner indoor air quality compared to
							traditional candles.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
