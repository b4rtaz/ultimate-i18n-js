(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.UltimateI18n = {}));
})(this, (function (exports) { 'use strict';

	function getElementsWithAttribute(root, attrName, callback) {
	    function iterate(parent) {
	        const count = parent.children.length;
	        for (let i = 0; i < count; i++) {
	            const child = parent.children[i];
	            if (child.hasAttribute(attrName)) {
	                callback(child);
	            }
	            iterate(child);
	        }
	    }
	    iterate(root);
	}

	const key = 'ultimateI18n';
	function tryGetChosenLang() {
	    return localStorage[key];
	}
	function setChosenLang(lang) {
	    localStorage[key] = lang;
	}

	const isSupported = typeof MutationObserver === 'function';
	const htmlElement = document.getElementsByTagName('html')[0];
	const defaultLanguage = htmlElement.getAttribute('lang') || 'en';
	const defaultAttrName = `i18n-${defaultLanguage}`;
	const lockAttrName = 'i18n-lock';
	let currentLanguage = tryGetChosenLang() || (navigator.language.split('-')[0]);
	let currentAttrName = `i18n-${currentLanguage}`;
	let currentLock = '1';
	function tryApplyDirectly(element, attrName) {
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
	function tryApplyDeeply(element, attrName) {
	    tryApplyDirectly(element, attrName);
	    getElementsWithAttribute(element, attrName, (child) => tryApplyDirectly(child, attrName));
	}
	function callback(mutations) {
	    for (const mutation of mutations) {
	        if (mutation.type === 'childList') {
	            for (let index = 0; index < mutation.addedNodes.length; index++) {
	                const node = mutation.addedNodes[index];
	                if (node.nodeType === Node.ELEMENT_NODE) {
	                    tryApplyDeeply(node, currentAttrName);
	                }
	            }
	        }
	    }
	}
	function replace() {
	    const elements = document.querySelectorAll(`[${lockAttrName}], [${currentAttrName}]`);
	    for (let index = 0; index < elements.length; index++) {
	        const element = elements[index];
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
	function set(lang) {
	    if (!isSupported) {
	        throw new Error('UltimateI18n is not supported');
	    }
	    setChosenLang(lang);
	    currentLanguage = lang;
	    currentAttrName = `i18n-${lang}`;
	    currentLock = String(parseInt(currentLock) + 1);
	    replace();
	}
	function get() {
	    return currentLanguage;
	}
	function setup() {
	    replace();
	}

	exports.get = get;
	exports.isSupported = isSupported;
	exports.set = set;
	exports.setup = setup;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
