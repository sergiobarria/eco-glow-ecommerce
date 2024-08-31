import { MaxWidthContainer } from '@/components/site/max-width-container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function JoinOurCommunity() {
	return (
		<section id="join-community" className="bg-gray-100 py-20">
			<MaxWidthContainer>
				<div className="flex flex-col items-center space-y-4 text-center">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Join Our Eco-Conscious Community
					</h2>
					<p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
						Sign up for our newsletter to receive eco-tips, special offers, and updates
						on our latest products.
					</p>
					<div className="w-full max-w-sm space-y-2">
						<form className="flex space-x-2">
							<Input className="flex-1" placeholder="Enter your email" type="email" />
							<Button type="submit">Subscribe</Button>
						</form>
					</div>
				</div>
			</MaxWidthContainer>
		</section>
	);
}
