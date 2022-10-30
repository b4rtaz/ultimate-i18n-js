const key = 'ultimateI18n';

export function tryGetChosenLang(): string | undefined {
	return localStorage[key];
}

export function setChosenLang(lang: string) {
	localStorage[key] = lang;
}
