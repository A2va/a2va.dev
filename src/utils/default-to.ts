function isFalsy(input: unknown) {
	return (
		input === undefined ||
		input === null ||
		(typeof input === "number" && Number.isNaN(input) === true)
	);
}

export function defaultTo<T>(defaultArgument: T): (input: unknown) => unknown;
export function defaultTo(defaultArgument: unknown, input: unknown): unknown;
export function defaultTo(defaultArgument: unknown, ...input: unknown[]) {
	if (input.length === 0) {
		return (_input: unknown) => defaultTo(defaultArgument, _input);
	}

	return isFalsy(input[0]) ? defaultArgument : input[0];
}
