export function getElementsWithAttribute(root: HTMLElement, attrName: string, callback: (child: HTMLElement) => void) {
	function iterate(parent: HTMLElement) {
		const count = parent.children.length;
		for (let i = 0; i < count; i++) {
			const child = parent.children[i] as HTMLElement;
			if (child.hasAttribute(attrName)) {
				callback(child);
			}
			iterate(child);
		}
	}
	iterate(root);
}
