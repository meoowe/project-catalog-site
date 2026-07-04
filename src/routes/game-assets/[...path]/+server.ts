import { error } from '@sveltejs/kit';
import { readFile } from 'node:fs/promises';
import { extname, normalize, resolve, sep } from 'node:path';
import type { RequestHandler } from './$types';

const assetRoot = resolve('static/play');

const contentTypes: Record<string, string> = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.wasm': 'application/wasm',
	'.pck': 'application/octet-stream',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.ico': 'image/x-icon',
	'.json': 'application/json; charset=utf-8',
	'.webmanifest': 'application/manifest+json; charset=utf-8',
	'.mp3': 'audio/mpeg',
	'.ogg': 'audio/ogg',
	'.wav': 'audio/wav',
	'.map': 'application/json; charset=utf-8'
};

function getSafeFilePath(path: string) {
	const cleanPath = normalize(path).replace(/^(\.\.(\/|\\|$))+/, '');
	const filePath = resolve(assetRoot, cleanPath);

	if (filePath !== assetRoot && !filePath.startsWith(`${assetRoot}${sep}`)) {
		error(404, 'Game asset not found');
	}

	return filePath;
}

export const GET: RequestHandler = async ({ params }) => {
	const filePath = getSafeFilePath(params.path);

	try {
		const body = await readFile(filePath);
		const contentType = contentTypes[extname(filePath).toLowerCase()] ?? 'application/octet-stream';

		return new Response(body, {
			headers: {
				'Content-Type': contentType,
				'Cache-Control': 'public, max-age=3600'
			}
		});
	} catch {
		error(404, 'Game asset not found');
	}
};
