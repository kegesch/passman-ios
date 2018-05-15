import * as React from 'react';

export function joinElements(elements, separator) {
	if (!Array.isArray(elements)) return elements;

	const result = [];

	for (let i = 0; i < elements.length; i++) {
		result.push(elements[i]);
		if (i < elements.length - 1) {
			let sep = React.createElement(separator, {key: i});
			result.push(sep);
		}
	}
	return result;
}