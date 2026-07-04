export type ProjectStatus = 'complete' | 'wip' | 'abandoned';
export type ProjectEngine = 'godot' | 'korge';

export type Project = {
	slug: string;
	name: string;
	description: string;
	status: ProjectStatus;
	coverImage: string;
	engine: ProjectEngine;
	playRoute: string;
	gameUrl?: string;
};

export const projects: Project[] = [
	{
		slug: 'clicky-cat',
		name: 'Clicky Cat',
		description: 'I think you know what this is',
		status: 'complete',
		coverImage: '/cover_images/clickycat.png',
		engine: 'godot',
		playRoute: '/projects/clicky-cat/play',
		gameUrl: '/play/clicky-cat/index.html'
	},
	{
		slug: 'spinny-cookie',
		name: 'Spinny Cookie',
		description: 'CHOCOLATE BISCUITS!',
		status: 'abandoned',
		coverImage: '/cover_images/cookie.png',
		engine: 'korge',
		playRoute: '/projects/spinny-cookie/play',
		gameUrl: '/play/spinny-cookie/index.html'
	},
	{
		slug: 'cablegame',
		name: 'Cablegame (Wireframe)',
		description: 'Yeah I think you know what this is as well',
		status: 'abandoned',
		coverImage: '/cover_images/cablegame.png',
		engine: 'godot',
		playRoute: '/projects/cablegame/play',
		gameUrl: '/play/cable-game/index.html'
	},
	{
		slug: 'clicky-cat-old',
		name: 'OG Clicky Cat',
		description: 'The version of clicky cat from around 2023, before the rewrite',
		status: 'abandoned',
		coverImage: '/cover_images/clickycat.png',
		engine: 'korge',
		playRoute: '/projects/clicky-cat-old/play',
		gameUrl: '/play/clicky-cat-old/productionExecutable/index.html'
	}
];

export function getProjectBySlug(slug: string) {
	return projects.find((project) => project.slug === slug);
}

export function getProjectWithState(state: ProjectStatus) {
	return projects.filter((project) => project.status === state);
}

export function getProjectsWithEngine(engine: ProjectEngine) {
	return projects.filter((project) => project.engine === engine);
}
