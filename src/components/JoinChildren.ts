export default function joinChildren(children, separator) {
	return children.reduce((result, child, index) => {
		if (index < children.length - 1) {
			return result.concat([child, separator])
		}

		return result.concat(child)
	}, []);
}

export function joinElements(elements, separator) {
	const result = [];
	for(let i = 0; i < elements.length; i++) {
		result.push(elements[i]);
		if(i < elements.length -1) {
			result.push(separator);
		}
	}
	return result;
}