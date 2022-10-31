export interface AttrPointer {
	name: string;
	selector: string;
}

export function attr(lang: string): AttrPointer {
	return {
		name: `i18n-${lang}`,
		selector: `[i18n-${lang}]`
	};
}
