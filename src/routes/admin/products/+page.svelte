<script lang="ts">
	import { PlusIcon } from 'lucide-svelte';
	// import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';

	// export let data: PageData;
</script>

<div class="flex items-center justify-between">
	<h1>Products</h1>
	<Button href="/admin/products/new">
		<PlusIcon class="mr-2 size-4" />
		Add New Product
	</Button>
</div>
