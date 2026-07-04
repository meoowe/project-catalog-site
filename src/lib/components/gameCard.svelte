<script lang="ts">
	import type { Project, ProjectStatus } from '$lib/projects';

	type Props = {
		project: Project;
		active?: boolean;
	};

	let { project, active = false }: Props = $props();

	const statusLabels: Record<ProjectStatus, string> = {
		complete: 'Complete',
		wip: 'Work In Progress',
		abandoned: 'Abandoned'
	};

	const statusClasses: Record<ProjectStatus, string> = {
		complete: 'badge-success',
		wip: 'badge-warning',
		abandoned: 'badge-error'
	};
</script>

<article
	class={[
		'group grid h-full min-h-112 overflow-hidden rounded-lg border bg-base-100 shadow-xl transition duration-200 w-96',
		active
			? 'border-accent shadow-accent/25 scale-[1.01]'
			: 'border-base-300 hover:-translate-y-1 hover:border-primary hover:shadow-primary/20'
	]}
>
	<figure class="relative aspect-4/3 overflow-hidden bg-base-300">
		<img
			src={project.coverImage}
			alt={project.name}
			class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
		/>
		<div class="absolute left-3 top-3">
			<span class={['badge badge-soft', statusClasses[project.status]]}>
				{statusLabels[project.status]}
			</span>
		</div>
	</figure>

	<div class="grid content-between gap-5 p-5">
		<div class="space-y-2">
			<h2 class="text-2xl font-black tracking-normal">{project.name}</h2>
			<p class="min-h-12 text-sm leading-6 text-base-content/70">{project.description}</p>
		</div>

		<a class="btn btn-primary w-full text-base font-black hover:bg-amber-400" href={project.playRoute}>Play</a>
	</div>
</article>
