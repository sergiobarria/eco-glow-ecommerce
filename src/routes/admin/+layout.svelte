<script lang="ts">
	import { AdminHeader } from '$lib/components/admin';
</script>

<svelte:head>
	<title>EcoEssence Admin</title>
	<meta name="description" content="EcoEssence Admin" />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<AdminHeader />
	<main class="flex-1 px-5 py-10">
		<slot />
	</main>
</div>
