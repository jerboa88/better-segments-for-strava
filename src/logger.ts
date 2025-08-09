import { PROJECT } from './constants.ts';

type Severity = 'debug' | 'info' | 'warn' | 'error';

const SCRIPT_NAME = `${PROJECT.EMOJI} ${PROJECT.NAME}`;
const IS_DEBUG = true;

const buildLogPrefix = (() => {
	const colorMap = {
		primary: '#fc5200', // Strava orange
		debug: '#009966', // TW 4 Emerald 600
		info: '#4f39f6', // TW 4 Indigo 600
		warn: '#fc5200', // Strava orange
		error: '#e7000b', // TW 4 Red 600
	};

	return (severity: Severity) => [
		`%c${SCRIPT_NAME} %c${severity}`,
		`font-style:italic;color:${colorMap.primary};`,
		`color:${colorMap[severity]};`,
	];
})();

const buildLogFn = (severity: Severity) => {
	if (!IS_DEBUG) {
		return () => {
			// no-op
		};
	}

	const logFn = console[severity];
	const logPrefix = buildLogPrefix(severity);

	return (...args: unknown[]) => logFn(...logPrefix, ...args);
};

export const debug = buildLogFn('debug');
export const info = buildLogFn('info');
export const warn = buildLogFn('warn');
export const error = buildLogFn('error');
