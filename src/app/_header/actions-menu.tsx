'use client';

import Link from 'next/link';
import { LogOutIcon } from 'lucide-react';
import { useServerAction } from 'zsa-react';
import { toast } from 'sonner';
import nProgress from 'nprogress';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { signOutAction } from './actions';

export function ActionsMenu() {
	const { execute } = useServerAction(signOutAction, {
		onSuccess: () => {
			toast.success('You have been signed out');
		},
		onFinish: () => {
			nProgress.done();
		},
	});

	async function handleSignOut() {
		nProgress.start();
		await execute();
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src="" alt="avatar" />
					<AvatarFallback>EG</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			<DropdownMenuContent side="bottom">
				<DropdownMenuLabel>Account</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<DropdownMenuItem>
					<Link href="/profile">My Profile</Link>
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={handleSignOut}
					className="cursor-pointer space-x-2 text-destructive"
				>
					<LogOutIcon className="size-4" />
					<span>Sign Out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
