<script lang="ts">
	import { SaveIcon } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { insertProductSchema, type InsertProduct } from '$lib/schemas/product-schemas';

	export let data: SuperValidated<Infer<InsertProduct>>;

	const form = superForm(data, {
		validators: zodClient(insertProductSchema)
	});
	const { form: formData, enhance } = form;
</script>

<form method="POST" class="max-w-lg space-y-3" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Product Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} placeholder="New Product" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="basePrice">
		<Form.Control let:attrs>
			<Form.Label>Product Base Price</Form.Label>
			<Input {...attrs} bind:value={$formData.basePrice} placeholder="0" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Product Description</Form.Label>
			<Textarea
				{...attrs}
				rows={5}
				bind:value={$formData.description}
				placeholder="A new product description"
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>
		<SaveIcon class="mr-2 size-4" />
		Create Product
	</Form.Button>
</form>

<div class="mt-6">
	<SuperDebug data={$formData} />
</div>
