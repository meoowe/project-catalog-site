import { getProjectsWithEngine } from '$lib/projects';
import type { Handle } from '@sveltejs/kit';

function matchesPathOrChildren(pathname: string, basePath: string) {
	return pathname === basePath || pathname.startsWith(`${basePath}/`);
}

function getAssetBasePath(gameUrl: string, origin: string) {
	const url = new URL(gameUrl, origin);
	const lastSlash = url.pathname.lastIndexOf('/');

	return lastSlash === -1 ? url.pathname : url.pathname.slice(0, lastSlash);
}

function needsCrossOriginIsolation(pathname: string, origin: string) {
	return getProjectsWithEngine('godot').some((project) => {
		const isPlayRoute = matchesPathOrChildren(pathname, project.playRoute);
		const isGameAsset = project.gameUrl
			? matchesPathOrChildren(pathname, getAssetBasePath(project.gameUrl, origin))
			: false;

		return isPlayRoute || isGameAsset;
	});
}

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	if (needsCrossOriginIsolation(event.url.pathname, event.url.origin)) {
		response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
		response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
		response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
	} else {
		response.headers.delete('Cross-Origin-Opener-Policy');
		response.headers.delete('Cross-Origin-Embedder-Policy');
		response.headers.delete('Cross-Origin-Resource-Policy');
	}

	return response;
};
