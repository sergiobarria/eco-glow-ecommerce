<script lang="ts">
	import type { PageData } from './$types';

	import { NewProductForm } from '$lib/components/products';

	export let data: PageData;
</script>

<h1>Add New Product</h1>

<NewProductForm data={data.form} />
