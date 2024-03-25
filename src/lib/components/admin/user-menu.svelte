<script lang="ts">
	import { LogOutIcon } from 'lucide-svelte';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';

	async function handleSignOut() {
		console.log('Sign out');
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative size-9 rounded-full">
			<Avatar.Root class="size-9">
				<!-- TODO: Change with user real avatar -->
				<Avatar.Image src="https://avatar.iran.liara.run/public" alt="User avatar" />
				<Avatar.Fallback>EE</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="w-44" align="end">
		<!-- <DropdownMenu.Group>
            
        </DropdownMenu.Group>
        <DropdownMenu.Separator /> -->
		<DropdownMenu.Item on:click={handleSignOut} class="text-red-500 hover:cursor-pointer">
			Sign Out
			<LogOutIcon class="ml-2 size-4" />
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
