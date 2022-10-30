import { getElementsWithAttribute } from './get-elements-with-attr';
import { setChosenLang, tryGetChosenLang } from './storage';

export const isSupported = typeof MutationObserver === 'function';

const htmlElement = document.getElementsByTagName('html')[0];
const defaultLanguage = htmlElement.getAttribute('lang') || 'en';
const defaultAttrName = `i18n-${defaultLanguage}`;
const lockAttrName = 'i18n-lock';

let currentLanguage: string = tryGetChosenLang() || (navigator.language.split('-')[0]);
let currentAttrName = `i18n-${currentLanguage}`;
let currentLock = '1';

function tryApplyDirectly(element: HTMLElement, attrName: string): boolean {
	const langAttr = element.attributes.getNamedItem(attrName);
	if (langAttr) {
		const lock = element.getAttribute(lockAttrName);
		if (lock === null || lock !== currentLock) {
			if (lock === null) {
				element.setAttribute(defaultAttrName, element.innerText);
			}
			element.setAttribute(lockAttrName, currentLock);
			element.innerText = langAttr.value;
			return true;
		}
	}
	return false;
}

function tryApplyDeeply(element: HTMLElement, attrName: string) {
	tryApplyDirectly(element, attrName);
	getElementsWithAttribute(element, attrName, (child) => tryApplyDirectly(child, attrName));
}

function callback(mutations: MutationRecord[]) {
	for (const mutation of mutations) {
		if (mutation.type === 'childList') {
			for (let index = 0; index < mutation.addedNodes.length; index++) {
				const node = mutation.addedNodes[index];
				if (node.nodeType === Node.ELEMENT_NODE) {
					tryApplyDeeply(node as HTMLElement, currentAttrName);
				}
			}
		}
	}
}

function replace() {
	const elements = document.querySelectorAll(`[${lockAttrName}], [${currentAttrName}]`);
	for (let index = 0; index < elements.length; index++) {
		const element = elements[index] as HTMLElement;
		if (!tryApplyDirectly(element, currentAttrName)) {
			tryApplyDirectly(element, defaultAttrName);
		}
	}
}

if (isSupported) {
	const observer = new MutationObserver(callback);
	observer.observe(htmlElement, {
		childList: true,
		subtree: true,
	});
}

export function set(lang: string) {
	if (!isSupported) {
		throw new Error('UltimateI18n is not supported');
	}

	setChosenLang(lang);
	currentLanguage = lang;
	currentAttrName = `i18n-${lang}`;
	currentLock = String(parseInt(currentLock) + 1);
	replace();
}

export function get(): string {
	return currentLanguage;
}

export function setup() {
	replace();
}
