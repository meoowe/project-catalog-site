<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const statusCopy = {
		complete: 'Ready',
		wip: 'Warming up',
		abandoned: 'Archived'
	};
</script>

<svelte:head>
	<title>{data.project.name} | Play</title>
</svelte:head>

<main class="min-h-screen bg-base-200 px-4 py-6 text-base-content sm:px-6 lg:px-8">
	<div class="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl content-center gap-6">
		<div class="flex flex-wrap items-center justify-between gap-3">
			<a class="btn btn-ghost" href="/">Back</a>
			<div class="flex items-center gap-3">
				<span class="badge badge-soft badge-primary">{statusCopy[data.project.status]}</span>
				<h1 class="text-xl font-black tracking-normal sm:text-2xl">{data.project.name}</h1>
			</div>
		</div>

		{#if data.project.gameUrl}
			<section class="overflow-hidden rounded-lg border border-base-300 bg-black shadow-2xl">
				<iframe
					title={data.project.name}
					src={data.project.gameUrl}
					class="block aspect-video min-h-[26rem] w-full bg-black lg:min-h-[42rem]"
					allow="autoplay; fullscreen; gamepad cross-origin-isolated"
					sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups"
				></iframe>
			</section>
		{:else}
			<section
				class="grid overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-2xl lg:grid-cols-[minmax(0,1fr)_22rem]"
			>
				<div class="relative min-h-88 bg-base-300 lg:min-h-136">
					<img
						src={data.project.coverImage}
						alt={data.project.name}
						class="absolute inset-0 h-full w-full object-cover"
					/>
				</div>

				<div class="grid content-between gap-8 p-6 sm:p-8">
					<div class="space-y-4">
						<h2 class="text-4xl font-black tracking-normal sm:text-5xl">{data.project.name}</h2>
						<p class="text-base leading-7 text-base-content/70">{data.project.description}</p>
					</div>

					<div class="rounded-lg border border-dashed border-base-300 bg-base-200 p-5 text-center">
						<p class="font-black">No web build yet</p>
						<p class="mt-2 text-sm leading-6 text-base-content/60">
							Add a static build and set <code>gameUrl</code> for this project when it is ready.
						</p>
					</div>
				</div>
			</section>
		{/if}
	</div>
</main>
