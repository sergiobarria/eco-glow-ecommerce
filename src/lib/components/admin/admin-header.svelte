<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import { UserMenu } from '.';

	const LINKS = [
		{ name: 'Products', href: '/admin/products' },
		{ name: 'Orders', href: '/admin/orders' }
	];
</script>

<header class="border-b">
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
		<div class="flex items-center gap-10">
			<a href="/admin" class="text-lg font-bold">EcoEssence Admin</a>
			<nav class="space-x-3 text-sm">
				{#each LINKS as link (link.name)}
					<a
						href={link.href}
						class={cn('inline-block px-2 py-1.5', {
							'font-semibold text-primary': $page.url.pathname.includes(link.href),
							'text-gray-400 hover:text-gray-600': !$page.url.pathname.includes(link.href)
						})}
					>
						{link.name}
					</a>
				{/each}
			</nav>
		</div>
		<div>
			<UserMenu />
		</div>
	</div>
</header>
