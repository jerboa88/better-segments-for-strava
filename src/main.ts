import { debug } from './logger.ts';
import { starredSegmentsRoute } from './pages/starred-segments.ts';
import type { Route } from './types.ts';

/**
 * Register route handlers for the given routes.
 *
 * @param routes - The routes to register handlers for
 */
const registerRouteHandlers = (routes: Route[]) => {
	const path = location.pathname;

	for (const { pattern, handler } of routes) {
		if (pattern.test(path)) {
			handler();

			break;
		}
	}
};

/**
 * Entry point for the script.
 */
const init = () => {
	debug('Script loaded');

	registerRouteHandlers([starredSegmentsRoute]);

	debug('Script unloaded');
};

init();
