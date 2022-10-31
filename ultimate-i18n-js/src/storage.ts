const key = 'ultimateI18n';

export function readSelectedLang(): string | undefined {
	return localStorage[key];
}

export function writeSelectedLang(lang: string) {
	localStorage[key] = lang;
}
