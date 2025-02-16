function isFalsy(input: any) {
	return input === undefined || input === null || Number.isNaN(input) === true;
}

export function defaultTo(defaultArgument: any, input: any) {
	if (arguments.length === 1) {
		return (_input: any) => defaultTo(defaultArgument, _input);
	}

	return isFalsy(input) ? defaultArgument : input;
}
