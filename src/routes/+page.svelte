<script lang="ts">
	import GameCard from '$lib/components/gameCard.svelte';
	import { projects } from '$lib/projects';
</script>

<svelte:head>
	<title>Project Index</title>
</svelte:head>

<div class="min-h-screen bg-base-200 text-base-content">
	<main
		class="mx-auto grid min-h-screen w-full max-w-7xl content-center gap-8 px-4 py-8 sm:px-6 lg:px-8"
	>
		<section class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
			<div class="space-y-3">
				<p class="text-sm font-black uppercase tracking-[0.22em] text-primary">Aarav and Leo and Leo's Projects</p>
				<h1 class="max-w-4xl text-5xl font-black tracking-normal sm:text-6xl lg:text-7xl">
					Pick a game.
				</h1>
			</div>
		</section>
		<div class="border-4 border-orange-500 border-dashed rounded p-4">
			<section class="carousel gap-4">
				{#each projects as project, index (project.slug)}
					<GameCard {project} active={false} />  <!--TODO: Remove active feature  -->
				{/each}
			</section>
		</div>
	</main>
</div>
