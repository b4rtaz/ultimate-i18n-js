import { attr, AttrPointer } from './attr';
import { writeSelectedLang, readSelectedLang } from './storage';

export const isSupported = typeof MutationObserver === 'function';

const htmlElement = document.getElementsByTagName('html')[0];
const defaultLanguage = htmlElement.getAttribute('lang') || 'en';
const defaultAttr = attr(defaultLanguage);
const lockAttrName = 'i18n-lock';

let currentLanguage: string = readSelectedLang() || navigator.language.split('-')[0];
let currentAttr = attr(currentLanguage);
let currentLock = '1';

function updateHtmlLang(lang: string) {
	htmlElement.setAttribute('lang', lang);
}

function applyDirectly(element: HTMLElement, attr: AttrPointer): boolean {
	const langAttr = element.attributes.getNamedItem(attr.name);
	if (langAttr) {
		const lock = element.getAttribute(lockAttrName);
		if (lock === null || lock !== currentLock) {
			if (lock === null) {
				element.setAttribute(defaultAttr.name, element.innerText);
			}
			element.setAttribute(lockAttrName, currentLock);
			element.innerText = langAttr.value;
			return true;
		}
	}
	return false;
}

function applyDeeply(element: HTMLElement, attr: AttrPointer) {
	applyDirectly(element, attr);

	const elements = element.querySelectorAll(attr.selector);
	const count = elements.length;
	for (let i = 0; i < count; i++) {
		applyDirectly(elements[i] as HTMLElement, attr);
	}
}

function callback(mutations: MutationRecord[]) {
	for (const mutation of mutations) {
		if (mutation.type === 'childList') {
			for (let index = 0; index < mutation.addedNodes.length; index++) {
				const node = mutation.addedNodes[index];
				if (node.nodeType === Node.ELEMENT_NODE) {
					applyDeeply(node as HTMLElement, currentAttr);
				}
			}
		}
	}
}

function replace() {
	const elements = document.querySelectorAll(`[${lockAttrName}], ${currentAttr.selector}`);
	const count = elements.length;
	for (let index = 0; index < count; index++) {
		const element = elements[index] as HTMLElement;
		if (!applyDirectly(element, currentAttr)) {
			applyDirectly(element, defaultAttr);
		}
	}
}

if (isSupported) {
	if (defaultLanguage !== currentLanguage) {
		updateHtmlLang(currentLanguage);
	}

	const observer = new MutationObserver(callback);
	observer.observe(htmlElement, {
		childList: true,
		subtree: true
	});
}

export function set(lang: string) {
	if (!isSupported) {
		throw new Error('UltimateI18n is not supported');
	}

	writeSelectedLang(lang);
	updateHtmlLang(lang);
	currentLanguage = lang;
	currentAttr = attr(lang);
	currentLock = String(parseInt(currentLock) + 1);
	replace();
}

export function get(): string {
	return currentLanguage;
}

export function setup() {
	replace();
}
